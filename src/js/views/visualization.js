/**
 * Created by Nicolas Hory on 25/07/16.
 */

/**
 * Update the treeData, and then call the displayTree function to display it with the new data
 */
function updateTreeVisualization() {
    console.log("in the update tree");
    console.log(treeData);
    // If the tree is empty, we just initialize it with the node as a root
    if (Object.keys(treeData).length === 0) {
        treeData = {"node": graph.nodes()[0].node};
        console.log("tree initialized");
        console.log(treeData);
    }
    displayTree();
}