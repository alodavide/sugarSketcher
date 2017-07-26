/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import LinkedCarbon from "../../../js/models/glycomics/dictionary/LinkedCarbon";

QUnit.module("Test LinkedCarbon enum", {
});

QUnit.test( "Test LinkedCarbon value" , function( assert ) {

    assert.ok(LinkedCarbon.ONE.value === 1);
    assert.ok(LinkedCarbon.UNDEFINED.value === 'undefined');
    assert.notOk(LinkedCarbon.ONE.value === 3);
    assert.notOk(LinkedCarbon.UNDEFINED.value === 'ciao');
});

