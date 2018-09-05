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
import AcceptorPosition from '../../js/models/glycomics/dictionary/AcceptorPosition';
import DonorPosition from '../../js/models/glycomics/dictionary/DonorPosition';
//Nodes
import Monosaccharide from '../../js/models/glycomics/nodes/Monosaccharide';
import Substituent from '../../js/models/glycomics/nodes/Substituent';
//Linkages
import GlycosidicLinkage from '../../js/models/glycomics/linkages/GlycosidicLinkage';
import SubstituentLinkage from '../../js/models/glycomics/linkages/SubstituentLinkage';
//Glycan
import Glycan from '../../js/models/glycomics/Glycan';


QUnit.module("Test Glycan object", {
});

QUnit.test( "Test Set root" , function( assert ) {

    var glycan = new Glycan('ciao');
    assert.ok(glycan.rootIsSet() === false, 'Root not set check');

    var root = new Monosaccharide('root',MonosaccharideType.Glc,Anomericity.BETA,Isomer.D,RingType.P);
    glycan.setRootNode(root);
    assert.ok(glycan.size() === 1, '');
    assert.ok(glycan.rootIsSet() === true, 'Root not set check');
    assert.ok(glycan.getRootNode() === root, 'Check root object');
});

QUnit.test( "Test Clear" , function( assert ) {
    var glycan = new Glycan('glycan');
    assert.ok(glycan.rootIsSet() === false, 'Root not set check');

    var root = new Monosaccharide('root',MonosaccharideType.Glc,Anomericity.BETA,Isomer.D,RingType.P);
    glycan.setRootNode(root);
    assert.ok(glycan.size() === 1, '');
    assert.ok(glycan.rootIsSet() === true, 'Root not set check');
    assert.ok(glycan.getRootNode() === root, 'Check root object');

    glycan.clear();

    assert.ok(glycan.size() === 0, 'Size 0');
    assert.ok(glycan.rootIsSet() === false, 'Root not set check');
    assert.ok(typeof glycan.getRootNode() == 'undefined', 'Check root object');
});

QUnit.test( "Test Set Root 2" , function( assert ) {
    var root = new Monosaccharide('root',MonosaccharideType.Glc,Anomericity.BETA,Isomer.D,RingType.P);
    var root2 = new Monosaccharide('root',MonosaccharideType.Gal,Anomericity.ALPHA,Isomer.L,RingType.P);
    var glycan = new Glycan('glycan', root);
    assert.ok(glycan.rootIsSet() === true, 'Root not set check');
    assert.ok(glycan.size() === 1, '');
    assert.ok(glycan.getRootNode() === root, 'Check root object');

    //Throw exception.
    assert.raises(function(){
        glycan.setRootNode(rootTwo);
    });

    assert.ok(glycan.size() === 1, '');
    assert.ok(glycan.rootIsSet() === true, 'Root not set check');
    assert.notOk(glycan.getRootNode() === root2, 'Check root object');

    glycan.getRootNode().monosaccharideType = MonosaccharideType.Gal;
    glycan.getRootNode().anomericity = Anomericity.ALPHA;
    glycan.getRootNode().isomer = Isomer.L;
    assert.notOk(glycan.getRootNode() === root2, 'Check root object');

    glycan.clear();

    assert.ok(glycan.size() === 0, 'Size 0');
    assert.ok(glycan.rootIsSet() === false, 'Root not set check');
    assert.ok(typeof glycan.getRootNode() == 'undefined', 'Check root object');
});


QUnit.test( "Test Empty constructor and Get id" , function( assert ) {


    //Throw exception. id is needed
    assert.raises(function(){
        new Glycan();
    });


    var glycan = new Glycan('test');
    assert.notOk(glycan.getGlycanId() === 'test313121', 'Test get id wrong');
    assert.ok(glycan.getGlycanId() === 'test', 'Test get id correct');
});


QUnit.test( "Test Add and get id" , function( assert ) {

    var root = new Monosaccharide('root',MonosaccharideType.Glc,Anomericity.BETA,Isomer.D,RingType.P);
    var m1 = new Monosaccharide('m1',MonosaccharideType.Gal,Anomericity.ALPHA,Isomer.L,RingType.P);
    var glycan = new Glycan('test',root);
    glycan.addMonosaccharideWithLinkage(root,m1,AcceptorPosition.ONE,DonorPosition.SIX);

    var m2 = new Monosaccharide('m1');
    //Throw exception. Same id
    assert.raises(function(){
        glycan.addMonosaccharideWithLinkage(root,m2,AcceptorPosition.ONE,DonorPosition.SIX);
    });

    assert.notOk(glycan.size() === 24, 'Test size');

    assert.ok(glycan.size() === 2, 'Test get id correct');
    assert.ok(glycan.getMonosaccharideById('m1') instanceof Monosaccharide, 'Test get Node correct');
    assert.ok(glycan.getMonosaccharideById('m1') === m1, 'Test get Node correct');

    assert.notOk(glycan.getMonosaccharideById('root') === m1, 'Test Node wrong');
    assert.notOk(glycan.getMonosaccharideById('m1') === root, 'Test Node wrong');

});

