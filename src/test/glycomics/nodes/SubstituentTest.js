/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import Substituent from '../../../js/models/glycomics/nodes/Substituent';
import SubstituentType from '../../../js/models/glycomics/dictionary/SubstituentType';

QUnit.module("Test Substituent object", {
});

QUnit.test( "Create new Substituent" , function( assert ) {

    var subs = new Substituent('s',SubstituentType.NAcetyl);

    assert.ok(subs.substituentType === SubstituentType.NAcetyl,"SubstituentType Correct value");
    assert.ok(subs.getId() === 's',"Id Correct value");
    assert.notOk(subs.substituentType === SubstituentType.UNDEFINED,"SubstituentType Uncorrect value");
    assert.notOk(subs.getId() === 'ss',"Id Uncorrect value");
});

QUnit.test( "Create new Substituent" , function( assert ) {

    var subs = new Substituent('s',SubstituentType.NAcetyl);

    assert.ok(subs.substituentType === SubstituentType.NAcetyl,"SubstituentType Correct value");
    assert.ok(subs.getId() === 's',"Id Correct value");
    assert.notOk(subs.substituentType === SubstituentType.UNDEFINED,"SubstituentType Uncorrect value");
    assert.notOk(subs.getId() === 'ss',"Id Uncorrect value");

    subs.substituentType = SubstituentType.Bromo;
    assert.ok(subs.substituentType === SubstituentType.Bromo,"SubstituentType Correct value");
    assert.notOk(subs.substituentType === SubstituentType.UNDEFINED,"SubstituentType Uncorrect value");
});

QUnit.test( "Create new Substituent - no type" , function( assert ) {

    var subs2 = new Substituent('t');

    assert.ok(subs2.substituentType === SubstituentType.UNDEFINED,"SubstituentType Correct value");
    assert.notOk(subs2.substituentType === SubstituentType.NGlycolyl,"SubstituentType Uncorrect value");

});

QUnit.test( "Set SubstituentType" , function( assert ) {

    var subs2 = new Substituent('t');

    assert.ok(subs2.substituentType === SubstituentType.UNDEFINED,"SubstituentType Correct value");
    assert.notOk(subs2.substituentType === SubstituentType.NGlycolyl,"SubstituentType Uncorrect value");

    subs2.substituentType = SubstituentType.NGlycolyl;

    assert.notOk(subs2.substituentType === SubstituentType.UNDEFINED,"SubstituentType Uncorrect value");
    assert.ok(subs2.substituentType === SubstituentType.NGlycolyl,"SubstituentType Correct value");

});

QUnit.test( "Create Monosaccharide Error" , function(assert) {
    assert.raises(function(){
        new Substituent('test','source1');
    });

    assert.raises(function(){
        new Substituent();
    });

    assert.raises(function(){
        var s = new Substituent('test');
        s.substituentType = 'test';
    });

});