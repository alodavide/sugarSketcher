menuAction = [{
    division: "addNode",
    display_division: "Add Node",
    subDivisions : [{
        division: "subNode",
        display_division: "SubNode",
        subDivisions: [{
            division: "subNode1",
            display_division: "SubNode 1"
        },{
            division: "subNode2",
            display_division:"SubNode 2"
        }]
    }, {
        division: "newNode",
        display_division: "New Node",
        subDivisions: [{
            division: "newNode1",
            display_division: "newNode 1"
        },{
            division: "newNode2",
            display_division:"newNode 2"
        }]
    }]
    }, {
        division: "addStructure",
        display_division: "Add Structure",
        subDivisions : [{
            division: "subStruct",
            display_division: "Sub Struct",
            subDivisions: [{
                division: "subStruct1",
                display_division: "SubStruct 1"
            },{
                division: "subStruct2",
                display_division:"SubStruct 2"
            }
            ]
        }]
    }, {
        division: "changeMono",
        display_division: "Change Mono"
}];

function updateMenu(chosenDivision) {
    // Define the size of our chart and
    // some common layout properties
        cDim = {
            height: 50,
            width: 500,
            barMargin: 0
        };

    d3.select("#actions").selectAll("*").remove(); // Reinitialize the svg menu
    d3.select("#labels").selectAll("*").remove(); // Reinitialize the svg menu
    var actions = d3.select("#actions");
    var labels = d3.select("#labels");

    // Let's make a scale so the bar data fills the chart space.
    // First, we need to get the maximum value of our data set
    var maxHeight = 10;

    // Now make the scale function.
    var barHeight = d3.scale.linear()
        .domain([0, maxHeight])
        .range([0, cDim.height]);
    // Set the height and width of our SVG element
    var svgMenu = d3.select("#svgMenu").attr({
        height: cDim.height,
        width: cDim.width
    });

    if (typeof chosenDivision === 'undefined') { // First menu
        // Figure out how much space is actually available
        // for the bars.
        var marginlessWidth = cDim.width - (cDim.barMargin * (menuAction.length - 1));
        cDim.barWidth = marginlessWidth / menuAction.length;
        // Join our data to the rectangles
        var bars = actions.selectAll("rect").data(menuAction);

        bars.enter().append("rect")
            .attr("width", function (d, i) {
                return cDim.barWidth
            })
            .attr("height", function (d, i) {
                return barHeight(10)
            })
            .attr("y", function (d, i) {
                return cDim.height - barHeight(10);
            })
            .attr("x", function (d, i) {
                return (cDim.barWidth + cDim.barMargin) * i;
            })
            .attr("id", function (d) {
                return d.division;
            })
            .attr("class", function(d) {
                return "bar choice"
            })
            .on('click', function(d) {
                updateMenu(d.division)
            });

        /*
         *  Label drawing block
         *  Place some simple labels
         */

        var textNodes = labels.selectAll("text").data(menuAction);

        textNodes.enter().append("text")
            .attr("class", "label")
            .attr("x", function (d, i) {
                return ((cDim.barWidth + cDim.barMargin) * i) + (cDim.barWidth / 2);
            })
            .attr("y", function (d, i) {
                return cDim.height - barHeight(10) + 8;
            })
            .text(function (d, i) {
                return d.display_division;
            });
    } else {
        var newMenuAction = getSubDivisions(menuAction,chosenDivision);
        console.log("je recois :");
        console.log(newMenuAction);
        // Figure out how much space is actually available
        // for the bars.
        marginlessWidth = cDim.width - (cDim.barMargin * (newMenuAction.length - 1));
        cDim.barWidth = marginlessWidth / newMenuAction.length;
        bars = actions.selectAll("rect").data(newMenuAction);
        console.log("clicked on " + chosenDivision);
        bars.enter().append("rect")
            .attr("width", function (d, i) {
                return cDim.barWidth
            })
            .attr("height", function (d, i) {
                return barHeight(10)
            })
            .attr("y", function (d, i) {
                return cDim.height - barHeight(10);
            })
            .attr("x", function (d, i) {
                return (cDim.barWidth + cDim.barMargin) * i;
            })
            .attr("id", function (d) {
                return d.division;
            })
            .attr("class", function(d) {
                return "bar choice"
            })
            .on("click", function(d) {
                console.log("clicked on " + d.display_division);
                updateMenu(d.division);
            });

        /*
         *  Label drawing block
         *  Place some simple labels
         */

        textNodes = labels.selectAll("text").data(newMenuAction);

        textNodes.enter().append("text")
            .attr("class", "label")
            .attr("x", function (d, i) {
                return ((cDim.barWidth + cDim.barMargin) * i) + (cDim.barWidth / 2);
            })
            .attr("y", function (d, i) {
                return cDim.height - barHeight(10) + 8;
            })
            .text(function (d, i) {
                return d.display_division;
            });
        // remove old elements
        bars.exit().remove();
        textNodes.exit().remove();
    }
}

/**
 * Get SubDivisions of a searched division, using recursive calls
 * @param divisionToCheck
 * @param searchedDivision
 * @returns {*}
 */
function getSubDivisions (divisionToCheck, searchedDivision) {
    console.log("Searching the subdivs");
    console.log(divisionToCheck);
    if (divisionToCheck) {
        for (var div of divisionToCheck) {
            if (div.division == searchedDivision) {
                return div.subDivisions;
            }

            var found = getSubDivisions(div.subDivisions, searchedDivision);
            if (found) return found;
        }
    }
}


updateMenu();