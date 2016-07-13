var treeData = {"name" : "A", "children" : [ {"name" : "A1" },  {"name" : "A2" }, {"name" : "A3" } ] };
var selectedNode = null;
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


var addNewNode = function() {
    // Ignore the click event if it was suppressed
    if (d3.event.defaultPrevented) return;

    // Extract the click location\
    var point = d3.mouse(this)
        , p = {x: point[0], y: point[1]};

    var newNodes = [{x: p.x -50 , y: p.y -20, name: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)}];
    console.log('addnode');
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

            if (d3.event.defaultPrevented) return; // click suppressed

            if (d3.event.defaultPrevented) return; // click suppressed

            if(d3.select('#nodeMenu').style("opacity") == 0) {
                path.attr('transform',"translate(" + d3.mouse(this)[0] + "," + d3.mouse(this)[1] + ")")
                    .transition()
                    .duration(200)
                    .style("opacity", .9);
            }else{
                path.transition()
                    .duration(500)
                    .style("opacity", 0);
            }
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
        console.log("coucou");
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
var width  = 960,
    height = 500;

var vis = d3.select('#viz')
    .append('svg')
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

var dataset = {
    choice: [1, 1, 1]
};

var width = 460,
    height = 300,
    radius = Math.min(width, height) / 2;

var color = d3.scale.category20();

var pie = d3.layout.pie()
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 50);


var path = vis.selectAll("path")
    .data(pie(dataset.choice))
    .enter().append("path")
    .attr("fill", function(d, i) { return color(i); })
    .attr("id", 'nodeMenu')
    .attr("d", arc)
    .on('click', function(){
        d3.event.stopPropagation();
        console.log('clicked');
    })
    .style('opacity','0');



var tree = d3.layout.tree().size([150,150]);
var nodes = tree.nodes(treeData);
var links = tree.links(nodes);

var diagonalHorizontal = d3.svg.diagonal().projection( function(d) { return [d.y, d.x]; } );
var link = vis.selectAll(".nodelink")
    .data(links)
    .enter().append("path")
    .attr("class", "nodelink")
    .attr("d", diagonalHorizontal)
    .attr('pointer-events', 'none');

var node = vis.selectAll("g.node")
    .data(nodes)
    .enter().append("g")
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
    .on('click', function(d){
        d3.event.stopPropagation();
        if (d3.event.defaultPrevented) return; // click suppressed
        console.log(d);
        if(d3.select('#nodeMenu').style("opacity") == 0) {
            path.attr('transform',"translate(" + d.y + "," + d.x + ")")
                .transition()
                .duration(200)
                .style("opacity", .9);
        }else{
            path.transition()
                .duration(500)
                .style("opacity", 0);
        }
    });

node.append("circle")
    //.attr('pointer-events', 'none')
    .attr('class', 'node')
    .attr('r', 12)
    .style('fill', function(d) { return (d === selectedNode) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id); })
    .style('stroke', function(d) { return d3.rgb(colors(d.id)).darker().toString(); });


// ------------- trickery to avoid collision detection

// phantom node to give us mouseover in a radius around it
node.append("circle")
    .attr("r", 60)
    .attr("opacity", 0.0) // change this to non-zero to see the target area
    .attr('pointer-events', 'mouseover')
    .on("mouseover", overCircle)
    .on("mouseout", outCircle);

// a new, unconnected node that can be dragged near others to connect it
