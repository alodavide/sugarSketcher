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
import DonorPosition from "../../glycomics/dictionary/DonorPosition";

export default class GlycoCTWriter{

    constructor(glycan,tree){
        this.glycan = glycan;
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

    // Get SubstituentType
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
        return undefined;
    }

    // Get MonosaccharideType
    getMono(name)
    {
        for (var mono of MonosaccharideType)
        {
            if (mono.name.toLowerCase() === name.toLowerCase())
                return mono;
        }
    }

    // Add a Substituent residue line to the formula
    writeSub(i, substituent)
    {
        var formula = "";
        // Substituents start with index + "s"
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

    // Add a substituent link to the formula
    writeSubLink(i,source, target, donorPosition, acceptorPosition)
    {
        var formula = "";
        // Substituent links start with index, and "d"
        formula += i+1 + ":" + source + "d";

        formula += "(" + donorPosition;
        formula += "+";
        formula += acceptorPosition + ")";

        // They end with "n"
        formula += target + "n";

        formula += "\n";

        return formula;
    }

    // Add a Monosaccharide link to the formula
    writeMonoLink(i, source, target, donorPosition, acceptorPosition, prefix = "o", suffix = "d")
    {
        var formula = "";
        // Monosaccharide links start by either "n" if the source node is ending a Repeating Unit, or "o" otherwise
        formula += i + ":" + source + prefix;

        formula += "(" + donorPosition;
        formula += "+";
        formula += acceptorPosition + ")";

        // They end with "n" if the target node starts a Repeating Unit, "d" otherwise
        formula += target + suffix;

        formula += "\n";

        return formula;
    }


    // Compares 2 nodes a and b using the EdgeComparator first, then the NodeComparator if we can't decide
    comparatorFunction(a,b) {
        if (b === undefined)
        {
            return -1;
        }
        var comp = new EdgeComparator();
        var edge1 = this.getLink(a.parent.node.id,a.node.id);
        var edge2 = this.getLink(b.parent.node.id, b.node.id);
        return comp.compare(edge1,edge2);
    }

    // Basic sorting algorithm to sort a node's children to get the right order for the GlycoCT
    sort(arr) {

        var arr2 = Object.assign({},arr);
        var len = arr.length;

        for (var i = 0; i < len; i++) {
            while (i > -1) {
                if (this.comparatorFunction(arr[i],arr[i + 1]) > 0) {
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

    // Get a link between two nodes whose ids are given
    getLink(id1, id2)
    {
        for (var edge of this.glycan.graph.edges())
        {
            if ((edge.source == id1 && edge.target == id2) || (edge.source == id2 && edge.target == id1))
            {
                return edge;
            }
        }
    }

    /**
     * Puts all the info we need in the arrays res, edges and rep
     * This function is used for the main RES, but also for the RES inside a REP so we have this "unit" var to keep track of this
     * @param root
     * @param unit: id of the repeating unit if we're writing lines within a rep
     */
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
            // We go through the tree
            while (stack.length > 0)
            {
                var node = stack.pop();
                var nodeUnit = node.node.repeatingUnit;
                // if (we're not writing for a REP && current node is in no REP) || (we're writing for a REP && the current's node's repeating unit is the unit we're writing for)
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
                    if (unit === "") // we're not writing for a unit
                    {
                        if (node.parent !== undefined && node.parent.node.repeatingUnit !== nodeUnit) // If child is the first of the repeating unit
                        {
                            this.edges.push(this.getLink(node.parent.node.id,node.node.id));
                        }
                        else if (nodeUnit !== undefined)
                        {
                            if (node.children !== undefined)
                            {
                                // We go through the children, if they are also part of the unit we add the link
                                for (var rootChild of node.children)
                                {
                                    if (rootChild.node.repeatingUnit !== nodeUnit)
                                    {
                                        this.edges.push(this.getLink(rootChild.node.id,node.node.id));
                                    }
                                }
                            }
                        }
                        // we add the res to the residue list
                        if (!this.res.includes(nodeUnit))
                        {
                            this.res.push(nodeUnit);
                        }
                    }

                }

                // Finally we add the children to the stack, in the right order
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

    /**
     * This function writes a RES section (main or in a REP) by reading in the arrays prepared by generateArrays()
     * @param resId
     * @param repId
     * @param res
     * @param associatedSubs: e.g: GalNAc -> Gal + associatedSub (NAc)
     * @param repNumber: number of the current REP (REP1, REP2...)
     * @param offset: when we call it several times, the residues' indices don't start from 0
     * @returns {[*,*]}
     */
    generateRES(resId, repId, res, associatedSubs, repNumber, offset = 0) { // Offset: if we have some Repeating Units, we generate the RES section within the REP
        // with this function, but the offset will create a continuity with the previous indexes
        var formula = "RES\n";
        var i;
        // For every residue (whether it's a sub, mono, or rep)
        for (i = 0; i < res.length; i++)
        {
            if (res[i] instanceof RepeatingUnit) // If the residue is a REP
            {
                formula += i+1+offset + "r:r" + repNumber;
                resId[res[i].id] = i+1+offset;
                repId[res[i].id] = repNumber;
                repNumber++;
                formula += "\n";
            }
            else if (res[i].node instanceof Substituent) // If the residue is a sub
            {
                formula += this.writeSub(i+offset,res[i].node);
                resId[res[i].node.id] = i+1+offset;
            }
            else // If the residue is a Monosaccharide
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

                // In this function, we'll rename weird Monosaccharides names so we can recognize them more easily.
                // E.g: Neu5Ac => KdnNAc so we can recognize Kdn and NAc
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

                // These types either don't need a specified isomericity or already bear it by default in their glycoct in the database
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
                else // It can be that the residue is a Mono+Sub (GalNAc...)
                {
                    var monoName, subName, assocSubType, assocSub, donorPosition;
                    if (MonosaccharideGlycoCT[resName.substring(0,3)] !== undefined) // If the 3 first letters make a monosaccharide
                    {
                        // We get the raw monosaccharide type, and we put the substituent in an array to be treated later
                        monoName = resName.substring(0,3);
                        subName = resName.substring(3);
                        formula += MonosaccharideGlycoCT[monoName].glycoct;
                        transform = MonosaccharideGlycoCT[monoName].transform;
                        assocSubType = this.getSub(subName);
                        assocSub = new Substituent(this.randomString(7),assocSubType);
                        if (SubstituentsPositions[resName] !== undefined) // Should always be defined
                        {
                            donorPosition = SubstituentsPositions[resName].position;
                        }
                        associatedSubs.push([assocSub,i+1+offset,donorPosition]);
                    }
                    else if (MonosaccharideGlycoCT[resName.substring(0,4)] !== undefined) // If the 4 first letters make a monosaccharide. e.g Nonu
                    {
                        // See above
                        monoName = resName.substring(0,4);
                        subName = resName.substring(4);
                        formula += MonosaccharideGlycoCT[monoName].glycoct;
                        transform = MonosaccharideGlycoCT[monoName].transform;
                        assocSubType = this.getSub(subName);
                        assocSub = new Substituent(this.randomString(7),assocSubType);
                        if (SubstituentsPositions[resName] !== undefined) // Should always be defined
                        {
                            donorPosition = SubstituentsPositions[resName].position;
                        }
                        associatedSubs.push([assocSub,i+1+offset, donorPosition]);
                    }
                }


                // These exceptions already bear their ringType in their glycoct
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
        // Finally we treat the associatedSubs
        for (var pair of associatedSubs)
        {
            var associatedSub = pair[0];
            formula += this.writeSub(i+offset, associatedSub);
            i++;
            pair[0] = i;
        }

        return [i+offset,formula];
    }

    /**
     * This function writes a LIN section (main or in a REP) by reading in the arrays prepared by generateArrays()
     * @param resId
     * @param associatedSubs: e.g: GalNAc -> Gal + associatedSub (NAc)
     * @param offset: when we call it several times, the residues' indices don't start from 0
     * @param unit: if we are writing for a unit
     * @returns {[*,*]}
     */
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
                // We get the link information
                var source = (edges[i].sourceNode.repeatingUnit === undefined || unit !== "") ? resId[edges[i].sourceNode.getId()] : resId[edges[i].sourceNode.repeatingUnit.id];
                var donorPosition = edges[i].donorPosition.value === "undefined" ? -1 : edges[i].donorPosition.value;
                var acceptorPosition;
                if (edges[i] instanceof SubstituentLinkage)
                    acceptorPosition = 1;
                else if (edges[i].acceptorPosition.value === "undefined")
                    acceptorPosition = 1;
                else
                    acceptorPosition = edges[i].acceptorPosition.value;


                var target = (edges[i].targetNode.repeatingUnit === undefined || unit !== "") ? resId[edges[i].targetNode.getId()] : resId[edges[i].targetNode.repeatingUnit.id];

                if (prevSource !== source || prevTarget !== target) // Cheap fix to this bug: When operating with repeating units, some links are duplicated
                {
                    prevSource = source;
                    prevTarget = target;

                    if (edges[i] instanceof GlycosidicLinkage)
                    {
                        var prefix = "o";
                        var suffix = "d";
                        var sourceRep = this.findNodeInTree(this.tree,edges[i].sourceNode).node.repeatingUnit;
                        var targetRep = this.findNodeInTree(this.tree,edges[i].targetNode).node.repeatingUnit;
                        // Set the prefix and suffix to get the right ones according to repeating units
                        if (sourceRep !== targetRep)
                        {
                            if (sourceRep !== undefined)
                            {
                                prefix = "n";
                            }
                            if (targetRep !== undefined)
                            {
                                suffix = "n";
                            }
                        }
                        formula += this.writeMonoLink(i+1+offset, source, target, donorPosition, acceptorPosition, prefix, suffix);
                    }
                    else
                    {
                        formula += this.writeSubLink(i+offset, source, target, donorPosition, acceptorPosition);
                    }
                }
                else
                {
                    offset--; // The following of the cheap fix above: As the link gets duplicated, "i" is 1 higher than wanted, so let's decrease "offset"
                }

            }


            for (var pair of associatedSubs)
            {
                formula += this.writeSubLink(i+offset, pair[1], pair[0]+offset, pair[2], 1);
                i++;
            }
            return [i+offset, formula];
        }
        return [0, ""];
    }


    findNodeInTree(tree,node1)
    {
        var stack = [], node, i;
        stack.push(tree);

        while (stack.length > 0) {
            node = stack.pop();
            if (node.node == node1) {
                return node;
            } else if (node.children != undefined) {
                for (i = 0; i < node.children.length; i += 1) {
                    stack.push(node.children[i]);
                }
            }
        }
        return null;
    }


    /**
     * Main function called from outside the class to return the final formula
     * @returns {*}
     */
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
        var lastLinId = linInfo[0];


        // REP

        for (var residue of this.res)
        {
            if (residue instanceof RepeatingUnit)
            {
                this.rep.push(residue);
            }
        }
        if (this.rep.length !== 0) // if we have REPs
        {
            formula += "REP\n";
            for (var rep of this.rep)
            {
                this.generateArrays(this.findRepMinDepth(rep),rep.id);
                var entryId = lastResId+1;
                associatedSubs = [];
                resInfo = this.generateRES(resId,repId,this.res,associatedSubs,repNumber,lastResId);
                lastResId = resInfo[0];
                var exitId = lastResId;
                formula += "REP" + repId[rep.id] + ":" + exitId + "o(";
                formula += rep.donorPosition === DonorPosition.UNDEFINED ? "-1" : rep.donorPosition;
                formula += "+";
                formula += rep.acceptorPosition === AcceptorPosition.UNDEFINED ? "-1" : rep.acceptorPosition;
                formula += ")" + entryId + "d=";
                formula += rep.min === "?" ? "-1" : rep.min;
                formula += "-";
                formula += rep.max === "?" ? "-1" : rep.max;
                formula += "\n" + resInfo[1];
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

    // Returns the node with the minimum depth in tree (aka the entry)
    findRepMinDepth(rep)
    {
        var minVal = rep.nodes[0].depth;
        var minNode = rep.nodes[0];
        for (var node of rep.nodes)
        {
            if (node.depth < minVal)
            {
                minVal = node.depth;
                minNode = node;
            }
        }
        return minNode;
    }


}