var treeData = {};
var shapes = {};
var clickedNode = null;
var selectedNodes = [];
var copiedNode = null;

var rootDonorPosition, rootAcceptorPosition;

const gap = 50; // Distance between two nodes
const origin = [200, 600];
const circleRadius = 15; // Radius of a circle shape

var ctrl; // Boolean if ctrl is held
var quickMode; // Boolean if Quick Mode button is toggled on
var exporting; // Boolean to know if we are exporting the SVG of the glycan (to remove the selection from the final image)

// Directions where every node should be regarding its parent and its donorPosition
var XYvalues = {1: [gap, 0], 2: [0, gap], 3: [-1*gap, gap], 4: [-1*gap, 0], 5: [-1*gap, 0], 6: [-1*gap, -1*gap], 7: [0,-1*gap], 8: [0,-1*gap], 9: [0,-1*gap], 'undefined': [0,-1*gap]};
// Values for links labels X and Y
var XYlinkLabels = {1: [4, 0], 2: [-3,14], 3: [0, 10], 4: [4, 0], 5: [0,0], 6: [-10,13], 7: [0,14], 8: [0,14], 9: [0,14], 'undefined': [0,14]};

/**
 * Update clickedNode on click on a node
 * @param d The event of the click
 */
var clickCircle = function(d) {

    if (!ctrl)
    {
        clickedNode = d.node; // Update clickedNode
        selectedNodes = [];
    }
    else
    {

        if (d.node != clickedNode)
        {
            selectAllNodesBetween(clickedNode,d.node);
        }
        else
        {
            selectedNodes = [];
        }
    }
    displayTree(); // Update view to show the selection stroke
};


// Get an array of all Repeating Units
var generateRepeatingUnits = function(nodes)
{
    var output = [];
    for (var node of nodes)
    {
        if (node.node.repeatingUnit != undefined) // the node is in a repeating unit
        {
            if (output.includes(node.node.repeatingUnit))
            {
                for (var repUnit of output)
                {
                    if (repUnit == node.node.repeatingUnit)
                    {
                        if (!repUnit.nodes.includes(node))
                        {
                            repUnit.nodes.push(node);
                        }
                    }
                }
            }
            else
            {
                output.push(node.node.repeatingUnit);
            }
        }
    }
    return output;
};

// Used to select from one node to another
var selectAllNodesBetween = function(node1, node2)
{
    var root = findNodeInTree(treeData,node1);
    var node = findNodeInTree(treeData,node2);
    if (root.depth < node.depth)
    {
        selectAllChildrenBetween(node2,node1, root.depth);
    }
    else
    {
        selectedNodes = [];
        selectAllParentsBetween(node1, node2);
    }
};

var selectAllParentsBetween = function(node1, node2) {
    var selectParents = [];
    var root = findNodeInTree(treeData,node1);
    var currentNode = root;
    if (node1 != clickedNode && !selectedNodes.includes(node1) && !selectParents.includes(node1))
        selectParents.push(node1);
    while (currentNode.parent != undefined)
    {
        if (currentNode.parent.node != clickedNode && !selectedNodes.includes(currentNode.parent.node) && !selectParents.includes(currentNode.parent.node))
            selectParents.push(currentNode.parent.node);
        if (currentNode.parent.node == node2)
        {
            selectedNodes = selectedNodes.concat(selectParents);
            return;
        }
        currentNode = currentNode.parent;
    }
};

var selectAllChildrenBetween = function(node1, node2, rootDepth) {
    if (selectedNodes.length == 0 || rootDepth > findNodeInTree(treeData,selectedNodes[0]).depth)
    {
        selectedNodes = [];
    }
    selectAllParentsBetween(node1,node2);
    removeChildrenFromSelection(node1);
};



function findNodeInTree(tree,node1)
{
    var stack = [], node, i;
    stack.push(tree);

    while (stack.length > 0) {
        node = stack.pop();
        if (node.node == node1) {
            return node;
        } else if (node.children != undefined) {
            for (i = 0; i < node.children.length; i += 1) {
                stack.push(node.children[i]);
            }
        }
    }
    return null;
}


