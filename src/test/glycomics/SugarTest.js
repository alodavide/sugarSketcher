/**
* Author:  Davide Alocci
* Version: 0.0.1
*/
//Dictionary
import Anomericity from '../../js/models/glycomics/dictionary/Anomericity';
import Isomer from '../../js/models/glycomics/dictionary/Isomer';
import RingType from '../../js/models/glycomics/dictionary/RingType';
import MonosaccharideType from '../../js/views/glycomics/dictionary/MonosaccharideType';
import SubstituentType from '../../js/models/glycomics/dictionary/SubstituentType';
import AnomerCarbon from '../../js/models/glycomics/dictionary/AnomerCarbon';
import LinkedCarbon from '../../js/models/glycomics/dictionary/LinkedCarbon';
//Nodes
import Monosaccharide from '../../js/models/glycomics/nodes/Monosaccharide';
import Substituent from '../../js/models/glycomics/nodes/Substituent';
//Linkages
import GlycosidicLinkage from '../../js/models/glycomics/linkages/GlycosidicLinkage';
import SubstituentLinkage from '../../js/models/glycomics/linkages/SubstituentLinkage';
//Sugar
import Sugar from '../../js/models/glycomics/Sugar';


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

QUnit.test( "Test root + monosaccharide" , function( assert ) {

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


QUnit.test( "Test Add and get monosaccharide with linkages" , function( assert ) {

    var root = new Monosaccharide('root',MonosaccharideType.Glc,Anomericity.BETA,Isomer.D,RingType.P);
    var m1 = new Monosaccharide('m1',MonosaccharideType.Gal,Anomericity.ALPHA,Isomer.L,RingType.P);
    var m2 = new Monosaccharide('m2',MonosaccharideType.Gal,Anomericity.ALPHA,Isomer.L,RingType.P);
    var edge1 = new GlycosidicLinkage('e1',m1,m2,AnomerCarbon.ONE,LinkedCarbon.THREE);
    var sugar = new Sugar('test',root);
    sugar.addMonosaccharideWithLinkage(root,m1,AnomerCarbon.ONE,LinkedCarbon.SIX);
    sugar.addMonosaccharide(m2,edge1);

    assert.notOk(sugar.size() === 24, 'Test size');
    assert.ok(sugar.size() === 3, 'Test get id correct');

    assert.ok(sugar.getMonosaccharideById('m1') instanceof Monosaccharide, 'Test get Node correct');
    assert.ok(sugar.getMonosaccharideById('m1') === m1, 'Test get Node correct');

    assert.ok(sugar.getNodeById('m1') instanceof Monosaccharide, 'Test get Node correct');
    assert.ok(sugar.getNodeById('m1') === m1, 'Test get Node correct');

    //Throw exception. Cannot get monosaccharides with substituent method.
    assert.raises(function(){
        sugar.getSubstituentById('m1');
    });

    assert.notOk(sugar.getMonosaccharideById('root') === m1, 'Test Node wrong');
    assert.notOk(sugar.getMonosaccharideById('m1') === root, 'Test Node wrong');
    assert.notOk(sugar.getMonosaccharideById('m2') === root, 'Test Node wrong');
});


QUnit.test( "Test Add and get monosaccharide with linkages" , function( assert ) {

    var root = new Monosaccharide('root',MonosaccharideType.Glc,Anomericity.BETA,Isomer.D,RingType.P);
    var m1 = new Monosaccharide('m1',MonosaccharideType.Gal,Anomericity.ALPHA,Isomer.L,RingType.P);
    var m2 = new Monosaccharide('m2',MonosaccharideType.Gal,Anomericity.ALPHA,Isomer.L,RingType.P);
    var s1 = new Substituent('s1',SubstituentType.Br);
    var s2 = new Substituent('s2',SubstituentType.NAcetyl);
    var edge1 = new GlycosidicLinkage('e1',m1,m2,AnomerCarbon.ONE,LinkedCarbon.THREE);
    var sugar = new Sugar('test',root);
    sugar.addMonosaccharideWithLinkage(root,m1,AnomerCarbon.ONE,LinkedCarbon.SIX);
    sugar.addMonosaccharide(m2,edge1);

    //Throw exception. The edge must be SubstituentLinkage
    assert.raises(function(){
        sugar.addSubstituent(s1,edge1);
    });

    sugar.addSubstituent(s1,new SubstituentLinkage('edge-s1',m1,s1,LinkedCarbon.TWO));
    var edge2 = new SubstituentLinkage('edge-s2',m2,s2,LinkedCarbon.TWO);
    sugar.addSubstituent(s2,edge2);
    assert.notOk(sugar.size() === 24, 'Test size');
    assert.ok(sugar.size() === 5, 'Test get id correct');

    assert.ok(sugar.getMonosaccharideById('m1') instanceof Monosaccharide, 'Test get Node correct');
    assert.ok(sugar.getMonosaccharideById('m1') === m1, 'Test get Node correct');

    assert.ok(sugar.getNodeById('m1') instanceof Monosaccharide, 'Test get Node correct');
    assert.ok(sugar.getNodeById('m1') === m1, 'Test get Node correct');

    //Throw exception. Cannot get monosaccharides with substituent method.
    assert.raises(function(){
        sugar.getSubstituentById('m1');
    });

    assert.notOk(sugar.getMonosaccharideById('root') === m1, 'Test Node wrong');
    assert.notOk(sugar.getMonosaccharideById('m1') === root, 'Test Node wrong');
    assert.notOk(sugar.getMonosaccharideById('m2') === root, 'Test Node wrong');
});



QUnit.test( "Test Add and get monosaccharide with linkages" , function( assert ) {

    /**
     *          m1 - s1
     *        /
     * root -
     *        \
     *         m2 - s2
     * */

    var root = new Monosaccharide('root',MonosaccharideType.Glc,Anomericity.BETA,Isomer.D,RingType.P);
    var m1 = new Monosaccharide('m1',MonosaccharideType.Gal,Anomericity.ALPHA,Isomer.L,RingType.P);
    var m2 = new Monosaccharide('m2',MonosaccharideType.Gal,Anomericity.ALPHA,Isomer.L,RingType.P);
    var s1 = new Substituent('s1',SubstituentType.Br);
    var s2 = new Substituent('s2',SubstituentType.NAcetyl);

    var edge1 = new GlycosidicLinkage('e1',root,m2,AnomerCarbon.ONE,LinkedCarbon.THREE);
    var sugar = new Sugar('test',root);

    sugar.addMonosaccharideWithLinkage(root,m1,AnomerCarbon.ONE,LinkedCarbon.SIX);
    sugar.addMonosaccharide(m2,edge1);

    //Throw exception. The edge must be SubstituentLinkage
    assert.raises(function(){
        sugar.addSubstituent(s1,edge1);
    });

    sugar.addSubstituent(s1,new SubstituentLinkage('edge-s1',m1,s1,LinkedCarbon.TWO));
    var edge2 = new SubstituentLinkage('edge-s2',m2,s2,LinkedCarbon.TWO);
    sugar.addSubstituent(s2,edge2);
    assert.notOk(sugar.size() === 24, 'Test size');
    assert.ok(sugar.size() === 5, 'Test get size correct');

    assert.ok(sugar.getMonosaccharideById('m1') instanceof Monosaccharide, 'Test get Node correct');
    assert.ok(sugar.getMonosaccharideById('m1') === m1, 'Test get Node correct');

    assert.ok(sugar.getNodeById('m1') instanceof Monosaccharide, 'Test get Node correct');
    assert.ok(sugar.getNodeById('m1') === m1, 'Test get Node correct');

    //Throw exception. Cannot get monosaccharides with substituent method.
    assert.raises(function(){
        sugar.getSubstituentById('m1');
    });

    assert.notOk(sugar.getMonosaccharideById('root') === m1, 'Test Node wrong');
    assert.notOk(sugar.getMonosaccharideById('m1') === root, 'Test Node wrong');
    assert.notOk(sugar.getMonosaccharideById('m2') === root, 'Test Node wrong');

    assert.ok(sugar.getSubstituentById('s1') === s1, 'Test Substituent Correct');
    assert.ok(sugar.getSubstituentById('s2') === s2, 'Test Substituent Correct');
    assert.notOk(sugar.getSubstituentById('s2') === s1, 'Test Substituent wrong');
    assert.notOk(sugar.getSubstituentById('s1') === s2, 'Test Substituent wrong');

    assert.ok(sugar.getEdgeById('e1') === edge1, 'Test Edge Correct');

    assert.ok(sugar.getEdge(root,m2) === edge1, 'Test Edge Correct');
    assert.notOk(sugar.getEdge(root,m1) === edge1, 'Test Edge Correct');
    assert.notOk(sugar.getEdgeById('edge-s2') === edge1, 'Test Substituent wrong');

    //Throw exception. No edge between m1 and m2
    assert.raises(function(){
        sugar.getEdge(m1,m2);
    });

    sugar.removeMonosaccharide(m2);
    assert.ok(sugar.size() === 4, 'Test get size correct');

    //Throw exception. Cannot get monosaccharides with substituent method.
    assert.raises(function(){
        sugar.getSubstituentById('m2');
    });

    //Throw exception. Monosaccharide already removed
    assert.raises(function(){
        sugar.getMonosaccharideById('m2');
    });


    //Throw exception. Removed linkage
    assert.raises(function(){
        sugar.getNodeById(edge2.id);
    });





});