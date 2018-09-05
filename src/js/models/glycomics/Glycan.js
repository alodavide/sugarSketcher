/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 *
 *
 * TODO: We need to add something to freeze the Glycan structure.
 * At the moment all the attributes are mutable unless ids with targets and sources.
 *
 */
import Monosaccharide from './nodes/Monosaccharide';
import Substituent from './nodes/Substituent';
import GlycosidicLinkage from './linkages/GlycosidicLinkage';
import SubstituentLinkage from './linkages/SubstituentLinkage';
import Graph from '../dataStructure/Graph';

export default class Glycan{

    constructor(id,rootNode){
        if (typeof id !== 'string' && typeof id !== 'number'){
            throw 'The glycan must have a string or number id.';
        } else {
            this.id = id;
        }

        this.rootSet = false;
        //Wrapping of Sigma.js graph datastructure.
        this.graph = new Graph.graph();

        if (rootNode instanceof Monosaccharide){
            this.rootNode = rootNode;
            try{
                this.graph.addNode(rootNode);
            } catch(err){
                throw 'Error adding node: '+err;
            }

            this.rootSet = true;
        } else if(typeof rootNode !== 'undefined'){
            throw 'The Root Node cannot be undefined or a Monosaccharide ';
        }

    }

    /**
     * Chech if the root of the Glycan is set.
     * @returns {boolean}
     */

    rootIsSet(){
        return this.rootSet;
    }

    /**
     * Get the Glycan Id
     * @returns {string} Glycan Id
     */

    getGlycanId(){
        return this.id;
    }

    /**
     * Get the root node. Can only be a Monosaccharide
     * @returns {Monosaccharide} Root Monosaccharide
     */

    getRootNode(){
        return this.rootNode;
    }

    /**
     * Set the root node. Can only be a Monosaccharide
     * @param {Monosaccharide} rootNode The root node
     * @returns {Monosaccharide} The root node
     */
    setRootNode(rootNode){
        if (!(rootNode instanceof Monosaccharide)){
            throw 'The Root Node can be only a Monosaccharide ';
        }

        if (this.rootIsSet()){
            throw 'The Root Node can only be set once. Create a new Glycan object.';
        }

        this.rootNode = rootNode;
        this.graph.addNode(rootNode);
        this.rootSet = true;
        return rootNode;
    }

    /**
     * Return the Node with the id specified by the user otherwise throw an error.
     * @param {string} id The node id
     * @returns {*} return a node object (Monosaccharide or Substituent in our case).
     */

    getNodeById(id){
        try{
            var node = this.graph.nodes(id);
            if(node)
                return node;
        } catch (err){
            throw 'Error: '+ err;
        }
        throw 'Error: The node does not exist';
    }

    /**
     * Return the Edge with the id specified by the user otherwise throw an error.
     * @param {string} id The Edge id
     * @returns {*} return a linkage(edge) object (GlycosidicLinkage or SubstituentLinkage in our case).
     */
    getEdgeById(id){
        try{
            var edge = this.graph.edges(id);
            if(edge)
                return edge;
        } catch (err){
            throw 'Error: '+ err;
        }
        throw 'Error: The node does not exist';
    }

    /**
     * Return the Edge within sourceNode and targetNode
     * Throw an error if the edge does not exist.
     * TODO: The for loop can ber removed by creating a new method in the graph.js to get specific edges.
     * @param {string} id The Edge id
     * @returns {*} return a linkage(edge) object (GlycosidicLinkage or SubstituentLinkage in our case).
     */
    getEdge(sourceNode,targetNode){
        for( var i = 0; i < this.graph.edges().length; i++){
            if(this.graph.edges()[i].getEdgeSource() === sourceNode && this.graph.edges()[i].getEdgeTarget() === targetNode){
                return this.graph.edges()[i];
            }
        }
        throw 'No edge found between the sourceNode and targetNode';

    }

    /**
     * Return the Monosaccharide with the id specified by the user otherwise throw an error.
     * @param {string} id The Monosaccharide id
     * @returns {Monosaccharide} return a Monosaccahride object
     */
    getMonosaccharideById(id){
        var monosaccharide = this.getNodeById(id);
        if( monosaccharide instanceof Monosaccharide){
            return monosaccharide;
        } else {
            throw 'This method can only return monosaccharide object';
        }
    }

    /**
     * Return the Substituent with the id specified by the user otherwise throw an error.
     * @param {string} id The Substituent id
     * @returns {Substituent} return a Substituent object
     */
    getSubstituentById(id){
        var substituent = this.getNodeById(id);
        if(substituent instanceof Substituent){
            return substituent;
        } else {
            throw 'This method can only return substituent object';
        }
    }


    /**
     * Return the GlycosidicLinkage with the id specified by the user otherwise throw an error.
     * @param {string} id The Edge id
     * @returns {GlycosidicLinkage} return a GlycosidicLinkage object
     */
    getGlycosidicLinkagebyID(id){
        var glyLinkage = this.getEdgeById(id);
        if(glyLinkage instanceof GlycosidicLinkage){
            return glyLinkage;
        } else {
            throw 'This method can only return GlycosidicLinkage object';
        }
    }


