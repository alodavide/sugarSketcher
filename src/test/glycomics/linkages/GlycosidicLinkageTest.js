/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import GlycosidicLinkage from "../../../js/models/glycomics/linkages/GlycosidicLinkage";
import AcceptorPosition from "../../../js/models/glycomics/dictionary/AcceptorPosition";
import DonorPosition from "../../../js/models/glycomics/dictionary/DonorPosition";
import Node from "../../../js/models/dataStructure/GraphNode";

QUnit.module("Test GlycosidicLinkage object", {
});

QUnit.test( "Create new glycosidic linkage" , function( assert ) {

    var source = new Node('source');
    var target = new Node('target');

    var edge = new GlycosidicLinkage('test',source,target,AcceptorPosition.ONE,DonorPosition.TWO);
    assert.ok(edge.acceptorPosition === AcceptorPosition.ONE,"Correct AcceptorPosition");
    assert.ok(edge.donorPosition === DonorPosition.TWO,"Correct DonorPosition");
    assert.ok(edge.acceptorPosition.value === 1,"Correct value");
    assert.ok(edge.donorPosition.value === 2,"Correct value");
    assert.notOk(edge.donorPosition.value === 3,"Uncorrect value ok");
    assert.notOk(edge.acceptorPosition.value === 5,"Uncorrect value ok");

    var edge2 = new GlycosidicLinkage('test',source,target,AcceptorPosition.ONE,DonorPosition.TWO);
    assert.ok(edge2.acceptorPosition === AcceptorPosition.ONE,"Correct AcceptorPosition");
    assert.ok(edge2.donorPosition === DonorPosition.TWO,"Correct DonorPosition");
    assert.ok(edge2.acceptorPosition.value === 1,"Correct value");
    assert.ok(edge2.donorPosition.value === 2,"Correct value");
    assert.notOk(edge2.donorPosition.value === 3,"Uncorrect value ok");
    assert.notOk(edge2.acceptorPosition.value === 5,"Uncorrect value ok");

    edge2.acceptorPosition = AcceptorPosition.THREE;
    edge2.donorPosition = DonorPosition.FOUR;

    assert.ok(edge2.acceptorPosition === AcceptorPosition.THREE,"Correct AcceptorPosition");
    assert.ok(edge2.donorPosition === DonorPosition.FOUR,"Correct DonorPosition");
    assert.ok(edge2.acceptorPosition.value === 3,"Correct value");
    assert.ok(edge2.donorPosition.value === 4,"Correct value");
    assert.notOk(edge2.donorPosition === DonorPosition.ONE,"Uncorrect value ok");
    assert.notOk(edge2.acceptorPosition === AcceptorPosition.ONE,"Uncorrect value ok");
    assert.notOk(edge2.donorPosition.value === 3,"Uncorrect value ok");
    assert.notOk(edge2.acceptorPosition.value === 5,"Uncorrect value ok");

    var edgeUndefined = new GlycosidicLinkage('test',source,target);
    assert.ok(edgeUndefined.acceptorPosition === AcceptorPosition.UNDEFINED,"Correct AcceptorPosition");
    assert.ok(edgeUndefined.donorPosition === DonorPosition.UNDEFINED,"Correct DonorPosition");
    assert.ok(edgeUndefined.acceptorPosition.value === 'undefined',"Correct value");
    assert.ok(edgeUndefined.donorPosition.value === 'undefined',"Correct value");
    assert.notOk(edgeUndefined.donorPosition.value === 3,"Uncorrect value ok");
    assert.notOk(edgeUndefined.acceptorPosition.value === 5,"Uncorrect value ok");

    edgeUndefined.acceptorPosition = AcceptorPosition.TWO;
    edgeUndefined.donorPosition = DonorPosition.SIX;

    assert.ok(edgeUndefined.acceptorPosition === AcceptorPosition.TWO,"Correct AcceptorPosition");
    assert.ok(edgeUndefined.donorPosition === DonorPosition.SIX,"Correct DonorPosition");
    assert.ok(edgeUndefined.acceptorPosition.value === 2,"Correct value");
    assert.ok(edgeUndefined.donorPosition.value === 6,"Correct value");
    assert.notOk(edgeUndefined.donorPosition.value === 1,"Uncorrect value ok");
    assert.notOk(edgeUndefined.acceptorPosition.value === 5,"Uncorrect value ok");
    assert.notOk(edgeUndefined.acceptorPosition === AcceptorPosition.THREE,"Correct AcceptorPosition");
    assert.notOk(edgeUndefined.donorPosition === DonorPosition.ONE,"Correct DonorPosition");
});

QUnit.test( "Create new glycosidic linkage Error Linakge" , function(assert) {
    var source = new Node('source');
    var target = new Node('target');

    assert.raises(function(){
        new GlycosidicLinkage('test',source,target,8,1);
    });

    assert.raises(function(){
        new GlycosidicLinkage('test',source,target,1,7);
    });

    assert.raises(function(){
        new GlycosidicLinkage('test',source,target,'error',1);
    });

    assert.raises(function(){
        new GlycosidicLinkage('test',source,target,1,'error');
    });


    assert.raises(function(){
        var g = new GlycosidicLinkage('test',source,target);
        g.acceptorPosition = 'set';
    });


    assert.raises(function(){
        var g = new GlycosidicLinkage('test','source1','target1');
        g.donorPosition = 'set';
    });
});


