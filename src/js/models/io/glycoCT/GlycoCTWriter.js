/**
 * Created by Renaud on 05/07/2017.
 */

import Substituent from "../../glycomics/nodes/Substituent";
import SubstituentType from "../../glycomics/dictionary/SubstituentType";
import GlycosidicLinkage from "../../glycomics/linkages/GlycosidicLinkage";
import GlycoCTSubstituents from "./SubstituentsGlycoCT";
import MonosaccharideType from "../../../views/glycomics/dictionary/MonosaccharideType";
import EdgeComparator from "../EdgeComparator";
import RepeatingUnit from "../../glycomics/RepeatingUnit";
import MonosaccharideGlycoCT from "./MonosaccharideGlycoCT";
import SubstituentLinkage from "../../glycomics/linkages/SubstituentLinkage";
import SubstituentsPositions from "./SubstituentsPositions";

export default class GlycoCTWriter{

    constructor(sugar,tree){
        this.sugar = sugar;
        this.tree = tree;
        this.res = [];
        this.rep = [];
        this.edges = [];
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
        if (label === "Gc")
        {
            return SubstituentType.NGlycolyl;
        }
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
        formula += "+";
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
        formula += "+";
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

    generateArrays(root, unit = "")
    {
        this.res = [];
        this.edges = [];
        if (root === undefined)
        {
            this.res = [];
            this.edges = [];
            this.rep = [];
            return;
        }
        var stack = [];
        stack.push(root);
        if (root.node !== undefined)
        {
            while (stack.length > 0)
            {
                var node = stack.pop();
                var nodeUnit = node.node.repeatingUnit;
                if (unit === "" && nodeUnit === undefined || unit !== "" && (nodeUnit !== undefined && nodeUnit.id === unit))
                {
                    this.res.push(node);
                    if (this.res.length > 1) // if we have at least 2 nodes : add link
                    {
                        this.edges.push(this.getLink(node.parent.node.id,node.node.id));
                    }
                }
                else
                {
                    if (unit === "")
                    {
                        if (node.parent !== undefined && node.parent.node.repeatingUnit !== nodeUnit) // If child is the first of the repeating unit
                        {
                            this.edges.push(this.getLink(node.parent.node.id,node.node.id));
                        }
                        else if (nodeUnit !== undefined)
                        {
                            if (node.children !== undefined)
                            {
                                for (var rootChild of node.children)
                                {
                                    if (rootChild.node.repeatingUnit !== nodeUnit)
                                    {
                                        this.edges.push(this.getLink(rootChild.node.id,node.node.id));
                                    }
                                }
                            }
                        }
                        if (!this.res.includes(nodeUnit))
                        {
                            this.res.push(nodeUnit);
                        }
                    }

                }

                var children = node.children;
                if (children !== undefined)
                {
                    if (children.length > 1)
                    {
                        children = this.sort(children);
                    }
                    for (var child of children) {
                        stack.push(child);
                    }
                }
            }
        }
        else
        {
            this.res = [];
        }
    }

    generateRES(resId, repId, res, associatedSubs, repNumber, offset = 0) { // Offset: if we have some Repeating Units, we generate the RES section within the REP
                                                                            // with this function, but the offset will create a continuity with the previous indexes
        var formula = "RES\n";
        var i;
        for (i = 0; i < res.length; i++)
        {
            if (res[i] instanceof RepeatingUnit)
            {
                formula += i+1+offset + "r:r" + repNumber;
                resId[res[i].id] = i+1+offset;
                repId[res[i].id] = repNumber;
                repNumber++;
                formula += "\n";
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

                // Nonulosonates exceptions:
                switch (resName)
                {
                    case "Neu5Ac":
                        resName = "KdnNAc";
                        break;
                    case "Neu5Gc":
                        resName = "KdnGc";
                        break;
                    case "Neu":
                        resName = "KdnN";
                        break;
                    case "MurNGc":
                        resName = "MurGc";
                        break;
                }

                var transform;

                const isoExceptions = ["Hex","dHex","HexA","HexN","ddHex","HexNAc","dHexNAc","Pen","Oli","Abe","Col","Nonu","LDManHep","DDManHep"];

                if (!isoExceptions.includes(resName)) // Exceptions
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
                    var monoName, subName, assocSubType, assocSub, linkedCarbon;
                    if (MonosaccharideGlycoCT[resName.substring(0,3)] !== undefined) // If the 3 first letters make a monosaccharide
                    {
                        monoName = resName.substring(0,3);
                        subName = resName.substring(3);
                        formula += MonosaccharideGlycoCT[monoName].glycoct;
                        transform = MonosaccharideGlycoCT[monoName].transform;
                        assocSubType = this.getSub(subName);
                        assocSub = new Substituent(this.randomString(7),assocSubType);
                        if (SubstituentsPositions[resName] !== undefined) // Should always be defined
                        {
                            linkedCarbon = SubstituentsPositions[resName].position;
                        }
                        associatedSubs.push([assocSub,i+1+offset,linkedCarbon]);
                    }
                    else if (MonosaccharideGlycoCT[resName.substring(0,4)] !== undefined) // If the 4 first letters make a monosaccharide. e.g Nonu
                    {
                        monoName = resName.substring(0,4);
                        subName = resName.substring(4);
                        formula += MonosaccharideGlycoCT[monoName].glycoct;
                        transform = MonosaccharideGlycoCT[monoName].transform;
                        assocSubType = this.getSub(subName);
                        assocSub = new Substituent(this.randomString(7),assocSubType);
                        if (SubstituentsPositions[resName] !== undefined) // Should always be defined
                        {
                            linkedCarbon = SubstituentsPositions[resName].position;
                        }
                        associatedSubs.push([assocSub,i+1+offset, linkedCarbon]);
                    }
                }


                const ringExceptions = ["Kdn", "KdnNAc", "KdnGc", "KdnN", "Kdo", "Fru"];
                if (!ringExceptions.includes(resName)) // Ring exceptions
                {
                    formula += "-";
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


                formula += "\n";
            }

        }
        for (var pair of associatedSubs)
        {
            var associatedSub = pair[0];
            formula += this.writeSub(i+offset, associatedSub);
            i++;
            pair[0] = i;
        }

        return [i+offset,formula];
    }


    generateLIN(resId, associatedSubs, offset = 0, unit = "") {
        var formula = "";
        var i;
        if (this.res.length + associatedSubs.length > 1)
        {
            formula += "LIN\n";
            var edges = this.edges;
            var prevSource = 0, prevTarget = 0;
            for (i = 0; i < edges.length; i++)
            {
                var source = (edges[i].sourceNode.repeatingUnit === undefined || unit !== "") ? resId[edges[i].sourceNode.getId()] : resId[edges[i].sourceNode.repeatingUnit.id];
                var linkedCarbon = edges[i].linkedCarbon.value === "undefined" ? -1 : edges[i].linkedCarbon.value;
                var anomerCarbon;
                if (edges[i] instanceof SubstituentLinkage)
                    anomerCarbon = 1;
                else if (edges[i].anomerCarbon.value === "undefined")
                    anomerCarbon = 1;
                else
                    anomerCarbon = edges[i].anomerCarbon.value;


                var target = (edges[i].targetNode.repeatingUnit === undefined || unit !== "") ? resId[edges[i].targetNode.getId()] : resId[edges[i].targetNode.repeatingUnit.id];

                if (prevSource !== source || prevTarget !== target) // When operating with repeating units, some links are duplicated
                {
                    prevSource = source;
                    prevTarget = target;

                    if (edges[i] instanceof GlycosidicLinkage)
                    {
                        formula += this.writeMonoLink(i+1+offset, source, target, linkedCarbon, anomerCarbon);
                    }
                    else
                    {
                        formula += this.writeSubLink(i+offset, source, target, linkedCarbon, anomerCarbon);
                    }
                }

            }

            for (var pair of associatedSubs)
            {
                formula += this.writeSubLink(i+offset, pair[1], pair[0]+offset, pair[2], 1);
                i++;
            }
        }
        return [i+offset, formula];
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
        var linInfo = this.generateLIN(resId, associatedSubs);
        formula += linInfo[1];
        var lastLinId = resInfo[0];


        // REP

        for (var residue of this.res)
        {
            if (residue instanceof RepeatingUnit)
            {
                this.rep.push(residue);
            }
        }
        if (this.rep.length !== 0)
        {
            formula += "REP\n";
            for (var rep of this.rep)
            {
                this.generateArrays(findNodeInTree(treeData,rep.entryNode),rep.id);
                var entryId = lastResId+1;
                associatedSubs = [];
                resInfo = this.generateRES(resId,repId,this.res,associatedSubs,repNumber,lastResId);
                lastResId = resInfo[0];
                var exitId = lastResId;
                formula += "REP" + repId[rep.id] + ":" + exitId + "o(-1+-1)" + entryId + "d=" + rep.min + "-" + rep.max +"\n";
                formula += resInfo[1];
                linInfo = this.generateLIN(resId,associatedSubs,lastLinId,rep.id);
                lastLinId = linInfo[0];
                formula += linInfo[1];
            }
        }

        if (formula.substring(formula.length-1) == '\n') // Remove final \n
        {
            formula = formula.substring(0,formula.length-1);
        }

        return formula;
    }


}
