/**
 * Created by Nicolas Hory on 25/07/16.
 */

var mouseX, mouseY; // Vars to stock the mouse position

$(document).mousemove( function(e) { // Event fired on mouse move
    mouseX = e.pageX; // Update mouseX to current value
    mouseY = e.pageY; // Update mouseY to current value
});

/**
 * Update the treeData, and then call the displayTree function to display it with the new data
 */
function updateTreeVisualization(newLink) {
    // If the tree is empty, we just initialize it with the node as a root
    if (typeof newLink === 'undefined') {
        treeData = {"node":sugar.getRootNode(), "children":[]};
    } else { // If tree already has a root, add the node in the tree
        searchAndAddNodeInTree(treeData, newLink);
    }
}

/**
 * Search a node in a tree
 * @param root The root of the tree
 * @param link The link used for new node
 * @returns {*}
 */
function searchAndAddNodeInTree(root, link){
    // If the current node is the source of the link
    if(root.node == link.sourceNode){
        // If the node doesn't have children, add an empty array as children property
        if (typeof root.children === 'undefined') root["children"] = [];
        root.children.push({"node":link.targetNode, "children": []}); // Push the target of the link
    }else if (root.children != null){
        // If the node has children, recursivity on each child to find the source node
        var i;
        var result = null;
        for(i=0; result == null && i < root.children.length; i++){
            searchAndAddNodeInTree(root.children[i], link);
        }
    }
}

/**
 * Update an existing node
 */
function updateExistingNode() {
    var newShape = infosTable[1]; // Selected shape
    var newColor = getColorCodeFromString(infosTable[2]); // Selected color
    var anomericity = getAnomericityWithSelection(infosTable[3]); // Anomericity
    var isomer = getIsomerWithSelection(infosTable[4]); // Isomer
    var ringType = getRingTypeWithSelection(infosTable[5]); // Ring type
    var linkedCarbon = getLinkedCarbonWithSelection(infosTable[6]); // Linked carbon
    var anomerCarbon = getAnomerCarbonWithSelection(infosTable[7]); // Anomer carbon
    var monoToUpdate = sugar.getNodeById(clickedNode.id); // Get the node we want to update in the graph
    monoToUpdate.anomericity = anomericity; // Update anomericity
    monoToUpdate.ringType = ringType; // Update ring type
    monoToUpdate.isomer = isomer; // Update isomer
    var isBisected = (newShape.indexOf("bisected") != -1); // Check if the shape is bisected
    if (isBisected) {
        newShape = newShape.split("bisected")[1]; // We update the value of the shape by removing keywork "bisected"
    }
    var newMonoType = getMonoTypeWithColorAndShape(newColor, newShape, isBisected); // Find new monosaccharide type
    monoToUpdate.monosaccharideType = newMonoType; // Update monosaccharide type
    if (monoToUpdate == treeData.node)
    {
        rootLinkedCarbon = linkedCarbon;
        rootAnomerCarbon = anomerCarbon;
    }
    else
    {
        var linkToUpdate = findLinkForMono(monoToUpdate); // Get the link to update (if exists)
        var prevLinkedCarbon = linkToUpdate.linkedCarbon.value;
        if (linkToUpdate != null) {
            linkToUpdate.linkedCarbon = linkedCarbon; // Update linked carbon
            linkToUpdate.anomerCarbon = anomerCarbon; // Update anomer carbon
        }
        moveNodeAndChildren(findNodeInTree(treeData,monoToUpdate),XYvalues[linkedCarbon.value][1] - XYvalues[prevLinkedCarbon][1], XYvalues[linkedCarbon.value][0] - XYvalues[prevLinkedCarbon][0])
    }
    updateNodeInTree(treeData,monoToUpdate); // Update the node in the tree
}

/**
 * Update a node in the tree, and then display the tree again
 * @param root The root of the tree
 * @param newMonosaccharide The updated monosaccharide
 */
function updateNodeInTree(root, newMonosaccharide) {
    // Compare id's, and update if found the node to update
    if(root.node.id == newMonosaccharide.id){
        root.node = newMonosaccharide;
    } else if (root.children != null){
        // If has children, recursivity on each child to find the node to uodate
        var i;
        var result = null;
        for(i=0; result == null && i < root.children.length; i++){
            updateNodeInTree(root.children[i], newMonosaccharide);
        }
    }
    displayTree(); // Display the tree after the update
}

/**
 * Search and remove a node from the tree
 * @param root The node from which we search in the tree
 * @param node The node we are searching
 */
function searchAndRemoveNodeInTree(root, node) {
    if(root.children != null) { // If the root has children
        for (var i = 0; i < root.children.length; i++) { // Loop on children
            if (root.children[i].node == node) { // If one child corresponds, remove it
                var removed = node;
                root.children.splice(i, 1);
                return removed;
            } else {
                searchAndRemoveNodeInTree(root.children[i], node); // Recursivity call on children
            }
        }
    }
}