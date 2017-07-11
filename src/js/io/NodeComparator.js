/**
 * Created by Renaud on 10/07/2017.
 */



export default class NodeComparator {

    constructor() {

    }


    compare(n1, n2)
    {
        var childrenN1 = this.children(n1);
        var childrenN2 = this.children(n2);
        if (childrenN1 > childrenN2)
        {
            return -1;
        }
        else if (childrenN1 === childrenN2) {
            var longestN1 = this.longestBranch(n1) - n1.depth;
            var longestN2 = this.longestBranch(n2) - n2.depth;
            if (longestN1 > longestN2)
            {
                return -1;
            }
            else if (longestN1 === longestN2)
            {
                var terminalsN1 = this.terminals(n1);
                var terminalsN2 = this.terminals(n2);
                if (terminalsN1 > terminalsN2)
                {
                    return -1;
                }
                else if (terminalsN1 === terminalsN2)
                {
                    var branchingN1 = this.branching(n1);
                    var branchingN2 = this.branching(n2);
                    if (branchingN1 > branchingN2)
                    {
                        return -1;
                    }
                    else if (branchingN1 === branchingN2)
                    {
                        if (n1.node.monosaccharideType.name > n2.node.monosaccharideType.name)
                        {
                            return -1;
                        }
                    }
                }
            }
        }

    return 1;

    }

    longestBranch(node)
    {
        if (node.children === undefined)
        {
            return node.depth;
        }
        var depths = [];
        for (var child of node.children)
        {
            depths.push(this.longestBranch(child));
        }
        for (var depth of depths)
        {
            if (node.depth > depth)
            {
                return node.depth;
            }
            else
            {
                return Math.max.apply(null,depths);
            }
        }
    }

    children(node)
    {
        if (node.children === undefined)
        {
            return 1;
        }
        var nodes = [];
        for (var child of node.children)
        {
            nodes.push(this.children(child));
        }
        return nodes.reduce((a, b) => a + b, 0) + 1;
    }

    terminals(node)
    {
        if (node.children === undefined)
        {
            return 1;
        }
        var nodes = [];
        for (var child of node.children)
        {
            nodes.push(this.terminals(child));
        }
        return nodes.reduce((a, b) => a + b, 0);
    }

    branching(node)
    {
        if (node.children === undefined)
        {
            return 0;
        }
        var branches = [];
        for (var child of node.children)
        {
            branches.push(this.branching(child));
        }
        return (node.children.length > 1)? branches.reduce((a, b) => a + b, 0) + 1 : branches.reduce((a, b) => a + b, 0);
    }


}