// Unselect a node's children (used when we already have a selection, and we make a new smaller selection over it)
function removeChildrenFromSelection(node)
{
    var node = findNodeInTree(treeData,node);
    if (node.children != undefined)
    {
        for (var child of node.children)
        {
            if (selectedNodes.includes(child.node))
            {
                selectedNodes.splice(getSelectedNodeIndex(child.node),1);
            }
            removeChildrenFromSelection(child.node);
        }
    }
}

function getSelectedNodeIndex(node)
{
    for (var i in selectedNodes)
    {
        if (selectedNodes[i].id == node.id)
        {
            return i;
        }
    }
    return -1;
}


var zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", zoom);

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

var tree = d3.layout.tree().size([150,150]); // Create the tree layout

/**
 * Display the tree with new data
 */
function displayTree() {
    var treeSvg = d3.select("#svgTree"); // Get the svgTree
    treeSvg.selectAll('.node').remove(); // Remove all the nodes
    treeSvg.selectAll('.nodelink').remove(); // Remove all the links
    treeSvg.selectAll('.linkLabel').remove(); // Remove all link labelsot
    treeSvg.selectAll('.rep').remove(); // Remove all the brackets
    treeSvg.selectAll('.repLabel').remove(); // Remove all the Repeating labels
    treeSvg.selectAll('#rootAttach').remove(); // Remove the root attach


    if (glycan.rootIsSet()) {
        var nodes = tree.nodes(treeData); // Tree nodes
        var links = tree.links(nodes); // Tree links


        // RENDERING ALL THE SHAPES, LINKS, REPEATING UNITS ETC.
        // Do not use CSS to change their properties (svg export won't work properly anymore)


        vis.selectAll(".nodelink")
            .data(links)
            .enter().append("line") // Append a new line for each link
            .attr("class", "nodelink")
            .style("fill","none")
            .style("stroke-width", "3px")
            .style("cursor", "default")
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
            .style("stroke", function (d) {
                if (!exporting)
                {
                    var allSelectedNodes = [clickedNode].concat(selectedNodes);
                    if (allSelectedNodes.includes(d.target.node) && allSelectedNodes.includes(d.source.node)) {
                        return "#58ACFA";
                    }
                    else
                        return "#000";
                }
                return "#000";
            })
            .style("stroke-dasharray", function(d) {
                if (d.target.node.anomericity && d.target.node.anomericity.name == "ALPHA")
                    return "5.5";
            })
            .attr('pointer-events', 'none');


        var linkLabel = vis.selectAll(".linkLabel"); // Link labels
        displayLabels(linkLabel, links, true); // First display anomericity
        displayLabels(linkLabel, links, false); // Then linkages (to change font-family)


        // Create nodes
        var node = vis.selectAll("g.node")
            .data(nodes)
            .enter().append("g")
            .style("visibility", function (d) {
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
                if (selectedNodes.length == 0) {
                    d3.select("#svgMenu").style("display", "block");
                }
                else // display Multiselection Menu
                {
                    d3.select("#svgMultiselectMenu").style("display", "block");
                }
                fadeOutContextMenu();
                updateMenu();
                d3.select("#svgInfos").style("display", "none");
                d3.select("#svgSubstituents").style("display", "none");
                d3.select("#svgShape").style("display", "none");
                d3.select("#svgMultiselectMenu").style("display", "none");
                d3.select("#svgCarbons").style("display", "none");
            })
            .on("contextmenu", function (d) {
                if (ctrl || ![clickedNode].concat(selectedNodes).includes(d.node))
                    clickCircle(d);
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
                    if (selectedNodes.length != 0) {
                        var wholeSelection = [clickedNode].concat(selectedNodes);
                        for (var n of wholeSelection) {
                            var parent = getNodeParent(n);
                            if (parent == undefined || !wholeSelection.includes(parent)) // highest node in selection
                            {
                                selectedNodes = [];
                                deleteNode(n);

                            }
                        }
                    }
                    else {
                        deleteNode(node); // Delete the node clicked
                    }
                    fadeOutContextMenu();
                });

                var yPos = 0;

                $('#deleteNode').css({'top': mouseY - yModification + yPos, 'left': mouseX - 110}).fadeIn(400); // Display the copy option
                yPos += 22;
                $('#copyNode').css({'top': mouseY - yModification + yPos, 'left': mouseX - 110}).fadeIn(400); // Display the copy option
                yPos += 22;

                d3.select("#copyNode").on('click', function () { // Click on copy option
                    copiedNode = node; // Copy the node clicked
                    fadeOutContextMenu();
                });
                if (copiedNode != null) { // If there is a copied node
                    $('#pasteNode').css({'top': mouseY - yModification + yPos, 'left': mouseX - 110}).fadeIn(400); // Display the paste option
                    d3.select("#pasteNode").on('click', function () { // On click on paste option
                        pasteNewNode(node);
                        fadeOutContextMenu();
                    });
                    yPos += 22;
                }
                if (clickedNodeHasSubs()) {
                    $('#deleteSubs').css({'top': mouseY - yModification + yPos, 'left': mouseX - 110}).fadeIn(400); // Display the paste option
                    d3.select("#deleteSubs").on('click', function () { // On click on paste option
                        deleteSubs(node);
                        fadeOutContextMenu();
                    });
                    yPos += 22;
                }


                if (clickedNode.repeatingUnit == undefined) {
                    $('#repeat').css({'top': mouseY - yModification + yPos, 'left': mouseX - 110}).fadeIn(400); // Display the paste option
                    $('#unrepeat').fadeOut(0);
                    d3.select("#repeat").on('click', function () { // On click on paste option
                        handleRepetition();
                        fadeOutContextMenu();
                    });
                    yPos += 22;
                }
                else {
                    $('#unrepeat').css({'top': mouseY - yModification + yPos, 'left': mouseX - 110}).fadeIn(400); // Display the paste option
                    $('#repeat').fadeOut(0);
                    d3.select("#unrepeat").on('click', function () { // On click on paste option
                        for (var node of clickedNode.repeatingUnit.nodes) {
                            delete node.node.repeatingUnit;
                        }
                        displayTree();
                        fadeOutContextMenu();
                    });
                    yPos += 22;
                }


            });

        // Root attach point ~
        node.append("path").style("visibility", function (d) {
            if (d.parent == undefined)
                return "visible";
            else
                return "hidden";
        })
            .attr("fill", "none")
            .attr("id", "rootAttach")
            .attr("width", function (d) {
                return 50;
            })
            .attr("height", 50).attr("stroke", "black")
            .attr("d", "M50,20 Q61,10 50,0 T50,-20" +
                "       M50,0 L-6,0");


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
            .style('stroke', function (d) {
                if (!exporting)
                {
                    if (d.node == clickedNode) {
                        if (selectedNodes.length != 0) {
                            return "#58ACFA";
                        }
                        else if (d.node.monosaccharideType.name.toLowerCase().substring(0, 3) == "fuc" || d.node.monosaccharideType.name.toLowerCase().substring(0, 3) == "sia") {
                            return "black";
                        }
                        else {
                            return "red";
                        }
                    }
                    else if (selectedNodes.includes(d.node)) {
                        return "#58ACFA";
                    }
                    else {
                        return "black";
                    }
                }
                else
                {
                    return "black";
                }
            })
            .style('stroke-width', function (d) {
                if (!exporting)
                {
                    if (d.node == clickedNode) {
                        if (selectedNodes.length != 0) {
                            return "6px";
                        }
                        return "4px";
                    }
                    if (selectedNodes.includes(d.node)) {
                        return "4px";
                    }
                    return "1px";
                }
                return "1px";
            })
            .on('click', clickCircle); // Select the node on click





        var repeatingUnits = generateRepeatingUnits(nodes);

        // Repeating Units
        var rep = vis.selectAll("g.rep")
            .data(repeatingUnits)
            .enter();

        rep.append("path")
            .attr("class", "rep")
            .attr("height", function (d) {
                var repInfo = getRepCoord(d);
                return (repInfo[1] - repInfo[0]) + "px";
            })
            .attr("width", "10px")
            .attr("x", function (d) {
                return getRepCoord(d)[0];
            })
            .attr("y", function (d) {
                return getRepCoord(d)[2];
            })
            .attr("transform", function (d) {
                var repInfo = getRepCoord(d);
                return "translate(" + repInfo[2] + "," + repInfo[0] + ")";
            })
            .attr("d", function (d) {
                var repInfo = getRepCoord(d);
                return "M 10 0 L 0 0 L 0 " + (repInfo[1] - repInfo[0]) + " L 10 " + (repInfo[1] - repInfo[0])
                    + "M " + (repInfo[3] - repInfo[2]) + " 0 L " + ((repInfo[3] - repInfo[2]) + 10) + " 0 L " +
                    ((repInfo[3] - repInfo[2]) + 10) + " " + (repInfo[1] - repInfo[0]) + " L " +
                    (repInfo[3] - repInfo[2]) + " " + (repInfo[1] - repInfo[0]);
            })
            .attr("fill", "none")
            .attr("stroke", "gray")
            .attr("stroke-width", "1px");

        // Display numbers of repeats
        rep.append("text")
            .attr("class", "repLabel")
            .attr("x", function (d) {
                return getRepCoord(d)[2];
            })
            .attr("y", function (d) {
                return getRepCoord(d)[1] + 15;
            })
            .style("stroke", "gray")
            .style("font-family", "Lato light")
            .text(function (d) {
                return d.min;
            });

        rep.append("text")
            .attr("class", "repLabel")
            .attr("x", function (d) {
                return getRepCoord(d)[2];
            })
            .attr("y", function (d) {
                return getRepCoord(d)[0] - 5;
            })
            .style("stroke", "gray")
            .style("font-family", "Lato light")
            .text(function (d) {
                return d.max;
            });

    }
}

