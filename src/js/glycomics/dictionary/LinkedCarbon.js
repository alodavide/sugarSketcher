/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import {Enum} from 'enumify';

export default class LinkedCarbon extends Enum {
    getLinkedCarbon(value) {
        switch (value){
            case 1: return LinkedCarbon.ONE;
            case 2: return LinkedCarbon.TWO;
            case 3: return LinkedCarbon.THREE;
            case 4: return LinkedCarbon.FOUR;
            case 5: return LinkedCarbon.FIVE;
            case 6: return LinkedCarbon.SIX;
            case 7: return LinkedCarbon.SEVEN;
            case 8: return LinkedCarbon.EIGHT;
            case 9: return LinkedCarbon.NINE;
            default: return LinkedCarbon.UNDEFINED;
        }
    }
}

LinkedCarbon.initEnum({
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
