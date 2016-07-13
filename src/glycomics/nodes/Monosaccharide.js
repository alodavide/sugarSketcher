/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

class Monosaccharide extends Node{


    // Add type, anomericity, isomer and ring type.

    constructor(id,type,anomericity,isomer,ringType){
        super(id);

        //Add Enum for Monosaccharide Type
        this.type = type;

        if(anomericity instanceof Anomericity){
            this.anomericity = anomericity;
        } else{
            throw 'Please use the Anomericity class and forget about string. Extend the enum if you need a specific value';
        }

        if(isomer instanceof Isomer){
            this.isomer = isomer;
        } else{
            throw 'Please use the Isomer class and forget about string. Extend the enum if you need a specific value';
        }

        if(ringType instanceof RingType){
            this.ringType = ringType;
        } else{
            throw 'Please use the RingType class and forget about string. Extend the enum if you need a specific value';
        }

    }

    getRingType(){
        return this.ringType;
    }

    getMonosaccharideType(){
        return this.type;
    }

    getIsomer(){
        return this.isomer;
    }

    getAnomericity(){
        return this.anomericity;
    }

}