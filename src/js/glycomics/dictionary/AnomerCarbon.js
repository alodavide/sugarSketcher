/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import {Enum} from 'enumify';

export default class AnomerCarbon extends Enum {}

AnomerCarbon.initEnum({
    ONE: {
        value: 1
    },
    TWO: {
        value: 2
    },
    TREE: {
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
