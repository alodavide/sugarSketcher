/**
 * Author:  Davide Alocci
 * Version: 0.0.1
 */
import Edge from '../../dataStructure/GraphEdge';
import AcceptorPosition from '../dictionary/AcceptorPosition';
import DonorPosition from '../dictionary/DonorPosition';

export default class GlycosidicLinkage extends Edge{

    constructor(id, sourceNode, targetNode, acceptorPosition, donorPosition){

        super(id,sourceNode,targetNode);

        if(acceptorPosition instanceof AcceptorPosition){
            this._acceptorPosition= acceptorPosition;
        } else if(typeof acceptorPosition == 'undefined') {
            this._acceptorPosition = AcceptorPosition.UNDEFINED;
        } else {
            throw "The Acceptor Position must be AcceptorPosition type. Please use the enum under src/js/glycomics/dictionary/AcceptorPosition.js";
        }

        if(donorPosition instanceof DonorPosition){
            this._donorPosition = donorPosition;
        } else if(typeof donorPosition == 'undefined') {
            this._donorPosition = DonorPosition.UNDEFINED;
        } else {
            throw "The Donor Position must be DonorPosition type. Please use the enum under src/js/glycomics/dictionary/DonorPosition.js";
        }
    }

    get acceptorPosition(){
        return this._acceptorPosition;
    }

    get donorPosition(){
        return this._donorPosition;
    }

    set acceptorPosition(acceptorPosition){
        if(acceptorPosition instanceof AcceptorPosition) {
            this._acceptorPosition = acceptorPosition;
        } else {
            throw "The Donor Position must be AcceptorPosition type. Please use the enum under src/js/glycomics/dictionary/AcceptorPosition.js";
        }
        return acceptorPosition;
    }

    set donorPosition(donorPosition){
        if(donorPosition instanceof DonorPosition) {
            this._donorPosition = donorPosition;
        } else {
            throw "The Donor Position must be DonorPosition type. Please use the enum under src/js/glycomics/dictionary/DonorPosition.js";
        }
        return donorPosition;
    }
}
