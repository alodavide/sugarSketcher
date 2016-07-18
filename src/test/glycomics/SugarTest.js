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

QUnit.module("Test Monosaccharide object", {
});

QUnit.test( "Create new Monosaccharide" , function( assert ) {

    var sugar = new Sugar('ciao');

    assert.ok(sugar.rootIsSet() === false, 'Root not set check');

    var root = new Monosaccharide('root',MonosaccharideType.Glc,Anomericity.BETA,Isomer.D,RingType.P);
    sugar.setRootNode(root);
    assert.ok(sugar.size() === 1, '');
    assert.ok(sugar.rootIsSet() === true, 'Root not set check');
    assert.ok(sugar.getRootNode() === root, 'Check root object');
});
