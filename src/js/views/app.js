var treeData = {};
var selectedNode = null;
var clickedNode = null;
var draggingNode = null;

//Values for links X and Y
var XYvalues = {1: [70, 0], 2: [0, 50], 3: [-50, 50], 4: [-70, 0], 5: [0, -50], 6: [-50, -50], 'undefined': [0,-50]};
// Values for links labels X and Y
var XYlinkLabels = {1: [4, 0], 2: [-3,14], 3: [0, 10], 4: [4, 0], 5: [0,0], 6: [-10,13], 'undefined': [0,0]};

/**
 * Update clickedNode on click on a node
 * @param d The event of the click
 */
var clickCircle = function(d) {
    clickedNode = d.node; // Update clickedNode
};

var zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", zoom);
var panSpeed = 200;
var panBoundary = 20; // Within 20px from edges will pan when dragging.

// Create the svgTree svg with fixed width and height
var vis = d3.select('#viz')
    .append('svg')
    .attr('id', 'svgTree')
    .attr('width', 1000)
    .attr('height', 550)
    .call(zoomListener) // Listener for the svg
    .append("svg:g").attr("transform", "translate(50, 20)");

/**
 * Function called when zooming or panning, just applying a transformation
 */
function zoom() {
    vis.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

var width = 460,
    height = 300,
    radius = Math.min(width, height) / 2;

var color = d3.scale.category20();

var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 50);

var tree = d3.layout.tree().size([150,150]); // Create the tree layout

/**
 * Display the tree with new data
 */
function displayTree() {
    var nodes = tree.nodes(treeData); // Tree nodes
    var links = tree.links(nodes); // Tree links

    var treeSvg = d3.select("#svgTree"); // Get the svgTree
    treeSvg.selectAll('.node').remove(); // Remove all the nodes
    treeSvg.selectAll('.nodelink').remove(); // Remove all the links
    treeSvg.selectAll('.linkLabel').remove(); // Remove all link labels

    vis.selectAll(".nodelink")
        .data(links)
        .enter().append("line") // Append a new line for each link
        .attr("class", function(d) {
            // If anomericity is alpha, then add dashed class to the link
            if (d.target.node.anomericity == sb.Anomericity.ALPHA) {
                return "nodelink dashedNodeLink";
            } else {
                return "nodelink";
            }
        })
        // Calculate X and Y of source and targets, and draw the line
        .attr("x1", function(d) { return calculateXandYNode(d.source)[1]; })
        .attr("y1", function(d) { return calculateXandYNode(d.source)[0]; })
        .attr("x2", function(d) { return calculateXandYNode(d.target)[1]; })
        .attr("y2", function(d) { return calculateXandYNode(d.target)[0]; })
        .attr('pointer-events', 'none');

    var linkLabel = vis.selectAll(".linkLabel") // Link labels
        .data(links)
        .enter().append("text")
        .attr("class", "linkLabel")
        .attr("x", function(d) {
            var finalX; // Final x of the label
            var source = calculateXandYNode(d.source); // Calculate source coordinates
            var target = calculateXandYNode(d.target); // Calculate target coordinates
            var usualX = (source[1] + target[1])/2; // Get x of the middle of the link
            finalX = usualX + XYlinkLabels[findLinkForMono(d.target.node).linkedCarbon.value][1]; // Add value to have a visible display (not on the line)
            return finalX; // Return the obtained value
        })
        .attr("y", function(d) {
            var finalY; // Final y of the label
            var source = calculateXandYNode(d.source); // Calculate source coordinates
            var target = calculateXandYNode(d.target); // Calculate target coordinates
            var usualY = (source[0] + target[0])/2; // Get y of the middle of the link
            finalY = usualY + XYlinkLabels[findLinkForMono(d.target.node).linkedCarbon .value][0]; // Add value to have a visible display
            return finalY; // Return the obtained value
        })
        .text(function(d) {
            var link = findLinkForMono(d.target.node); // Get the link to which we want to add a label
            var anomericity; // Anomericity of the target node
            if (d.target.node.anomericity == sb.Anomericity.ALPHA) {
                anomericity = "α"
            } else if (d.target.node.anomericity == sb.Anomericity.BETA) {
                anomericity = "β";
            } else {
                anomericity = "?"
            }
            return anomericity + " / " + link.linkedCarbon.value; // Text of the label
        });

    // Create nodes
    var node = vis.selectAll("g.node")
        .data(nodes)
        .enter().append("g")
        .attr("x", function(d) {
            return calculateXandYNode(d)[0]; // Calculate x
        })
        .attr("y", function(d) {
            return calculateXandYNode(d)[1]; // Calculate y
        })
        .attr("transform", function (d) {
            // Translation for display
            return "translate(" + calculateXandYNode(d)[1] + "," + calculateXandYNode(d)[0] + ")";
        })
        .on('click', function () {
            // On click, simply display menu and hide all other svg's
            d3.event.stopPropagation();
            updateMenu();
            d3.select("#svgInfos").style("display", "none");
            d3.select("#svgSubstituents").style("display", "none");
            d3.select("#svgShape").style("display", "none");
            d3.select("#svgCarbons").style("display", "none");
            d3.select("#svgMenu").style("display", "block");
        });

    // For each node, append a path
    node.append("path")
        .attr('class', 'node')
        // Use superformula shapes
        .attr("d", d3.superformula()
            .size(400)
            .type(function(d) {
                if (d.node instanceof sb.Substituent) {
                    return "circle";
                } else {
                    return d.node.monosaccharideType.shape.toLowerCase(); // Get the shape of the monosaccharide type
                }
            }))
        .attr("transform", function(d) {
            if (d.node instanceof sb.Substituent) {
                return;
            }
             var shape = d.node.monosaccharideType.shape;
            // Rotations to have star and triangle well oriented
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
                // If shape is bisected, we create a gradient and link it to the new node
                if(d.node.monosaccharideType.bisected) {
                    var gradientId = "gradient" + randomString(6); // Generate a random id for the gradient
                    var shape = d.node.monosaccharideType.shape;
                    if (shape == 'square') {
                        createSquareLinearGradient(d.node.monosaccharideType.color, gradientId);
                    } else if (shape == 'diamond') {
                        createDiamondLinearGradient(d.node.monosaccharideType, gradientId);
                    } else {
                        createTriangleLinearGradient(d.node.monosaccharideType.color, gradientId);
                    }
                    return "url(#" + gradientId +")";
                } else { // If not bisected, simply get the monosaccharide type color
                    return d.node.monosaccharideType.color;
                }
            }
        })
    .style('stroke', 'black') // Stroke to see white shapes
    .on('click', clickCircle); // Select the node on click
}


