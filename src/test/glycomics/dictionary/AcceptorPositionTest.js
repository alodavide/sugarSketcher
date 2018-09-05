/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import AcceptorPosition from "../../../js/models/glycomics/dictionary/AcceptorPosition";

QUnit.module("Test AcceptorPosition enum", {
});

QUnit.test( "Test AcceptorPosition value" , function( assert ) {

    assert.ok(AcceptorPosition.ONE.value === 1);
    assert.ok(AcceptorPosition.UNDEFINED.value === 'undefined');
    assert.notOk(AcceptorPosition.ONE.value === 3);
    assert.notOk(AcceptorPosition.UNDEFINED.value === 'ciao');
});


QUnit.test( "Get by Name" , function( assert ) {

    assert.ok(AcceptorPosition.enumValueOf('ONE').value === 1);
    assert.ok(AcceptorPosition.enumValueOf('UNDEFINED').value === 'undefined');
    assert.ok(AcceptorPosition.enumValueOf('UNDEFINED') === AcceptorPosition.UNDEFINED);
    assert.ok(AcceptorPosition.enumValueOf('ONE') === AcceptorPosition.ONE);
    assert.notOk(AcceptorPosition.enumValueOf('UNDEFINED').value === 3);
    assert.notOk(AcceptorPosition.enumValueOf('UNDEFINED').value === 'ciao');
});