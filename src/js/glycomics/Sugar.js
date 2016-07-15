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

        //Sigma.js Setting for the graph.
        // We hide them inside the constructor for now.
        var sigmaSetting = {
            clone: true,
            immutable: true,
            verbose: true
        };

        if (typeof id !== 'string' && typeof id !== 'number'){
            throw 'The sugar must have a string or number id.';
        } else {
            this.id = id;
        }

        this.rootIsSet = false;
        //Wrapping of Sigma.js graph datastructure.
        this.graph = new graph(sigmaSetting);

        if (rootNode instanceof Monosaccharide){
            this.rootNode = rootNode;
            if(graph.hasMethod('addNode')){
                this.graph.addNode(rootNode);
            } else{
                throw 'AddNode method is not present in the graph object';
            }

            this.rootIsSet = true;
        } else if(typeof rootNode != 'undefined'){
            throw 'The Root Node can be undefined or a Monosaccharide ';
        }

    }

    /**
     * Chech if the root of the Sugar is set.
     * @returns {boolean}
     */

    rootIsSet(){
        return this.rootIsSet();
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

        if (rootIsSet){
            throw 'The Root Node can only be set once. Create a new Sugar object.';
        }

        this.rootNode = rootNode;
        this.graph.addNode(rootNode);
        this.rootIsSet = true;
        return rootNode;
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
     * @param {Monosaccharide} parentNode The parentNode in the graph.
     * @param {Monosaccharide} childNode The Monosaccharide to add
     * @param {AnomerCarbon} anomerCarbon The anomerCarbon in the Glycosidic Linkage
     * @param {LinkedCarbon} linkedCarbon The linkedCarbon in the Glycosidic Linkage
     */
    addMonosaccharideWithLinkage(parentNode, childNode, anomerCarbon, linkedCarbon){
        if(childNode instanceof Monosaccharide ){
         try{
             var glycosidicLinkage = new GlycosidicLinkage('EDGE:'+parentNode.getNodeId()+'-'+childNode.getNodeId(),parentNode,childNode,anomerCarbon,linkedCarbon);
             this.addMonosaccharide(childNode,glycosidicLinkage);
             return glycosidicLinkage;
         } catch(err) {
             throw 'Cannot Create a Glycosidic Linkage: '+ err;
         }
        }
    }

    /**
     * Add a new Monosaccharide to the Sugar without Glycosidic Linkage Object
     * @param {Monosaccharide} parentNode The parentNode in the graph.
     * @param {Monosaccharide} childNode The Monosaccharide to add
     * @param {AnomerCarbon} anomerCarbon The anomerCarbon in the Glycosidic Linkage
     * @param {LinkedCarbon} linkedCarbon The linkedCarbon in the Glycosidic Linkage
     *
     */

    addSubstituentWithLinkage(parentNode, childNode, linkedCarbon){
        if(childNode instanceof Monosaccharide ){

        }
    }

}