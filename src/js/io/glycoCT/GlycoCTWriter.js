/**
 * Created by Renaud on 05/07/2017.
 */

import Substituent from "../../glycomics/nodes/Substituent";
import SubstituentType from "../../glycomics/dictionary/SubstituentType";
import GlycosidicLinkage from "../../glycomics/linkages/GlycosidicLinkage";
import GlycoCTSubstituents from "./SubstituentsGlycoCT";
import MonosaccharideType from "../../glycomics/dictionary/MonosaccharideType";
import EdgeComparator from "../EdgeComparator";
import RepeatingUnit from "../../glycomics/RepeatingUnit";
import MonosaccharideGlycoCT from "./MonosaccharideGlycoCT";

export default class GlycoCTWriter{

    constructor(sugar,tree,rep=[]){
        this.sugar = sugar;
        this.tree = tree;
        this.rep = rep;
        this.res = [];
        this.edges = [];
    }

    getNodeRepUnit(node)
    {
        node = node.node;
        if (node === undefined)
        {
            return undefined;
        }
        for (var rep of this.rep)
        {
            for (var n of rep.nodes)
            {
                if (n.node.id === node.id)
                {
                    return rep;
                }
            }
        }
        return undefined;
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


    comparatorFunction(a,b) {
        var comp = new EdgeComparator();
        var edge1 = this.getLink(a.parent.node.id,a.node.id);
        var edge2 = this.getLink(b.parent.node.id, b.node.id);
        return comp.compare(edge1,edge2);
    }

    sort(arr) {

        var len = arr.len;

        for (var i = 0; i < len; i++) {
            while (i > -1) {
                if (comparatorFunction(arr[i],arr[i + 1]) > 0) {
                    var temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    i--;
                } else {
                    break;
                }
            }
        }
        return arr;
    }

    getLink(id1, id2)
    {
        for (var edge of this.sugar.graph.edges())
        {
            if ((edge.source == id1 && edge.target == id2) || (edge.source == id2 && edge.target == id1))
            {
                return edge;
            }
        }
    }

    generateArrays(root)
    {
        if (root === undefined)
        {
            this.res = [];
            this.edges = [];
            this.rep = [];
            return;
        }
        var stack = [];
        stack.push(root);
        while (stack.length > 0)
        {
            var node = stack.pop();
            var nodeUnit = this.getNodeRepUnit(node);
            if (nodeUnit === undefined)
            {
                this.res.push(node);
                if (this.res.length > 1) // if we have at least 2 nodes : add link
                {
                    this.edges.push(this.getLink(node.parent.node.id,node.node.id));
                }
            }
            var children = node.children;
            var childrenUnit;
            if (children !== undefined)
            {
                childrenUnit = this.getNodeRepUnit(children[0]);
                if (children.length > 1)
                {
                    children = this.sort(children);
                }
                for (var child of children) {
                    stack.push(child);
                }
            }
            if (childrenUnit !== undefined)
            {
                if (!this.res.includes(nodeUnit))
                {
                    this.res.push(nodeUnit);
                }
            }

        }
        if (this.res[0].node === undefined)
        {
            this.res = [];
        }
    }

    generateRES(resId, repId, res, associatedSubs, repNumber, offset = 0) {
        var formula = "RES\n";
        var i;
        for (i = 0; i < res.length; i++)
        {
            if (res[i] instanceof RepeatingUnit)
            {
                formula += i+1+offset + "r:r" + repNumber;
                repId[res[i].id] = [i+1+offset,repNumber];
                repNumber++;
            }
            else if (res[i].node instanceof Substituent)
            {
                formula += this.writeSub(i+offset,res[i].node);
                resId[res[i].node.id] = i+1+offset;
            }
            else
            {
                resId[res[i].node.id] = i+1+offset;
                formula += i+1+offset + "b:";
                switch(res[i].node._anomericity.name) {
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

                var resName = res[i].node._monosaccharideType.name;
                var transform;

                if (resName !== "Hex" && resName !== "dHex" && resName !== "HexA" && resName !== "DeoxyHex") // Exceptions
                {
                    switch(res[i].node._isomer.name) {
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
                }

                if (MonosaccharideGlycoCT[resName] !== undefined) // if the residue has a defined name
                {
                    formula += MonosaccharideGlycoCT[resName].glycoct;
                    transform = MonosaccharideGlycoCT[resName].transform;
                }
                else
                {
                    var monoName, subName, assocSubType, assocSub;
                    if (MonosaccharideGlycoCT[resName.substring(0,3)] !== undefined)
                    {
                        monoName = resName.substring(0,3);
                        subName = resName.substring(3);
                        formula += MonosaccharideGlycoCT[monoName].glycoct;
                        transform = MonosaccharideGlycoCT[monoName].transform;
                        assocSubType = this.getSub(subName);
                        assocSub = new Substituent(this.randomString(7),assocSubType);
                        associatedSubs.push([assocSub,i+1+offset]);
                    }
                    else if (MonosaccharideGlycoCT[resName.substring(0,4)] !== undefined)
                    {
                        monoName = resName.substring(0,4);
                        subName = resName.substring(4);
                        formula += MonosaccharideGlycoCT[monoName].glycoct;
                        transform = MonosaccharideGlycoCT[monoName].transform;
                        assocSubType = this.getSub(subName);
                        assocSub = new Substituent(this.randomString(7),assocSubType);
                        associatedSubs.push([assocSub,i+1+offset]);
                    }
                }

                formula += "-";

                if (resName !== "Kdn") // Ring exceptions
                {
                    switch (res[i].node._ringType.name) {
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

                formula += transform;



            }

            formula += "\n";

        }
        for (var pair of associatedSubs)
        {
            var associatedSub = pair[0];
            formula += this.writeSub(i, associatedSub);
            i++;
            pair[0] = i;
        }

        return [i,formula];
    }

    exportGlycoCT() {
        var resId = {};
        var repId = {};
        this.generateArrays(this.tree);
        var res = this.res;
        var associatedSubs = [];
        if (res.length === 0)
        {
            return "";
        }
        var repNumber = 1;


        // RES
        var resInfo = this.generateRES(resId, repId, res, associatedSubs, repNumber);
        var formula = resInfo[1];
        var lastResId = resInfo[0];

        // LIN
        /*var linInfo = this.generateLIN(resId, repId, res, associatedSubs, repNumber);
        formula += linInfo[1];
        var lastLinId = resInfo[0];*/
        if (this.res.length + associatedSubs.length > 1)
        {
            formula += "LIN\n";
            var edges = this.edges;
            for (var i = 0; i < edges.length; i++)
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

            for (var pair of associatedSubs)
            {
                formula += this.writeSubLink(i, pair[1],pair[0], -1, -1);
                i++;
            }

            if (formula.substring(formula.length-1) == '\n') // Remove final \n
            {
                formula = formula.substring(0,formula.length-1);
            }

        }

        // REP

        if (this.rep.length !== 0)
        {
            formula += "\nREP\n";
            for (var rep of this.rep)
            {
                formula += "REP" + repId[rep.id][1] + "\n";
                resInfo = this.generateRES(resId,repId,rep.nodes,associatedSubs,repNumber,lastResId);
                formula += resInfo[1];
                lastResId = resInfo[0];
            }
        }


        return formula;
    }


}
