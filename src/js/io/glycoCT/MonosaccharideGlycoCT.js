/**
 * Created by Renaud on 21/07/2017.
 */

import {Enum} from 'enumify';

export default class MonosaccharideGlycoCT extends Enum {}

MonosaccharideGlycoCT.initEnum({
    Hex: {
        glycoct: "HEX",
        transform: ""
    },

    Glc: {
        glycoct: "glc-HEX",
        transform: ""
    },

    Man: {
        glycoct: "man-HEX",
        transform: ""
    },

    Gal: {
        glycoct: "gal-HEX",
        transform: ""
    },


    Gul: {
        glycoct: "gul-HEX",
        transform: ""
    },

    Alt: {
        glycoct: "alt-HEX",
        transform: ""
    },

    All: {
        glycoct: "all-HEX",
        transform: ""
    },

    Tal: {
        glycoct: "tal-HEX",
        transform: ""
    },

    Ara: {
        glycoct: "ara-PEN",
        transform: ""
    },

    Bac: {
        glycoct: "glc-HEX",
        transform: "|2:d|4:d|6:d"
    },

    dAlt: {
        glycoct: "alt-HEX",
        transform: "|6:d"
    },

    DeoxyHex: {
        glycoct: "HEX",
        transform: "|0:d"
    },

    Fru: {
        glycoct: "ara-PEN",
        transform: "|2:keto"
    },

    Fuc: {
        glycoct: "gal-HEX",
        transform: "|6:d"
    },

    HexA: {
        glycoct: "HEX",
        transform: "|6:a"
    },

    GlcA: {
        glycoct: "glc-HEX",
        transform: "|6:a"
    },

    ManA: {
        glycoct: "man-HEX",
        transform: "|6:a"
    },

    GalA: {
        glycoct: "gal-HEX",
        transform: "|6:a"
    },

    GulA: {
        glycoct: "gul-HEX",
        transform: "|6:a"
    },

    AltA: {
        glycoct: "alt-HEX",
        transform: "|6:a"
    },

    AllA: {
        glycoct: "all-HEX",
        transform: "|6:a"
    },

    TalA: {
        glycoct: "tal-HEX",
        transform: "|6:a"
    },

    Qui: {
        glycoct: "glc-HEX",
        transform: "|6:d"
    },

    dHex: {
        glycoct: "HEX",
        transform: "|6:d"
    },

    Ido: {
        glycoct: "ido-HEX",
        transform: ""
    },

    IdoA: {
        glycoct: "ido-HEX",
        transform: "|6:a"
    },

    Kdn: {
        glycoct: "gro-dgal-NON-2:6",
        transform: "|1:a|2:keto|3:d"
    },

    Pent: {
        glycoct: "PEN-1:4",
        transform: ""
    },

    Rha: {
        glycoct: "man-HEX",
        transform: "|6:d"
    },

    SixdAlt: {
        glycoct: "alt-HEX",
        transform: "|6:d"
    },

    SixdTal: {
        glycoct: "tal-HEX",
        transform: "|6:d"
    },

    Xyl: {
        glycoct: "xyl-PEN",
        transform: ""
    }

});