QUnit.test( "Test root + monosaccharide" , function( assert ) {

    var root = new Monosaccharide('root',MonosaccharideType.Glc,Anomericity.BETA,Isomer.D,RingType.P);
    var m1 = new Monosaccharide('m1',MonosaccharideType.Gal,Anomericity.ALPHA,Isomer.L,RingType.P);

    var glycan = new Glycan('test',root);
    glycan.addMonosaccharideWithLinkage(root,m1,AcceptorPosition.ONE,DonorPosition.SIX);

    var m2 = new Monosaccharide('m1');
    //Throw exception. Same id
    assert.raises(function(){
        glycan.addMonosaccharideWithLinkage(root,m2,AcceptorPosition.ONE,DonorPosition.SIX);
    });

    assert.notOk(glycan.size() === 24, 'Test size');

    assert.ok(glycan.size() === 2, 'Test get id correct');
    assert.ok(glycan.getMonosaccharideById('m1') instanceof Monosaccharide, 'Test get Node correct');
    assert.ok(glycan.getMonosaccharideById('m1') === m1, 'Test get Node correct');

    assert.notOk(glycan.getMonosaccharideById('root') === m1, 'Test Node wrong');
    assert.notOk(glycan.getMonosaccharideById('m1') === root, 'Test Node wrong');

});


QUnit.test( "Test Add and get monosaccharide with linkages" , function( assert ) {

    var root = new Monosaccharide('root',MonosaccharideType.Glc,Anomericity.BETA,Isomer.D,RingType.P);
    var m1 = new Monosaccharide('m1',MonosaccharideType.Gal,Anomericity.ALPHA,Isomer.L,RingType.P);
    var m2 = new Monosaccharide('m2',MonosaccharideType.Gal,Anomericity.ALPHA,Isomer.L,RingType.P);
    var edge1 = new GlycosidicLinkage('e1',m1,m2,AcceptorPosition.ONE,DonorPosition.THREE);
    var glycan = new Glycan('test',root);
    glycan.addMonosaccharideWithLinkage(root,m1,AcceptorPosition.ONE,DonorPosition.SIX);
    glycan.addMonosaccharide(m2,edge1);

    assert.notOk(glycan.size() === 24, 'Test size');
    assert.ok(glycan.size() === 3, 'Test get id correct');

    assert.ok(glycan.getMonosaccharideById('m1') instanceof Monosaccharide, 'Test get Node correct');
    assert.ok(glycan.getMonosaccharideById('m1') === m1, 'Test get Node correct');

    assert.ok(glycan.getNodeById('m1') instanceof Monosaccharide, 'Test get Node correct');
    assert.ok(glycan.getNodeById('m1') === m1, 'Test get Node correct');

    //Throw exception. Cannot get monosaccharides with substituent method.
    assert.raises(function(){
        glycan.getSubstituentById('m1');
    });

    assert.notOk(glycan.getMonosaccharideById('root') === m1, 'Test Node wrong');
    assert.notOk(glycan.getMonosaccharideById('m1') === root, 'Test Node wrong');
    assert.notOk(glycan.getMonosaccharideById('m2') === root, 'Test Node wrong');
});


