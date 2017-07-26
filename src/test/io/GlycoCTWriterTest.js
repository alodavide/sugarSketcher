/**
 * Created by Renaud on 05/07/2017.
 */


import Anomericity from "../../js/models/glycomics/dictionary/Anomericity";
import Isomer from "../../js/models/glycomics/dictionary/Isomer";
import LinkedCarbon from "../../js/models/glycomics/dictionary/LinkedCarbon";
import MonosaccharideType from "../../js/views/glycomics/dictionary/MonosaccharideType";
import RingType from "../../js/models/glycomics/dictionary/RingType";
import AnomerCarbon from "../../js/models/glycomics/dictionary/AnomerCarbon";
import Sugar from "../../js/models/glycomics/Sugar";
import GlycoCTWriter from "../../js/models/io/glycoCT/GlycoCTWriter";
import Monosaccharide from "../../js/models/glycomics/nodes/Monosaccharide";
import GlycosidicLinkage from "../../js/models/glycomics/linkages/GlycosidicLinkage";
import MonosaccharideGlycoCT from "../../js/models/io/glycoCT/MonosaccharideGlycoCT";

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
    var tree = {"depth":0,"node":root};
    var writer = new GlycoCTWriter(sugar, tree);
    var formula = writer.exportGlycoCT();
    assert.ok(formula === "RES\n1b:a-dgal-HEX-1:5", 'Check one node');
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

    var tree = {"depth":0,"node":root,"children":[{"depth":1,"node":n2,"parent":{"node":root},"children":[{"depth":2,"node":n3,"parent":{"node":n2}}]}]};
    var writer = new GlycoCTWriter(sugar, tree);
    var formula = writer.exportGlycoCT();
    assert.ok(formula === "RES\n1b:a-dgal-HEX-1:5\n2b:b-lman-HEX-1:4\n3b:x-xglc-HEX-x:x\nLIN\n1:1o(4+4)2d\n2:2o(-1-1)3d", 'Check two nodes');
});




// Tests for every kind of Monosaccharide

QUnit.test("Single monosaccharide kind", function(assert) {
    for (var monoType of MonosaccharideType) {
        var node = new Monosaccharide("id", monoType, Anomericity.ALPHA, Isomer.D, RingType.F);
        var sugar = new Sugar("Sugar", node);
        var tree = {"depth": 0, "node": node};
        var writer = new GlycoCTWriter(sugar, tree);
        var formula = writer.exportGlycoCT();

        if (monoType.name.substring(monoType.name.length - 3) !== "NAc" &&
            monoType.name.substring(monoType.name.length - 1) !== "N" &&
            monoType.name.substring(monoType.name.length - 2) !== "Gc" &&
            monoType.name.substring(monoType.name.length - 3) !== "NGc" &&
            monoType.name.substring(monoType.name.length - 2) !== "Ac" &&
            monoType.name !== "Neu") {
            assert.ok(formula === "RES\n1b:a-d" + MonosaccharideGlycoCT[monoType.name].glycoct + "-1:4" + MonosaccharideGlycoCT[monoType.name].transform ||
                formula === "RES\n1b:a-" + MonosaccharideGlycoCT[monoType.name].glycoct + "-1:4" + MonosaccharideGlycoCT[monoType.name].transform ||
                formula === "RES\n1b:a-" + MonosaccharideGlycoCT[monoType.name].glycoct + MonosaccharideGlycoCT[monoType.name].transform ||
                formula === "RES\n1b:a-d" + MonosaccharideGlycoCT[monoType.name].glycoct + MonosaccharideGlycoCT[monoType.name].transform);
        }
    }
});

