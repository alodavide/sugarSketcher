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
        console.log("Before search");
        console.log(treeData);
        searchAndAddNodeInTree(treeData, newLink);
        console.log("After search");
        console.log(treeData);
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