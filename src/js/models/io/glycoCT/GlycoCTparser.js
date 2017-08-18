/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import Sugar from '../../glycomics/Sugar';
import Anomericity from '../../glycomics/dictionary/Anomericity';
import MonosaccharideType from "../../../views/glycomics/dictionary/MonosaccharideType";
import Isomer from "../../glycomics/dictionary/Isomer";
import RingType from "../../glycomics/dictionary/RingType";
import SubstituentType from "../../glycomics/dictionary/SubstituentType";
import Monosaccharide from "../../glycomics/nodes/Monosaccharide";
import AnomerCarbon from "../../glycomics/dictionary/AnomerCarbon";
import LinkedCarbon from "../../glycomics/dictionary/LinkedCarbon";
import Substituent from "../../glycomics/nodes/Substituent";
import SubstituentLinkage from "../../glycomics/linkages/SubstituentLinkage";
import GlycoCTSubstituents from "./SubstituentsGlycoCT";
import MonosaccharideGlycoCT from "./MonosaccharideGlycoCT";
import SubstituentsPositions from "./SubstituentsPositions";
import RepeatingUnit from "../../glycomics/RepeatingUnit";

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

    getSub(name)
    {
        for (var sub of SubstituentType)
        {
            if (sub.name === name)
                return sub;
        }
    }

    getMono(name)
    {
        switch (name)
        {
            case "KdnNAc":
                return MonosaccharideType.Neu5Ac;
            case "KdnNGc":
                return MonosaccharideType.Neu5Gc;
            case "KdnN":
                return MonosaccharideType.Neu;
        }
        for (var mono of MonosaccharideType)
        {
            if (mono.name === name)
                return mono;
        }
    }

    getMonoType(stemType, transform)
    {
        for (var mono of MonosaccharideGlycoCT)
        {
            if (mono.glycoct === stemType && mono.transform === transform)
            {
                return mono;
            }
        }
        return undefined;
    }

    createResidue(residue, linkedCarbon, anomerCarbon, repeatingUnit)
    {
        if (residue[0].substring(residue[0].length-1) === "b") { // monosaccharide
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
            var glycoct = residue[1].substring(3,residue[1].length-2);
            var firstTransform = residue[2].split("|");
            var transform = "";
            if (firstTransform.length > 1) // at least one transformation
            {
                transform = "|" + firstTransform[1];
                for (var k = 3; k < residue.length; k++)
                {
                    transform += ":"+residue[k];
                }
            }
            var monoType = this.getMonoType(glycoct, transform);
            if (monoType === undefined)
            {
                // if monosaccharide is amond the simple HEX cases
                glycoct = residue[1].substring(2,residue[1].length-2);
                monoType = this.getMonoType(glycoct, transform);
                if (monoType === undefined)
                {
                    // if monosaccharide is among the exceptions for the ring type
                    glycoct = residue[1].substring(3) + ":" + firstTransform[0];
                    monoType = this.getMonoType(glycoct, transform);
                    if (monoType === undefined)
                    {
                        monoType = MonosaccharideGlycoCT.Unknown;
                    }
                }
            }
            monoType = MonosaccharideType[monoType.name];
            var ringStop = residue[2].substring(0, 1);
            var ringType;
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

            var nodeId = this.randomString(7);
            var node = new Monosaccharide(nodeId,monoType, anomericity, isomer, ringType);
            if (repeatingUnit !== undefined)
            {
                node.repeatingUnit = repeatingUnit;
            }
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
        else if (residue[0].substring(residue[0].length-1) === "s") { // substituent
            var subName = residue[1];
            var substituentType;
            for (var sub of GlycoCTSubstituents) {
                if (subName === sub.glycoct) {
                    subName = sub.name;
                }
            }
            for (var subType of SubstituentType) {
                if (subName.toLowerCase() === subType.name.toLowerCase()) {
                    substituentType = subType;
                }
            }
            var lcs;
            for (var linkedCS of LinkedCarbon)
            {
                if (linkedCarbon === "?")
                {
                    lcs = LinkedCarbon.UNDEFINED;
                }
                if (parseInt(linkedCarbon) === linkedCS.value)
                {
                    lcs = linkedCS;
                }
            }
            var subId = this.randomString(7); // If the Mono-Sub combination has a predefined code, change the monosaccharide
            var substituent = new Substituent(subId,substituentType);
            var newType = this.getMono(this.clickedNode.monosaccharideType.name + this.getSub(subName).label);
            if (newType && SubstituentsPositions[newType.name].position == linkedCarbon) {
                this.updateNodeType(this.clickedNode, newType);
            }
            else
            {
                var subLinkage = new SubstituentLinkage(this.randomString(7), this.clickedNode, substituent, lcs);
                this.sugar.addSubstituent(substituent, subLinkage);
            }
        }
    }

    updateNodeType(node, type)
    {
        for (var sugarNode of this.sugar.graph.nodes())
        {
            if (node === sugarNode)
            {
                sugarNode.monosaccharideType = type;
            }
        }
    }


    parseGlycoCT() {
        if (this.formula === "") {
            return new Sugar("Sugar");
        }
        var res = this.getSection("RES",this.formula);
        var links;
        if (! this.formula.split("LIN")[1]) // Only one node without links
        {
            if (!res[0]) // wrong formula
            {
                return new Sugar("Sugar");
            }
            this.createResidue(res[0].split(":"), "r", "r");
            return this.sugar;
        }
        else
        {
            links = this.getSection("LIN",this.formula);
        }
        var repSection = this.getSection("REP",this.formula);
        var reps = this.getRepeatingUnit(repSection);

        var nodesIds = {};

        var repInfo = [];

        if (reps.length != 0)
        {
            var merge = this.mergeRep(reps, res, links);
            res = merge[0];
            links = merge[1];
            repInfo = merge[2];
            /*console.log(links);
            console.log(repInfo);*/
        }

        this.generateNodes(links,nodesIds,res, repInfo);

        return this.sugar;
    }

    mergeRep(reps,res,links)
    {

        var repeatingUnitsObjects = []; // Contains all the instanciated Rep objects
        var repeatingUnit;
        var repInfo = {}; // Shows which node is associated to which Rep

        // First merge the RES
        var finalRes = [];
        var repUnitRead = 0;
        var repUnitOffsets = [];
        var repUnitIndices = {};
        for (var i in res)
        {
            if (res[i].split(":")[0].indexOf("r") == -1) // Not a repeating unit
            {
                finalRes.push(res[i]);
            }
            else
            {
                repUnitIndices[parseInt(i)+1] = reps[repUnitRead];
                finalRes = finalRes.concat(reps[repUnitRead].res);
                repUnitOffsets.push(reps[repUnitRead].res.length);
                repUnitRead++;
            }
        }

        // Then links
        var finalLinks = [];
        repUnitRead = 0;
        var allLinks = [];
        // STEP 1: Insert all the links
        for (i in links)
        {
            allLinks.push(links[i]);
            finalLinks.push(links[i]);
            if (this.isTargetARep(links[i], repUnitIndices)) // target node is a repeating unit
            {
                finalLinks = finalLinks.concat(reps[repUnitRead].lin);
                repUnitRead++;
            }
        }

        // STEP 2: Edit the links' sources and targets to make them match with the RES new order
        var flagInRep = false;
        var addedLines = 0;
        var curRepIndex;
        repUnitRead = 0;
        for (var r of reps)
        {
            allLinks = allLinks.concat(r.lin);
        }

        for (i in finalLinks)
        {
            var offset = allLinks.indexOf(finalLinks[i]) - finalLinks.indexOf(finalLinks[i]) + repUnitRead + 1;
            if (!this.isSourceARep(finalLinks[i],repUnitIndices) && this.isTargetARep(finalLinks[i],repUnitIndices)) // Entering a rep
            {
                flagInRep = true;
                curRepIndex = (parseInt(this.getLinkTarget(finalLinks[i])));
                finalLinks[i] = this.updateLinkTarget(finalLinks[i],parseInt(this.getLinkTarget(finalLinks[i]))+this.totalRepOffset(reps,repUnitRead));
                finalLinks[i] = this.updateLinkSource(finalLinks[i],parseInt(this.getLinkSource(finalLinks[i]))+this.totalRepOffset(reps,repUnitRead));
                repeatingUnit = new RepeatingUnit(this.randomString(7),[],reps[repUnitRead].info.min, reps[repUnitRead].info.max,
                    this.getLinkTarget(finalLinks[i]), -1, reps[repUnitRead].info.linkedCarbon, reps[repUnitRead].info.anomerCarbon);
                repeatingUnitsObjects.push(repeatingUnit);
                repInfo[parseInt(this.getLinkTarget(finalLinks[i]))] = repeatingUnitsObjects[repUnitRead];
            }

            else if (!this.isSourceARep(finalLinks[i],repUnitIndices) && !this.isTargetARep(finalLinks[i],repUnitIndices)) // Totally inside or totally outside a rep
            {
                if (flagInRep) // Inside a rep
                {
                    finalLinks[i] = this.updateLinkSource(finalLinks[i],parseInt(this.getLinkSource(finalLinks[i]))-offset);
                    finalLinks[i] = this.updateLinkTarget(finalLinks[i],parseInt(this.getLinkTarget(finalLinks[i]))-offset);
                    repInfo[parseInt(this.getLinkSource(finalLinks[i]))] = repeatingUnitsObjects[repUnitRead];
                    repInfo[parseInt(this.getLinkTarget(finalLinks[i]))] = repeatingUnitsObjects[repUnitRead];
                }
                else
                {
                    finalLinks[i] = this.updateLinkSource(finalLinks[i],parseInt(this.getLinkSource(finalLinks[i]))+this.totalRepOffset(reps,repUnitRead));
                    finalLinks[i] = this.updateLinkTarget(finalLinks[i],parseInt(this.getLinkTarget(finalLinks[i]))+this.totalRepOffset(reps,repUnitRead));
                }
            }

            else if (this.isSourceARep(finalLinks[i],repUnitIndices) && this.isTargetARep(finalLinks[i],repUnitIndices)) // Transition between 2 reps
            {
                finalLinks[i] = this.updateLinkSource(finalLinks[i], parseInt(this.getLinkSource(finalLinks[i]))+this.totalRepOffset(reps,repUnitRead+1));
                curRepIndex = (parseInt(this.getLinkTarget(finalLinks[i])));
                repInfo[parseInt(this.getLinkSource(finalLinks[i]))] = repeatingUnitsObjects[repUnitRead];

                finalLinks[i] = this.updateLinkTarget(finalLinks[i],parseInt(this.getLinkTarget(finalLinks[i]))+this.totalRepOffset(reps,repUnitRead+1));
                repUnitRead++;
                repeatingUnit = new RepeatingUnit(this.randomString(7),[],reps[repUnitRead].info.min, reps[repUnitRead].info.max,
                    this.getLinkTarget(finalLinks[i]), -1, reps[repUnitRead].info.linkedCarbon, reps[repUnitRead].info.anomerCarbon);
                repeatingUnitsObjects.push(repeatingUnit);
                repInfo[parseInt(this.getLinkTarget(finalLinks[i]))] = repeatingUnitsObjects[repUnitRead];
            }

            else if (this.isSourceARep(finalLinks[i],repUnitIndices) && !this.isTargetARep(finalLinks[i],repUnitIndices)) // Ending a rep
            {
                if (i == 0)
                {
                    repeatingUnit = new RepeatingUnit(this.randomString(7),[],reps[repUnitRead].info.min, reps[repUnitRead].info.max,
                        this.getLinkTarget(finalLinks[i]), -1, reps[repUnitRead].info.linkedCarbon, reps[repUnitRead].info.anomerCarbon);
                    repeatingUnitsObjects.push(repeatingUnit);
                }

                finalLinks[i] = this.updateLinkSource(finalLinks[i], parseInt(this.getLinkSource(finalLinks[i]))+this.totalRepOffset(reps,repUnitRead+1));
                finalLinks[i] = this.updateLinkTarget(finalLinks[i],parseInt(this.getLinkTarget(finalLinks[i]))+this.totalRepOffset(reps,repUnitRead+1));
                repInfo[parseInt(this.getLinkSource(finalLinks[i]))] = repeatingUnitsObjects[repUnitRead];
                flagInRep = false;
                repUnitRead++;
            }
        }

        return [finalRes,finalLinks,repInfo];
    }

    getLinkSource(link)
    {
        return link.split("o")[0].split(":")[1];
    }

    getLinkTarget(link)
    {
        return link.split(")")[1].split("d")[0];
    }

    updateLinkTarget(link, target)
    {
        var output = link.split(")")[0] + ")" + target + "d";
        return output;
    }

    updateLinkSource(link, source)
    {
        var output = link.split(":")[0] + ":" + source + "o" + link.split("o")[1];
        return output;
    }

    isTargetARep(link, repUnitIndices)
    {
        var target = link.split(")")[1].split("d")[0];
        if (repUnitIndices[target])
            return true;
        return false;
    }

    isSourceARep(link, repUnitIndices)
    {
        var source = link.split("o")[0].split(":")[1];
        if (repUnitIndices[source])
            return true;
        return false;
    }

    totalRepOffset(reps, repUnitRead)
    {
        if (repUnitRead == 0)
        {
            return 0;
        }
        var total = 0;
        for (var i = 0; i < repUnitRead; i++)
        {
            total += reps[i].lin.length;
        }
        return total;
    }

    generateNodes(links,nodesIds,res, repInfo)
    {
        var repeatingUnit;
        var residueListById = [""]; // "" is for the offset so that node number 1 is at index 1
        for (var residue of res)
        {
            residueListById.push(residue.split(":"));
        }
        for (var linkId in links) {
            if (links[linkId] !== "") {
                var link = links[linkId];
                var sourceId = parseInt(link.split(":")[1].split("(")[0]);
                var nodeId;
                if (residueListById[sourceId] !== "") // Root
                {
                    repeatingUnit = undefined;
                    if (repInfo.hasOwnProperty(sourceId))
                    {
                        repeatingUnit = repInfo[sourceId];
                    }
                    nodeId = this.createResidue(residueListById[sourceId], "r", "r", repeatingUnit);
                    residueListById[sourceId] = "";
                    nodesIds[sourceId] = nodeId;

                }
                var targetId = parseInt(link.split(")")[1]);
                var linkages = link.split(/[\(\)]+/)[1];
                var linkedCarbon, anomerCarbon;
                linkedCarbon = linkages.split("+")[0] === "-1" ? "?" : linkages.split("+")[0];
                anomerCarbon = linkages.split("+")[1] === "-1" ? "?" : linkages.split("+")[1];
                for (var node of this.sugar.graph.nodes()) { // clickedNode = sourceNode
                    if (node.id === nodesIds[sourceId]) {
                        this.clickedNode = node;
                    }
                }
                repeatingUnit = undefined;
                if (repInfo.hasOwnProperty(targetId))
                {
                    repeatingUnit = repInfo[targetId];
                }
                nodeId = this.createResidue(residueListById[targetId],linkedCarbon, anomerCarbon, repeatingUnit);
                residueListById[targetId] = "";
                nodesIds[targetId] = nodeId;
            }
        }
    }

    findNodeById(id)
    {
        for (var node of this.sugar.graph.nodes())
        {
            if (node.id == id)
            {
                return node;
            }
        }
        return undefined;
    }


    getSection(section,formula) {
        const sections = ["RES","LIN","REP","UND","ALT"];
        sections.splice(sections.indexOf(section),1);
        if (section === "REP")
        {
            sections.splice(0,2); // Remove RES and LIN because in REP we want to keep them
        }
        var formulaArray;
        if (!(formula instanceof Array))
        {
            formulaArray = formula.split("\n");
        }
        else
        {
            formulaArray = formula;
        }
        var output = [];
        var flag = false;
        for (var line of formulaArray)
        {
            if (flag && sections.includes(line)) // If other section encountered
            {
                return output;
            }
            if (line === section) // If the right section is encountered...
            {
                if (flag) // Second section word encountered
                {
                    return output;
                }
                else // .. Only once
                {
                    flag = true;
                }
            }
            else
            {
                if (flag)
                {
                    output.push(line);
                }
            }
        }
        return output;
    }

    getRepeatingUnit(array)
    {
        var info;
        var output = [], value = [], key = "";
        for (var line of array)
        {
            var split = line.split(/REP\d+:/);
            if (split[1])
            {
                if (value.length != 0 && key !== "")
                {
                    info = {"linkedCarbon": key.split("(")[1].split("+")[0], "anomerCarbon": key.split(")")[0].split("+")[1],
                        "min": key.split("=")[1].split("-")[0], "max":key.split("=")[1].split("-")[1]};
                    output.push({"info":info,"res":this.getSection("RES",value),"lin":this.getSection("LIN",value)});
                }
                value = [];
                key = split[1];
            }
            else
            {
                value.push(line);
            }
        }
        if (value.length !== 0)
        {
            info = {"linkedCarbon": key.split("(")[1].split("+")[0], "anomerCarbon": key.split(")")[0].split("+")[1],
                "min": key.split("=")[1].split("-")[0], "max":key.split("=")[1].split("-")[1]};
            output.push({"info":info,"res":this.getSection("RES",value),"lin":this.getSection("LIN",value)});
        }
        return output;
    }

}