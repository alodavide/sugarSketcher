/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */
import Monosaccharide from './nodes/Monosaccharide';
import Substituent from './nodes/Substituent';
import GlycosidicLinkage from './linkages/GlycosidicLinkage';
import SubstituentLinkage from './linkages/SubstituentLinkage';
import Graph from './../dataStructure/Graph';

export default class Sugar{

    constructor(id,rootNode){
        if (typeof id !== 'string' && typeof id !== 'number'){
            throw 'The sugar must have a string or number id.';
        } else {
            this.id = id;
        }

        this.rootSet = false;
        //Wrapping of Sigma.js graph datastructure.
        this.graph = new Graph.graph();

        if (rootNode instanceof Monosaccharide){
            this.rootNode = rootNode;
            if(graph.hasMethod('addNode')){
                this.graph.addNode(rootNode);
            } else{
                throw 'AddNode method is not present in the graph object';
            }

            this.rootSet = true;
        } else if(typeof rootNode != 'undefined'){
            throw 'The Root Node can be undefined or a Monosaccharide ';
        }

    }

    /**
     * Chech if the root of the Sugar is set.
     * @returns {boolean}
     */

    rootIsSet(){
        return this.rootSet;
    }

    /**
     * Get the Sugar Id
     * @returns {string} Sugar Id
     */

    getSugarId(){
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
            throw 'The Root Node can only be set once. Create a new Sugar object.';
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

    getNodebyID(id){
        try{
            return  this.graph.nodes(id);
        } catch (err){
            throw 'Error: '+ err;
        }
    }

    /**
     * Return the Edge with the id specified by the user otherwise throw an error.
     * @param {string} id The Edge id
     * @returns {*} return a linkage(edge) object (GlycosidicLinkage or SubstituentLinkage in our case).
     */
    getEdgebyID(id){
        try{
            return  this.graph.edges(id);
        } catch (err){
            throw 'Error: '+ err;
        }
    }

    /**
     * Return the Monosaccharide with the id specified by the user otherwise throw an error.
     * @param {string} id The Monosaccharide id
     * @returns {Monosaccharide} return a Monosaccahride object
     */
    getMonosaccharideById(id){
        var monosaccharide = this.getNodebyID(id);
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
        var substituent = this.getNodebyID(id);
        if(substituent instanceof Substituent){
            return substituent;
        } else {
            throw 'This method can only return substituent object';
        }
    }

    /**
     * Add a new Monosaccharide to the Sugar with a pre-built Glycosidic Linkage.
     * @param {Monosaccharide} childNode The monosaccharide to add
     * @param {GlycosidicLinkage} glycosidicLinkage The edge to add
     * @returns {Monosaccharide} The monosaccharide added to the Sugar.
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
     * Add a new Substituent to the Sugar with a pre-built Substituent Linkage
     * @param {Substituent} childNode The substituent to add
     * @param {SubstituentLinakge}substituentLinkage The edge to add
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
     * Add a new Monosaccharide to the Sugar without Glycosidic Linkage Object
     * @param {Node} parentNode The parentNode in the graph.(Monosaccharide or Substituent)
     * @param {Monosaccharide} childNode The Monosaccharide to add
     * @param {AnomerCarbon} anomerCarbon The anomerCarbon in the Glycosidic Linkage
     * @param {LinkedCarbon} linkedCarbon The linkedCarbon in the Glycosidic Linkage
     * @return {GlycosidicLinkage} the linkage created to add the node.
     */
    addMonosaccharideWithLinkage(parentNode, childNode, anomerCarbon, linkedCarbon){
        if(childNode instanceof Monosaccharide ){
         try{
             var glycosidicLinkage = new GlycosidicLinkage('GlyLin:'+parentNode.getId()+'-'+childNode.getId(),parentNode,childNode,anomerCarbon,linkedCarbon);
             this.addMonosaccharide(childNode,glycosidicLinkage);
             return glycosidicLinkage;
         } catch(err) {
             throw 'Cannot Create a Glycosidic Linkage: '+ err;
         }
        }
    }

    /**
     * Add a new Monosaccharide to the Sugar without Glycosidic Linkage Object
     * @param {Node} parentNode The parentNode in the graph.(Monosaccharide or Substituent)
     * @param {Substituent} childNode The Monosaccharide to add
     * @param {LinkedCarbon} linkedCarbon The linkedCarbon in the Glycosidic Linkage
     * @return {SubstituentLinkage} the linkage created to add the node.
     */

    addSubstituentWithLinkage(parentNode, childNode, linkedCarbon){
        if(childNode instanceof Substituent ){
            try{
                var substituentLinkage = new SubstituentLinkage('SubLin:'+parentNode.getId()+'-'+childNode.getId(),parentNode,childNode,linkedCarbon);
                this.addSubstituent(childNode, substituentLinkage);
                return substituentLinkage;
            } catch(err) {
                throw 'Cannot Create a Glycosidic Linkage: '+ err;
            }
        }
    }
    /**
     * Remove a node from the Sugar graph. This method works with Substituents and Monosaccharides
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
     * Remove a Monosaccharide for the Sugar.
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
            throw 'This method can remove only monosaccharide from the Sugar';
        }
    }

    /**
     * Remove a Substituent for the Sugar.
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
            throw 'This method can remove only substituent from the Sugar';
        }
    }

    /**
     * Remove a edge from the Sugar graph. This method works with Substituents and Monosaccharides
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
     * Remove a GlycosidicLinkage for the Sugar.
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
            throw 'This method can remove only GlycosidicLinkages from the Sugar';
        }
    }

    /**
     * Remove a SubstituentLinkage for the Sugar.
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
            throw 'This method can remove only substituent from the Sugar';
        }
    }



    /**
     * The actual size of the sugar in terms of nodes.
     * Each monosaccharide and substituent count as 1
     * @returns {number} The size of the sugar
     */
    size(){
        return this.graph.nodes().length;
    }

    /**
     * Clear the sugar object and set Root to undefined.
     * Only the Id remains set (Id is immutable).
     */
    clear(){
        this.rootIsSet = false;
        this.rootNode = 'undefined';
        this.graph.clear();
    }
}