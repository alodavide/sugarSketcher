/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import {Enum} from 'enumify';

export default class SubstituentType extends Enum {}

SubstituentType.initEnum({
    Acetyl: {
        label: 'Acetyl'
    },
    Bromo: {
        label: 'Br'
    },
    Chloro: {
        label: 'Cl'
    },
    Ethyl: {
        label: 'Ethyl'
    },
    Ethanolamine: {
        label : 'Ethanolamine'
    },
    Fluoro: {
        label: 'F'
    },
    Formyl: {
        label: 'Formyl'
    },
    Hydroxymethyl: {
        label: 'Hydroxymethyl'
    },
    Imino: {
        label: 'Imino'
    },
    RLactate1: {
        label: 'RLactate1'
    },
    SLactate1: {
        label: 'SLactate1'
    },
    Methyl: {
        label: 'Methyl'
    },
    N: {
        label: 'N'
    },
    NAcetyl: {
        label: 'NAc'
    },
    NAlanine: {
        label: 'NAlanine'
    },
    NFormyl: {
        label: 'NFormyl'
    },
    NGlycolyl: {
        label: 'NGlycolyl'
    },
    NMethyl: {
        label: 'NMethyl'
    },
    NSuccinate: {
        label: 'NSuccinate'
    },
    NSulfate: {
        label: 'NSulfate'
    },
    NTriflouroacetyl: {
        label: 'NTriflouroacetyl'
    },
    Nitrat: {
        label: 'Nitrat'
    },
    Phosphate: {
        label: 'P'
    },
    Pyruvate: {
        label: 'Pyruvate'
    },
    Sulfate: {
        label: 'S'
    },
    Thio: {
        label: 'Thio'
    },
    RPyruvate: {
        label: 'RPyruvate'
    },
    SPyruvate: {
        label: 'SPyruvate'
    },
    RLactate2: {
        label: 'RLactate2'
    },
    SLactate2: {
        label: 'SLactate2'
    },
    UNDEFINED: {
        label: 'undefined'
    }
});
