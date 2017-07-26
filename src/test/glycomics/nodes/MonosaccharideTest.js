/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import Monosaccharide from '../../../js/models/glycomics/nodes/Monosaccharide';
import Anomericity from '../../../js/models/glycomics/dictionary/Anomericity';
import Isomer from '../../../js/models/glycomics/dictionary/Isomer';
import RingType from '../../../js/models/glycomics/dictionary/RingType';
import MonosaccharideType from '../../../js/views/glycomics/dictionary/MonosaccharideType';

QUnit.module("Test Monosaccharide object", {
});

QUnit.test( "Create new Monosaccharide" , function( assert ) {

    var monos = new Monosaccharide('monosaccharide',MonosaccharideType.Glc,Anomericity.ALPHA,Isomer.L,RingType.F);

    assert.ok(monos.anomericity === Anomericity.ALPHA,"Anomericity Correct value");
    assert.ok(monos.isomer === Isomer.L,"Isomer Correct value");
    assert.ok(monos.monosaccharideType === MonosaccharideType.Glc,"MonosaccharideType Correct value");
    assert.ok(monos.ringType === RingType.F,"RingType Correct value");
    assert.ok(monos.getId() === 'monosaccharide' ,"Id Correct value");

    assert.notOk(monos.anomericity === Anomericity.BETA,"Anomericity Uncorrect value");
    assert.notOk(monos.isomer === Isomer.D,"Isomer Uncorrect value");
    assert.notOk(monos.monosaccharideType === MonosaccharideType.Gal,"MonosaccharideType Uncorrect value");
    assert.notOk(monos.ringType === RingType.P,"RingType Uncorrect value");
    assert.notOk(monos.getId() === 'monosacsdadaside' ,"Id Uncorrect value");

    var monos2 = new Monosaccharide('monosaccharide');
    assert.ok(monos2.anomericity === Anomericity.UNDEFINED,"Anomericity Correct value");
    assert.ok(monos2.isomer === Isomer.UNDEFINED,"Isomer Correct value");
    assert.ok(monos2.monosaccharideType === MonosaccharideType.UNDEFINED,"MonosaccharideType Correct value");
    assert.ok(monos2.ringType === RingType.UNDEFINED,"RingType Correct value");

    assert.notOk(monos2.anomericity === Anomericity.BETA,"Anomericity Uncorrect value");
    assert.notOk(monos2.isomer === Isomer.D,"Isomer Uncorrect value");
    assert.notOk(monos2.monosaccharideType === MonosaccharideType.Gal,"MonosaccharideType Uncorrect value");
    assert.notOk(monos2.ringType === RingType.P,"RingType Uncorrect value");

});

