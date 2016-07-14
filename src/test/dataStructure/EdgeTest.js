/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import Edge from "../../js/dataStructure/Edge";

QUnit.module("Test Edge object", {});

QUnit.test( "Create new Edge" , function( assert ) {

    var edge = new Edge('test','source1','target1');
    assert.ok(edge.getEdgeId() === 'test',"Correct id");
    assert.ok(edge.getEdgeSource() === 'source1',"Correct source");
    assert.ok(edge.getEdgeTarget() === 'target1',"Correct target");

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
        new Edge('test');
    });

});


