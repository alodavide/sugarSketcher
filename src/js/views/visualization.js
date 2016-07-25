/**
 * Created by Nicolas Hory on 25/07/16.
 */

/**
 * Update the treeData, and then call the displayTree function to display it with the new data
 */
function updateTreeVisualization() {
    // If the tree is empty, we just initialize it with the node as a root
    if (Object.keys(treeData).length === 0) {
        treeData = {"node":graph.nodes()[0]};
        console.log("tree initialized");
        console.log(treeData);
    } else {
        console.log("Have to manage all the tree");
        console.log(graph.nodes());
        console.log(graph.edges());
    }
    displayTree();
}