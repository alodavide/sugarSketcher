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