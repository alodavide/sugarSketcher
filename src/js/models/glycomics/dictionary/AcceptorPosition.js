/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import {Enum} from 'enumify';

export default class AcceptorPosition extends Enum {

    getAcceptorPosition(value) {
        switch (value){
            case 1: return AcceptorPosition.ONE;
            case 2: return AcceptorPosition.TWO;
            case 3: return AcceptorPosition.THREE;
            default: return AcceptorPosition.UNDEFINED;
        }
    }
}

AcceptorPosition.initEnum({
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
