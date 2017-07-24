/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import {Enum} from 'enumify';

export default class MonosaccharideType extends Enum {}

MonosaccharideType.initEnum({
    Hex: {
        shape: 'circle',
        color: '#FFFFFF',
        bisected: false,
        superclass: "HEX"
    },
    Glc: {
        shape: 'circle',
        color: '#0080FF',
        bisected: false,
        superclass: "HEX"
    },
    Man: {
        shape: 'circle',
        color: '#00FF00',
        bisected: false,
        superclass: "HEX"
    },
    Gal: {
        shape: 'circle',
        color: '#FFD900',
        bisected: false,
        superclass: "HEX"
    },
    Gul: {
        shape: 'circle',
        color: '#FF8000',
        bisected: false,
        superclass: "HEX"
    },
    Alt: {
        shape: 'circle',
        color: '#FF87C2',
        bisected: false,
        superclass: "HEX"
    },
    All: {
        shape: 'circle',
        color: '#9E1FFF',
        bisected: false,
        superclass: "HEX"
    },
    Tal: {
        shape: 'circle',
        color: '#96F2F7',
        bisected: false,
        superclass: "HEX"
    },
    Ido: {
        shape: 'circle',
        color: '#977335',
        bisected: false,
        superclass: "HEX"
    },
    HexNAc: {
        shape: 'square',
        color: '#FFFFFF',
        bisected: false
    },
    GlcNAc: {
        shape: 'square',
        color: '#0080FF',
        bisected: false
    },
    ManNAc: {
        shape: 'square',
        color: '#00FF00',
        bisected: false
    },
    GalNAc: {
        shape: 'square',
        color: '#FFD900',
        bisected: false
    },
    GulNAc: {
        shape: 'square',
        color: '#FF8000',
        bisected: false
    },
    AltNAc: {
        shape: 'square',
        color: '#FF87C2',
        bisected: false
    },
    AllNAc: {
        shape: 'square',
        color: '#9E1FFF',
        bisected: false
    },
    TalNAc: {
        shape: 'square',
        color: '#96F2F7',
        bisected: false
    },
    IdoNAc: {
        shape: 'square',
        color: '#977335',
        bisected: false
    },
    HexN: {
        shape: 'square',
        color: '#FFFFFF',
        bisected: true
    },
    GlcN: {
        shape: 'square',
        color: '#0080FF',
        bisected: true
    },
    ManN: {
        shape: 'square',
        color: '#00FF00',
        bisected: true
    },
    GalN: {
        shape: 'square',
        color: '#FFD900',
        bisected: true
    },
    GulN: {
        shape: 'square',
        color: '#FF8000',
        bisected: true
    },
    AltN: {
        shape: 'square',
        color: '#FF87C2',
        bisected: true
    },
    AllN: {
        shape: 'square',
        color: '#9E1FFF',
        bisected: true
    },
    TalN: {
        shape: 'square',
        color: '#96F2F7',
        bisected: true
    },
    IdoN: {
        shape: 'square',
        color: '#977335',
        bisected: true
    },
    HexA: {
        shape: 'diamond',
        color: '#FFFFFF',
        bisected: true
    },
    GlcA: {
        shape: 'diamond',
        color: '#0080FF',
        bisected: true
    },
    ManA: {
        shape: 'diamond',
        color: '#00FF00',
        bisected: true
    },
    GalA: {
        shape: 'diamond',
        color: '#FFD900',
        bisected: true
    },
    GulA: {
        shape: 'diamond',
        color: '#FF8000',
        bisected: true
    },
    AltA: {
        shape: 'diamond',
        color: '#FF87C2',
        bisected: true
    },
    AllA: {
        shape: 'diamond',
        color: '#9E1FFF',
        bisected: true
    },
    TalA: {
        shape: 'diamond',
        color: '#96F2F7',
        bisected: true
    },
    IdoA: {
        shape: 'diamond',
        color: '#977335',
        bisected: true
    },
    dHex: {
        shape: 'triangle',
        color: '#FFFFFF',
        bisected: false
    },
    Qui: {
        shape: 'triangle',
        color: '#0080FF',
        bisected: false
    },
    Rha: {
        shape: 'triangle',
        color: '#00FF00',
        bisected: false
    },
    SixdAlt: {
        shape: 'triangle',
        color: '#FF87C2',
        bisected: false
    },
    SixdTal: {
        shape: 'triangle',
        color: '#96F2F7',
        bisected: false
    },
    Fuc: {
        shape: 'triangle',
        color: '#FF0000',
        bisected: false
    },
    dHexNAc: {
        shape: 'triangle',
        color: '#FFFFFF',
        bisected: true
    },
    QuiNAc: {
        shape: 'triangle',
        color: '#0080FF',
        bisected: true
    },
    RhaNAc: {
        shape: 'triangle',
        color: '#00FF00',
        bisected: true
    },
    FucNAc: {
        shape: 'triangle',
        color: '#FF0000',
        bisected: true
    },
    ddHex: {
        shape: 'rectangle',
        color: '#FFFFFF',
        bisected: false
    },
    Oli: {
        shape: 'rectangle',
        color: '#0080FF',
        bisected: false
    },
    Tyv: {
        shape: 'rectangle',
        color: '#00FF00',
        bisected: false
    },
    Abe: {
        shape: 'rectangle',
        color: '#FF8000',
        bisected: false
    },
    Par: {
        shape: 'rectangle',
        color: '#FF87C2',
        bisected: false
    },
    Dig: {
        shape: 'rectangle',
        color: '#9E1FFF',
        bisected: false
    },
    Col: {
        shape: 'rectangle',
        color: '#96F2F7',
        bisected: false
    },
    Pen: {
        shape: 'star',
        color: '#FFFFFF',
        bisected: false,
        superclass: "PEN"
    },
    Ara: {
        shape: 'star',
        color: '#00FF00',
        bisected: false,
        superclass: "PEN"
    },
    Lyx: {
        shape: 'star',
        color: '#FFD900',
        bisected: false,
        superclass: "PEN"
    },
    Xyl: {
        shape: 'star',
        color: '#FF8000',
        bisected: false,
        superclass: "PEN"
    },
    Rib: {
        shape: 'star',
        color: '#FF87C2',
        bisected: false,
        superclass: "PEN"
    },
    Nonu: {
        shape: 'diamond',
        color: '#FFFFFF',
        bisected: false
    },
    Kdn: {
        shape: 'diamond',
        color: '#00FF00',
        bisected: false
    },
    Neu5Ac: {
        shape: 'diamond',
        color: '#9E1FFF',
        bisected: false
    },
    Neu5Gc: {
        shape: 'diamond',
        color: '#96F2F7',
        bisected: false
    },
    Neu: {
        shape: 'diamond',
        color: '#977335',
        bisected: false
    },



    Unknown: {
        shape: 'Hexagon',
        color: '#FFFFFF',
        bisected: false
    },
    Bac: {
        shape: 'Hexagon',
        color: '#0080FF',
        bisected: false
    },
    LDManHep: {
        shape: 'Hexagon',
        color: '#00FF00',
        bisected: false
    },
    Kdo: {
        shape: 'Hexagon',
        color: '#FFD900',
        bisected: false
    },
    Dha: {
        shape: 'Hexagon',
        color: '#FF8000',
        bisected: false
    },
    DDManHep: {
        shape: 'Hexagon',
        color: '#FF87C2',
        bisected: false
    },
    MurNAc: {
        shape: 'Hexagon',
        color: '#9E1FFF',
        bisected: false
    },
    MurNGc: {
        shape: 'Hexagon',
        color: '#96F2F7',
        bisected: false
    },
    Mur: {
        shape: 'Hexagon',
        color: '#977335',
        bisected: false
    },



    Assigned: {
        shape: 'Pentagon',
        color: '#FFFFFF',
        bisected: false
    },
    Api: {
        shape: 'Pentagon',
        color: '#0080FF',
        bisected: false
    },
    Fru: {
        shape: 'Pentagon',
        color: '#00FF00',
        bisected: false
    },
    Tag: {
        shape: 'Pentagon',
        color: '#FFD900',
        bisected: false
    },
    Sor: {
        shape: 'Pentagon',
        color: '#FF8000',
        bisected: false
    },
    Psi: {
        shape: 'Pentagon',
        color: '#FF87C2',
        bisected: false
    }
});

