/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import AnomerCarbon from "../../../js/glycomics/dictionary/AnomerCarbon";

QUnit.module("Test AnomerCarbon enum", {
});

QUnit.test( "Test AnomerCarbon value" , function( assert ) {

    assert.ok(AnomerCarbon.ONE.value === 1);
    assert.ok(AnomerCarbon.UNDEFINED.value === 'undefined');
    assert.notOk(AnomerCarbon.ONE.value === 3);
    assert.notOk(AnomerCarbon.UNDEFINED.value === 'ciao');
});
