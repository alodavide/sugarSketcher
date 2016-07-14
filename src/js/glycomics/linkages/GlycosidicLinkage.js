/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */
import Edge from '../../dataStructure/Edge';
import AnomerCarbon from '../dictionary/AnomerCarbon';
import LinkedCarbon from '../dictionary/LinkedCarbon';

export default class GlycosidicLinkage extends Edge{

    constructor(id, sourceNode, targetNode, anomerCarbon, linkedCarbon){

        super(id,sourceNode,targetNode);

        if(anomerCarbon instanceof AnomerCarbon){
            this.anomerCarbon = anomerCarbon;
        } else if(typeof anomerCarbon == 'undefined') {
            this.anomerCarbon = AnomerCarbon.UNDEFINED;
        } else {
            throw "The Anomer Carbon must be AnomerCarbon type. Please use the enum under src/js/glycomics/dictionary/AnomerCarbon.js";
        }

        if(linkedCarbon instanceof LinkedCarbon){
            this.linkedCarbon = linkedCarbon;
        } else if(typeof linkedCarbon == 'undefined') {
            this.linkedCarbon = LinkedCarbon.UNDEFINED;
        } else {
            throw "The Linked Carbon must be LinkedCarbon type. Please use the enum under src/js/glycomics/dictionary/LinkedCarbonTest.js";
        }
    }

    getAnomerCarbon(){
        return this.anomerCarbon;
    }

    getLinkedCarbon(){
        return this.linkedCarbon;
    }
}
