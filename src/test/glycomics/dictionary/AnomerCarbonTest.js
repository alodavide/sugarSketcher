/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import AnomerCarbon from "../../../js/models/glycomics/dictionary/AnomerCarbon";

QUnit.module("Test AnomerCarbon enum", {
});

QUnit.test( "Test AnomerCarbon value" , function( assert ) {

    assert.ok(AnomerCarbon.ONE.value === 1);
    assert.ok(AnomerCarbon.UNDEFINED.value === 'undefined');
    assert.notOk(AnomerCarbon.ONE.value === 3);
    assert.notOk(AnomerCarbon.UNDEFINED.value === 'ciao');
});


QUnit.test( "Get by Name" , function( assert ) {

    assert.ok(AnomerCarbon.enumValueOf('ONE').value === 1);
    assert.ok(AnomerCarbon.enumValueOf('UNDEFINED').value === 'undefined');
    assert.ok(AnomerCarbon.enumValueOf('UNDEFINED') === AnomerCarbon.UNDEFINED);
    assert.ok(AnomerCarbon.enumValueOf('ONE') === AnomerCarbon.ONE);
    assert.notOk(AnomerCarbon.enumValueOf('UNDEFINED').value === 3);
    assert.notOk(AnomerCarbon.enumValueOf('UNDEFINED').value === 'ciao');
});