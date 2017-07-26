/**
 * Created by Renaud on 06/07/2017.
 */


import {Enum} from 'enumify';

export default class GlycoCTSubstituents extends Enum {}

GlycoCTSubstituents.initEnum({
    NAcetyl: {
        glycoct: "n-acetyl"
    },
    Amino: {
        glycoct: "amino"
    },
    NGlycolyl: {
        glycoct: "n-glycolyl"
    },
    Methyl: {
        glycoct: "methyl"
    },
    Acetyl: {
        glycoct: "acetyl"
    },
    Sulfate: {
        glycoct: "sulfate"
    },
    Phosphate: {
        glycoct: "phosphate"
    },
    Bromo: {
        glycoct: 'bromo'
    },
    Chloro: {
        glycoct: 'chloro'
    },
    Ethyl: {
        glycoct: 'ethyl'
    },
    Ethanolamine: {
        glycoct : 'ethanolamine'
    },
    Fluoro: {
        glycoct: 'fluoro'
    },
    Formyl: {
        glycoct: 'formyl'
    },
    Hydroxymethyl: {
        glycoct: 'hydroxymethyl'
    },
    Imino: {
        glycoct: 'imino'
    },
    RLactate1: {
        glycoct: '(r)-lactate'
    },
    SLactate1: {
        glycoct: '(s)-lactate'
    },
    NAlanine: {
        glycoct: 'n-alanine'
    },
    NFormyl: {
        glycoct: 'n-formyl'
    },
    NMethyl: {
        glycoct: 'n-methyl'
    },
    NSuccinate: {
        glycoct: 'n-succinate'
    },
    NSulfate: {
        glycoct: 'n-sulfate'
    },
    NTrifluoroacetyl: {
        glycoct: 'n-trifluoroacetyl'
    },
    Nitrate: {
        glycoct: 'nitrate'
    },
    Pyruvate: {
        glycoct: 'pyruvate'
    },
    Thio: {
        glycoct: 'thio'
    },
    RPyruvate: {
        glycoct: '(r)-pyruvate'
    },
    SPyruvate: {
        glycoct: '(s)-pyruvate'
    },
    RLactate2: {
        glycoct: '(r)-lactate2'
    },
    SLactate2: {
        glycoct: '(s)-lactate2'
    },
    Unknown: {
        glycoct: 'unknown'
    }
});