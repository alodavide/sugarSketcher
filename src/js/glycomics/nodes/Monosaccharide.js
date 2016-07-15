/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import Node from '../../dataStructure/Node';
import Anomericity from '../../glycomics/dictionary/Anomericity';
import Isomer from '../../glycomics/dictionary/Isomer';
import RingType from '../../glycomics/dictionary/RingType';
import MonosaccharideType from '../../glycomics/dictionary/MonosaccharideType';

export default class Monosaccharide extends Node{

    constructor(id,monosaccharideType,anomericity,isomer,ringType){
        super(id);

        if(monosaccharideType instanceof MonosaccharideType){
            this._monosaccharideType = monosaccharideType;
        } else if(typeof monosaccharideType == 'undefined') {
            this._monosaccharideType = MonosaccharideType.UNDEFINED;
        } else{
            throw 'Please use the MonosaccharideType class and forget about string. Extend the enum if you need a specific value';
        }

        if(anomericity instanceof Anomericity){
            this._anomericity = anomericity;
        } else if(typeof anomericity == 'undefined') {
            this._anomericity = Anomericity.UNDEFINED;
        } else {
            throw 'Please use the Anomericity class and forget about string. Extend the enum if you need a specific value';
        }

        if(isomer instanceof Isomer){
            this._isomer = isomer;
        } else if(typeof isomer == 'undefined') {
            this._isomer = Isomer.UNDEFINED;
        } else {
            throw 'Please use the Isomer class and forget about string. Extend the enum if you need a specific value';
        }

        if(ringType instanceof RingType){
            this._ringType = ringType;
        } else if(typeof ringType == 'undefined') {
            this._ringType = RingType.UNDEFINED;
        } else{
            throw 'Please use the RingType class and forget about string. Extend the enum if you need a specific value';
        }

    }

    get ringType(){
        return this._ringType;
    }

    get monosaccharideType(){
        return this._monosaccharideType;
    }

    get isomer(){
        return this._isomer;
    }

    get anomericity(){
        return this._anomericity;
    }

    set ringType(ringType){
        if(ringType instanceof RingType){
            this._ringType = ringType;
        } else{
            throw 'Please use the RingType class and forget about string. Extend the enum if you need a specific value';
        }
    }

    set monosaccharideType(monosaccharideType){
        if(monosaccharideType instanceof MonosaccharideType){
            this._monosaccharideType = monosaccharideType;
        } else{
            throw 'Please use the MonosaccharideType class and forget about string. Extend the enum if you need a specific value';
        }
    }

    set isomer(isomer){
        if(isomer instanceof Isomer){
            this._isomer = isomer;
        } else {
            throw 'Please use the Isomer class and forget about string. Extend the enum if you need a specific value';
        }
    }

    set anomericity(anomericity){
        if(anomericity instanceof Anomericity){
            this._anomericity = anomericity;
        } else {
            throw 'Please use the Anomericity class and forget about string. Extend the enum if you need a specific value';
        }
    }
}