/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

export default class Edge {
    constructor(id, sourceNode, targetNode){
        if (typeof id == 'undefined' || typeof sourceNode == 'undefined' || typeof targetNode  == 'undefined'){
            throw "The parameter id, sourceNode and targetNode cannot be undefined";
        }

        this.id = id;
        this.source = sourceNode;
        this.target = targetNode;
    }

    getEdgeId(){
        return this.id;
    }

    getEdgeSource(){
        return this.source;
    }

    getEdgeTarget(){
        return this.target;
    }
}

