/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import DonorPosition from "../../../js/models/glycomics/dictionary/DonorPosition";

QUnit.module("Test DonorPosition enum", {
});

QUnit.test( "Test DonorPosition value" , function( assert ) {

    assert.ok(DonorPosition.ONE.value === 1);
    assert.ok(DonorPosition.UNDEFINED.value === 'undefined');
    assert.notOk(DonorPosition.ONE.value === 3);
    assert.notOk(DonorPosition.UNDEFINED.value === 'ciao');
});

