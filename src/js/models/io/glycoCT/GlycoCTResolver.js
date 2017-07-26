/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */

import Anomericity from "../../glycomics/dictionary/Anomericity";


export default class GlycoCTResolver{

    constructor(){
        var AnomericityGlycoCTResolver = new Map();
        AnomericityGlycoCTResolver.set('a', Anomericity.ALPHA);
        AnomericityGlycoCTResolver.set('b', Anomericity.BETA);
        AnomericityGlycoCTResolver.set('o', Anomericity.OPEN);

        var MonosaccahrideGlycoCTResolver = new Map();

        var SubstituentGlycoCTResolver = new Map();
    }


}
