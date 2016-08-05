/**
 * Created by Nicolas Hory on 25/07/16.
 */

var mouseX, mouseY;

$(document).mousemove( function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

/**
 * Update the treeData, and then call the displayTree function to display it with the new data
 */
function updateTreeVisualization(newLink) {
    // If the tree is empty, we just initialize it with the node as a root
    if (typeof newLink === 'undefined') {
        treeData = {"node":sugar.getRootNode(), "children":[]};
    } else {
        searchAndAddNodeInTree(treeData, newLink);
    }
    displayTree();
}

/**
 * Search a node in a tree
 * @param root
 * @param link
 * @returns {*}
 */
function searchAndAddNodeInTree(root, link){
    if(root.node == link.sourceNode){
        if (typeof root.children === 'undefined') root["children"] = [];
        root.children.push({"node":link.targetNode, "children": []});
    }else if (root.children != null){
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
    var monoToUpdate = sugar.getNodeById(clickedNode.id);
    monoToUpdate.anomericity = anomericity;
    monoToUpdate.ringType = ringType;
    monoToUpdate.isomer = isomer;
    var isBisected = (newShape.indexOf("bisected") != -1); // Check if the shape is bisected
    if (isBisected) {
        newShape = newShape.split("bisected")[1]; // We update the value of the shape by removing keywork "bisected"
    }
    var newMonoType = getMonoTypeWithColorAndShape(newColor, newShape, isBisected);
    monoToUpdate.monosaccharideType = newMonoType;
    // TODO maybe update edge too with carbon values
    updateNodeInTree(treeData,monoToUpdate);
}

/**
 * Update a node in the tree, and then display the tree again
 * @param root
 * @param newMonosaccharide
 */
function updateNodeInTree(root, newMonosaccharide) {
    if(root.node.id == newMonosaccharide.id){
        root.node = newMonosaccharide;
    }else if (root.children != null){
        var i;
        var result = null;
        for(i=0; result == null && i < root.children.length; i++){
            updateNodeInTree(root.children[i], newMonosaccharide);
        }
    }
    displayTree();
}