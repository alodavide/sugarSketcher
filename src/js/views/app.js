var treeData = {};
var selectedNode = null;
var clickedNode = null;
var draggingNode = null;
var colors = d3.scale.category10();


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

    var diagonalHorizontal = d3.svg.diagonal().projection(function (d) {
        return [d.y, d.x];
    });
    var link = vis.selectAll(".nodelink")
        .data(links)
        .enter().append("path")
        .attr("class", "nodelink")
        .attr("d", diagonalHorizontal)
        .attr('pointer-events', 'none');

    var node = vis.selectAll("g.node")
        .data(nodes)
        .enter().append("g")
        .attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
        })
        .on('click', function (d) {
            d3.event.stopPropagation();
            updateMenu();
            d3.select("#tableInformations").style("display", "none");
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
                return d.node.monosaccharideType.shape;
            }))
        .attr("transform", function(d) {
            var shape = d.node.monosaccharideType.shape;
            if (shape == "star") {
                return "rotate(-20)";
            } else if (shape == "triangle") {
                return "rotate(30)";
            }
        })
        .style('fill', function(d) { return d.node.monosaccharideType.color;});

    // ------------- trickery to avoid collision detection

    // phantom node to give us mouseover in a radius around it
        node.append("circle")
            .attr("r", 60)
            .attr("opacity", 0.0) // change this to non-zero to see the target area
            .attr('pointer-events', 'mouseover')
            .on("mouseover", overCircle)
            .on("mouseout", outCircle)
            .on("click", clickCircle);

    // a new, unconnected node that can be dragged near others to connect it
}




