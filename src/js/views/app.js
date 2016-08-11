var treeData = {};
var selectedNode = null;
var clickedNode = null;
var draggingNode = null;
var colors = d3.scale.category10();

var XYvalues = {1: [50, 0], 2: [0, 50], 3: [-50, 50], 4: [-50, 0], 5: [0, -50], 6: [-50, -50], 'undefined': [0,-50]};


// ------------- moving -------------------------------
var overCircle = function(d) {
    selectedNode = d;
    updateTempConnector();
};

var outCircle = function(d) {
    selectedNode = null;
    updateTempConnector();
};

var clickCircle = function(d) {
    clickedNode = d.node;
    console.log("You just clicked a node");
    console.log(clickedNode);
    updateTempConnector();
};


var addNewNode = function() {
    // Ignore the click event if it was suppressed
    if (d3.event.defaultPrevented) return;

    // Extract the click location\
    var point = d3.mouse(this)
        , p = {x: point[0], y: point[1]};

    var newNodes = [{x: p.x -50 , y: p.y -20, name: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)}];
    vis.selectAll("lonely")
        .data(newNodes).enter().append("circle")
        .attr("class", "lonely")
        .attr('r', 12)
        .attr("cx", p.x -50)
        .attr("cy", p.y -20)
        .style('fill', function (d) {
            return (d === selectedNode) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id);
        })
        .style('stroke', function (d) {
            return d3.rgb(colors(d.id)).darker().toString();
        })
        .on('click', function(d){
            d3.event.stopPropagation();
            clickCircle(d);
            updateMenu();
            d3.select("#tableInformations").style("display","none");
            d3.select("#svgShape").style("display", "none");
            d3.select("#svgMenu").style("display", "block");
            if (d3.event.defaultPrevented) return; // click suppressed
        })
        .call(circleDragger);
};

var circleDragger = d3.behavior.drag()
    .on("drag", function(d) {
        draggingNode = d;
        d3.select(this).attr( 'pointer-events', 'none' );
        d.x += d3.event.dx;
        d.y += d3.event.dy;
        var node = d3.select(this);
        node.attr( { cx: d.x, cy: d.y } );
        updateTempConnector();
    })
    .on("dragend", function(d){
        var tempLinks = vis.selectAll(".templink");
        console.log(tempLinks[0]);
        draggingNode = null;
        // now restore the mouseover event or we won't be able to drag a 2nd time
        d3.select(this).attr( 'pointer-events', '' );
    });

var updateTempConnector = function() {
    var data = [];
    if ( draggingNode != null && selectedNode != null) {
        // have to flip the source coordinates since we did this for the existing connectors on the original tree
        data = [ {source: {x: selectedNode.y, y: selectedNode.x},
            target: {x: draggingNode.x, y: draggingNode.y} } ];
    }
    var link = vis.selectAll(".templink").data(data);

    link.enter().append("path")
        .attr("class", "templink")
        .attr("d", d3.svg.diagonal() )
        .attr('pointer-events', 'none');

    link.attr("d", d3.svg.diagonal());

    link.exit().remove();
};

// ------------- normal tree drawing code --------
var width  = 1000,
    height = 500;

var vis = d3.select('#viz')
    .append('svg')
    .attr('id', 'svgTree')
    .attr('width', width)
    .attr('height', height)
    .on("click", addNewNode)
    .append("svg:g").attr("transform", "translate(50, 20)");
/*
var div = d3.select("body")
    .append("div")     // declare the tooltip div
    .attr("id","toolTip")
    .attr("class", "tooltip")              // apply the 'tooltip' class
    .style("opacity", 0);
*/


var width = 460,
    height = 300,
    radius = Math.min(width, height) / 2;

var color = d3.scale.category20();

var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 50);

var tree = d3.layout.tree().size([150,150]);

/**
 * Display the tree with new data
 */
