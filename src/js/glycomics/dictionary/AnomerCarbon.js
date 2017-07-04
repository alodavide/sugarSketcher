/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import {Enum} from 'enumify';

export default class AnomerCarbon extends Enum {

    getAnomerCarbon(value) {
        switch (value){
            case 1: return AnomerCarbon.ONE;
            case 2: return AnomerCarbon.TWO;
            case 3: return AnomerCarbon.THREE;
            case 4: return AnomerCarbon.FOUR;
            case 5: return AnomerCarbon.FIVE;
            case 6: return AnomerCarbon.SIX;
            default: return AnomerCarbon.UNDEFINED;
        }
    }
}

AnomerCarbon.initEnum({
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
    UNDEFINED: {
        value: 'undefined'
    }
});
