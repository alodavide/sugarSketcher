/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import SubstituentLinkage from "../../../js/models/glycomics/linkages/SubstituentLinkage";
import DonorPosition from "../../../js/models/glycomics/dictionary/DonorPosition";
import Node from "../../../js/models/dataStructure/GraphNode";

QUnit.module("Test SubstituentLinkage object", {
});

QUnit.test( "Create new Substituents linkage" , function( assert ) {

    var source = new Node('source');
    var target = new Node('target');
    
    var edge = new SubstituentLinkage('test',source,target,DonorPosition.ONE);

    assert.ok(edge.donorPosition === DonorPosition.ONE,"Correct DonorPosition");
    assert.ok(edge.donorPosition.value === 1,"Correct DonorPosition Value");
    assert.notOk(edge.donorPosition.value === DonorPosition.SIX,"Uncorrect DonorPosition");
    assert.notOk(edge.donorPosition.value === 3,"Uncorrect DonorPosition value");

    var edge2 = new SubstituentLinkage('test',source,target,DonorPosition.UNDEFINED);
    assert.ok(edge2.donorPosition === DonorPosition.UNDEFINED,"Correct DonorPosition undefined");
    assert.ok(edge2.donorPosition.value === 'undefined',"Correct DonorPosition undefined Value");
    assert.notOk(edge2.donorPosition.value === 3,"Uncorrect value undefined");

    var edge3 = new SubstituentLinkage('test',source,target);
    assert.ok(edge3.donorPosition === DonorPosition.UNDEFINED,"Correct DonorPosition undefined");
    assert.ok(edge3.donorPosition.value === 'undefined',"Correct DonorPosition undefined Value");
    assert.notOk(edge3.donorPosition.value === 3,"Uncorrect value undefined 2");

    var edge4 = new SubstituentLinkage('test',source,target,DonorPosition.ONE);
    assert.ok(edge4.donorPosition === DonorPosition.ONE,"Correct DonorPosition 4");
    assert.ok(edge4.donorPosition.value === 1,"Correct DonorPosition value 4");
    assert.notOk(edge4.donorPosition.value === DonorPosition.SIX,"Uncorrect DonorPosition 4");
    assert.notOk(edge4.donorPosition.value === 3,"Uncorrect DonorPosition value 4");

    edge4.donorPosition = DonorPosition.TWO;
    assert.ok(edge4.donorPosition === DonorPosition.TWO,"Correct DonorPosition after set");
    assert.ok(edge4.donorPosition.value === 2,"Correct DonorPosition value after set");
    assert.notOk(edge4.donorPosition === DonorPosition.ONE,"Uncorrected DonorPosition after set");
    assert.notOk(edge4.donorPosition.value === 1,"Correct DonorPosition value after set");

});

QUnit.test( "Create new Substituent linkage Error Linkage" , function(assert) {
    var source = new Node('source');
    var target = new Node('target');

    assert.raises(function(){
        new SubstituentLinkage('test',source,target,8,1);
    });

    assert.raises(function(){
        new SubstituentLinkage('test',source,target,1,7);
    });

    assert.raises(function(){
        new SubstituentLinkage('test',source,target,'error',1);
    });

    assert.raises(function(){
        new SubstituentLinkage('test',source,target,1,'error');
    });

    assert.raises(function(){
        var s =new SubstituentLinkage('test',source,target);
        s.donorPosition = 'ciao';
    });
});
