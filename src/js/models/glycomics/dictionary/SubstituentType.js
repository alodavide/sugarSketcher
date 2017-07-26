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
        label: 'HMe'
    },
    Imino: {
        label: 'Imino'
    },
    RLactate1: {
        label: 'RLac1'
    },
    SLactate1: {
        label: 'SLac1'
    },
    Amino: {
        label: 'N'
    },
    Methyl: {
        label: 'Me'
    },
    NAcetyl: {
        label: 'NAc'
    },
    NAlanine: {
        label: 'NAla'
    },
    NFormyl: {
        label: 'NFormyl'
    },
    NGlycolyl: {
        label: 'NGc'
    },
    NMethyl: {
        label: 'NMe'
    },
    NSuccinate: {
        label: 'NSuc'
    },
    NSulfate: {
        label: 'NS'
    },
    NTrifluoroacetyl: {
        label: 'NTFA'
    },
    Nitrate: {
        label: 'NO3'
    },
    Phosphate: {
        label: 'P'
    },
    Pyruvate: {
        label: 'Pyr'
    },
    Sulfate: {
        label: 'S'
    },
    Thio: {
        label: 'Thio'
    },
    RPyruvate: {
        label: 'RPyr'
    },
    SPyruvate: {
        label: 'SPyr'
    },
    RLactate2: {
        label: 'RLac2'
    },
    SLactate2: {
        label: 'SLac2'
    },
});
