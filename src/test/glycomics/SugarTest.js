/**
* Author:  Davide Alocci
* Version: 0.0.1
*/

import Monosaccharide from '../../js/glycomics/nodes/Monosaccharide';
import Anomericity from '../../js/glycomics/dictionary/Anomericity';
import Isomer from '../../js/glycomics/dictionary/Isomer';
import RingType from '../../js/glycomics/dictionary/RingType';
import MonosaccharideType from '../../js/glycomics/dictionary/MonosaccharideType';
import Sugar from '../../js/glycomics/Sugar';
import AnomerCarbon from '../../js/glycomics/dictionary/AnomerCarbon';
import LinkedCarbon from '../../js/glycomics/dictionary/LinkedCarbon';

QUnit.module("Test Sugar object", {
});

QUnit.test( "Test Set root" , function( assert ) {

    var sugar = new Sugar('ciao');
    assert.ok(sugar.rootIsSet() === false, 'Root not set check');

    var root = new Monosaccharide('root',MonosaccharideType.Glc,Anomericity.BETA,Isomer.D,RingType.P);
    sugar.setRootNode(root);
    assert.ok(sugar.size() === 1, '');
    assert.ok(sugar.rootIsSet() === true, 'Root not set check');
    assert.ok(sugar.getRootNode() === root, 'Check root object');
});

QUnit.test( "Test Clear" , function( assert ) {
    var sugar = new Sugar('sugar');
    assert.ok(sugar.rootIsSet() === false, 'Root not set check');

    var root = new Monosaccharide('root',MonosaccharideType.Glc,Anomericity.BETA,Isomer.D,RingType.P);
    sugar.setRootNode(root);
    assert.ok(sugar.size() === 1, '');
    assert.ok(sugar.rootIsSet() === true, 'Root not set check');
    assert.ok(sugar.getRootNode() === root, 'Check root object');

    sugar.clear();

    assert.ok(sugar.size() === 0, 'Size 0');
    assert.ok(sugar.rootIsSet() === false, 'Root not set check');
    assert.ok(typeof sugar.getRootNode() == 'undefined', 'Check root object');
});

QUnit.test( "Test Set Root 2" , function( assert ) {
    var root = new Monosaccharide('root',MonosaccharideType.Glc,Anomericity.BETA,Isomer.D,RingType.P);
    var root2 = new Monosaccharide('root',MonosaccharideType.Gal,Anomericity.ALPHA,Isomer.L,RingType.P);
    var sugar = new Sugar('sugar', root);
    assert.ok(sugar.rootIsSet() === true, 'Root not set check');
    assert.ok(sugar.size() === 1, '');
    assert.ok(sugar.getRootNode() === root, 'Check root object');

    //Throw exception.
    assert.raises(function(){
        sugar.setRootNode(rootTwo);
    });

    assert.ok(sugar.size() === 1, '');
    assert.ok(sugar.rootIsSet() === true, 'Root not set check');
    assert.notOk(sugar.getRootNode() === root2, 'Check root object');

    sugar.getRootNode().monosaccharideType = MonosaccharideType.Gal;
    sugar.getRootNode().anomericity = Anomericity.ALPHA;
    sugar.getRootNode().isomer = Isomer.L;
    assert.notOk(sugar.getRootNode() === root2, 'Check root object');

    sugar.clear();

    assert.ok(sugar.size() === 0, 'Size 0');
    assert.ok(sugar.rootIsSet() === false, 'Root not set check');
    assert.ok(typeof sugar.getRootNode() == 'undefined', 'Check root object');
});


QUnit.test( "Test Empty constructor and Get id" , function( assert ) {


    //Throw exception. id is needed
    assert.raises(function(){
        new Sugar();
    });


    var sugar = new Sugar('test');
    assert.notOk(sugar.getSugarId() === 'test313121', 'Test get id wrong');
    assert.ok(sugar.getSugarId() === 'test', 'Test get id correct');
});


QUnit.test( "Test Add and get id" , function( assert ) {

    var root = new Monosaccharide('root',MonosaccharideType.Glc,Anomericity.BETA,Isomer.D,RingType.P);
    var m1 = new Monosaccharide('m1',MonosaccharideType.Gal,Anomericity.ALPHA,Isomer.L,RingType.P);
    var sugar = new Sugar('test',root);
    sugar.addMonosaccharideWithLinkage(root,m1,AnomerCarbon.ONE,LinkedCarbon.SIX);

    var m2 = new Monosaccharide('m1');
    //Throw exception. Same id
    assert.raises(function(){
        sugar.addMonosaccharideWithLinkage(root,m2,AnomerCarbon.ONE,LinkedCarbon.SIX);
    });

    assert.notOk(sugar.size() === 24, 'Test size');

    assert.ok(sugar.size() === 2, 'Test get id correct');
    assert.ok(sugar.getMonosaccharideById('m1') instanceof Monosaccharide, 'Test get Node correct');
    assert.ok(sugar.getMonosaccharideById('m1') === m1, 'Test get Node correct');

    assert.notOk(sugar.getMonosaccharideById('root') === m1, 'Test Node wrong');
    assert.notOk(sugar.getMonosaccharideById('m1') === root, 'Test Node wrong');

});

QUnit.test( "Test Add and get id" , function( assert ) {

    var root = new Monosaccharide('root',MonosaccharideType.Glc,Anomericity.BETA,Isomer.D,RingType.P);
    var m1 = new Monosaccharide('m1',MonosaccharideType.Gal,Anomericity.ALPHA,Isomer.L,RingType.P);

    var sugar = new Sugar('test',root);
    sugar.addMonosaccharideWithLinkage(root,m1,AnomerCarbon.ONE,LinkedCarbon.SIX);

    var m2 = new Monosaccharide('m1');
    //Throw exception. Same id
    assert.raises(function(){
        sugar.addMonosaccharideWithLinkage(root,m2,AnomerCarbon.ONE,LinkedCarbon.SIX);
    });

    assert.notOk(sugar.size() === 24, 'Test size');

    assert.ok(sugar.size() === 2, 'Test get id correct');
    assert.ok(sugar.getMonosaccharideById('m1') instanceof Monosaccharide, 'Test get Node correct');
    assert.ok(sugar.getMonosaccharideById('m1') === m1, 'Test get Node correct');

    assert.notOk(sugar.getMonosaccharideById('root') === m1, 'Test Node wrong');
    assert.notOk(sugar.getMonosaccharideById('m1') === root, 'Test Node wrong');

});