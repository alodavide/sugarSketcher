/**
 * Created by Renaud on 05/07/2017.
 */

import Substituent from "../../glycomics/nodes/Substituent";
import SubstituentType from "../../glycomics/dictionary/SubstituentType";
import SubstituentLinkage from "../../glycomics/linkages/SubstituentLinkage";
import GlycosidicLinkage from "../../glycomics/linkages/GlycosidicLinkage";
import GlycoCTSubstituents from "../../glycomics/dictionary/GlycoCTSubstituents";
import MonosaccharideType from "../../glycomics/dictionary/MonosaccharideType";
import LinkedCarbon from "../../glycomics/dictionary/LinkedCarbon";

export default class GlycoCTWriter{

    constructor(sugar){
        this.sugar = sugar;
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

    getSub(label)
    {
        for (var sub of SubstituentType)
        {
            if (sub.label.toLowerCase() === label.toLowerCase())
                return sub;
        }
    }

    getMono(name)
    {
        for (var mono of MonosaccharideType)
        {
            if (mono.name.toLowerCase() === name.toLowerCase())
                return mono;
        }
    }

    writeSub(i, substituent)
    {
        var formula = "";
        formula += i+1 + "s:";
        var subName = substituent.substituentType.name;
        var substituentType = "";
        for (var sub of GlycoCTSubstituents) {
            if (subName.toLowerCase() === sub.name.toLowerCase()) {
                substituentType = sub.glycoct;
            }
        }
        if (substituentType === "")
        {
            for (sub of SubstituentType) {
                if (subName.toLowerCase() === sub.name.toLowerCase()) {
                    substituentType = sub.name.toLowerCase();
                }
            }
        }
        formula += substituentType + "\n";
        return formula;
    }

    writeSubLink(i,source, target, linkedCarbon, anomerCarbon)
    {
        var formula = "";
        formula += i+1 + ":" + source + "d";

        formula += "(" + linkedCarbon;
        if (anomerCarbon != -1)
        {
            formula += "+";
        }
        formula += anomerCarbon + ")";

        formula += target + "n";

        formula += "\n";

        return formula;
    }

    writeMonoLink(i, source, target, linkedCarbon, anomerCarbon)
    {
        var formula = "";
        formula += i + ":" + source + "o";

        formula += "(" + linkedCarbon;
        if (anomerCarbon != -1)
        {
            formula += "+";
        }
        formula += anomerCarbon + ")";

        formula += target + "d";

        formula += "\n";

        return formula;
    }

    exportGlycoCT() {
        var resId = {};
        var res = this.sugar.graph.nodes();
        var associatedSubs = [];
        if (res.length === 0)
        {
            return "";
        }
        var linkNumber = 1;
        var formula = "RES\n";
        for (var i = 0; i < res.length; i++)
        {
            if (res[i] instanceof Substituent)
            {
                formula += this.writeSub(i,res[i]);
            }
            else
            {
                formula += i+1 + "b:";
                switch(res[i]._anomericity.name) {
                    case "ALPHA":
                        formula += "a";
                        break;
                    case "BETA":
                        formula += "b";
                        break;
                    default:
                        formula += "x";
                        break;
                }
                formula += "-";
                switch(res[i]._isomer.name) {
                    case "L":
                        formula += "l";
                        break;
                    case "D":
                        formula += "d";
                        break;
                    default:
                        formula += "x";
                        break;
                }
                if (this.getMono(res[i]._monosaccharideType.name.toLowerCase()) && res[i]._monosaccharideType.name.length > 3)
                {
                    formula += res[i]._monosaccharideType.name.toLowerCase().substring(0,3);
                    // Add the associated sub seperately
                    var assocSubType = this.getSub(res[i]._monosaccharideType.name.substring(3));
                    var assocSub = new Substituent(this.randomString(7),assocSubType);
                    associatedSubs.push([assocSub,i+1]);
                }
                else
                {
                    formula += res[i]._monosaccharideType.name.toLowerCase();
                }
                formula += "-";
                if (res[i]._monosaccharideType.superclass) {
                    formula += res[i]._monosaccharideType.superclass.toUpperCase();
                }

                else
                {
                    formula += "HEX";
                }

                formula += "-";

                switch (res[i]._ringType.name) {
                    case "P":
                        formula += "1:5";
                        break;
                    case "F":
                        formula += "1:4";
                        break;
                    default:
                        formula += "x:x";
                        break;
                }
            }

            formula += "\n";

            resId[res[i].id] = i+1;

        }
        for (var pair of associatedSubs)
        {
            var associatedSub = pair[0];
            formula += this.writeSub(i, associatedSub);
            i++;
            pair[0] = i;
        }

        if (this.sugar.graph.nodes().length > 1)
        {
            formula += "LIN\n";
            var edges = this.sugar.graph.edges();
            for (i = 0; i < edges.length; i++)
            {
                var source = resId[edges[i].sourceNode.getId()];

                var linkedCarbon = edges[i].linkedCarbon.value === "undefined" ? -1 : edges[i].linkedCarbon.value;
                var anomerCarbon = edges[i].anomerCarbon.value === "undefined" ? -1 : edges[i].anomerCarbon.value;

                var target = resId[edges[i].targetNode.getId()];

                if (edges[i] instanceof GlycosidicLinkage)
                {
                    formula += this.writeMonoLink(i+1, source, target, linkedCarbon, anomerCarbon);
                }
                else
                {
                    formula += this.writeSubLink(i+1, source, target, linkedCarbon, anomerCarbon);
                }
            }

            for (pair of associatedSubs)
            {
                formula += this.writeSubLink(i, pair[1],pair[0], -1, -1);
                i++;
            }

            if (formula.substring(formula.length-1) == '\n') // Remove final \n
            {
                formula = formula.substring(0,formula.length-1);
            }

        }
        return formula;
    }


}
