/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import GlycosidicLinkages from "../../../js/glycomics/linkages/GlycosidicLinkage";
import AnomerCarbon from "../../../js/glycomics/dictionary/AnomerCarbon";
import LinkedCarbon from "../../../js/glycomics/dictionary/LinkedCarbon";

QUnit.module("Test GlycosidicLinkage object", {
});

QUnit.test( "Create new glycosidic linakge" , function( assert ) {

    var edge = new GlycosidicLinkages('test','source1','target1',AnomerCarbon.ONE,LinkedCarbon.TWO);
    assert.ok(edge.getAnomerCarbon() === AnomerCarbon.ONE,"Correct AnomerCarbon");
    assert.ok(edge.getLinkedCarbon() === LinkedCarbon.TWO,"Correct LinkedCarbon");
    assert.ok(edge.getAnomerCarbon().value === 1,"Correct value");
    assert.ok(edge.getLinkedCarbon().value === 2,"Correct value");
    assert.notOk(edge.getLinkedCarbon().value === 3,"Uncorrect value ok");
    assert.notOk(edge.getAnomerCarbon().value === 5,"Uncorrect value ok");

    var edgeUndefined = new GlycosidicLinkages('test','source1','target1');
});

QUnit.test( "Create new glycosidic linkage Error Linakge" , function(assert) {
    assert.raises(function(){
        new GlycosidicLinkages('test','source1','target1',8,1);
    });

    assert.raises(function(){
        new GlycosidicLinkages('test','source1','target1',1,7);
    });

    assert.raises(function(){
        new GlycosidicLinkages('test','source1','target1','error',1);
    });

    assert.raises(function(){
        new GlycosidicLinkages('test','source1','target1',1,'error');
    });
});


