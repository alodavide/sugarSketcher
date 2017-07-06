var treeData = {};
var shapes = {};
var selectedNode = null;
var clickedNode = null;
var draggingNode = null;
var copiedNode = null;

var gap = 50;
var origin = [200, 900];

//Values for links X and Y
var XYvalues = {1: [gap, 0], 2: [0, gap], 3: [-1*gap, gap], 4: [-1*gap, 0], 5: [-1*gap, 0], 6: [-1*gap, -1*gap], 'undefined': [0,-1*gap]};
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
    var treeSvg = d3.select("#svgTree"); // Get the svgTree
    treeSvg.selectAll('.node').remove(); // Remove all the nodes
    treeSvg.selectAll('.nodelink').remove(); // Remove all the links
    treeSvg.selectAll('.linkLabel').remove(); // Remove all link labels

    if (sugar.rootIsSet()) {
    var nodes = tree.nodes(treeData); // Tree nodes
    var links = tree.links(nodes); // Tree links

        vis.selectAll(".nodelink")
            .data(links)
            .enter().append("line") // Append a new line for each link
            .attr("class", function (d) {
                if (d.target.node["anomericity"]) { // Monosaccharide
                    // If anomericity is alpha, then add dashed class to the link
                    if (d.target.node.anomericity.name == "ALPHA") {
                        return "nodelink dashedNodeLink";
                    } else {
                        return "nodelink";
                    }
                }
                else // Substituant
                {
                    return "";
                }
            })
            // Calculate X and Y of source and targets, and draw the line
            .attr("x1", function (d) {
                if (d.target.node["anomericity"]) // Monosaccharide
                    return shapes[d.source.node.id][1];
                return 0;
            })
            .attr("y1", function (d) {
                if (d.target.node["anomericity"]) // Monosaccharide
                    return shapes[d.source.node.id][0];
                return 0;
            })
            .attr("x2", function (d) {
                if (d.target.node["anomericity"]) // Monosaccharide
                    return shapes[d.target.node.id][1];
                return 0;
            })
            .attr("y2", function (d) {
                if (d.target.node["anomericity"]) // Monosaccharide
                    return shapes[d.target.node.id][0];
                return 0;
            })
            .attr('pointer-events', 'none');


        var linkLabel = vis.selectAll(".linkLabel") // Link labels
            .data(links)
            .enter().append("text")
            .attr("class", "linkLabel")
            .attr("x", function (d) {
                var finalX; // Final x of the label
                var source = shapes[d.source.node.id]; // Calculate source coordinates
                if (d.target.node["anomericity"]) // Monosaccharide
                {
                    var target = shapes[d.target.node.id]; // Calculate target coordinates
                    var usualX = (source[1] + target[1]) / 2; // Get x of the middle of the link
                    finalX = usualX + XYlinkLabels[findLinkForMono(d.target.node).linkedCarbon.value][1]; // Add value to have a visible display (not on the line)
                }
                else // Substituant
                {
                    finalX = findSubstituantLabelSpot(source[0], source[1], "")[1];
                }

                return finalX; // Return the obtained value
            })
            .attr("y", function (d) {
                var finalY; // Final y of the label
                var source = shapes[d.source.node.id]; // Get source coordinates
                if (d.target.node["anomericity"]) // Monosaccharide
                {
                    var target = shapes[d.target.node.id]; // Calculate target coordinates
                    var usualY = (source[0] + target[0]) / 2; // Get y of the middle of the link
                    finalY = usualY + XYlinkLabels[findLinkForMono(d.target.node).linkedCarbon.value][0]; // Add value to have a visible display
                }
                else // Substituant
                {
                    finalY = findSubstituantLabelSpot(source[0], source[1], d.target.node._substituentType.label)[0];
                }
                return finalY; // Return the obtained value
            })
            .text(function (d) {
                if (d.target.node["anomericity"]) // Monosaccharide
                {
                    var link = findLinkForMono(d.target.node); // Get the link to which we want to add a label
                    var anomericity; // Anomericity of the target node
                    if (d.target.node.anomericity.name == "ALPHA") {
                        anomericity = "α"
                    } else if (d.target.node.anomericity.name == "BETA") {
                        anomericity = "β";
                    } else {
                        anomericity = "?"
                    }
                    var linkedCarbonLabel;
                    if (link.linkedCarbon.value == 'undefined') {
                        linkedCarbonLabel = "?";
                    } else {
                        linkedCarbonLabel = link.linkedCarbon.value;
                    }
                    return anomericity + " / " + linkedCarbonLabel; // Text of the label
                }
                else
                {
                    return d.target.node._substituentType.label;
                }
            });

        // Create nodes
        var node = vis.selectAll("g.node")
            .data(nodes)
            .enter().append("g")
            .style("visibility", function(d) {
                return (d.node["anomericity"]) ? "visible" : "hidden"; // Do not display Substituant nodes
            })
            .attr("x", function (d) {
                if (d.node["anomericity"]) // Monosaccharide
                    return shapes[d.node.id][0];
            })
            .attr("y", function (d) {
                if (d.node["anomericity"]) // Monosaccharide
                    return shapes[d.node.id][1];
            })
            .attr("transform", function (d) {
                // Translation for display
                if (d.node["anomericity"]) // Monosaccharide
                    return "translate(" + shapes[d.node.id][1] + "," + shapes[d.node.id][0] + ")";
            })
            .on('click', function () {
                // On click, simply display menu and hide all other svg's
                d3.event.stopPropagation();
                d3.select("#deleteNode").style("display", "none");
                d3.select("#copyNode").style("display", "none");
                d3.select("#pasteNode").style("display", "none");
                updateMenu();
                d3.select("#svgInfos").style("display", "none");
                d3.select("#svgSubstituents").style("display", "none");
                d3.select("#svgShape").style("display", "none");
                d3.select("#svgCarbons").style("display", "none");
                d3.select("#svgMenu").style("display", "block");
            })
            .on("contextmenu", function (d) {
                d3.event.preventDefault();
                var yModification = 0;
                const node = d.node;
                d3.selectAll("svg")
                    .filter(function () {
                        if (d3.select(this).style("display") != "none" && d3.select(this).attr("id") != "svgTree") {
                            yModification += parseInt(d3.select(this).style("height").split("px")[0]) + 10;
                        }
                    });
                d3.select("#deleteNode").on('click', function () { // Click on delete option
                    deleteNode(node); // Delete the node clicked
                    $('#deleteNode').fadeOut(400); // Hide the delete option
                    $('#copyNode').fadeOut(400); // Hide the copy option
                    $('#pasteNode').fadeOut(400); // Hide the paste option
                });
                $('#deleteNode').css({'top': mouseY - yModification, 'left': mouseX - 70}).fadeIn(400); // Display the copy option
                $('#copyNode').css({'top': mouseY - yModification + 22, 'left': mouseX - 70}).fadeIn(400); // Display the copy option

                d3.select("#copyNode").on('click', function () { // Click on copy option
                    copiedNode = node; // Copy the node clicked
                    $('#deleteNode').fadeOut(400); // Hide the delete option
                    $('#copyNode').fadeOut(400); // Hide the copy option
                    $('#pasteNode').fadeOut(400); // Hide the paste option
                });
                if (copiedNode != null) { // If there is a copied node
                    $('#pasteNode').css({'top': mouseY - yModification + 44, 'left': mouseX - 70}).fadeIn(400); // Display the paste option
                    d3.select("#pasteNode").on('click', function () { // On click on paste option
                        pasteNewNode(node);
                    });
                }
            });

        // For each node, append a path
        node.append("path")
            .attr('class', 'node')
            // Use superformula shapes
            .attr("d", d3.superformula()
                .size(400)
                .type(function (d) {
                    if (d.node instanceof sb.Substituent) {
                        return "circle";
                    } else {
                        return d.node.monosaccharideType.shape.toLowerCase(); // Get the shape of the monosaccharide type
                    }
                }))
            .attr("transform", function (d) {
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
            .style('fill', function (d) {
                if (d.node instanceof sb.Substituent) {
                    return "blue";
                } else {
                    // If shape is bisected, we create a gradient and link it to the new node
                    if (d.node.monosaccharideType.bisected) {
                        var gradientId = "gradient" + randomString(6); // Generate a random id for the gradient
                        var shape = d.node.monosaccharideType.shape;
                        if (shape == 'square') {
                            createSquareLinearGradient(d.node.monosaccharideType.color, gradientId);
                        } else if (shape == 'diamond') {
                            createDiamondLinearGradient(d.node.monosaccharideType, gradientId);
                        } else {
                            createTriangleLinearGradient(d.node.monosaccharideType.color, gradientId);
                        }
                        return "url(#" + gradientId + ")";
                    } else { // If not bisected, simply get the monosaccharide type color
                        return d.node.monosaccharideType.color;
                    }
                }
            })
            .style('stroke', 'black') // Stroke to see white shapes
            .on('click', clickCircle); // Select the node on click
    }
}


/**
 * Paste a copied node to a node
 * @param node The node to which we want to paste a node
 */
function pasteNewNode(node) {
    var foundNodeInTree = searchNodeInTree(treeData, copiedNode); // Search the copied node in the tree data
    var linksRelatedToNode = findLinksForCopy(foundNodeInTree); // Find all links related to this node and its children
    var copyOfLinks = _.cloneDeep(linksRelatedToNode); // Copy of the links
    var copyOfNode = _.cloneDeep(foundNodeInTree); // Copy of the tree node
    copyOfNode.node.id+=randomString(7); // Change node id (to avoid error with twice same id in tree)
    var linkage = findLinkForMono(copiedNode); // Search the link which has the copied node as target
    var copyOfLinkage; // Copy of the link
    var nodeToAppend = searchNodeInTree(treeData, node); // Search the node  to which we want to paste
    if (linkage != null) { // If the linkage exists (so if the copied node is not the root)
        copyOfLinkage = _.cloneDeep(linkage); // Copy the link
        copyOfLinkage.id += randomString(7); // Change its id
        copyOfLinkage.source = nodeToAppend.node.id; // Change the source with the id of the node to append
        copyOfLinkage.sourceNode = nodeToAppend.node; // Change the sourceNode with the node to append
    } else { // If we copied the root, then create a new linkage with undefined anomer and linked carbons
        copyOfLinkage = new sb.GlycosidicLinkage(randomString(15), sugar.getNodeById(nodeToAppend.node.id), sugar.getNodeById(foundNodeInTree.node.id), sb.AnomerCarbon.UNDEFINED, sb.LinkedCarbon.UNDEFINED);
    }
    changeChildrenIds(copyOfNode); // Change all the children nodes ids (to avoid error of twice same id in tree)
    if (typeof nodeToAppend.children == 'undefined') { // Add children property if the node doesn't have children yet
        nodeToAppend['children'] = [];
    }
    nodeToAppend.children.push(copyOfNode); // Push the copy to the children of the node to append
    addNodeCopyInGraph(copyOfNode); // Add the new copy in the graph structure
    // Update the source of the first linkage (search the copied node which corresponds to the first of the copy)
    for (var i = 0; i < copyOfNode.length; i++) {
        var idBeforeChange = copyOfNode[i].node.id.substring(0, copyOfNode[i].node.id.length - 7);
        if (idBeforeChange == copyOfLinkage.source) {
            copyOfLinkage.source = copyOfNode[i].node.id;
            copyOfLinkage.sourceNode = copyOfNode[i].node;
        }
    }
    searchFirstPasteNodeAndUpdateLink(treeData,copyOfLinkage); // Update the target of the first linkage
    updateLinksRelated(copyOfNode, copyOfLinks); // Update all links (ids to avoid twice same ids
    for (var j = 0; j < copyOfLinks.length; j++) { // Update ids of all links
        copyOfLinks[j].id += randomString(7);
    }
    if (typeof nodeToAppend.children === 'undefined') {
        nodeToAppend["children"] = [];
    }
    sugar.graph.addEdge(copyOfLinkage); // Add the first edge to the graph
    for (var link of copyOfLinks) { // Add all links to the graph
        sugar.graph.addEdge(link);
    }
    $('#deleteNode').fadeOut(400); // Hide the delete option
    $('#copyNode').fadeOut(400); // Hide the copy option
    $('#pasteNode').fadeOut(400); // Hide the paste option

    generateShapes();

    displayTree(); // Display the tree with new structure
}

/**
 * Search the first node we paste, and change the first link target to this node
 * @param root The node from which we start the search
 * @param linkageToUpdate The linkage to update
 */
function searchFirstPasteNodeAndUpdateLink(root, linkageToUpdate) {
    var idBeforeChange = root.node.id; // Get the id of the current node
    if (idBeforeChange == linkageToUpdate.source) { // If it corresponds to the source of the linkage
        if (root.children != null) { // If the node has children
            linkageToUpdate.target = root.children[root.children.length -1].node.id; // Update target with last child of node id
            linkageToUpdate.targetNode = root.children[root.children.length -1].node; // Update targetNode with last child of node
        }
    } else { // If its not the good node
        if (root.children != null) { // Recursivity on children
            for (var i = 0; i < root.children.length; i++) {
                searchFirstPasteNodeAndUpdateLink(root.children[i], linkageToUpdate);
            }
        }
    }
}


/**
 * Update links source and target ids to paste a node
 * @param node The node we are currently checking
 * @param links The links we want to update
 */
function updateLinksRelated(node, links) {
    var idBeforeChange = node.node.id.substring(0, node.node.id.length - 7); // Get teh id before the update (we add 7 chars each time)
    for (var i = 0; i < links.length; i++) { // Loop on links
        if (links[i].source == idBeforeChange) { // If source correspondance, update it
            links[i].source = node.node.id;
            links[i].sourceNode = node.node;
        }
        if (links[i].target == idBeforeChange) { // If target correspondance, update it
            links[i].target = node.node.id;
            links[i].targetNode = node.node;
        }
    }
    if (node.children != null) { // Recursivity if children existing
        for (var j = 0; j < node.children.length; j++) {
            updateLinksRelated(node.children[j], links);
        }
    }
}


/**
 * Find all links in relation with a node and its children
 * @param node The root node of the copy
 */
function findLinksForCopy(node) {
    var allLinks = [];
    if (node.children != null) {
        for (var i = 0; i < node.children.length; i++) {
            allLinks.push(sugar.getEdge(node.node, node.children[i].node));
            allLinks = allLinks.concat(findLinksForCopy(node.children[i]));
        }
    }
    return allLinks;
}


/**
 * Add a node from d3js tree and its children in the sigma graph, copying links
 * @param node The node to add
 */
function addNodeCopyInGraph(node) {
    sugar.graph.addNode(node.node);
    if (node.children != null) {
        for (var i = 0; i < node.children.length; i++) {
            addNodeCopyInGraph(node.children[i]);
        }
    }
}


/**
 * Search a node in the tree structure
 * @param node The node we are looking for
 * @param root The root from which we want to search
 */
function searchNodeInTree(root, node) {
    if(root.node.id == node.id){
        return root;
    }else if (root.children != null){
        // If the node has children, recursivity on each child to find the source node
        var i;
        var result = null;
        for(i=0; result == null && i < root.children.length; i++){
            result = searchNodeInTree(root.children[i], node);
        }
        return result;
    }
}

/**
 * Change children ids of a node
 * @param node
 */
function changeChildrenIds(node) {
    if (node.children != null) {
        for (var i = 0; i < node.children.length; i++) {
            node.children[i].node.id += randomString(7);
            changeChildrenIds(node.children[i]);
        }
    }
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
        if (link.target.node.id == monosaccharide.id) {
            return sugar.getEdge(link.source.node, link.target.node);
        }
    }
}


