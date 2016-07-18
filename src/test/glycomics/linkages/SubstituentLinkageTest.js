/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import SubstituentLinkage from "../../../js/glycomics/linkages/SubstituentLinkage";
import LinkedCarbon from "../../../js/glycomics/dictionary/LinkedCarbon";
import Node from "../../../js/dataStructure/Node";

QUnit.module("Test SubstituentLinkage object", {
});

QUnit.test( "Create new Substituents linkage" , function( assert ) {

    var source = new Node('source');
    var target = new Node('target');
    
    var edge = new SubstituentLinkage('test',source,target,LinkedCarbon.ONE);

    assert.ok(edge.linkedCarbon === LinkedCarbon.ONE,"Correct LinkedCarbon");
    assert.ok(edge.linkedCarbon.value === 1,"Correct LinkedCarbon Value");
    assert.notOk(edge.linkedCarbon.value === LinkedCarbon.SIX,"Uncorrect LinkedCarbon");
    assert.notOk(edge.linkedCarbon.value === 3,"Uncorrect LinkedCarbon value");

    var edge2 = new SubstituentLinkage('test',source,target,LinkedCarbon.UNDEFINED);
    assert.ok(edge2.linkedCarbon === LinkedCarbon.UNDEFINED,"Correct LinkedCarbon undefined");
    assert.ok(edge2.linkedCarbon.value === 'undefined',"Correct LinkedCarbon undefined Value");
    assert.notOk(edge2.linkedCarbon.value === 3,"Uncorrect value undefined");

    var edge3 = new SubstituentLinkage('test',source,target);
    assert.ok(edge3.linkedCarbon === LinkedCarbon.UNDEFINED,"Correct LinkedCarbon undefined");
    assert.ok(edge3.linkedCarbon.value === 'undefined',"Correct LinkedCarbon undefined Value");
    assert.notOk(edge3.linkedCarbon.value === 3,"Uncorrect value undefined 2");

    var edge4 = new SubstituentLinkage('test',source,target,LinkedCarbon.ONE);
    assert.ok(edge4.linkedCarbon === LinkedCarbon.ONE,"Correct LinkedCarbon 4");
    assert.ok(edge4.linkedCarbon.value === 1,"Correct LinkedCarbon value 4");
    assert.notOk(edge4.linkedCarbon.value === LinkedCarbon.SIX,"Uncorrect LinkedCarbon 4");
    assert.notOk(edge4.linkedCarbon.value === 3,"Uncorrect LinkedCarbon value 4");

    edge4.linkedCarbon = LinkedCarbon.TWO;
    assert.ok(edge4.linkedCarbon === LinkedCarbon.TWO,"Correct LinkedCarbon after set");
    assert.ok(edge4.linkedCarbon.value === 2,"Correct LinkedCarbon value after set");
    assert.notOk(edge4.linkedCarbon === LinkedCarbon.ONE,"Uncorrected LinkedCarbon after set");
    assert.notOk(edge4.linkedCarbon.value === 1,"Correct LinkedCarbon value after set");

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
        s.linkedCarbon = 'ciao';
    });
});
