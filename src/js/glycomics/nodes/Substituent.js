/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import Node from '../../dataStructure/Node';
import SubstituentType from '../../glycomics/dictionary/SubstituentType';

export default class Substituent extends Node{

    constructor(id,substituentType){
        super(id);

        if(substituentType instanceof SubstituentType){
            this.substituentType = substituentType;
        } else if(typeof substituentType == 'undefined') {
            this.substituentType = SubstituentType.UNDEFINED;
        } else{
            throw 'Please use the Anomericity class and forget about string. Extend the enum if you need a specific value';
        }
    }

    getSubstituentType(){
        return this.substituentType;
    }

}