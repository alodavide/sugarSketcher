/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */
import Edge from '../../dataStructure/Edge';

export default class GlycosidicLinkage extends Edge{
    constructor(id,target,source,anomerCarbon,linkedCarbon){
        super(id,target,source);

        if(typeof anomerCarbon === 'number' && anomerCarbon> 0 && anomerCarbon < 7){
            this.anomerCarbon = anomerCarbon;
        } else {
            throw "The Anomer Carbon must a numeric variable between 1 and 6";
        }

        if(typeof linkedCarbon === 'number' && linkedCarbon> 0 && linkedCarbon < 7){
            this.linkedCarbon = linkedCarbon;
        } else {
            throw "The Linked Carbon must a numeric variable between 1 and 6";
        }
    }

    getAnomerCarbon(){
        return this.anomerCarbon;
    }

    getLinkedCarbon(){
        return this.linkedCarbon;
    }
}
