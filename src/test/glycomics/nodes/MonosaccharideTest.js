/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import Monosaccharide from '../../../js/glycomics/nodes/Monosaccharide';
import Anomericity from '../../../js/glycomics/dictionary/Anomericity';
import Isomer from '../../../js/glycomics/dictionary/Isomer';
import RingType from '../../../js/glycomics/dictionary/RingType';
import MonosaccharideType from '../../../js/glycomics/dictionary/MonosaccharideType';

QUnit.module("Test Monosaccharide object", {
});

QUnit.test( "Create new Monosaccharide" , function( assert ) {

    var monos = new Monosaccharide('monosaccharide',MonosaccharideType.Glc,Anomericity.ALPHA,Isomer.L,RingType.F);

    assert.ok(monos.getAnomericity() === Anomericity.ALPHA,"Anomericity Correct value");
    assert.ok(monos.getIsomer() === Isomer.L,"Isomer Correct value");
    assert.ok(monos.getMonosaccharideType() === MonosaccharideType.Glc,"MonosaccharideType Correct value");
    assert.ok(monos.getRingType() === RingType.F,"RingType Correct value");
    assert.ok(monos.getNodeId() === 'monosaccharide' ,"Id Correct value");

    assert.notOk(monos.getAnomericity() === Anomericity.BETA,"Anomericity Uncorrect value");
    assert.notOk(monos.getIsomer() === Isomer.D,"Isomer Uncorrect value");
    assert.notOk(monos.getMonosaccharideType() === MonosaccharideType.Gal,"MonosaccharideType Uncorrect value");
    assert.notOk(monos.getRingType() === RingType.P,"RingType Uncorrect value");
    assert.notOk(monos.getNodeId() === 'monosacsdadaside' ,"Id Uncorrect value");

    var monos2 = new Monosaccharide('monosaccharide');
    assert.ok(monos2.getAnomericity() === Anomericity.UNDEFINED,"Anomericity Correct value");
    assert.ok(monos2.getIsomer() === Isomer.UNDEFINED,"Isomer Correct value");
    assert.ok(monos2.getMonosaccharideType() === MonosaccharideType.UNDEFINED,"MonosaccharideType Correct value");
    assert.ok(monos2.getRingType() === RingType.UNDEFINED,"RingType Correct value");

    assert.notOk(monos2.getAnomericity() === Anomericity.BETA,"Anomericity Uncorrect value");
    assert.notOk(monos2.getIsomer() === Isomer.D,"Isomer Uncorrect value");
    assert.notOk(monos2.getMonosaccharideType() === MonosaccharideType.Gal,"MonosaccharideType Uncorrect value");
    assert.notOk(monos2.getRingType() === RingType.P,"RingType Uncorrect value");

});

QUnit.test( "Create Monosaccharide Error" , function(assert) {
    assert.raises(function(){
        new Monosaccharide('test','source1','target1',8,1);
    });

    assert.raises(function(){
        new Monosaccharide();
    });
});



