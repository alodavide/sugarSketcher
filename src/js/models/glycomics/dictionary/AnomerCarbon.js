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
    UNDEFINED: {
        value: 'undefined'
    }
});
