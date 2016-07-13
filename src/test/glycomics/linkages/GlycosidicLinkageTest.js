/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import GlycosidicLinkages from "../../../js/glycomics/linkages/GlycosidicLinkage";

QUnit.module("Test GlycosidicLinkage object", {
});

QUnit.test( "Create new glycosidic linakge" , function( assert ) {

    var edge = new GlycosidicLinkages('test','source1','target1',1,2);
    assert.ok(edge.getAnomerCarbon() === 1,"Correct residue is returned");
    assert.ok(edge.getLinkedCarbon() === 2,"Correct number of paths are returned");
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


