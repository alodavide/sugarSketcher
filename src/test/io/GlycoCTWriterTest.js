/**
 * Created by Renaud on 05/07/2017.
 */


import GlycoCTParser from "../../js/io/glycoCT/GlycoCTparser";
import Anomericity from "../../js/glycomics/dictionary/Anomericity";
import Isomer from "../../js/glycomics/dictionary/Isomer";
import LinkedCarbon from "../../js/glycomics/dictionary/LinkedCarbon";
import MonosaccharideType from "../../js/glycomics/dictionary/MonosaccharideType";
import RingType from "../../js/glycomics/dictionary/RingType";
import AnomerCarbon from "../../js/glycomics/dictionary/AnomerCarbon";
import Sugar from "../../js/glycomics/Sugar";
import GlycoCTWriter from "../../js/io/glycoCT/GlycoCTWriter";
import Monosaccharide from "../../js/glycomics/nodes/Monosaccharide";
import GlycosidicLinkage from "../../js/glycomics/linkages/GlycosidicLinkage";

QUnit.module("Test GlycoCTWriterobject", {
});

QUnit.test( "Test empty sugar" , function( assert ) {
    var sugar = new Sugar("Sugar");
    var writer = new GlycoCTWriter(sugar);
    var formula = writer.exportGlycoCT();
    assert.ok(formula === "", 'Check empty formula');
});


QUnit.test( "Test one node" , function( assert ) {
    var root = new Monosaccharide("n1",MonosaccharideType.Gal,Anomericity.ALPHA, Isomer.D, RingType.P);
    var sugar = new Sugar("Sugar", root);
    var writer = new GlycoCTWriter(sugar);
    var formula = writer.exportGlycoCT();
    assert.ok(formula === "RES\n1b:a-dgal-HEX-1:5\n", 'Check one node');
});


QUnit.test( "Test two nodes" , function( assert ) {
    var root = new Monosaccharide("n1",MonosaccharideType.Gal,Anomericity.ALPHA, Isomer.D, RingType.P);
    var sugar = new Sugar("Sugar", root);

    var n2 = new Monosaccharide("n2",MonosaccharideType.Man, Anomericity.BETA, Isomer.L, RingType.F);
    var n3 = new Monosaccharide("n3",MonosaccharideType.Glc, Anomericity.UNDEFINED, Isomer.UNDEFINED, RingType.UNDEFINED);

    var e1 = new GlycosidicLinkage("e1", root, n2, AnomerCarbon.FOUR, LinkedCarbon.FOUR);
    var e2 = new GlycosidicLinkage("e2", n2, n3, AnomerCarbon.UNDEFINED, LinkedCarbon.UNDEFINED);

    sugar.addMonosaccharide(n2, e1);
    sugar.addMonosaccharide(n3, e2);

    var writer = new GlycoCTWriter(sugar);
    var formula = writer.exportGlycoCT();
    assert.ok(formula === "RES\n1b:a-dgal-HEX-1:5\n2b:b-lman-HEX-1:4\n3b:x-xglc-HEX-x:x\nLIN\n1:1o(4+4)2d\n2:2o(-1-1)3d\n", 'Check two nodes');
});