/**
 * Called once to display the donorPosition and acceptorPosition of the link,
 * Then once more to display the anomericity (with a different font-family)
 * A Monospace font is used so that no matter what the two labels contain,
 * they won't overlap each other
 * @param linkLabel
 * @param links
 * @param anom
 */
function displayLabels(linkLabel, links, anom)
{
    var root = {"node":{"id":"root"}};
    var rootLink = {"source":root,"target":treeData};
    links.push(rootLink);
    linkLabel.data(links)
    .enter().append("text")
        .attr("class", "linkLabel")
        .style("fill", function(d) {
            if (!exporting)
            {
                var allSelectedNodes = [clickedNode].concat(selectedNodes);
                if (d.target.node instanceof sb.Substituent && d.source.node == clickedNode && selectedNodes.length == 0)
                {
                    return "red";
                }
                if ((d.target.node instanceof sb.Substituent && allSelectedNodes.includes(d.source.node)) || // If it's a sub and its parent is selected
                    (allSelectedNodes.includes(d.target.node) && allSelectedNodes.includes(d.source.node))) { // or both are monosaccharides are selected
                    return "#58ACFA";
                }
                else if (anom)
                {
                    return "#4b4b4b";
                }
                return "black";
            }
            return "black";
        })
        .style("font-family", function(d) {
            if (d.target.node["anomericity"]) // Monosaccharide
            {
                return "Courier New";
            }
            else
            {
                return "Helvetica Neue Light", "HelveticaNeue-Light", "Helvetica Neue";
            }
        })
        .style("font-size", "10px")
        .style("alignment-baseline", "text-before-edge")
        .style("dominant-baseline", "text-before-edge")
        .style("text-anchor", function(d) {
            if (d.target.node["anomericity"]) // Monosaccharide
            {
                return "middle";
            }
            else
            {
                var linked = findLinkForMono(d.target.node).donorPosition.value;
                if (linked == 2 || linked == 3 || linked == 6 || linked == "undefined")
                {
                    return "middle";
                }
                else if (linked == 1)
                {
                    return "left";
                }
                else if (linked == 4 || linked == 5)
                {
                    return "right";
                }
            }
            return "middle";
        })
        .style("font-style", function(d) {
            if (d.target.node["anomericity"]) // Monosaccharide
            {
                if (anom)
                {
                    return "italic";
                }
            }
            return "";
        })
    .attr("x", function (d) {
        var finalX; // Final x of the label
        var source = shapes[d.source.node.id]; // Calculate source coordinates
        if (d.target.node["anomericity"]) // Monosaccharide
        {
            var target = shapes[d.target.node.id]; // Calculate target coordinates
            var usualX = (source[1] + target[1]) / 2; // Get x of the middle of the link
            if (d.source.node.id == "root")
                finalX = usualX+5; // Add value to have a visible display (not on the line)
            else
                finalX = usualX + XYlinkLabels[findLinkForMono(d.target.node).donorPosition.value][1]; // Add value to have a visible display (not on the line)
        }
        else // Substituant
        {
            finalX = findSubstituantLabelSpot(source[0], source[1], findLinkForMono(d.target.node).donorPosition.value)[1];
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
            if (d.source.node.id == "root")
                finalY = usualY + 5; // Add value to have a visible display
            else
                finalY = usualY + XYlinkLabels[findLinkForMono(d.target.node).donorPosition.value][0]; // Add value to have a visible display
        }
        else // Substituant
        {
            finalY = findSubstituantLabelSpot(source[0], source[1], findLinkForMono(d.target.node).donorPosition.value)[0];
        }
        return finalY; // Return the obtained value
    })
    .style("stroke", function (d) {
        if (!exporting)
        {
            var allSelectedNodes = [clickedNode].concat(selectedNodes);
            if (d.target.node instanceof sb.Substituent && d.source.node == clickedNode && selectedNodes.length == 0)
            {
                return "red";
            }
            if ((d.target.node instanceof sb.Substituent && allSelectedNodes.includes(d.source.node)) || // If it's a sub and its parent is selected
                (allSelectedNodes.includes(d.target.node) && allSelectedNodes.includes(d.source.node))) { // or both are monosaccharides are selected
                return "#58ACFA";
            }
            else if (anom)
            {
                return "#4b4b4b";
            }
            return "black";
        }
        return "black";
    })
    .text(function (d) {
        if (d.target.node["anomericity"]) // Monosaccharide
        {
            var link = findLinkForMono(d.target.node); // Get the link to which we want to add a label
            var anomericity; // Anomericity of the target node
            if (!anom)
                anomericity = "\u00A0";
            else
            {
                if (d.target.node.anomericity.name == "ALPHA") {
                    anomericity = "α"
                } else if (d.target.node.anomericity.name == "BETA") {
                    anomericity = "β";
                } else {
                    anomericity = "?\u00A0";
                }
            }
            var acceptorPositionLabel;
            if (anom)
                acceptorPositionLabel = "\u00A0";
            else
            {
                if (d.source.node.id == "root")
                {
                    if (rootAcceptorPosition.value == "undefined") {
                        acceptorPositionLabel = "?";
                    }
                    else {
                        acceptorPositionLabel = rootAcceptorPosition.value;
                    }
                }
                else
                {
                    if (link.acceptorPosition.value == "undefined") {
                        acceptorPositionLabel = "?";
                    }
                    else {
                        acceptorPositionLabel = link.acceptorPosition.value;
                    }
                }
            }

            var donorPositionLabel;
            if (anom)
                donorPositionLabel = "\u00A0";
            else {
                if (d.source.node.id == "root")
                {
                    if (rootDonorPosition.value == 'undefined') {
                        donorPositionLabel = "?";
                    } else {
                        donorPositionLabel = rootDonorPosition.value;
                    }
                }
                else
                {
                    if (link.donorPosition.value == 'undefined') {
                        donorPositionLabel = "?";
                    } else {
                        donorPositionLabel = link.donorPosition.value;
                    }
                }
            }
            var coma;
            if (anom)
                coma = "\u00A0";
            else
                coma = ",";
            return anomericity + acceptorPositionLabel + coma + donorPositionLabel; // Text of the label
        }
        else
        {
            return d.target.node._substituentType.label;
        }
    });
}


