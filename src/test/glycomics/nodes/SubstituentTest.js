/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import Substituent from '../../../js/glycomics/nodes/Substituent';
import SubstituentType from '../../../js/glycomics/dictionary/SubstituentType';

QUnit.module("Test Substituent object", {
});

QUnit.test( "Create new Substituent" , function( assert ) {

    var subs = new Substituent('s',SubstituentType.NAcetyl);

    assert.ok(subs.getSubstituentType() === SubstituentType.NAcetyl,"SubstituentType Correct value");
    assert.ok(subs.getNodeId() === 's',"Id Correct value");
    assert.notOk(subs.getSubstituentType() === SubstituentType.UNDEFINED,"SubstituentType Uncorrect value");
    assert.notOk(subs.getNodeId() === 'ss',"Id Uncorrect value");
});

QUnit.test( "Create new Substituent - no type" , function( assert ) {

    var subs2 = new Substituent('t');

    assert.ok(subs2.getSubstituentType() === SubstituentType.UNDEFINED,"SubstituentType Correct value");
    assert.notOk(subs2.getSubstituentType() === SubstituentType.NGlycolyl,"SubstituentType Uncorrect value");

});

QUnit.test( "Create Monosaccharide Error" , function(assert) {
    assert.raises(function(){
        new Substituent('test','source1');
    });

    assert.raises(function(){
        new Substituent();
    });
});