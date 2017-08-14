/**
 * Created by Renaud on 11/07/2017.
 */

/**
 * Created by Renaud on 10/07/2017.
 */

import NodeComparator from './NodeComparator';
import GlycosidicLinkage from "../glycomics/linkages/GlycosidicLinkage";

export default class EdgeComparator {

    constructor() {

    }


    compare(e1, e2)
    {
        var bondsE1 = this.bonds(e1);
        var bondsE2 = this.bonds(e2);
        if (bondsE1 > bondsE2)
        {
            return 1;
        }
        else if (bondsE1 === bondsE2) {
            var parentLinkPosE1 = this.parentLinkPos(e1);
            var parentLinkPosE2 = this.parentLinkPos(e2);
            if (parentLinkPosE1 > parentLinkPosE2)
            {
                return 1;
            }
            else if (parentLinkPosE1 === parentLinkPosE2)
            {
                var childLinkPosE1 = this.childLinkPos(e1);
                var childLinkPosE2 = this.childLinkPos(e2);
                if (childLinkPosE1 > childLinkPosE2)
                {
                    return 1;
                }
                else if (childLinkPosE1 === childLinkPosE2)
                {
                    var linkageTypeE1 = this.linkageType(e1);
                    var linkageTypeE2 = this.linkageType(e2);
                    if (linkageTypeE1 > linkageTypeE2)
                    {
                        return 1;
                    }
                    else if (linkageTypeE1 === linkageTypeE2)
                    {
                        return this.compareNodes(e1, e2);
                    }
                }
            }
        }

        return -1;

    }

    parentLinkPos(edge)
    {
        return edge.linkedCarbon.value === "undefined" ? 0 : edge.linkedCarbon.value;
    }

    bonds(edge)
    {
        return 1; // always 1 bond in our application
    }

    childLinkPos(edge)
    {
        return edge.anomerCarbon.value === "undefined" ? 0 : edge.anomerCarbon.value;
    }

    linkageType(edge)
    {
        if (edge instanceof GlycosidicLinkage)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }

    compareNodes(edge1, edge2)
    {
        var comp = new NodeComparator();
        return comp.compare(edge1.targetNode,edge2.targetNode);
    }


}