/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import {Enum} from 'enumify';

export default class DonorPosition extends Enum {
    getDonorPosition(value) {
        switch (value){
            case 1: return DonorPosition.ONE;
            case 2: return DonorPosition.TWO;
            case 3: return DonorPosition.THREE;
            case 4: return DonorPosition.FOUR;
            case 5: return DonorPosition.FIVE;
            case 6: return DonorPosition.SIX;
            case 7: return DonorPosition.SEVEN;
            case 8: return DonorPosition.EIGHT;
            case 9: return DonorPosition.NINE;
            default: return DonorPosition.UNDEFINED;
        }
    }
}

DonorPosition.initEnum({
    ONE: {
        value: 1
    },
    TWO: {
        value: 2
    },
    THREE: {
        value: 3
    },
    FOUR:{
        value: 4
    },
    FIVE: {
        value: 5
    },
    SIX: {
        value: 6
    },
    SEVEN: {
        value: 7
    },
    EIGHT: {
        value: 8
    },
    NINE: {
        value: 9
    },
    UNDEFINED: {
        value: 'undefined'
    }
});
