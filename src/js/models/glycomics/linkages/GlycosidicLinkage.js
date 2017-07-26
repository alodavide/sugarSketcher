/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */
import Edge from '../../dataStructure/GraphEdge';
import AnomerCarbon from '../dictionary/AnomerCarbon';
import LinkedCarbon from '../dictionary/LinkedCarbon';

export default class GlycosidicLinkage extends Edge{

    constructor(id, sourceNode, targetNode, anomerCarbon, linkedCarbon){

        super(id,sourceNode,targetNode);

        if(anomerCarbon instanceof AnomerCarbon){
            this._anomerCarbon = anomerCarbon;
        } else if(typeof anomerCarbon == 'undefined') {
            this._anomerCarbon = AnomerCarbon.UNDEFINED;
        } else {
            throw "The Anomer Carbon must be AnomerCarbon type. Please use the enum under src/js/glycomics/dictionary/AnomerCarbon.js";
        }

        if(linkedCarbon instanceof LinkedCarbon){
            this._linkedCarbon = linkedCarbon;
        } else if(typeof linkedCarbon == 'undefined') {
            this._linkedCarbon = LinkedCarbon.UNDEFINED;
        } else {
            throw "The Linked Carbon must be LinkedCarbon type. Please use the enum under src/js/glycomics/dictionary/LinkedCarbonTest.js";
        }
    }

    get anomerCarbon(){
        return this._anomerCarbon;
    }

    get linkedCarbon(){
        return this._linkedCarbon;
    }

    set anomerCarbon(anomerCarbon){
        if(anomerCarbon instanceof AnomerCarbon) {
            this._anomerCarbon = anomerCarbon;
        } else {
            throw "The Anomer Carbon must be AnomerCarbon type. Please use the enum under src/js/glycomics/dictionary/AnomerCarbon.js";
        }
        return anomerCarbon;
    }

    set linkedCarbon(linkedCarbon){
        if(linkedCarbon instanceof LinkedCarbon) {
            this._linkedCarbon = linkedCarbon;
        } else {
            throw "The Linked Carbon must be LinkedCarbon type. Please use the enum under src/js/glycomics/dictionary/LinkedCarbonTest.js";
        }
        return linkedCarbon;
    }
}
