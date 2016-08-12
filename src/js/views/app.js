var treeData = {};
var selectedNode = null;
var clickedNode = null;
var draggingNode = null;
var colors = d3.scale.category10();

//Values for links X and Y
var XYvalues = {1: [70, 0], 2: [0, 50], 3: [-50, 50], 4: [-70, 0], 5: [0, -50], 6: [-50, -50], 'undefined': [0,-50]};
// Values for links labels X and Y
var XYlinkLabels = {1: [4, 0], 2: [-3,14], 3: [0, 10], 4: [4, 0], 5: [0,0], 6: [-5,14], 'undefined': [0,0]};

var clickCircle = function(d) {
    clickedNode = d.node;
};

// ------------- normal tree drawing code --------
var width  = 1000,
    height = 500;

var vis = d3.select('#viz')
    .append('svg')
    .attr('id', 'svgTree')
    .attr('width', width)
    .attr('height', height)
    .append("svg:g").attr("transform", "translate(50, 20)");


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
        .attr("class", function(d) {
            if (d.target.node.anomericity == sb.Anomericity.ALPHA) {
                return "nodelink dashedNodeLink";
            } else {
                return "nodelink";
            }
        })
        .attr("x1", function(d) { return calculateXandYNode(d.source)[1]; })
        .attr("y1", function(d) { return calculateXandYNode(d.source)[0]; })
        .attr("x2", function(d) { return calculateXandYNode(d.target)[1]; })
        .attr("y2", function(d) { return calculateXandYNode(d.target)[0]; })
        .attr('pointer-events', 'none');

    var labelLink = vis.selectAll(".labelLink")
        .data(links)
        .enter().append("text")
        .attr("class", "linkLabel")
        .attr("x", function(d) {
            var finalX;
            var source = calculateXandYNode(d.source);
            var target = calculateXandYNode(d.target);
            var usualX = (source[1] + target[1])/2;
            console.log("finalX avant");
            console.log(usualX);
            finalX = usualX + XYlinkLabels[findLinkForMono(d.target.node).linkedCarbon.value][1];
            console.log("finalX après");
            console.log(finalX);
            return finalX;
        })
        .attr("y", function(d) {
            var finalY;
            var source = calculateXandYNode(d.source);
            var target = calculateXandYNode(d.target);
            var usualY = (source[0] + target[0])/2;
            console.log("finalY avant");
            console.log(usualY);
            finalY = usualY + XYlinkLabels[findLinkForMono(d.target.node).linkedCarbon.value][0];
            console.log("finalY après");
            console.log(finalY);
            return finalY;
        })
        .text(function(d) {
            var link = findLinkForMono(d.target.node);
            var anomericity;
            if (d.target.node.anomericity == sb.Anomericity.ALPHA) {
                anomericity = "α"
            } else if (d.target.node.anomericity == sb.Anomericity.BETA) {
                anomericity = "β";
            } else {
                anomericity = "?"
            }
            return anomericity + " / " + link.linkedCarbon.value;
        });

    var node = vis.selectAll("g.node")
        .data(nodes)
        .enter().append("g")
        .attr("x", function(d) {
            return calculateXandYNode(d)[0];
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
                        createDiamondLinearGradient(d.node.monosaccharideType, gradientId);
                    } else {
                        createTriangleLinearGradient(d.node.monosaccharideType.color, gradientId);
                    }
                    return "url(#" + gradientId +")";
                } else {
                    return d.node.monosaccharideType.color;
                }
            }
        })
    .style('stroke', 'black')
    .on('click', clickCircle);
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
        return [node.x + 150, node.y + 900];
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
 * @param type The type of the monosaccharide that the diamond has to have
 * @param gradientId The generated id of the linear gradient
 */
function createDiamondLinearGradient(type, gradientId) {
    var svg = d3.select("#svgTree");
    var linearGradient;
    // AltA and IdoA are reverted diamonds so we don't append the same linearGradient
    if (type == sb.MonosaccharideType.AltA || type == sb.MonosaccharideType.IdoA) {
        linearGradient = svg.append("linearGradient")
            .attr("id", gradientId)
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");
    } else {
        linearGradient = svg.append("linearGradient")
            .attr("id", gradientId)
            .attr("x1", "0%")
            .attr("y1", "100%")
            .attr("x2", "0%")
            .attr("y2", "0%")
            .attr("spreadMethod", "pad");
    }
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
        .attr("stop-color", type.color)
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
        .attr("y1", "54%")
        .attr("x2", "50%")
        .attr("y2", "22%")
        .attr("spreadMethod", "pad");
    linearGradient.append("stop")
        .attr("offset", "40%")
        .attr("stop-color", "#fff")
        .attr("stop-opacity", 1);
    linearGradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#000")
        .attr("stop-opacity", 1);
    linearGradient.append("stop")
        .attr("offset", "60%")
        .attr("stop-color", color)
        .attr("stop-opacity", 1);
}





