/**
 * Created by Renaud on 17/07/2017.
 */


import LinkedCarbon from "./dictionary/LinkedCarbon";
export default class RepeatingUnit {
    constructor(id,nodes,min,max,entry,exit,linkedCarbon,anomerCarbon)
    {
        this.id = id;
        this.nodes = nodes;

        if (min === "?") {
            this.min = min;
        } else {
            this.min = parseInt(min);
        }

        if (max === "?") {
            this.max = max;
        } else {
            this.max = parseInt(max);
        }

        if (linkedCarbon === "?") {
            this.linkedCarbon = LinkedCarbon.UNDEFINED;
        } else {
            this.linkedCarbon = linkedCarbon;
        }

        if (anomerCarbon === "?") {
            this.anomerCarbon = LinkedCarbon.UNDEFINED;
        } else {
            this.anomerCarbon = anomerCarbon;
        }
    }



}