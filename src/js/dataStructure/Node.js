/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

export default class Node {
    constructor(id){
        if(typeof id == 'undefined'){
            throw "The parameter id be undefined";
        } else{
            this.id = id;
        }
    }

    getId(){
        return this.id;
    }
}