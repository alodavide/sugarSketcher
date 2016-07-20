/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */
import Edge from '../../dataStructure/GraphEdge';
import LinkedCarbon from '../dictionary/LinkedCarbon';


export default class SubstituentLinkage extends Edge{
    constructor(id,target,source,linkedCarbon){
        super(id,target,source);

        if(linkedCarbon instanceof LinkedCarbon){
            this._linkedCarbon = linkedCarbon;
        } else if(typeof linkedCarbon == 'undefined') {
            this._linkedCarbon = LinkedCarbon.UNDEFINED;
        } else {
            throw "The Linked Carbon must be LinkedCarbon type. Please use the enum under src/js/glycomics/dictionary/LinkedCarbonTest.js";
        }
    }

    get linkedCarbon(){
        return this._linkedCarbon;
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