QUnit.test( "Test Add and get monosaccharide with linkages" , function( assert ) {

    var root = new Monosaccharide('root',MonosaccharideType.Glc,Anomericity.BETA,Isomer.D,RingType.P);
    var m1 = new Monosaccharide('m1',MonosaccharideType.Gal,Anomericity.ALPHA,Isomer.L,RingType.P);
    var m2 = new Monosaccharide('m2',MonosaccharideType.Gal,Anomericity.ALPHA,Isomer.L,RingType.P);
    var s1 = new Substituent('s1',SubstituentType.Br);
    var s2 = new Substituent('s2',SubstituentType.NAcetyl);
    var edge1 = new GlycosidicLinkage('e1',m1,m2,AcceptorPosition.ONE,DonorPosition.THREE);
    var glycan = new Glycan('test',root);
    glycan.addMonosaccharideWithLinkage(root,m1,AcceptorPosition.ONE,DonorPosition.SIX);
    glycan.addMonosaccharide(m2,edge1);

    //Throw exception. The edge must be SubstituentLinkage
    assert.raises(function(){
        glycan.addSubstituent(s1,edge1);
    });

    glycan.addSubstituent(s1,new SubstituentLinkage('edge-s1',m1,s1,DonorPosition.TWO));
    var edge2 = new SubstituentLinkage('edge-s2',m2,s2,DonorPosition.TWO);
    glycan.addSubstituent(s2,edge2);
    assert.notOk(glycan.size() === 24, 'Test size');
    assert.ok(glycan.size() === 5, 'Test get id correct');

    assert.ok(glycan.getMonosaccharideById('m1') instanceof Monosaccharide, 'Test get Node correct');
    assert.ok(glycan.getMonosaccharideById('m1') === m1, 'Test get Node correct');

    assert.ok(glycan.getNodeById('m1') instanceof Monosaccharide, 'Test get Node correct');
    assert.ok(glycan.getNodeById('m1') === m1, 'Test get Node correct');

    //Throw exception. Cannot get monosaccharides with substituent method.
    assert.raises(function(){
        glycan.getSubstituentById('m1');
    });

    assert.notOk(glycan.getMonosaccharideById('root') === m1, 'Test Node wrong');
    assert.notOk(glycan.getMonosaccharideById('m1') === root, 'Test Node wrong');
    assert.notOk(glycan.getMonosaccharideById('m2') === root, 'Test Node wrong');
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

    var edge1 = new GlycosidicLinkage('e1',root,m2,AcceptorPosition.ONE,DonorPosition.THREE);
    var glycan = new Glycan('test',root);

    glycan.addMonosaccharideWithLinkage(root,m1,AcceptorPosition.ONE,DonorPosition.SIX);
    glycan.addMonosaccharide(m2,edge1);

    //Throw exception. The edge must be SubstituentLinkage
    assert.raises(function(){
        glycan.addSubstituent(s1,edge1);
    });

    glycan.addSubstituent(s1,new SubstituentLinkage('edge-s1',m1,s1,DonorPosition.TWO));
    var edge2 = new SubstituentLinkage('edge-s2',m2,s2,DonorPosition.TWO);
    glycan.addSubstituent(s2,edge2);
    assert.notOk(glycan.size() === 24, 'Test size');
    assert.ok(glycan.size() === 5, 'Test get size correct');

    assert.ok(glycan.getMonosaccharideById('m1') instanceof Monosaccharide, 'Test get Node correct');
    assert.ok(glycan.getMonosaccharideById('m1') === m1, 'Test get Node correct');

    assert.ok(glycan.getNodeById('m1') instanceof Monosaccharide, 'Test get Node correct');
    assert.ok(glycan.getNodeById('m1') === m1, 'Test get Node correct');

    //Throw exception. Cannot get monosaccharides with substituent method.
    assert.raises(function(){
        glycan.getSubstituentById('m1');
    });

    assert.notOk(glycan.getMonosaccharideById('root') === m1, 'Test Node wrong');
    assert.notOk(glycan.getMonosaccharideById('m1') === root, 'Test Node wrong');
    assert.notOk(glycan.getMonosaccharideById('m2') === root, 'Test Node wrong');

    assert.ok(glycan.getSubstituentById('s1') === s1, 'Test Substituent Correct');
    assert.ok(glycan.getSubstituentById('s2') === s2, 'Test Substituent Correct');
    assert.notOk(glycan.getSubstituentById('s2') === s1, 'Test Substituent wrong');
    assert.notOk(glycan.getSubstituentById('s1') === s2, 'Test Substituent wrong');

    assert.ok(glycan.getEdgeById('e1') === edge1, 'Test Edge Correct');

    assert.ok(glycan.getEdge(root,m2) === edge1, 'Test Edge Correct');
    assert.notOk(glycan.getEdge(root,m1) === edge1, 'Test Edge Correct');
    assert.notOk(glycan.getEdgeById('edge-s2') === edge1, 'Test Substituent wrong');

    //Throw exception. No edge between m1 and m2
    assert.raises(function(){
        glycan.getEdge(m1,m2);
    });

    glycan.removeMonosaccharide(m2);
    assert.ok(glycan.size() === 4, 'Test get size correct');

    //Throw exception. Cannot get monosaccharides with substituent method.
    assert.raises(function(){
        glycan.getSubstituentById('m2');
    });

    //Throw exception. Monosaccharide already removed
    assert.raises(function(){
        glycan.getMonosaccharideById('m2');
    });


    //Throw exception. Removed linkage
    assert.raises(function(){
        glycan.getNodeById(edge2.id);
    });





});