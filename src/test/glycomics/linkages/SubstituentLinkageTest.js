/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import SubstituentLinkage from "../../../js/glycomics/linkages/SubstituentLinkage";
import LinkedCarbon from "../../../js/glycomics/dictionary/LinkedCarbon";

QUnit.module("Test SubstituentLinkage object", {
});

QUnit.test( "Create new substituents linakge" , function( assert ) {

    var edge = new SubstituentLinkage('test','source1','target1',LinkedCarbon.ONE);

    assert.ok(edge.getLinkedCarbon() === LinkedCarbon.ONE,"Correct number of paths are returned");
    assert.ok(edge.getLinkedCarbon().value === 1,"Correct number of paths are returned");
    assert.notOk(edge.getLinkedCarbon().value === LinkedCarbon.SIX,"Uncorrect value ok");
    assert.notOk(edge.getLinkedCarbon().value === 3,"Uncorrect value ok");

    var edge2 = new SubstituentLinkage('test','source1','target1',LinkedCarbon.UNDEFINED);
    assert.ok(edge2.getLinkedCarbon() === LinkedCarbon.UNDEFINED,"Correct number of paths are returned");
    assert.ok(edge2.getLinkedCarbon().value === 'undefined',"Correct number of paths are returned");
    assert.notOk(edge2.getLinkedCarbon().value === 3,"Uncorrect value ok");
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