/**
 * Finds the edge in the sugar which has the monosaccharide as target
 * @param monosaccharide The monosaccharide which is the target fo the searched link
 * @returns {*}
 */
function findLinkForMono(monosaccharide) {
    var links = tree.links(tree.nodes(treeData)); // Tree links
    for (var link of links) {
        // If the link has the node as target, return the edge from the graph s
        if (link.target.node == monosaccharide) {
            return sugar.getEdge(link.source.node, link.target.node);
        }
    }
}

/**
 * Calculate X and Y for a node (using our fixed modification values), recursivity from node to root
 * @param node The node for which we want to calculate new coordinates
 */
function calculateXandYNode(node) {
    var link = findLinkForMono(node.node); // Find the link which has the node as target
    if (typeof link != 'undefined') { // If the link exists
        var anomerCarbon = link.linkedCarbon.value; // Get anomer carbon value
        var sourceX;
        var sourceY;
        // Calculate new coordinates for the wanted node
        for (var n of tree.nodes(treeData)) {
            if (n.node == link.sourceNode) {
                var source = calculateXandYNode(n);
                sourceX = source[0];
                sourceY = source[1];
            }
        }
        // Modifications we have to do on the obtained value
        var modificationsXY = XYvalues[anomerCarbon];
        var newX = sourceX  + modificationsXY[1]; // Apply the modification on x
        var newY = sourceY + modificationsXY[0]; // Apply the modification on y
        return [newX, newY]; // Return the obtained coordinates

    } else { // If the node is the root, just add 150 to the x and 900 to y to display it on the right of the svg
        return [node.x + 150, node.y + 900];
    }
}

/**
 * Create a linear gradient for a square
 * @param color The color that the square has to have
 * @param gradientId The generated id of the linear gradient
 */
function createSquareLinearGradient(color, gradientId) {
    var svg = d3.select("#svgTree"); // Get the svgTree
    // Create a linearGradient using the gradientId
    var linearGradient = svg.append("linearGradient")
        .attr("id", gradientId)
        .attr("x1", "0%")
        .attr("y1", "100%")
        .attr("x2", "100%")
        .attr("y2", "0%")
        .attr("spreadMethod", "pad");

    // First half of the square, in white
    linearGradient.append("stop")
    .attr("offset", "48%")
    .attr("stop-color", "#fff")
    .attr("stop-opacity", 1);

    // Separation in the middle, in black
    linearGradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#000")
        .attr("stop-opacity", 1);

    // Second half of the square, in the wanted color
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
    var svg = d3.select("#svgTree"); // Get the svgTree
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

    // First half of the diamond, in white
    linearGradient.append("stop")
        .attr("offset", "48%")
        .attr("stop-color", "#fff")
        .attr("stop-opacity", 1);

    // Separation of the diamond, in black
    linearGradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#000")
        .attr("stop-opacity", 1);

    // Second half of the diamond, in the wanted color
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

    // First half of the triangle, in white
    linearGradient.append("stop")
        .attr("offset", "40%")
        .attr("stop-color", "#fff")
        .attr("stop-opacity", 1);

    // Separation of the triangle, in black
    linearGradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#000")
        .attr("stop-opacity", 1);

    // Second half of the triangle, in the wanted color
    linearGradient.append("stop")
        .attr("offset", "60%")
        .attr("stop-color", color)
        .attr("stop-opacity", 1);
}





