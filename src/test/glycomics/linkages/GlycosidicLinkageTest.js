/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import GlycosidicLinkages from "../../../js/glycomics/linkages/GlycosidicLinkage";

QUnit.module("Test GlycosidicLinkage object", {
});

QUnit.test( "Getting basic paths" , function( assert ) {

    var edge = new GlycosidicLinkages('test','source1','target1',1,2);

    assert.ok(edge.getAnomerCarbon() === 1,"Correct residue is returned");
    assert.ok(edge.getLinkedCarbon() === 2,"Correct number of paths are returned");
});
