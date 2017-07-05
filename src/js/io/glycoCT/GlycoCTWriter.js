/**
 * Created by Renaud on 05/07/2017.
 */

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

            formula += "\n";

            resId[res[i].id] = i+1;

        }

        formula += "LIN\n";
        var edges = this.sugar.graph.edges();
        for (i = 0; i < edges.length; i++)
        {
            formula += i+1 + ":";

            formula += resId[edges[i].sourceNode.getId()];

            formula += "o"; // CHANGE

            var linkedCarbon = edges[i].linkedCarbon.value == "undefined" ? -1 : edges[i].linkedCarbon.value;
            var anomerCarbon = edges[i].anomerCarbon.value == "undefined" ? -1 : edges[i].anomerCarbon.value;
            formula += "(" + linkedCarbon;
            if (anomerCarbon != -1)
            {
                formula += "+";
            }
            formula += anomerCarbon + ")";

            formula += resId[edges[i].targetNode.getId()];

            formula += "d"; // CHANGE

            formula += "\n";
        }

        return formula;
    }


}
