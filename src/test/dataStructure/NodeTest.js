/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import Node from "../../js/dataStructure/GraphNode";

QUnit.module("Test Node object", {});

QUnit.test( "Create new Node" , function( assert ) {

    var node = new Node('test');
    assert.ok(node.getId() === 'test',"Correct id");
    assert.notOk(node.getId() === 'id',"Wrong id");
});

QUnit.test( "Create Node - Missing id" , function(assert) {
    assert.raises(function(){
        var n = new Node();
    });

});

