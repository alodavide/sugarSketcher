/**
 * Created by Renaud on 05/07/2017.
 */


import GlycoCTParser from "../../js/io/glycoCT/GlycoCTparser";
import Anomericity from "../../js/glycomics/dictionary/Anomericity";
import Isomer from "../../js/glycomics/dictionary/Isomer";
import LinkedCarbon from "../../js/glycomics/dictionary/LinkedCarbon";
import AnomerCarbon from "../../js/glycomics/dictionary/AnomerCarbon";
import GlycoCTWriter from "../../js/io/glycoCT/GlycoCTWriter";

QUnit.module("Test GlycoCTParser object", {
});

QUnit.test( "Test empty sugar" , function( assert ) {

    var formula = "";
    var parser = new GlycoCTParser(formula);
    var sugar = parser.parseGlycoCT();
    assert.ok(sugar.size() === 0, 'Check length');
});

QUnit.test( "Test one monosaccharide" , function( assert ) {

    var formula = "RES\n1b:a-dglc-HEX-1:5";
    var parser = new GlycoCTParser(formula);
    var sugar = parser.parseGlycoCT();
    assert.ok(sugar.graph.nodes().length === 1, 'Nodes length');
    assert.ok(sugar.graph.edges().length === 0, 'Edges length');
    assert.ok(sugar.graph.nodes()[0].anomericity === Anomericity.ALPHA, 'Anomericity');
    assert.ok(sugar.graph.nodes()[0].isomer === Isomer.D, 'Isomer');
});

QUnit.test( "Test two monosaccharide" , function( assert ) {

    var formula = "RES\n1b:a-dglc-HEX-1:5\n2b:b-lglc-HEX-1:5\nLIN\n1:1o(-1+1)2d";
    var parser = new GlycoCTParser(formula);
    var sugar = parser.parseGlycoCT();
    assert.ok(sugar.graph.nodes().length === 2, 'Nodes length');
    assert.ok(sugar.graph.edges().length === 1, 'Edges length');
    assert.ok(sugar.graph.nodes()[0].anomericity === Anomericity.ALPHA, 'Anomericity');
    assert.ok(sugar.graph.nodes()[0].isomer === Isomer.D, 'Isomer');
    assert.ok(sugar.graph.nodes()[1].anomericity === Anomericity.BETA, 'Anomericity');
    assert.ok(sugar.graph.nodes()[1].isomer === Isomer.L, 'Isomer');
    assert.ok(sugar.graph.edges()[0].linkedCarbon === LinkedCarbon.UNDEFINED, 'LinkedCarbon');
    assert.ok(sugar.graph.edges()[0].anomerCarbon === AnomerCarbon.ONE, 'AnomerCarbon');
});


QUnit.test( "Test Parser Writer" , function( assert ) {

    var formulaInput ="RES\n1b:x-dglc-HEX-1:5\n2b:x-dglc-HEX-1:5\n3b:x-dgal-HEX-1:5\n4b:x-dgal-HEX-1:5\n5b:x-lgal-HEX-1:5\n6s:n-acetyl\n7s:n-acetyl\n8s:n-acetyl\nLIN\n1:1o(1+1)2d\n2:2o(2+1)3d\n3:3o(3+1)4d\n4:4o(4+1)5d\n5:2d(-1-1)6n\n6:3d(-1-1)7n\n7:4d(-1-1)8n";
    var parser = new GlycoCTParser(formulaInput);
    var sugar = parser.parseGlycoCT();
    var writer = new GlycoCTWriter(sugar);
    var formulaOutput = writer.exportGlycoCT();
    assert.ok(formulaInput === formulaOutput, 'Input == Output');
});