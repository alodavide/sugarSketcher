/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */
import Edge from '../../dataStructure/Edge';

export default class GlycosidicLinkage extends Edge{
    constructor(id,target,source,anomerCarbon,linkedCarbon){
        super(id,target,source);
        this.anomerCarbon = anomerCarbon;
        this.linkedCarbon = linkedCarbon;
    }

    getAnomerCarbon(){
        return this.anomerCarbon;
    }

    getLinkedCarbon(){
        return this.linkedCarbon;
    }
}
