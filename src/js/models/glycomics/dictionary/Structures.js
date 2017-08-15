/**
 * Created by Renaud on 15/08/2017.
 */


import {Enum} from 'enumify';

export default class Structures extends Enum {}

Structures.initEnum({

    ncore: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dman-HEX-1:5\n6b:a-dman-HEX-1:5\n7b:a-dman-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d\n5:5o(3+1)6d\n6:5o(6+1)7d"
    },

    ncorefuc: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dman-HEX-1:5\n6b:a-dman-HEX-1:5\n7b:a-dman-HEX-1:5\n8b:a-lgal-HEX-1:5|6:d\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d\n5:5o(3+1)6d\n6:5o(6+1)7d\n7:1o(6+1)8d"
    },

    ncorebisect: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dman-HEX-1:5\n6b:a-dman-HEX-1:5\n7b:b-dglc-HEX-1:5\n8s:n-acetyl\n9b:a-dman-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d\n5:5o(3+1)6d\n6:5o(4+1)7d\n7:7d(2+1)8n\n8:5o(6+1)9d"
    },

    ncorebisectfuc: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dman-HEX-1:5\n6b:a-dman-HEX-1:5\n7b:b-dglc-HEX-1:5\n8s:n-acetyl\n9b:a-dman-HEX-1:5\n10b:a-lgal-HEX-1:5|6:d\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d\n5:5o(3+1)6d\n6:5o(4+1)7d\n7:7d(2+1)8n\n8:5o(6+1)9d\n9:1o(6+1)10d"
    },

    ncorehyb: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dman-HEX-1:5\n6b:a-dman-HEX-1:5\n7b:a-dman-HEX-1:5\n8b:a-dman-HEX-1:5\n9b:a-dman-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d\n5:5o(3+1)6d\n6:5o(6+1)7d\n7:7o(3+1)8d\n8:7o(6+1)9d"
    },

    ncorehybfuc: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dman-HEX-1:5\n6b:a-dman-HEX-1:5\n7b:a-dman-HEX-1:5\n8b:a-dman-HEX-1:5\n9b:a-dman-HEX-1:5\n10b:a-lgal-HEX-1:5|6:d\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d\n5:5o(3+1)6d\n6:5o(6+1)7d\n7:7o(3+1)8d\n8:7o(6+1)9d\n9:1o(6+1)10d"
    },

    ncorehybbis: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dman-HEX-1:5\n6b:a-dman-HEX-1:5\n7b:b-dglc-HEX-1:5\n8s:n-acetyl\n9b:a-dman-HEX-1:5\n10b:a-dman-HEX-1:5\n11b:a-dman-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d\n5:5o(3+1)6d\n6:5o(4+1)7d\n7:7d(2+1)8n\n8:5o(6+1)9d\n9:9o(3+1)10d\n10:9o(6+1)11d"
    },

    ncorehybbisfuc: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dman-HEX-1:5\n6b:a-dman-HEX-1:5\n7b:b-dglc-HEX-1:5\n8s:n-acetyl\n9b:a-dman-HEX-1:5\n10b:a-dman-HEX-1:5\n11b:a-dman-HEX-1:5\n12b:a-lgal-HEX-1:5|6:d\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d\n5:5o(3+1)6d\n6:5o(4+1)7d\n7:7d(2+1)8n\n8:5o(6+1)9d\n9:9o(3+1)10d\n10:9o(6+1)11d\n11:1o(6+1)12d"
    },
    
    ncoreman: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dman-HEX-1:5\n6b:a-dman-HEX-1:5\n7b:a-dman-HEX-1:5\n8b:a-dman-HEX-1:5\n9b:a-dman-HEX-1:5\n10b:a-dman-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d\n5:5o(3+1)6d\n6:6o(2+1)7d\n7:5o(6+1)8d\n8:8o(3+1)9d\n9:8o(6+1)10d"
    },

    ocore1: {
        glycoct: "RES\n1b:a-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d"
    },

    ocore2: {
        glycoct: "RES\n1b:a-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:b-dglc-HEX-1:5\n5s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:1o(6+1)4d\n4:4d(2+1)5n"
    },

    ocore3: {
        glycoct: "RES\n1b:a-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3d(2+1)4n"
    },

    ocore4: {
        glycoct: "RES\n1b:a-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dglc-HEX-1:5\n6s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3d(2+1)4n\n4:1o(6+1)5d\n5:5d(2+1)6n"
    },

    ocore5: {
        glycoct: "RES\n1b:a-dgal-HEX-1:5\n2s:n-acetyl\n3b:a-dgal-HEX-1:5\n4s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3d(2+1)4n"
    },

    ocore6: {
        glycoct: "RES\n1b:a-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(6+1)3d\n3:3d(2+1)4n"
    },

    ocore7: {
        glycoct: "RES\n1b:a-dgal-HEX-1:5\n2s:n-acetyl\n3b:a-dgal-HEX-1:5\n4s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(6+1)3d\n3:3d(2+1)4n"
    },

    ocore8: {
        glycoct: "RES\n1b:a-dgal-HEX-1:5\n2s:n-acetyl\n3b:a-dgal-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d"
    },

    gslarthro: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2b:b-dman-HEX-1:5\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dgal-HEX-1:5\n6s:n-acetyl\nLIN\n1:1o(4+1)2d\n2:2o(3+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d\n5:5d(2+1)6n"
    },

    gslgala: {
        glycoct: "RES\n1b:a-dgal-HEX-1:5\n2b:a-dgal-HEX-1:5\nLIN\n1:1o(4+1)2d"
    },

    gslganglio: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:b-dgal-HEX-1:5\n4s:n-acetyl\n5b:b-dgal-HEX-1:5\nLIN\n1:1o(4+1)2d\n2:2o(4+1)3d\n3:3d(2+1)4n\n4:3o(3+1)5d"
    },

    gslglobo: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:a-dgal-HEX-1:5\n4b:b-dgal-HEX-1:5\n5s:n-acetyl\nLIN\n1:1o(4+1)2d\n2:2o(4+1)3d\n3:3o(3+1)4d\n4:4d(2+1)5n"
    },

    gslisoglobo: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:a-dgal-HEX-1:5\n4b:b-dgal-HEX-1:5\n5s:n-acetyl\nLIN\n1:1o(4+1)2d\n2:2o(3+1)3d\n3:3o(3+1)4d\n4:4d(2+1)5n"
    },

    gsllacto: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dgal-HEX-1:5\nLIN\n1:1o(4+1)2d\n2:2o(3+1)3d\n3:3d(2+1)4n\n4:3o(3+1)5d"
    },

    gslmollu: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2b:b-dman-HEX-1:5\n3b:a-dman-HEX-1:5\n4b:b-dglc-HEX-1:5\n5s:n-acetyl\nLIN\n1:1o(4+1)2d\n2:2o(3+1)3d\n3:3o(2+1)4d\n4:4d(2+1)5n"
    },

    gslmuco: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:b-dgal-HEX-1:5\n4b:b-dgal-HEX-1:5\nLIN\n1:1o(4+1)2d\n2:2o(4+1)3d\n3:3o(3+1)4d"
    },

    gslneolacto: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dgal-HEX-1:5\nLIN\n1:1o(4+1)2d\n2:2o(3+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d"
    },

    gaghyaluronic: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5|6:a\n4b:b-dglc-HEX-1:5\n5s:n-acetyl\n6b:b-dglc-HEX-1:5|6:a\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(4+1)4d\n4:4d(2+1)5n\n5:4o(3+1)6d"
    },

    gagchodroitin4: {
        glycoct: "RES\n1b:b-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5|6:a\n4b:b-dgal-HEX-1:5\n5s:n-acetyl\n6b:b-dglc-HEX-1:5|6:a\n7s:sulfate\n8s:sulfate\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(4+1)4d\n4:4d(2+1)5n\n5:4o(3+1)6d\n6:4o(4+-1)7n\n7:1o(4+-1)8n"
    },

    gagchodroitin6: {
        glycoct: "RES\n1b:b-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5|6:a\n4b:b-dgal-HEX-1:5\n5s:n-acetyl\n6b:b-dglc-HEX-1:5|6:a\n7s:sulfate\n8s:sulfate\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(4+1)4d\n4:4d(2+1)5n\n5:4o(3+1)6d\n6:4o(6+-1)7n\n7:1o(6+-1)8n"
    },

    gagchodroitin26: {
        glycoct: "RES\n1b:b-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5|6:a\n4s:sulfate\n5b:b-dgal-HEX-1:5\n6s:n-acetyl\n7b:b-dglc-HEX-1:5|6:a\n8s:sulfate\n9s:sulfate\n10s:sulfate\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(2+-1)4n\n4:3o(4+1)5d\n5:5d(2+1)6n\n6:5o(3+1)7d\n7:7o(2+-1)8n\n8:5o(6+-1)9n\n9:1o(6+-1)10n"
    },

    gagchodroitin46: {
        glycoct: "RES\n1b:b-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dglc-HEX-1:5|6:a\n4b:b-dgal-HEX-1:5\n5s:n-acetyl\n6b:b-dglc-HEX-1:5|6:a\n7s:sulfate\n8s:sulfate\n9s:sulfate\n10s:sulfate\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(4+1)4d\n4:4d(2+1)5n\n5:4o(3+1)6d\n6:4o(4+-1)7n\n7:4o(6+-1)8n\n8:1o(4+-1)9n\n9:1o(6+-1)10n"
    },

    gagdermatan: {
        glycoct: "RES\n1b:b-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dido-HEX-1:5|6:a\n4b:b-dgal-HEX-1:5\n5s:n-acetyl\n6b:b-dido-HEX-1:5|6:a\n7s:sulfate\n8s:sulfate\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(4+1)4d\n4:4d(2+1)5n\n5:4o(3+1)6d\n6:4o(4+-1)7n\n7:1o(4+-1)8n"
    },

    gagkeratan: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:b-dglc-HEX-1:5\n5s:n-acetyl\n6b:b-dgal-HEX-1:5\n7s:sulfate\n8s:sulfate\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3o(3+1)4d\n4:4d(2+1)5n\n5:4o(4+1)6d\n6:4o(6+-1)7n\n7:1o(6+-1)8n"
    },

    gagheparin: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-sulfate\n3s:sulfate\n4b:a-dido-HEX-1:5|6:a\n5s:sulfate\n6b:b-dglc-HEX-1:5\n7s:n-sulfate\n8s:sulfate\n9b:a-dido-HEX-1:5|6:a\n10s:sulfate\n11s:sulfate\nLIN\n1:1d(2+-1)2n\n2:1o(3+-1)3n\n3:1o(4+1)4d\n4:4o(2+-1)5n\n5:4o(4+1)6d\n6:6d(2+-1)7n\n7:6o(3+-1)8n\n8:6o(4+1)9d\n9:6o(6+-1)10n\n10:1o(6+-1)11n"
    },

    gagheparan: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:a-dido-HEX-1:5|6:a\n4s:sulfate\n5b:b-dglc-HEX-1:5\n6s:n-sulfate\n7b:a-dido-HEX-1:5|6:a\n8s:sulfate\n9s:sulfate\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3o(2+-1)4n\n4:3o(4+1)5d\n5:5d(2+-1)6n\n6:5o(4+1)7d\n7:5o(6+-1)8n\n8:1o(6+-1)9n"
    },

    milklac: {
        glycoct: "RES\n1b:x-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\nLIN\n1:1o(4+1)2d"
    },

    milk3fuclac: {
        glycoct: "RES\n1b:x-dglc-HEX-1:5\n2b:a-lgal-HEX-1:5|6:d\n3b:b-dgal-HEX-1:5\nLIN\n1:1o(3+1)2d\n2:1o(4+1)3d"
    },

    milk2fuclac: {
        glycoct: "RES\n1b:x-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:a-lgal-HEX-1:5|6:d\nLIN\n1:1o(4+1)2d\n2:2o(2+1)3d"
    },

    milkdifuc: {
        glycoct: "RES\n1b:x-dglc-HEX-1:5\n2b:a-lgal-HEX-1:5|6:d\n3b:b-dgal-HEX-1:5\n4b:a-lgal-HEX-1:5|6:d\nLIN\n1:1o(3+1)2d\n2:1o(4+1)3d\n3:3o(2+1)4d"
    },

    milktetra: {
        glycoct: "RES\n1b:x-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dgal-HEX-1:5\nLIN\n1:1o(4+1)2d\n2:2o(3+1)3d\n3:3d(2+1)4n\n4:3o(3+1)5d"
    },

    milkneotetra: {
        glycoct: "RES\n1b:x-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:b-dglc-HEX-1:5\n4s:n-acetyl\n5b:b-dgal-HEX-1:5\nLIN\n1:1o(4+1)2d\n2:2o(3+1)3d\n3:3d(2+1)4n\n4:3o(4+1)5d"
    },

    antigenA: {
        glycoct: "RES\n1b:b-dgal-HEX-1:5\n2b:a-lgal-HEX-1:5|6:d\n3b:a-dgal-HEX-1:5\n4s:n-acetyl\nLIN\n1:1o(2+1)2d\n2:1o(3+1)3d\n3:3d(2+1)4n"
    },

    antigenB: {
        glycoct: "RES\n1b:b-dgal-HEX-1:5\n2b:a-lgal-HEX-1:5|6:d\n3b:b-dgal-HEX-1:5\nLIN\n1:1o(2+1)2d\n2:1o(3+1)3d"
    },

    antigenH: {
        glycoct: "RES\n1b:b-dgal-HEX-1:5\n2b:a-lgal-HEX-1:5|6:d\nLIN\n1:1o(2+1)2d"
    },

    antigenCAD: {
        glycoct: "RES\n1b:b-dgal-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n5s:n-acetyl\n6b:b-dgal-HEX-1:5\n7s:n-acetyl\n8b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n9s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(3+2)4d\n4:4d(5+1)5n\n5:3o(4+1)6d\n6:6d(2+1)7n\n7:1o(6+2)8d\n8:8d(5+1)9n"
    },

    antigenP: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:a-dgal-HEX-1:5\n4b:b-dgal-HEX-1:5\n5s:n-acetyl\nLIN\n1:1o(4+1)2d\n2:2o(4+1)3d\n3:3o(3+1)4d\n4:4d(2+1)5n"
    },

    antigenPk: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2b:b-dgal-HEX-1:5\n3b:a-dgal-HEX-1:5\nLIN\n1:1o(4+1)2d\n2:2o(4+1)3d"
    },

    antigenSda: {
        glycoct: "RES\n1b:b-dgal-HEX-1:5\n2b:b-dglc-HEX-1:5\n3s:n-acetyl\n4b:b-dgal-HEX-1:5\n5b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n6s:n-acetyl\n7b:b-dgal-HEX-1:5\n8s:n-acetyl\nLIN\n1:1o(3+1)2d\n2:2d(2+1)3n\n3:2o(4+1)4d\n4:4o(3+2)5d\n5:5d(5+1)6n\n6:4o(4+1)7d\n7:7d(2+1)8n"
    },

    highMannose: {
        glycoct: "RES\n1b:a-dman-HEX-1:5\n2b:a-dman-HEX-1:5\nLIN\n1:1o(2+1)2d"
    },

    lacDiNAc: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n"
    },

    lactoseAmine: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d"
    },

    neoLactoseAmine: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d"
    },

    polyLactoseAmine: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:b-dglc-HEX-1:5\n5s:n-acetyl\n6b:b-dgal-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3o(3+1)4d\n4:4d(2+1)5n\n5:4o(4+1)6d"
    },

    sialyllactoNLSa: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n5s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(3+2)4d\n4:4d(5+1)5n"
    },

    sialyllactorNLSb: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n5s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(6+2)4d\n4:4d(5+1)5n"
    },

    sialyllactoNLSc: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n5s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:1o(6+2)4d\n4:4d(5+1)5n"
    },

    disialyllactorNLDS: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n5s:n-acetyl\n6b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n7s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(3+2)4d\n4:4d(5+1)5n\n5:1o(6+2)6d\n6:6d(5+1)7n"
    },

    fucosylatedLacDiNAc: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:a-lgal-HEX-1:5|6:d\n4b:b-dgal-HEX-1:5\n5s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:1o(4+1)4d\n4:4d(2+1)5n"
    },

    sialylatedLacDiNAc: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4s:n-acetyl\n5b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n6s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3d(2+1)4n\n4:3o(6+2)5d\n5:5d(5+1)6n"
    },

    lewisA: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:a-lgal-HEX-1:5|6:d\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:1o(4+1)4d"
    },

    lewisB: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:a-lgal-HEX-1:5|6:d\n5b:a-lgal-HEX-1:5|6:d\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(2+1)4d\n4:1o(4+1)5d"
    },

    lewisC: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d"
    },

    lewisD: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:a-lgal-HEX-1:5|6:d\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(2+1)4d"
    },

    lewisX: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:a-lgal-HEX-1:5|6:d\n4b:b-dgal-HEX-1:5\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:1o(4+1)4d"
    },

    lewisY: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:a-lgal-HEX-1:5|6:d\n4b:b-dgal-HEX-1:5\n5b:a-lgal-HEX-1:5|6:d\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:1o(4+1)4d\n4:4o(2+1)5d"
    },

    sialylLewisA: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n5s:n-acetyl\n6b:a-lgal-HEX-1:5|6:d\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:3o(3+2)4d\n4:4d(5+1)5n\n5:1o(4+1)6d"
    },

    sialylLewisX: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:a-lgal-HEX-1:5|6:d\n4b:b-dgal-HEX-1:5\n5b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n6s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(3+1)3d\n3:1o(4+1)4d\n4:4o(3+2)5d\n5:5d(5+1)6n"
    },

    VIM2: {
        glycoct: "RES\n1b:b-dglc-HEX-1:5\n2s:n-acetyl\n3b:b-dgal-HEX-1:5\n4b:a-dgro-dgal-NON-2:6|1:a|2:keto|3:d\n5s:n-acetyl\nLIN\n1:1d(2+1)2n\n2:1o(4+1)3d\n3:3o(3+2)4d\n4:4d(5+1)5n"
    }

    }
);