/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import {Enum} from 'enumify';

export default class SubstituentType extends Enum {}

SubstituentType.initEnum({
    Acetyl: {
        label: 'Ac'
    },
    Bromo: {
        label: 'Br'
    },
    Chloro: {
        label: 'Cl'
    },
    Ethyl: {
        label: 'Et'
    },
    Ethanolamine: {
        label : 'ETA'
    },
    Fluoro: {
        label: 'F'
    },
    Formyl: {
        label: 'Formyl'
    },
    Hydroxymethyl: {
        label: 'HM'
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
    NTrifluoroacetyl: {
        label: 'NTrifluoroacetyl'
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
