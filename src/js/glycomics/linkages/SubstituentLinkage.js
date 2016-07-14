/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */
import Edge from '../../dataStructure/Edge';
import LinkedCarbon from '../dictionary/LinkedCarbon';


export default class SubstituentLinkage extends Edge{
    constructor(id,target,source,linkedCarbon){
        super(id,target,source);

        if(linkedCarbon instanceof LinkedCarbon){
            this.linkedCarbon = linkedCarbon;
        } else if(typeof linkedCarbon == 'undefined') {
            this.linkedCarbon = LinkedCarbon.UNDEFINED;
        } else {
            throw "The Linked Carbon must be LinkedCarbon type. Please use the enum under src/js/glycomics/dictionary/LinkedCarbonTest.js";
        }
    }

    getLinkedCarbon(){
        return this.linkedCarbon;
    }
}
