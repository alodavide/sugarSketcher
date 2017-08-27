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

    // Used to generate unique IDs
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

    /**
     * Gets SubstituentType from name
     * @param name
     */
    getSub(name)
    {
        for (var sub of SubstituentType)
        {
            if (sub.name === name)
                return sub;
        }
    }

    /**
     * Get MonosaccharideType from name
     * @param name
     */
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

    /**
     * Gets MonosaccharideGlycoCT from stemType (e.g glc-HEX) and transform
     * @param stemType
     * @param transform
     * @returns {*}
     */
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

    /**
     * Adds one residue to the sugar
     * @param residue e.g : ["3b","glc-HEX-1","5"]
     * @param linkedCarbon
     * @param anomerCarbon
     * @param repeatingUnit : String
     * @returns {*}
     */
    createResidue(residue, linkedCarbon, anomerCarbon, repeatingUnit)
    {
        // If we generate a Monosaccharide
        if (residue[0].substring(residue[0].length-1) === "b") {

            // Parse anomericity
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
            var stemType = dashSplit[1]; // Also contains isomer as the first char

            // Parse Isomer
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
            /* As we split on ":", the first part of the first transformation is stuck with the second part of ring type.
               e.g: 1b:b-dman-HEX-1:5|6:a
               -> residue = ["1b","b-dman-HEX-1","5|6","a"]
            */
            var firstTransform = residue[2].split("|"); // Contains ringType and first part of first transformation
            var transform = "";
            if (firstTransform.length > 1) // at least one transformation
            {
                // We rebuild the whole transformation
                transform = "|" + firstTransform[1];
                for (var k = 3; k < residue.length; k++)
                {
                    transform += ":"+residue[k];
                }
            }

            // Fetch the Monosaccharide type in the database considering the given glycoct + transform combination
            // First we try the whole name
            var monoType = this.getMonoType(glycoct, transform);
            if (monoType === undefined)
            {
                // Second, we check if the monosaccharide is among the simple HEX cases (e.g: 1b:b-HEX-1:4 -> they have no stemType, just the superclass HEX)
                glycoct = residue[1].substring(2,residue[1].length-2);
                monoType = this.getMonoType(glycoct, transform);
                if (monoType === undefined)
                {
                    // Third, we check if the monosaccharide is among the exceptions for the ring type (Kdn for example include ringType in their formula: 1b:b-lgro-dgal-NON-2:6)
                    glycoct = residue[1].substring(3) + ":" + firstTransform[0];
                    monoType = this.getMonoType(glycoct, transform);
                    if (monoType === undefined)
                    {
                        // Finally, the monosaccharide is not known
                        monoType = MonosaccharideGlycoCT.Unknown;
                    }
                }
            }
            monoType = MonosaccharideType[monoType.name];

            // Then we parse the ringType
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
            // Creating the monosaccharide object
            var node = new Monosaccharide(nodeId,monoType, anomericity, isomer, ringType);
            // Assign to repeatingUnit if the node is in one
            if (repeatingUnit !== undefined)
            {
                node.repeatingUnit = repeatingUnit;
            }
            // If linkedCarbon and anomerCarbon are "r", we are building the root
            if (linkedCarbon === "r" && anomerCarbon === "r")
            {
                this.sugar = new Sugar("Sugar", node);
            }
            else
            {
                // Parse the AnomerCarbon
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
                // Parse the LinkedCarbon
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
            // Return the nodeId so we can access the node once it's been created
            return nodeId;
        }
        else if (residue[0].substring(residue[0].length-1) === "s") { // We're creating a substituent
            // Parse the sub name
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

            // Parse sub's linkedCarbon
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
            // Create substituent Object
            var substituent = new Substituent(subId,substituentType);
            // Check if when we add the sub at this particular position we get a new parent monosaccharide type
            // e.g Gal + NAc(linkedCarbon=2) => GalNAc
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

    /**
     * Find a node in the sugar, and change its type
     * @param node
     * @param type
     */
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

    /**
     * Main function of the class, used to parse the formula
     * @returns {*}
     */
    parseGlycoCT() {
        if (this.formula === "") {
            return new Sugar("Sugar");
        }
        // Get the text lines under the RES section
        var res = this.getSection("RES",this.formula);
        var links;
        if (! this.formula.split("LIN")[1]) // If the formula is only one node (no link)
        {
            if (!res[0]) // wrong formula
            {
                return new Sugar("Sugar");
            }
            // Create the root (LinkedCarbon and AnomerCarbon of root are unknwown from GlycoCT formula)
            this.createResidue(res[0].split(":"), "r", "r");
            return this.sugar;
        }
        else
        {
            // Get the text lines under the LIN section
            links = this.getSection("LIN",this.formula);
        }
        // Get the rep section
        var repSection = this.getSection("REP",this.formula);
        // Get each rep from the rep section
        var reps = this.getRepeatingUnit(repSection);

        // This will contain the id of the created nodes
        var nodesIds = {};

        // This will contain the RepeatingUnit objects, and the nodes that are in it [[RepObject,[nodes...]],...]
        var repInfo = [];

        // If there are some Repeating Units in the formula
        if (reps.length != 0)
        {
            // Use the function to insert the residues and links lines from the REPS to the main RES section
            // so that we get rid of the REP section and finally have only RES and LIN sections, with mixed up indices (doesn't matter)
            var merge = this.mergeRep(reps, res, links);
            res = merge[0];
            links = merge[1];
            repInfo = merge[2];
        }

        // We finally call the function that reads through the lines and calls the function to create nodes
        this.generateNodes(links,nodesIds,res, repInfo);

        return this.sugar;
    }

    /**
     * Function that inserts the residues and links from the REPs sections into the main RES and LIN sections
     * Outputs an array of 3 arrays: the new RES section, the new LIN section, repInfo which contains the RepeatingUnit objects and which nodes belongs to them
     * @param reps
     * @param res
     * @param links
     * @returns {[*,*,*]}
     */
    mergeRep(reps,res,links) {
        var repeatingUnitsObjects = []; // Contains all the instanciated Rep objects
        var repeatingUnit;
        var repInfo = {}; // Shows which node is associated to which Rep

        // First merge the RES
        var finalRes = [];
        var repUnitRead = 0;
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



        // STEP 2: Update the links:
        // If the target of a link is a repeating unit, change to the first residue of the unit (entering the unit)
        // If the source is a repeating unit, change to the ending residue (leaving the unit)
        var repeatingUnitObject;
        var createdUnits = [];
        var repNodesIds;
        for (i in finalLinks)
        {
            if (this.isTargetARep(finalLinks[i],repUnitIndices)) // If target is Rep, replace its index by its entry Node
            {
                if (!createdUnits.includes(this.getLinkTarget(finalLinks[i]))) {
                    createdUnits.push(this.getLinkTarget(finalLinks[i]));
                    repeatingUnit = repUnitIndices[this.getLinkTarget(finalLinks[i])];
                    repeatingUnitObject = new RepeatingUnit(this.randomString(7),[],repeatingUnit.info.min, repeatingUnit.info.max, repeatingUnit.info.entry,
                        repeatingUnit.info.exit, repeatingUnit.info.linkedCarbon, repeatingUnit.info.anomerCarbon);
                    repNodesIds = this.getRepNodesIds(repeatingUnit.res);
                    repeatingUnitsObjects.push([repeatingUnitObject,repNodesIds]);
                }
                finalLinks[i] = this.updateLinkTarget(finalLinks[i],repUnitIndices[this.getLinkTarget(finalLinks[i])].info.entry);
            }
            if (this.isSourceARep(finalLinks[i],repUnitIndices)) // If target is Rep, replace its index by its entry Node
            {
                if (!createdUnits.includes(this.getLinkSource(finalLinks[i])))
                {
                    createdUnits.push(this.getLinkSource(finalLinks[i]));
                    repeatingUnit = repUnitIndices[this.getLinkSource(finalLinks[i])];
                    repeatingUnitObject = new RepeatingUnit(this.randomString(7),[],repeatingUnit.info.min, repeatingUnit.info.max, repeatingUnit.info.entry,
                        repeatingUnit.info.exit, repeatingUnit.info.linkedCarbon, repeatingUnit.info.anomerCarbon);
                    repNodesIds = this.getRepNodesIds(repeatingUnit.res);
                    repeatingUnitsObjects.push([repeatingUnitObject,repNodesIds]);
                }
                finalLinks[i] = this.updateLinkSource(finalLinks[i],repUnitIndices[this.getLinkSource(finalLinks[i])].info.exit);
            }
        }

        return [finalRes, finalLinks, repeatingUnitsObjects];

    }

    /**
     * Get the index of all the nodes within an array of residues. Used to get the nodes in a specific rep
     * @param res
     * @returns {Array}
     */
    getRepNodesIds(res)
    {
        var output = [];
        for (var r of res)
        {
            output.push(r.split(/\w:/)[0]);
        }
        return output;
    }


    getLinkSource(link)
    {
        return link.split(/[on]/)[0].split(":")[1];
    }

    getLinkTarget(link)
    {
        return link.split(")")[1].split(/[dn]/)[0];
    }

    updateLinkTarget(link, target)
    {
        var output = link.split(")")[0] + ")" + target + "d";
        return output;
    }

    updateLinkSource(link, source)
    {
        var output = link.split(":")[0] + ":" + source + "o" + link.split(/[on]/)[1];
        return output;
    }

    // Checks if the target of the link is a repeating unit in the main RES section
    isTargetARep(link, repUnitIndices)
    {
        var target = link.split(")")[1].split(/[dn]/)[0];
        if (repUnitIndices[target])
            return true;
        return false;
    }

    // Checks if the source of the link is a repeating unit in the main RES section
    isSourceARep(link, repUnitIndices)
    {
        var source = link.split(/[on]/)[0].split(":")[1];
        if (repUnitIndices[source])
            return true;
        return false;
    }

    // Get a node's RepeatingUnit object
    findMatchingRep(sourceId, repInfo)
    {
        for (var pair of repInfo)
        {
            if (pair[1].includes(""+sourceId))
            {
                return pair[0];
            }
        }
        return undefined;
    }

    /**
     * Reads through all the lines
     * @param links
     * @param nodesIds
     * @param res
     * @param repInfo
     */
    generateNodes(links,nodesIds,res,repInfo)
    {
        var repeatingUnit;
        var residueListById = {};

        // Fill in the residueListById array
        for (var residue of res)
        {
            residueListById[residue.split(/\w:/)[0]] = (residue.split(":"));
        }
        // Now we read the links to build the whole sugar
        for (var linkId in links) {
            if (links[linkId] !== "") { // If the link is not empty
                var link = links[linkId];
                var sourceId = parseInt(link.split(":")[1].split("(")[0]);
                var nodeId;
                if (residueListById[sourceId] !== "") // The source node hasn't been created, so this is the root
                {
                    repeatingUnit = this.findMatchingRep(sourceId, repInfo);
                    nodeId = this.createResidue(residueListById[sourceId], "r", "r", repeatingUnit);
                    residueListById[sourceId] = "";
                    nodesIds[sourceId] = nodeId;
                }
                // Then we create the target node of the link
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
                repeatingUnit = this.findMatchingRep(targetId, repInfo);
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

    /**
     * Returns an array of lines that correspond to the entire requested section (RES, LIN, REP...)
     * @param section
     * @param formula
     * @returns {Array}
     */
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


    /**
     * Returns all the infos that we can read from the REP section for every RepeatingUnit
     * Output : [{"info", "res", "lin"},...]
     * "info": {"linkedCarbon", "anomerCarbon", "min", "max", "exit", "entry"}
     * @param array
     * @returns {Array}
     */
    getRepeatingUnit(array)
    {
        var info, min, max;
        var output = [], value = [], key = "";
        for (var line of array)
        {
            var split = line.split(/REP\d+:/);
            if (split[1])
            {
                if (value.length != 0 && key !== "")
                {
                    min = key.split("=")[1].substring(0,2) == "-1" ? "?" : key.split("=")[1].split("-")[0];
                    max = key.substring(key.length-2) == "-1" ? "?" : key.split("-")[key.split("-").length-1];
                    info = {"linkedCarbon": key.split("(")[1].split("+")[0], "anomerCarbon": key.split(")")[0].split("+")[1],
                        "min": min, "max": max,
                        "exit":key.split("o")[0], "entry":key.split(")")[1].split("d")[0]};
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
            min = key.split("=")[1].substring(0,2) == "-1" ? "?" : key.split("=")[1].split("-")[0];
            max = key.substring(key.length-2) == "-1" ? "?" : key.split("-")[key.split("-").length-1];
            info = {"linkedCarbon": key.split("(")[1].split("+")[0], "anomerCarbon": key.split(")")[0].split("+")[1],
                "min": min, "max": max,
                "exit":key.split("o")[0], "entry":key.split(")")[1].split("d")[0]};
            output.push({"info":info,"res":this.getSection("RES",value),"lin":this.getSection("LIN",value)});
        }
        return output;
    }

}