    /**
     * Return the SubstituentLinkage with the id specified by the user otherwise throw an error.
     * @param {string} id The Edge id
     * @returns {SubstituentLinkage} return a SubstituentLinkage object
     */
    getSubstituentLinkagebyId(id){
        var subLinkage = this.getEdgeById(id);
        if(subLinkage instanceof SubstituentLinkage){
            return subLinkage;
        } else {
            throw 'This method can only return SubstituentLinkage object';
        }
    }

    /**
     * Return the GlycosidicLinkage within sourceNode and targhetNode
     * @param {string} id The Edge id
     * @returns {GlycosidicLinkage} return a GlycosidicLinkage object
     */
    getGlycosidicLinkage(sourceNode,targetNode){
        var glyLinkage = this.getEdge(sourceNode,targetNode);
        if(glyLinkage instanceof GlycosidicLinkage){
            return glyLinkage;
        } else {
            throw 'This method can only return GlycosidicLinkage object';
        }
    }

    /**
     * Return the SubstituentLinkage within sourceNode and targhetNode
     * @param {string} id The Edge id
     * @returns {SubstituentLinkage} return a SubstituentLinkage object
     */
    getSubstituentLinkage(sourceNode,targetNode){
        var subLinkage = this.getEdgeById(sourceNode,targetNode);
        if(subLinkage instanceof SubstituentLinkage){
            return subLinkage;
        } else {
            throw 'This method can only return SubstituentLinkage object';
        }
    }



    /**
     * Add a new Monosaccharide to the Glycan with a pre-built Glycosidic Linkage.
     * @param {Monosaccharide} childNode The monosaccharide to add
     * @param {GlycosidicLinkage} glycosidicLinkage The edge to add
     * @returns {Monosaccharide} The monosaccharide added to the Glycan.
     */

    addMonosaccharide(childNode,glycosidicLinkage){
        if(childNode instanceof Monosaccharide && glycosidicLinkage instanceof GlycosidicLinkage){
            this.graph.addNode(childNode);
            this.graph.addEdge(glycosidicLinkage);
        } else{
            throw 'Error: the childNode must be a Monosaccharide and the Linkage must be a GlycosidicLinkage';
        }

        return childNode;
    }

    /**
     * Add a new Substituent to the Glycan with a pre-built Substituent Linkage
     * @param {Substituent} childNode The substituent to add
     * @param {SubstituentLinkage}substituentLinkage The edge to add
     * @returns {Substituent} The substituent added to the Substituent.
     */

    addSubstituent(childNode,substituentLinkage){
        if(childNode instanceof Substituent && substituentLinkage instanceof SubstituentLinkage){
            try{
                this.graph.addNode(childNode);
                this.graph.addEdge(substituentLinkage);
            } catch (err){
                throw 'Cannot add node and edge to the graph: ' + err;
            }
        } else {
            throw 'The childNode must be a Substituent and the Linkage must be a SubstituentLinkage';
        }
        return childNode;
    }

    /**
     * Add a new Monosaccharide to the Glycan without Glycosidic Linkage Object
     * @param {Node} parentNode The parentNode in the graph.(Monosaccharide or Substituent)
     * @param {Monosaccharide} childNode The Monosaccharide to add
     * @param {AcceptorPosition} AcceptorPosition The AcceptorPosition in the Glycosidic Linkage
     * @param {DonorPosition} donorPosition The donorPosition in the Glycosidic Linkage
     * @return {GlycosidicLinkage} the linkage created to add the node.
     */
    addMonosaccharideWithLinkage(parentNode, childNode, acceptorPosition, donorPosition){
        if(childNode instanceof Monosaccharide ){
         try{
             var glycosidicLinkage = new GlycosidicLinkage('GlyLin:'+parentNode.getId()+'-'+childNode.getId(),parentNode,childNode,acceptorPosition,donorPosition);
             this.addMonosaccharide(childNode,glycosidicLinkage);
             return glycosidicLinkage;
         } catch(err) {
             throw 'Cannot Create a Glycosidic Linkage: '+ err;
         }
        }
    }

    /**
     * Add a new Monosaccharide to the Glycan without Glycosidic Linkage Object
     * @param {Node} parentNode The parentNode in the graph.(Monosaccharide or Substituent)
     * @param {Substituent} childNode The Monosaccharide to add
     * @param {DonorPosition} donorPosition The donorPosition in the Glycosidic Linkage
     * @return {SubstituentLinkage} the linkage created to add the node.
     */