QUnit.test( "Monosaccharide  set test" , function( assert ) {

    var monos = new Monosaccharide('monosaccharide',MonosaccharideType.Glc,Anomericity.ALPHA,Isomer.L,RingType.F);

    assert.ok(monos.anomericity === Anomericity.ALPHA,"Anomericity Correct value");
    assert.ok(monos.isomer === Isomer.L,"Isomer Correct value");
    assert.ok(monos.monosaccharideType === MonosaccharideType.Glc,"MonosaccharideType Correct value");
    assert.ok(monos.ringType === RingType.F,"RingType Correct value");
    assert.ok(monos.getId() === 'monosaccharide' ,"Id Correct value");

    assert.notOk(monos.anomericity === Anomericity.BETA,"Anomericity Uncorrect value");
    assert.notOk(monos.isomer === Isomer.D,"Isomer Uncorrect value");
    assert.notOk(monos.monosaccharideType === MonosaccharideType.Gal,"MonosaccharideType Uncorrect value");
    assert.notOk(monos.ringType === RingType.P,"RingType Uncorrect value");
    assert.notOk(monos.getId() === 'monosacsdadaside' ,"Id Uncorrect value");

    monos.anomericity = Anomericity.BETA;

    assert.ok(monos.anomericity === Anomericity.BETA,"Anomericity Correct value");
    assert.ok(monos.isomer === Isomer.L,"Isomer Correct value");
    assert.ok(monos.monosaccharideType === MonosaccharideType.Glc,"MonosaccharideType Correct value");
    assert.ok(monos.ringType === RingType.F,"RingType Correct value");
    assert.ok(monos.getId() === 'monosaccharide' ,"Id Correct value");

    assert.notOk(monos.anomericity === Anomericity.UNDEFINED,"Anomericity Uncorrect value");
    assert.notOk(monos.isomer === Isomer.D,"Isomer Uncorrect value");
    assert.notOk(monos.monosaccharideType === MonosaccharideType.Gal,"MonosaccharideType Uncorrect value");
    assert.notOk(monos.ringType === RingType.P,"RingType Uncorrect value");
    assert.notOk(monos.getId() === 'monosacsdadaside' ,"Id Uncorrect value");

    monos.isomer = Isomer.D;

    assert.ok(monos.anomericity === Anomericity.BETA,"Anomericity Correct value");
    assert.ok(monos.isomer === Isomer.D,"Isomer Correct value");
    assert.ok(monos.monosaccharideType === MonosaccharideType.Glc,"MonosaccharideType Correct value");
    assert.ok(monos.ringType === RingType.F,"RingType Correct value");
    assert.ok(monos.getId() === 'monosaccharide' ,"Id Correct value");

    assert.notOk(monos.anomericity === Anomericity.UNDEFINED,"Anomericity Uncorrect value");
    assert.notOk(monos.isomer === Isomer.L,"Isomer Uncorrect value");
    assert.notOk(monos.monosaccharideType === MonosaccharideType.Gal,"MonosaccharideType Uncorrect value");
    assert.notOk(monos.ringType === RingType.P,"RingType Uncorrect value");
    assert.notOk(monos.getId() === 'monosacsdadaside' ,"Id Uncorrect value");

    monos.monosaccharideType = MonosaccharideType.Ido;

    assert.ok(monos.anomericity === Anomericity.BETA,"Anomericity Correct value");
    assert.ok(monos.isomer === Isomer.D,"Isomer Correct value");
    assert.ok(monos.monosaccharideType === MonosaccharideType.Ido,"MonosaccharideType Correct value");
    assert.ok(monos.ringType === RingType.F,"RingType Correct value");
    assert.ok(monos.getId() === 'monosaccharide' ,"Id Correct value");

    assert.notOk(monos.anomericity === Anomericity.UNDEFINED,"Anomericity Uncorrect value");
    assert.notOk(monos.isomer === Isomer.L,"Isomer Uncorrect value");
    assert.notOk(monos.monosaccharideType === MonosaccharideType.Gal,"MonosaccharideType Uncorrect value");
    assert.notOk(monos.ringType === RingType.P,"RingType Uncorrect value");
    assert.notOk(monos.getId() === 'monosacsdadaside' ,"Id Uncorrect value");


    monos.ringType = RingType.P;

    assert.ok(monos.anomericity === Anomericity.BETA,"Anomericity Correct value");
    assert.ok(monos.isomer === Isomer.D,"Isomer Correct value");
    assert.ok(monos.monosaccharideType === MonosaccharideType.Ido,"MonosaccharideType Correct value");
    assert.ok(monos.ringType === RingType.P,"RingType Correct value");
    assert.ok(monos.getId() === 'monosaccharide' ,"Id Correct value");

    assert.notOk(monos.anomericity === Anomericity.UNDEFINED,"Anomericity Uncorrect value");
    assert.notOk(monos.isomer === Isomer.L,"Isomer Uncorrect value");
    assert.notOk(monos.monosaccharideType === MonosaccharideType.Gal,"MonosaccharideType Uncorrect value");
    assert.notOk(monos.ringType === RingType.F,"RingType Uncorrect value");
    assert.notOk(monos.getId() === 'monosacsdadaside' ,"Id Uncorrect value");

    var monos2 = new Monosaccharide('monosaccharide');
    assert.ok(monos2.anomericity === Anomericity.UNDEFINED,"Anomericity Correct value");
    assert.ok(monos2.isomer === Isomer.UNDEFINED,"Isomer Correct value");
    assert.ok(monos2.monosaccharideType === MonosaccharideType.UNDEFINED,"MonosaccharideType Correct value");
    assert.ok(monos2.ringType === RingType.UNDEFINED,"RingType Correct value");

    assert.notOk(monos2.anomericity === Anomericity.BETA,"Anomericity Uncorrect value");
    assert.notOk(monos2.isomer === Isomer.D,"Isomer Uncorrect value");
    assert.notOk(monos2.monosaccharideType === MonosaccharideType.Gal,"MonosaccharideType Uncorrect value");
    assert.notOk(monos2.ringType === RingType.P,"RingType Uncorrect value");

});

QUnit.test( "Create Monosaccharide Error" , function(assert) {
    assert.raises(function(){
        new Monosaccharide('test','source1','target1',8,1);
    });

    assert.raises(function(){
        new Monosaccharide();
    });

    assert.raises(function(){
        var m =new Monosaccharide(test);
        m.anomericity = 'ciao';
    });
    assert.raises(function(){
        var m =new Monosaccharide(test);
        m.anomericity = 1;
    });
    assert.raises(function(){
        var m =new Monosaccharide(test);
        m.ringType = 'ciao';
    });
    assert.raises(function(){
        var m =new Monosaccharide(test);
        m.ringType = 1;
    });
    assert.raises(function(){
        var m =new Monosaccharide(test);
        m.monosaccharideType = 'ciao';
    });
    assert.raises(function(){
        var m =new Monosaccharide(test);
        m.monosaccharideType = 1;
    });
    assert.raises(function(){
        var m =new Monosaccharide(test);
        m.isomer = 'ciao';
    });
    assert.raises(function(){
        var m =new Monosaccharide(test);
        m.isomer = 1;
    });
});



