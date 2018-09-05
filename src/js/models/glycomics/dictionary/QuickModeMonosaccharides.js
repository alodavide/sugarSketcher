/**
 * Created by Renaud on 11/08/2017.
 */

import {Enum} from 'enumify';

export default class QuickModeMonosaccharides extends Enum {}

QuickModeMonosaccharides.initEnum({

    Gal: {
        isomer: "D",
        ringType: "P",
        acceptorPosition: "1"
    },

    Glc: {
        isomer: "D",
        ringType: "P",
        acceptorPosition: "1"
    },

    Man: {
        isomer: "D",
        ringType: "P",
        acceptorPosition: "1"
    },

    GalNAc: {
        isomer: "D",
        ringType: "P",
        acceptorPosition: "1"
    },

    GlcNAc: {
        isomer: "D",
        ringType: "P",
        acceptorPosition: "1"
    },

    Fuc: {
        isomer: "L",
        ringType: "P",
        acceptorPosition: "1"
    },

    Kdn: {
        isomer: "D",
        ringType: "P",
        acceptorPosition: "2"
    },

    Neu5Ac: {
        isomer: "D",
        ringType: "P",
        acceptorPosition: "2"
    },

    Neu5Gc: {
        isomer: "D",
        ringType: "P",
        acceptorPosition: "2"
    },

    Neu: {
        isomer: "D",
        ringType: "P",
        acceptorPosition: "2"
    },

    Xyl: {
        isomer: "D",
        ringType: "P",
        acceptorPosition: "1"
    },

    }
);