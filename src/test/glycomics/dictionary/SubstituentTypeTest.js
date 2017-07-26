/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import SubstituentType from "../../../js/models/glycomics/dictionary/SubstituentType";

QUnit.module("Test SubstituentType enum", {
});

QUnit.test( "Test SubstituentType object" , function( assert ) {

    assert.ok(SubstituentType.NAcetyl.label === 'NAc');
    assert.notOk(SubstituentType.NAcetyl.label === 'NAcasa');
});


