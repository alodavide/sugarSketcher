/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import Node from '../../dataStructure/GraphNode';
import SubstituentType from '../dictionary/SubstituentType';

export default class Substituent extends Node{

    constructor(id,substituentType){
        super(id);

        if(substituentType instanceof SubstituentType){
            this._substituentType = substituentType;
        } else if(typeof substituentType == 'undefined') {
            this._substituentType = SubstituentType.UNDEFINED;
        } else{
            throw 'Please use the SubstituentType class and forget about string. Extend the enum if you need a specific value';
        }
    }

    get substituentType(){
        return this._substituentType;
    }

    set substituentType(substituentType){
        if(substituentType instanceof SubstituentType){
            this._substituentType = substituentType;
        } else{
            throw 'Please use the SubstituentType class and forget about string. Extend the enum if you need a specific value';
        }
    }

}