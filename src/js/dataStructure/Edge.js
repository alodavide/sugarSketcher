/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

export default class Edge {
    constructor(id, source, target){
        this.id = id;
        this.source = source;
        this.target = target;
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