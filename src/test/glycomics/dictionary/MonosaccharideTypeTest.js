/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import MonosaccharideType from "../../../js/views/glycomics/dictionary/MonosaccharideType";

QUnit.module("Test MonosaccharideType enum", {
});

QUnit.test( "Test Monosaccharide object" , function( assert ) {

    assert.ok(MonosaccharideType.Glc.shape === 'circle');
    assert.ok(MonosaccharideType.Glc.bisected === false);
    assert.ok(MonosaccharideType.Glc.color === '#0080FF');

    assert.notOk(MonosaccharideType.Glc.shape === 3);
    assert.notOk(MonosaccharideType.Glc.bisected === 3);
    assert.notOk(MonosaccharideType.Glc.color === 3);

});

