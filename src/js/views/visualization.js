/**
 * Created by Nicolas Hory on 25/07/16.
 */

/**
 * Update the treeData, and then call the displayTree function to display it with the new data
 */
function updateTreeVisualization(newLink) {
    // If the tree is empty, we just initialize it with the node as a root
    if (typeof newLink === 'undefined') {
        treeData = {"node":graph.nodes()[0], "children":[]};
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
        console.log("found");
        console.log(root);
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