/**
 * Tells if there is already a node at a given position x, y and returns its id if so
 * @param x, y
 */
function isAvailible(x, y)
{
    for (var shape in shapes)
    {
        if (shapes[shape][0] == x && shapes[shape][1] == y)
            return shape;
    }
    return "";
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
                var source = shapes[n.node.id];
                sourceX = source[0];
                sourceY = source[1];
            }
        }

        // Modifications we have to do on the obtained value
        var modificationsXY = XYvalues[anomerCarbon];
        var newX = sourceX  + modificationsXY[1]; // Apply the modification on x
        var newY = sourceY + modificationsXY[0]; // Apply the modification on y

        var availible = isAvailible(newX, newY);
        if (availible != "")
        {
            var newPos = findNewSpot(newX,newY, link.linkedCarbon.value, availible);
            newX = newPos[0];
            newY = newPos[1];
        }

        return [newX, newY]; // Return the obtained coordinates

    } else { // If the node is the root, just add 150 to the x and 900 to y to display it on the right of the svg
        return [origin[0], origin[1]];
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

/**
 * Returns a new availible position for a shape to be at.
 * @param x, y, linkedCarbon
 */
function findNewSpot(x, y, linked, occupyingNode)
{
    switch(linked) {
        case 1: // Right
            y = shapes[clickedNode.id][1];
            var limit = y;
            for (var id in shapes)
            {
                if (shapes[id][1] <= limit)
                {
                    moveShape(id, 0, -1*gap);
                }
            }
            break;
        case 2: // Down
            x = shapes[clickedNode.id][0];
            var limit = x;
            for (var id in shapes)
            {
                if (shapes[id][0] <= limit) // if the shape is higher or same Y as clickedNode
                {
                    moveShape(id, -1*gap, 0);
                }
            }
            break;
        case 3:
            x += gap;
            while (isAvailible(x, y) != "")
                x += gap;
            break;
        case 4: // Left
            y = shapes[clickedNode.id][1];
            var limit = y;
            for (var id in shapes)
            {
                if (shapes[id][1] >= limit)
                {
                    moveShape(id, 0, gap);
                }
            }
            break;
        case 5: // Left
            y = shapes[clickedNode.id][1];
            var limit = y;
            for (var id in shapes)
            {
                if (shapes[id][1] >= limit)
                {
                    moveShape(id, 0, gap);
                }
            }
            break;
        case 6:
            x -= gap;
            while (isAvailible(x, y) != "")
                x -= gap;
            break;
        case "undefined": // Up
            x = shapes[clickedNode.id][0];
            var limit = x;
            for (var id in shapes)
            {
                if (shapes[id][0] >= limit) // if the shape is higher or same Y as clickedNode
                {
                    moveShape(id, gap, 0);
                }
            }
            break;
    }
    return [x, y];
}


/**
 * Finds a spot where a substituant Label is readable (i.e no link going through it)
 * @param x, y : Coordinates of the source
 * @param label: label, to calculate offset to node
 */
function findSubstituantLabelSpot(x, y, label)
{
    var labelSize = label.length;
    if (isAvailible(x+gap, y) != "")
    {
        if (isAvailible(x, y+gap) != "")
        {
            if (isAvailible(x-gap, y) != "")
            {
                if (isAvailible(x, y-gap) != "")
                {
                    return [x-18, y+18];
                }
                else
                    return [x-7, y-18];
            }
            else
                return [x-24, y];
        }
        else
        {
            return [x-7, y - 0.5 * labelSize * labelSize + 8 * labelSize + 20];
        }

    }
    else
        return [x+16, y];
}

/**
 * Moves a node
 * @param id, addX, addY
 */
function moveShape(id, addX, addY)
{
    shapes[id][0] += addX;
    shapes[id][1] += addY;
}


