/**
 * Created by Renaud on 05/07/2017.
 */


import GlycoCTParser from "../../js/models/io/glycoCT/GlycoCTparser";
import Anomericity from "../../js/models/glycomics/dictionary/Anomericity";
import Isomer from "../../js/models/glycomics/dictionary/Isomer";
import DonorPosition from "../../js/models/glycomics/dictionary/DonorPosition";
import AcceptorPosition from "../../js/models/glycomics/dictionary/AcceptorPosition";
import GlycoCTWriter from "../../js/models/io/glycoCT/GlycoCTWriter";
import MonosaccharideGlycoCT from "../../js/models/io/glycoCT/MonosaccharideGlycoCT";
import MonosaccharideType from "../../js/views/glycomics/dictionary/MonosaccharideType";
import SubstituentType from "../../js/models/glycomics/dictionary/SubstituentType";
import SubstituentsGlycoCT from "../../js/models/io/glycoCT/SubstituentsGlycoCT";

QUnit.module("Test GlycoCTParser object", {
});

QUnit.test( "Test empty glycan" , function( assert ) {

    var formula = "";
    var parser = new GlycoCTParser(formula);
    var glycan = parser.parseGlycoCT();
    assert.ok(glycan.size() === 0, 'Check length');
});

QUnit.test( "Test one monosaccharide" , function( assert ) {

    var formula = "RES\n1b:a-dglc-HEX-1:5";
    var parser = new GlycoCTParser(formula);
    var glycan = parser.parseGlycoCT();
    assert.ok(glycan.graph.nodes().length === 1, 'Nodes length');
    assert.ok(glycan.graph.edges().length === 0, 'Edges length');
    assert.ok(glycan.graph.nodes()[0].anomericity === Anomericity.ALPHA, 'Anomericity');
    assert.ok(glycan.graph.nodes()[0].isomer === Isomer.D, 'Isomer');
    assert.ok(glycan.graph.nodes()[0].monosaccharideType === MonosaccharideType.Glc);
});

QUnit.test( "Test two monosaccharide" , function( assert ) {

    var formula = "RES\n1b:a-dglc-HEX-1:5\n2b:b-lglc-HEX-1:5\nLIN\n1:1o(-1+1)2d";
    var parser = new GlycoCTParser(formula);
    var glycan = parser.parseGlycoCT();
    assert.ok(glycan.graph.nodes().length === 2, 'Nodes length');
    assert.ok(glycan.graph.edges().length === 1, 'Edges length');
    assert.ok(glycan.graph.nodes()[0].anomericity === Anomericity.ALPHA, 'Anomericity');
    assert.ok(glycan.graph.nodes()[0].isomer === Isomer.D, 'Isomer');
    assert.ok(glycan.graph.nodes()[1].anomericity === Anomericity.BETA, 'Anomericity');
    assert.ok(glycan.graph.nodes()[1].isomer === Isomer.L, 'Isomer');
    assert.ok(glycan.graph.edges()[0].DonorPosition === DonorPosition.UNDEFINED, 'DonorPosition');
    assert.ok(glycan.graph.edges()[0].acceptorPosition === AcceptorPosition.ONE, 'AcceptorPosition');
});

const isoExceptions = ["Hex","dHex","HexA","ddHex","HexNAc","Oli","Abe","Col","Nonu","LDManHep","DDManHep"];
const ringExceptions = ["Kdn", "KdnNAc", "KdnGc", "KdnN", "Kdo", "Fru"];

QUnit.test("Single Monosaccharide kind", function(assert) {
    for (var monoType of MonosaccharideGlycoCT)
    {
        var formula = "RES\n1b:a-";
        if (!isoExceptions.includes(monoType.name))
        {
            formula += "d";
        }
        formula += monoType.glycoct;
        if (!ringExceptions.includes(monoType.name))
        {
            formula += "-1:4";
        }
        formula += monoType.transform;
        var parser = new GlycoCTParser(formula);
        var glycan = parser.parseGlycoCT();
        assert.ok(MonosaccharideType[glycan.graph.nodes()[0].monosaccharideType.name] !== undefined);
    }
});

const hexoses = ["Hex","Glc","Man","Gal","Gul","Alt","All","Tal","Ido"];
const dhexoses = ["dHex","Qui","Rha","SixdAlt","SixdTal","Fuc"];