    addSubstituentWithLinkage(parentNode, childNode, donorPosition){
        if(childNode instanceof Substituent ){
            try{
                var substituentLinkage = new SubstituentLinkage('SubLin:'+parentNode.getId()+'-'+childNode.getId(),parentNode,childNode,donorPosition);
                this.addSubstituent(childNode, substituentLinkage);
                return substituentLinkage;
            } catch(err) {
                throw 'Cannot Create a Glycosidic Linkage: '+ err;
            }
        }
    }
    /**
     * Remove a node from the Glycan graph. This method works with Substituents and Monosaccharides
     * @param {string} id The id of the node to be removed
     * @returns {Graph} Updated graph.
     */
    removeNodeById(id){
        try{
            var updatedGraph = this.graph.dropNode(id);
            return updatedGraph;
        } catch (err){
            throw 'Error removing the Node: '+ err;
        }
    }

    /**
     * Remove a Monosaccharide for the Glycan. It removes all the edges connected to the Monosaccharide.
     * Be carefull: The children will be detached from the tree.
     * @param {Monosaccharide} childNode The monosaccharide to be removed
     * @returns {Graph} Updated graph
     */
    removeMonosaccharide(childNode){
        if(childNode instanceof Monosaccharide){
            try{
                var updatedGraph = this.removeNodeById(childNode.id);
                return updatedGraph;
            } catch (err){
                throw 'Error removing Monosaccharide: '+ err;
            }
        } else {
            throw 'This method can remove only monosaccharide from the Glycan';
        }
    }

    /**
     * Remove a Substituent for the Glycan. It removes all the edges connected to the Substituent.
     * Be carefull: The children will be detached from the tree.
     * @param {Substituent} childNode The substituent to be removed
     * @returns {Graph} Updated graph
     */
    removeSubstituent(childNode){
        if(childNode instanceof Substituent){
            try{
                var updatedGraph = this.graph.dropNode(childNode.id);
                return updatedGraph;
            } catch (err){
                throw 'Error removing Substituent: '+ err;
            }
        } else {
            throw 'This method can remove only substituent from the Glycan';
        }
    }

    /**
     * Remove a edge from the Glycan graph. This method works with Substituents and Monosaccharides
     * @param {string} id The id of the linkage to be removed
     * @returns {Graph} Updated graph.
     */
    removeLinkageById(id){
        try{
            var updatedGraph = this.graph.dropEdge(id);
            return updatedGraph;
        } catch (err){
            throw 'Error removing the Node: '+ err;
        }
    }

    /**
     * Remove a GlycosidicLinkage for the Glycan.
     * @param {GlycosidicLinkage} glycosidicLinkage The glycosidicLinkage to be removed
     * @returns {Graph} Updated graph
     */
    removeGlycosidicLinkage(linkage){
        if(linkage instanceof GlycosidicLinkage){
            try{
                var updatedGraph = this.removeLinkageById(linkage.id);
                return updatedGraph;
            } catch (err){
                throw 'Error removing GlycosidicLinkage: '+ err;
            }
        } else {
            throw 'This method can remove only GlycosidicLinkages from the Glycan';
        }
    }

    /**
     * Remove a SubstituentLinkage for the Glycan.
     * @param {SubstituentLinkage} childNode The substituentLinkage to be removed
     * @returns {Graph} Updated graph
     */
    removeSubstituentLinkage(linkage){
        if(linkage instanceof SubstituentLinkage){
            try{
                var updatedGraph = this.removeLinkageById(linkage.id);
                return updatedGraph;
            } catch (err){
                throw 'Error removing Substituent: '+ err;
            }
        } else {
            throw 'This method can remove only substituent from the Glycan';
        }
    }

    /**
     * This method reads an object and adds a structure.
     * Please use id root for the root node!
     * Here is an example:
     *
     *   var myGlycan = new Glycan();
     *   myGlycan.addStructure({
     *     nodes: [
     *       {
     *         id: 'root',
     *         nodeType: 'Monosaccharide',
     *         monosaccharideType: ''
     *         anomericity: '',
     *         isomer: '',
     *         ringType: ''
     *       },
     *       {
     *         id: 'n1',
     *         nodeType: 'Monosaccharide',
     *         monosaccharideType: ''
     *         anomericity: '',
     *         isomer: '',
     *         ringType: ''
     *       }
     *     ],
     *     edges: [
     *       {
     *         id: 'e0',
     *         source: 'root',
     *         target: 'n1',
     *         donorPosition: '',
     *         acceptorPosition: '',
     *         linkageType:
     *       }
     *     ]
     *   });
     *
     * @param  {object} g The graph object.
     * @return {object}   The graph instance.
     */
    addStructure(structure){
        var i,
            a,
            l;

        a = g.nodes || [];
        for (i = 0, l = a.length; i < l; i++)
            this.addNode(a[i]);

        a = g.edges || [];
        for (i = 0, l = a.length; i < l; i++)
            this.addEdge(a[i]);

        return this;
    }


    /**
     * The actual size of the Glycan in terms of nodes.
     * Each monosaccharide and substituent count as 1
     * @returns {number} The size of the Glycan
     */
    size(){
        return this.graph.nodes().length;
    }

    /**
     * Clear the Glycan object and set Root to undefined.
     * Only the Id remains set (Id is immutable).
     */
    clear(){
        this.rootSet = false;
        this.rootNode = undefined;
        this.graph.clear();
    }

}