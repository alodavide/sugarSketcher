/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import Edge from "../../js/dataStructure/GraphEdge";
import Node from "../../js/dataStructure/GraphNode";

QUnit.module("Test Edge object", {});

QUnit.test( "Create new Edge" , function( assert ) {

    var source = new Node('source');
    var target = new Node('target');
    var edge = new Edge('test', source, target);

    assert.ok(edge.getEdgeId() === 'test',"Correct id");
    assert.ok(edge.getEdgeSource() === source,"Correct source");
    assert.ok(edge.getEdgeTarget() === target,"Correct target");

    assert.notOk(edge.getEdgeId() === 'id',"Wrong id");
    assert.notOk(edge.getEdgeSource() === 's',"Wrong source");
    assert.notOk(edge.getEdgeTarget() === 't',"Wrong target");

});

QUnit.test( "Create new wrong edge - Missing parameter" , function(assert) {
    assert.raises(function(){
        new Edge();
    });

    assert.raises(function(){
        new Edge('test','target1');
    });

    assert.raises(function(){
        new Edge('test','target1');
    });

    assert.raises(function(){
        new Edge('test');
    });

});