QUnit.test("Monosaccharide + Substituant", function(assert) {
    var formula, hexose, dhexose, parser, glycan;
    for (hexose of hexoses) {
        formula = "RES\n1b:a-";
        if (hexose != "Hex") {
            formula += "d";
        }
        formula += MonosaccharideGlycoCT[hexose].glycoct + "-1:4" + MonosaccharideGlycoCT[hexose].transform;
        formula += "\n2s:n-acetyl\n";
        formula += "LIN\n1:1d(2+1)2n";
        parser = new GlycoCTParser(formula);
        glycan = parser.parseGlycoCT();
        assert.ok(glycan.graph.nodes()[0].monosaccharideType === MonosaccharideType[hexose + "NAc"]);
    }
    for (hexose of hexoses) {
        formula = "RES\n1b:a-";
        if (hexose != "Hex") {
            formula += "d";
        }
        formula += MonosaccharideGlycoCT[hexose].glycoct + "-1:4" + MonosaccharideGlycoCT[hexose].transform;
        formula += "\n2s:amino\n";
        formula += "LIN\n1:1d(2+1)2n";
        parser = new GlycoCTParser(formula);
        glycan = parser.parseGlycoCT();
        assert.ok(glycan.graph.nodes()[0].monosaccharideType === MonosaccharideType[hexose + "N"]);
    }
    for (dhexose of dhexoses) {
        formula = "RES\n1b:a-";
        if (dhexose != "dHex") {
            formula += "d";
        }
        formula += MonosaccharideGlycoCT[dhexose].glycoct + "-1:4" + MonosaccharideGlycoCT[dhexose].transform;
        formula += "\n2s:n-acetyl\n";
        formula += "LIN\n1:1d(2+1)2n";
        parser = new GlycoCTParser(formula);
        glycan = parser.parseGlycoCT();
        if (dhexose === "SixdAlt" || dhexose === "SixdTal") {
            assert.notOk(glycan.graph.nodes()[0].monosaccharideType === MonosaccharideType[dhexose + "NAc"]);
        }
        else {
            assert.ok(glycan.graph.nodes()[0].monosaccharideType === MonosaccharideType[dhexose + "NAc"]);
        }
    }

    // Special cases
    // Neu
    formula = "RES\n1b:a-d" + MonosaccharideGlycoCT.Kdn.glycoct + MonosaccharideGlycoCT.Kdn.transform + "\n2s:n-acetyl\nLIN\n1:1d(5+1)2n";
    parser = new GlycoCTParser(formula);
    glycan = parser.parseGlycoCT();
    assert.ok(glycan.graph.nodes()[0].monosaccharideType === MonosaccharideType.Neu5Ac);
    formula = "RES\n1b:a-d" + MonosaccharideGlycoCT.Kdn.glycoct + MonosaccharideGlycoCT.Kdn.transform + "\n2s:amino\nLIN\n1:1d(5+1)2n";
    parser = new GlycoCTParser(formula);
    glycan = parser.parseGlycoCT();
    assert.ok(glycan.graph.nodes()[0].monosaccharideType === MonosaccharideType.Neu);
    formula = "RES\n1b:a-d" + MonosaccharideGlycoCT.Kdn.glycoct + MonosaccharideGlycoCT.Kdn.transform + "\n2s:n-glycolyl\nLIN\n1:1d(5+1)2n";
    parser = new GlycoCTParser(formula);
    glycan = parser.parseGlycoCT();
    assert.ok(glycan.graph.nodes()[0].monosaccharideType === MonosaccharideType.Neu5Gc);

    // Mur
    formula = "RES\n1b:a-d" + MonosaccharideGlycoCT.Mur.glycoct + MonosaccharideGlycoCT.Mur.transform + "-1:4\n2s:n-acetyl\nLIN\n1:1d(5+1)2n";
    parser = new GlycoCTParser(formula);
    glycan = parser.parseGlycoCT();
    assert.ok(glycan.graph.nodes()[0].monosaccharideType === MonosaccharideType.MurNAc);

    formula = "RES\n1b:a-d" + MonosaccharideGlycoCT.Mur.glycoct + MonosaccharideGlycoCT.Mur.transform + "-1:4\n2s:n-glycolyl\nLIN\n1:1d(5+1)2n";
    parser = new GlycoCTParser(formula);
    glycan = parser.parseGlycoCT();
    assert.ok(glycan.graph.nodes()[0].monosaccharideType === MonosaccharideType.MurNGc);

});

QUnit.test("Substituents", function(assert) {
    const exclude = [SubstituentType.NAcetyl,SubstituentType.Amino,SubstituentType.NGlycolyl];
    for (var subType of SubstituentType)
    {
        if (!exclude.includes(subType))
        {
            var formula = "RES\n1b:a-HEX-1:4\n2s:"+SubstituentsGlycoCT[subType.name].glycoct+"\nLIN\n1:1d(1-1)2n";
            var parser = new GlycoCTParser(formula);
            var glycan = parser.parseGlycoCT();
            assert.ok(glycan.graph.nodes()[0].monosaccharideType === MonosaccharideType.Hex);
            assert.ok(glycan.graph.nodes()[1].substituentType === subType);
            assert.ok(glycan.graph.edges()[0].DonorPosition === DonorPosition.ONE);
        }
    }
});