// Get the coordinates of the repeating unit's brackets considering the nodes that are inside
function getRepCoord(repeatingUnit)
{
    var output = [];
    var minX = shapes[repeatingUnit.nodes[0].node.id][0];
    for (var node of repeatingUnit.nodes)
    {
        if (shapes[node.node.id][0] < minX)
        {
            minX = shapes[node.node.id][0];
        }
    }
    output.push(minX-gap+3*circleRadius/2);
    var maxX = shapes[repeatingUnit.nodes[0].node.id][0];
    for (var node of repeatingUnit.nodes)
    {
        if (shapes[node.node.id][0] > maxX)
        {
            maxX = shapes[node.node.id][0];
        }
    }
    output.push(maxX+gap-3*circleRadius/2);
    var minY = shapes[repeatingUnit.nodes[0].node.id][1];
    for (var node of repeatingUnit.nodes)
    {
        if (shapes[node.node.id][1] < minY)
        {
            minY = shapes[node.node.id][1];
        }
    }
    output.push(minY-3*circleRadius/2); // 10px is the width of the base of the bracket
    var maxY = shapes[repeatingUnit.nodes[0].node.id][1];
    for (var node of repeatingUnit.nodes)
    {
        if (shapes[node.node.id][1] > maxY)
        {
            maxY = shapes[node.node.id][1];
        }
    }
    output.push(maxY+gap/4); // 10px is the width of the base of the bracket
    return output;
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
        copyOfLinkage = new sb.GlycosidicLinkage(randomString(7), glycan.getNodeById(nodeToAppend.node.id), glycan.getNodeById(foundNodeInTree.node.id), sb.AcceptorPosition.UNDEFINED, sb.DonorPosition.UNDEFINED);
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
    glycan.graph.addEdge(copyOfLinkage); // Add the first edge to the graph
    for (var link of copyOfLinks) { // Add all links to the graph
        glycan.graph.addEdge(link);
    }
    fadeOutContextMenu();

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
            allLinks.push(glycan.getEdge(node.node, node.children[i].node));
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
    glycan.graph.addNode(node.node);
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
 * Finds the edge in the glycan which has the monosaccharide as target
 * @param monosaccharide The monosaccharide which is the target fo the searched link
 * @returns {*}
 */
function findLinkForMono(monosaccharide) {
    var links = glycan.graph.edges(); // Tree links
    for (var link of links) {
        // If the link has the node as target, return the edge from the graph s
        if (link.target == monosaccharide.id) {
            return glycan.getEdge(link.sourceNode, link.targetNode);
        }
    }
    return undefined;
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
        var donorPosition = link.donorPosition.value; // Get linked carbon value
        var sourceX;
        var sourceY;
        var sourceId;

        // Calculate new coordinates for the wanted node
        for (var n of glycan.graph.nodes()) {
            if (n == link.sourceNode) {
                sourceId = n.id;
                var source = shapes[sourceId];
                sourceX = source[0];
                sourceY = source[1];
            }
        }

        // Modifications we have to do on the obtained value
        var modificationsXY = XYvalues[donorPosition];
        var newX = sourceX  + modificationsXY[1]; // Apply the modification on x
        var newY = sourceY + modificationsXY[0]; // Apply the modification on y

        var availible = isAvailible(newX, newY);
        if (availible != "")
        {
            var newPos = findNewSpot(newX,newY, link.donorPosition.value, sourceId);
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
 * @param x, y, donorPosition
 */
function findNewSpot(x, y, linked, sourceId = clickedNode.id)
{
    switch(linked) {
        case 1: // Right
            y = shapes[sourceId][1];
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
            x = shapes[sourceId][0];
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
            y = shapes[sourceId][1];
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
            y = shapes[sourceId][1];
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
            x = shapes[sourceId][0];
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
function findSubstituantLabelSpot(x, y, donorPosition)
{
    var subsXY = {1: [x-7, y+20], 2: [x+16, y], 3: [x+16,y-16], 4: [x-7, y-28], 5: [x+16, y+8], 6: [x-28, y-16], 7: [x-28, y+8], 8: [x-28, y+16], 9: [x+16, y+16], "undefined": [x-28, y]};
    return subsXY[donorPosition];
}

/**
 * Visually moves a node
 * @param id, addX, addY
 */
function moveShape(id, addX, addY)
{
    shapes[id][0] += addX;
    shapes[id][1] += addY;
}

function fadeOutContextMenu()
{
    $('#deleteNode').fadeOut(400); // Hide the delete option
    $('#deleteSubs').fadeOut(400); // Hide the remove subs option
    $('#copyNode').fadeOut(400); // Hide the copy option
    $('#pasteNode').fadeOut(400); // Hide the paste option
    $('#repeat').fadeOut(400); // Hide the repeat option
    $('#unrepeat').fadeOut(400); // Hide the repeat option

    $('#pieLinkCarbon').css("display", "none"); // Hide chart
}

function clickedNodeHasSubs()
{
    var name = clickedNode.monosaccharideType.name;
    if (sb.SubstituentsPositions[name])
        return true;
    for (var edge of glycan.graph.edges())
    {
        if (edge.sourceNode == clickedNode && edge.targetNode instanceof sb.Substituent)
        {
            return true;
        }
    }
    return false;
}