function displayTree() {
    var nodes = tree.nodes(treeData);
    var links = tree.links(nodes);

    var treeSvg = d3.select("#svgTree");
    treeSvg.selectAll('.node').remove();
    treeSvg.selectAll('.nodelink').remove();

    var link = vis.selectAll(".nodelink")
        .data(links)
        .enter().append("line")
        .attr("class", "nodelink")
        .attr("x1", function(d) { return calculateXandYNode(d.source)[1]; })
        .attr("y1", function(d) { return calculateXandYNode(d.source)[0]; })
        .attr("x2", function(d) { return calculateXandYNode(d.target)[1]; })
        .attr("y2", function(d) { return calculateXandYNode(d.target)[0]; })
        .attr('pointer-events', 'none');

    var node = vis.selectAll("g.node")
        .data(nodes)
        .enter().append("g")
        .attr("x", function(d) {
            return calculateXandYNode(d)[0]
        })
        .attr("y", function(d) {
            return calculateXandYNode(d)[1];
        })
        .attr("transform", function (d) {
            return "translate(" + calculateXandYNode(d)[1] + "," + calculateXandYNode(d)[0] + ")";
        })
        .on('click', function (d) {
            d3.event.stopPropagation();
            updateMenu();
            d3.select("#svgInfos").style("display", "none");
            d3.select("#svgSubstituents").style("display", "none");
            d3.select("#svgShape").style("display", "none");
            d3.select("#svgMenu").style("display", "block");
            if (d3.event.defaultPrevented) return; // click suppressed
        });

    node.append("path")
        //.attr('pointer-events', 'none')
        .attr('class', 'node')
        .attr("d", d3.superformula()
            .size(400)
            .type(function(d) {
                if (d.node instanceof sb.Substituent) {
                    return "circle";
                } else {
                    return d.node.monosaccharideType.shape.toLowerCase();
                }
            }))
        .attr("transform", function(d) {
            if (d.node instanceof sb.Substituent) {
                return;
            }
             var shape = d.node.monosaccharideType.shape;
             if (shape == "star") {
             return "rotate(-20)";
             } else if (shape == "triangle") {
                return "rotate(30)";
             }
        })
        .style('fill', function(d) {
            if (d.node instanceof sb.Substituent) {
                return "blue";
            } else {
                if(d.node.monosaccharideType.bisected) {
                    var gradientId = "gradient" + randomString(6);
                    var shape = d.node.monosaccharideType.shape;
                    if (shape == 'square') {
                        createSquareLinearGradient(d.node.monosaccharideType.color, gradientId);
                    } else if (shape == 'diamond') {
                        // Manage inversed Diamonds
                        createDiamondLinearGradient(d.node.monosaccharideType.color, gradientId);
                    } else {
                        createTriangleLinearGradient(d.node.monosaccharideType.color, gradientId);
                    }
                    return "url(#" + gradientId +")";
                } else {
                    return d.node.monosaccharideType.color;
                }
            }
        })
    .style('stroke', 'black');

    // ------------- trickery to avoid collision detection

    // phantom node to give us mouseover in a radius around it
        node.append("circle")
            .attr("r", 40)
            .attr("opacity", 0.0) // change this to non-zero to see the target area
            .attr('pointer-events', 'mouseover')
            .on("mouseover", overCircle)
            .on("mouseout", outCircle)
            .on("click", clickCircle);

    // a new, unconnected node that can be dragged near others to connect it
}


/**
 * Finds the edge in the sugar which has the monosaccharide as target
 * @param monosaccharide
 * @returns {*}
 */
function findLinkForMono(monosaccharide) {
    var links = tree.links(tree.nodes(treeData));
    for (var link of links) {
        if (link.target.node == monosaccharide) {
            return sugar.getEdge(link.source.node, link.target.node);
        }
    }
}

/**
 * Calculate X and Y for a node
 * @param node
 */
function calculateXandYNode(node) {
    var link = findLinkForMono(node.node);
    if (typeof link != 'undefined') {
        var anomerCarbon = link.linkedCarbon.value;
        var sourceX;
        var sourceY;
        for (var n of tree.nodes(treeData)) {
            if (n.node == link.sourceNode) {
                var source = calculateXandYNode(n);
                sourceX = source[0];
                sourceY = source[1];
            }
        }
        var modificationsXY = XYvalues[anomerCarbon];
        var newX = sourceX  + modificationsXY[1];
        var newY = sourceY + modificationsXY[0];
        return [newX, newY];

    } else {
        return [node.x, node.y];
    }
}

/**
 * Create a linear gradient for a square
 * @param color The color that the square has to have
 * @param gradientId The generated id of the linear gradient
 */
function createSquareLinearGradient(color, gradientId) {
    var svg = d3.select("#svgTree");
    var linearGradient = svg.append("linearGradient")
        .attr("id", gradientId)
        .attr("x1", "0%")
        .attr("y1", "100%")
        .attr("x2", "100%")
        .attr("y2", "0%")
        .attr("spreadMethod", "pad");
    linearGradient.append("stop")
    .attr("offset", "48%")
    .attr("stop-color", "#fff")
    .attr("stop-opacity", 1);
    linearGradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#000")
        .attr("stop-opacity", 1);
    linearGradient.append("stop")
        .attr("offset", "52%")
        .attr("stop-color", color)
        .attr("stop-opacity", 1);
}

/**
 * Create a linear gradient for a diamond
 * @param color The color that the diamond has to have
 * @param gradientId The generated id of the linear gradient
 */
function createDiamondLinearGradient(color, gradientId) {
    var svg = d3.select("#svgTree");
    var linearGradient = svg.append("linearGradient")
        .attr("id", gradientId)
        .attr("x1", "0%")
        .attr("y1", "100%")
        .attr("x2", "0%")
        .attr("y2", "0%")
        .attr("spreadMethod", "pad");
    linearGradient.append("stop")
        .attr("offset", "48%")
        .attr("stop-color", "#fff")
        .attr("stop-opacity", 1);
    linearGradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#000")
        .attr("stop-opacity", 1);
    linearGradient.append("stop")
        .attr("offset", "52%")
        .attr("stop-color", color)
        .attr("stop-opacity", 1);
}

/**
 * Create a linear gradient for a triangle
 * @param color The color that the triangle has to have
 * @param gradientId The generated id of the linear gradient
 */
function createTriangleLinearGradient(color, gradientId) {
    var svg = d3.select("#svgTree");
    var linearGradient = svg.append("linearGradient")
        .attr("id", gradientId)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%")
        .attr("spreadMethod", "pad");
    linearGradient.append("stop")
        .attr("offset", "48%")
        .attr("stop-color", "#fff")
        .attr("stop-opacity", 1);
    linearGradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#000")
        .attr("stop-opacity", 1);
    linearGradient.append("stop")
        .attr("offset", "52%")
        .attr("stop-color", color)
        .attr("stop-opacity", 1);
}