QUnit.test("Monosaccharide + Substituant", function(assert) {
    for (var monoType of MonosaccharideType) {
        var node = new Monosaccharide("id", monoType, Anomericity.ALPHA, Isomer.D, RingType.F);
        var sugar = new Sugar("Sugar", node);
        var tree = {"depth": 0, "node": node};
        var writer = new GlycoCTWriter(sugar, tree);
        var formula = writer.exportGlycoCT();

        if (!(monoType.name.substring(monoType.name.length - 3) !== "NAc" &&
            monoType.name.substring(monoType.name.length - 1) !== "N" &&
            monoType.name.substring(monoType.name.length - 2) !== "Gc" &&
            monoType.name.substring(monoType.name.length - 3) !== "NGc" &&
            monoType.name.substring(monoType.name.length - 2) !== "Ac" &&
            monoType.name !== "Neu")) {
            if (monoType.name.substring(monoType.name.length - 3) === "NAc") {
                monoType.name = monoType.name.substring(0,monoType.name.length-3);
                assert.ok(formula === "RES\n1b:a-d" + MonosaccharideGlycoCT[monoType.name].glycoct + "-1:4" + MonosaccharideGlycoCT[monoType.name].transform + "\n2s:n-acetyl\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-" + MonosaccharideGlycoCT[monoType.name].glycoct + "-1:4" + MonosaccharideGlycoCT[monoType.name].transform + "\n2s:n-acetyl\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-" + MonosaccharideGlycoCT[monoType.name].glycoct + MonosaccharideGlycoCT[monoType.name].transform + "\n2s:n-acetyl\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-d" + MonosaccharideGlycoCT[monoType.name].glycoct + MonosaccharideGlycoCT[monoType.name].transform + "\n2s:n-acetyl\nLIN\n1:1d(-1-1)2n");
            }
            else if (monoType.name === "Neu5Ac") {
                assert.ok(formula === "RES\n1b:a-d" + MonosaccharideGlycoCT.Kdn.glycoct + "-1:4" + MonosaccharideGlycoCT.Kdn.transform + "\n2s:n-acetyl\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-" + MonosaccharideGlycoCT.Kdn.glycoct + "-1:4" + MonosaccharideGlycoCT.Kdn.transform + "\n2s:n-acetyl\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-" + MonosaccharideGlycoCT.Kdn.glycoct + MonosaccharideGlycoCT.Kdn.transform + "\n2s:n-acetyl\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-d" + MonosaccharideGlycoCT.Kdn.glycoct + MonosaccharideGlycoCT.Kdn.transform + "\n2s:n-acetyl\nLIN\n1:1d(-1-1)2n");
            }
            else if (monoType.name.substring(monoType.name.length - 2) === "Ac") {
                monoType.name = monoType.name.substring(0,monoType.name.length-2);
                assert.ok(formula === "RES\n1b:a-d" + MonosaccharideGlycoCT[monoType.name].glycoct + "-1:4" + MonosaccharideGlycoCT[monoType.name].transform + "\n2s:n-acetyl\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-" + MonosaccharideGlycoCT[monoType.name].glycoct + "-1:4" + MonosaccharideGlycoCT[monoType.name].transform + "\n2s:n-acetyl\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-" + MonosaccharideGlycoCT[monoType.name].glycoct + MonosaccharideGlycoCT[monoType.name].transform + "\n2s:n-acetyl\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-d" + MonosaccharideGlycoCT[monoType.name].glycoct + MonosaccharideGlycoCT[monoType.name].transform + "\n2s:n-acetyl\nLIN\n1:1d(-1-1)2n");
            }
            else if (monoType.name.substring(monoType.name.length - 1) === "N") {
                monoType.name = monoType.name.substring(0,monoType.name.length-1);
                assert.ok(formula === "RES\n1b:a-d" + MonosaccharideGlycoCT[monoType.name].glycoct + "-1:4" + MonosaccharideGlycoCT[monoType.name].transform + "\n2s:amino\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-" + MonosaccharideGlycoCT[monoType.name].glycoct + "-1:4" + MonosaccharideGlycoCT[monoType.name].transform + "\n2s:amino\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-" + MonosaccharideGlycoCT[monoType.name].glycoct + MonosaccharideGlycoCT[monoType.name].transform + "\n2s:amino\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-d" + MonosaccharideGlycoCT[monoType.name].glycoct + MonosaccharideGlycoCT[monoType.name].transform + "\n2s:amino\nLIN\n1:1d(-1-1)2n");
            }
            else if (monoType.name === "Neu")
            {
                assert.ok(formula === "RES\n1b:a-d" + MonosaccharideGlycoCT.Kdn.glycoct + "-1:4" + MonosaccharideGlycoCT.Kdn.transform + "\n2s:amino\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-" + MonosaccharideGlycoCT.Kdn.glycoct + "-1:4" + MonosaccharideGlycoCT.Kdn.transform + "\n2s:amino\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-" + MonosaccharideGlycoCT.Kdn.glycoct + MonosaccharideGlycoCT.Kdn.transform + "\n2s:amino\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-d" + MonosaccharideGlycoCT.Kdn.glycoct + MonosaccharideGlycoCT.Kdn.transform + "\n2s:amino\nLIN\n1:1d(-1-1)2n");
            }
            else if (monoType.name === "5Gc") {
                assert.ok(formula === "RES\n1b:a-d" + MonosaccharideGlycoCT.Kdn.glycoct + "-1:4" + MonosaccharideGlycoCT.Kdn.transform + "\n2s:n-glycolyl\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-" + MonosaccharideGlycoCT.Kdn.glycoct + "-1:4" + MonosaccharideGlycoCT.Kdn.transform + "\n2s:n-glycolyl\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-" + MonosaccharideGlycoCT.Kdn.glycoct + MonosaccharideGlycoCT.Kdn.transform + "\n2s:n-glycolyl\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-d" + MonosaccharideGlycoCT.Kdn.glycoct + MonosaccharideGlycoCT.Kdn.transform + "\n2s:n-glycolyl\nLIN\n1:1d(-1-1)2n");
            }
            else if (monoType.name.substring(monoType.name.length - 3) === "NGc") {
                monoType.name = monoType.name.substring(0,monoType.name.length-3);
                assert.ok(formula === "RES\n1b:a-d" + MonosaccharideGlycoCT[monoType.name].glycoct + "-1:4" + MonosaccharideGlycoCT[monoType.name].transform + "\n2s:n-glycolyl\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-" + MonosaccharideGlycoCT[monoType.name].glycoct + "-1:4" + MonosaccharideGlycoCT[monoType.name].transform + "\n2s:n-glycolyl\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-" + MonosaccharideGlycoCT[monoType.name].glycoct + MonosaccharideGlycoCT[monoType.name].transform + "\n2s:n-glycolyl\nLIN\n1:1d(-1-1)2n" ||
                    formula === "RES\n1b:a-d" + MonosaccharideGlycoCT[monoType.name].glycoct + MonosaccharideGlycoCT[monoType.name].transform + "\n2s:n-glycolyl\nLIN\n1:1d(-1-1)2n");
            }
        }
    }
});