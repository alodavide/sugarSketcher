/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import Node from '../../dataStructure/Node';
import Anomericity from '../../glycomics/dictionary/Anomericity';
import Isomer from '../../glycomics/dictionary/Isomer';
import RingType from '../../glycomics/dictionary/RingType';
import MonosaccharideType from '../../glycomics/dictionary/MonosaccharideType';

class Monosaccharide extends Node{

    constructor(id,monosaccharideType,anomericity,isomer,ringType){
        super(id);

        if(monosaccharideType instanceof MonosaccharideType){
            this.monosaccharideType = monosaccharideType;
        } else if(typeof monosaccharideType == 'undefined') {
            this.monosaccharideType = MonosaccharideType.UNDEFINED;
        } else{
            throw 'Please use the Anomericity class and forget about string. Extend the enum if you need a specific value';
        }

        if(anomericity instanceof Anomericity){
            this.anomericity = anomericity;
        } else if(typeof anomericity == 'undefined') {
            this.anomericity = Anomericity.UNDEFINED;
        } else {
            throw 'Please use the Anomericity class and forget about string. Extend the enum if you need a specific value';
        }

        if(isomer instanceof Isomer){
            this.isomer = isomer;
        } else if(typeof isomer == 'undefined') {
            this.isomer = Isomer.UNDEFINED;
        } else {
            throw 'Please use the Isomer class and forget about string. Extend the enum if you need a specific value';
        }

        if(ringType instanceof RingType){
            this.ringType = ringType;
        } else if(typeof ringType == 'undefined') {
            this.ringType = RingType.UNDEFINED;
        } else{
            throw 'Please use the RingType class and forget about string. Extend the enum if you need a specific value';
        }

    }

    getRingType(){
        return this.ringType;
    }

    getMonosaccharideType(){
        return this.monosaccharideType;
    }

    getIsomer(){
        return this.isomer;
    }

    getAnomericity(){
        return this.anomericity;
    }

}