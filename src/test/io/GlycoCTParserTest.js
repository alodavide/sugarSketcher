/**
 * Created by Renaud on 05/07/2017.
 */



QUnit.module("Test GlycoCTParser object", {
});

QUnit.test( "Test empty sugar" , function( assert ) {

    var formula = "";
    var parser = new GlycoCTParser("");
    assert.ok(sugar.getRootNode() === null, 'Check root object');
    assert.ok(sugar.length === 0, 'Check length');
});