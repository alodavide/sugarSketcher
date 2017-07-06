/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import Sugar from '../../glycomics/Sugar';
import Anomericity from '../../glycomics/dictionary/Anomericity';
import MonosaccharideType from "../../glycomics/dictionary/MonosaccharideType";
import Isomer from "../../glycomics/dictionary/Isomer";
import RingType from "../../glycomics/dictionary/RingType";
import SubstituentType from "../../glycomics/dictionary/SubstituentType";
import Monosaccharide from "../../glycomics/nodes/Monosaccharide";
import AnomerCarbon from "../../glycomics/dictionary/AnomerCarbon";
import LinkedCarbon from "../../glycomics/dictionary/LinkedCarbon";
import Substituent from "../../glycomics/nodes/Substituent";
import SubstituentLinkage from "../../glycomics/linkages/SubstituentLinkage";

export default class GlycoCTParser{

    constructor(formula){
        this.formula = formula;
    }

    randomString(length) {
        // Possible chars in the generated string
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');

        if (! length) { // If no length specified, get a random length
            length = Math.floor(Math.random() * chars.length);
        }

        var str = '';
        for (var i = 0; i < length; i++) { // Add random chars till length is the one specified
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }


    createResidue(residue, linkedCarbon, anomerCarbon)
    {
        if (residue[0].substring(1) === "b") { // monosaccharide
            var anomericity;
            for (var anom of Anomericity)
            {
                if (residue[1].substring(0, 1) === "a")
                {
                    anomericity = Anomericity.ALPHA;
                }
                else if (residue[1].substring(0, 1) === "b")
                {
                    anomericity = Anomericity.BETA;
                }
                else
                {
                    anomericity = Anomericity.UNDEFINED;
                }
            }
            var dashSplit = residue[1].split("-");
            var stemType = dashSplit[1];
            var isomer;
            for (var isom of Isomer)
            {
                if (stemType.substring(0, 1) === "x")
                {
                    isomer = Isomer.UNDEFINED;
                }
                    if (stemType.substring(0, 1) === isom.name.toLowerCase())
                {
                    isomer = isom;
                }
            }
            stemType = stemType.substring(1);
            for (var mono of MonosaccharideType)
            {
                if (mono.name.toLowerCase() === stemType)
                {
                    stemType = mono;
                }
            }
            var superclass = dashSplit[2];
            var ringStart = dashSplit[3];
            var ringStop = residue[2].substring(0, 1);
            var ringType;
            if (ringStart === "1")
            {
                if (ringStop === "4")
                {
                    ringType = RingType.F;
                }
                else if (ringStop === "5")
                {
                    ringType = RingType.P;
                }
                else
                {
                    ringType = RingType.UNDEFINED;
                }

            }

            /*var shape, color;
            for (var type of sb.MonosaccharideType)
            {
                if (type.name.toLowerCase() === stemType)
                {
                    shape = type.shape;
                    if (type.bisected) {
                        shape = "bisected"+shape;
                    }
                    for (var colorChoice in colorDivisions)
                    {
                        if (colorDivisions[colorChoice].display_division === type.color) {
                            color = colorDivisions[colorChoice].division;
                        }
                    }
                }
            }*/

            var nodeId = this.randomString(7);
            var node = new Monosaccharide(nodeId,stemType, anomericity, isomer, ringType);
            if (linkedCarbon === "r" && anomerCarbon === "r") // Root
            {
                this.sugar = new Sugar("Sugar", node);
            }
            else
            {
                var ac;
                for (var anomC of AnomerCarbon)
                {
                    if (anomerCarbon === "?")
                    {
                        ac = AnomerCarbon.UNDEFINED;
                    }
                    if (parseInt(anomerCarbon) === anomC.value)
                    {
                        ac = anomC;
                    }
                }
                var lc;
                for (var linkedC of LinkedCarbon)
                {
                    if (linkedCarbon === "?")
                    {
                        lc = LinkedCarbon.UNDEFINED;
                    }
                    if (parseInt(linkedCarbon) === linkedC.value)
                    {
                        lc = linkedC;
                    }
                }
                this.sugar.addMonosaccharideWithLinkage(this.clickedNode, node, ac, lc);
            }
            return nodeId;
        }
        else if (residue[0].substring(1) === "s") { // substituent
            var subName = residue[1].substring(2);
            var substituentType;
            for (var sub of SubstituentType) {
                if (subName === sub.name.toLowerCase()) {
                    substituentType = sub;
                }
            }
            var subId = this.randomString(7);
            var substituent = new Substituent(subId,substituentType);
            var subLinkage = new SubstituentLinkage(this.randomString(7), this.clickedNode, substituent, LinkedCarbon.UNDEFINED);
            this.sugar.addSubstituent(substituent, subLinkage);
        }
    }


    parseGlycoCT() {
        if (this.formula === "") {
            return new Sugar("Sugar");
        }
        var res = this.formula.split("LIN")[0].split("\n");
        var links;
        if (! this.formula.split("LIN")[1]) // Only one node without links
        {
            if (!res[1]) // wrong formula
            {
                return new Sugar("Sugar");
            }
            this.createResidue(res[1].split(":"), "r", "r");
            return this.sugar;
        }
        else
        {
            links = this.formula.split("LIN")[1].split("\n");
        }
        var residueListById = [""];
        var nodesIds = {};
        if (res[0] === "RES") {
            res[0] = "";
            for (var residueId in res) {
                if (res[residueId] !== "") {
                    var residue = res[residueId].split(':');
                    residueListById.push(residue);
                }
            }

            // Get link
            for (var linkId in links) {
                if (links[linkId] !== "") {
                    var link = links[linkId];
                    var sourceId = link.substring(2,3);
                    var nodeId;
                    if (residueListById[sourceId] !== "") // Root
                    {
                        nodeId = this.createResidue(residueListById[sourceId], "r", "r");
                        residueListById[sourceId] = "";
                        nodesIds[sourceId] = nodeId;

                    }
                    var targetId = link.split(")")[1].substring(0,1);
                    var linkages = link.split(/[\(\)]+/)[1];
                    var linkedCarbon, anomerCarbon;
                    if (linkages.substring(0, 2) === "-1") { // if linkedcarbon is undefined
                        linkedCarbon = "?";
                        anomerCarbon = linkages.substring(2, 4) === "-1" ? "?" : linkages.substring(3, 4);
                    }
                    else {
                        linkedCarbon = linkages.substring(0, 1);
                        anomerCarbon = linkages.substring(2, 4) === "-1" ? "?" : linkages.substring(2, 3);
                    }
                    for (var node of this.sugar.graph.nodes()) { // clickedNode = sourceNode
                        if (node.id === nodesIds[sourceId]) {
                            this.clickedNode = node;
                        }
                    }
                    nodeId = this.createResidue(residueListById[targetId],linkedCarbon, anomerCarbon);
                    residueListById[targetId] = "";
                    nodesIds[targetId] = nodeId;
                }
            }
        }
        return this.sugar;
    }
}
