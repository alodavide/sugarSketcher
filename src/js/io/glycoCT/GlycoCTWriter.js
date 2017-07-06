/**
 * Created by Renaud on 05/07/2017.
 */

import Substituent from "../../glycomics/nodes/Substituent";
import SubstituentType from "../../glycomics/dictionary/SubstituentType";
import SubstituentLinkage from "../../glycomics/linkages/SubstituentLinkage";
import GlycosidicLinkage from "../../glycomics/linkages/GlycosidicLinkage";
import GlycoCTSubstituents from "../../glycomics/dictionary/GlycoCTSubstituents";
export default class GlycoCTWriter{

    constructor(sugar){
        this.sugar = sugar;
    }

    exportGlycoCT() {
        var resId = {};
        var res = this.sugar.graph.nodes();
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
                formula += i+1 + "s:";
                var subName = res[i].substituentType.name;
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
                formula += substituentType;
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
                formula += res[i]._monosaccharideType.name.toLowerCase()+"-";
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

        if (this.sugar.graph.nodes().length > 1)
        {
            formula += "LIN\n";
            var edges = this.sugar.graph.edges();
            for (i = 0; i < edges.length; i++)
            {
                formula += i+1 + ":";

                formula += resId[edges[i].sourceNode.getId()];

                if (edges[i] instanceof GlycosidicLinkage){
                    formula += "o";
                }
                else
                {
                    formula += "d";
                }

                var linkedCarbon = edges[i].linkedCarbon.value === "undefined" ? -1 : edges[i].linkedCarbon.value;
                var anomerCarbon = 1;
                if (edges[i] instanceof GlycosidicLinkage)
                {
                    anomerCarbon = edges[i].anomerCarbon.value === "undefined" ? -1 : edges[i].anomerCarbon.value;
                }
                formula += "(" + linkedCarbon;
                if (anomerCarbon != -1)
                {
                    formula += "+";
                }
                formula += anomerCarbon + ")";

                formula += resId[edges[i].targetNode.getId()];

                if (edges[i] instanceof GlycosidicLinkage)
                {
                    formula += "d";
                }
                else
                {
                    formula += "n";
                }

                formula += "\n";
            }
            if (formula.substring(formula.length-1) == '\n') // Remove final \n
            {
                formula = formula.substring(0,formula.length-1);
            }

        }
        return formula;
    }


}
