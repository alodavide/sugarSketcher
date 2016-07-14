// Shape Divisions with all possible monosaccharide shapes
var shapeDivisions = [{
        division: "circleShape",
        display_division: "Circle"
    }, {
        division: "squareShape",
        display_division: "Square"
    }, {
        division: "triangleShape",
        display_division: "Triangle"
    }, {
        division: "starShape",
        display_division: "Star"
    }, {
        division: "rectangleShape",
        display_division: "Rectangle"
    }, {
        division: "diamondShape",
        display_division: "Diamond"
    }
];

// Color Divisions with all possible colors
var colorDivisions = [{
        division: "whiteColor",
        display_division: "White"
    }, {
        division: "blueColor",
        display_division: "Blue"
    }, {
        division: "greenColor",
        display_division: "Green"
    }, {
        division: "yellowColor",
        display_division: "Yellow"
    }, {
        division: "orangeColor",
        display_division: "Orange"
    }, {
        division: "pinkColor",
        display_division: "Pink"
    }, {
        division: "purpleColor",
        display_division: "Purple"
    }, {
        division:"lightBlueColor",
        display_division: "Light Blue"
    }, {
        division:"brownColor",
        display_division: "Brown"
    }, {
        division:"redColor",
        display_division: "Red"
    }
];

var tableInformations = [{
    information: "Anomericity",
    possibilities: ['Alpha', 'Beta', '?']
}, {
    information: "Isomer",
    possibilities: ['d', 'l', '?']
}, {
    information: "RNCType",
    possibilities: ['p', 'l', '?']
}];

// Menu, stocking the divisions of our menu, and subdivisions
var menuAction = [{
    division: "addNode",
    display_division: "Add Node",
    subDivisions : [{
        division: "substituentNode",
        display_division: "Substituent",
        subDivisions: shapeDivisions
    }, {
        division: "monosaccharideNode",
        display_division: "Monosaccharide",
        subDivisions: shapeDivisions
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
    // Size and margin properties
    var cDim = {
        height: 40,
        width: 1000,
        barMargin: 0
    };

    d3.select("#actions").selectAll("*").remove(); // Reinitialize the svg actions menu
    d3.select("#labels").selectAll("*").remove(); // Reinitialize the svg labels menu
    var actions = d3.select("#actions"); // Actions
    var labels = d3.select("#labels"); // Labels

    // Height of our menu
    var maxHeight = 10;

    // Scale function with heights.
    var barHeight = d3.scale.linear()
        .domain([0, maxHeight])
        .range([0, cDim.height]);
    // Set the height and width of our SVG element
    var svgMenu = d3.select("#svgMenu").attr({
        height: cDim.height,
        width: cDim.width
    });
    var newMenuAction = [];

    // This case happens when update is called with no parameter (first update)
    if (typeof chosenDivision === 'undefined') { // First menu
        newMenuAction = menuAction;
    } else { // Get SubDivisions that we want to update menu
        newMenuAction = getSubDivisions(menuAction, chosenDivision)
    }
    // If there are no subdivisions to show, then hide the menu
    if (typeof newMenuAction === 'undefined') {
        d3.select("#svgMenu").style("display", "none");
        return;
    }
    // Figure out how much space is actually available for the divisions
    var marginlessWidth = cDim.width - (cDim.barMargin * (newMenuAction.length - 1));
    cDim.barWidth = marginlessWidth / newMenuAction.length;
    var bars = actions.selectAll("rect").data(newMenuAction);
    bars.enter().append("rect")
        .attr("width", function () {
            return cDim.barWidth
        })
        .attr("height", function () {
            return barHeight(10)
        })
        .attr("y", function () {
            return cDim.height - barHeight(10);
        })
        .attr("x", function (d, i) {
            return (cDim.barWidth + cDim.barMargin) * i;
        })
        .attr("id", function (d) {
            return d.division;
        })
        .attr("class", function() {
            return "bar choice"
        })
        .on("click", function(d) {
            updateMenu(d.division);
        });

    /*
     *  Label drawing block
     */

    var textNodes = labels.selectAll("text").data(newMenuAction);

    textNodes.enter().append("text")
        .attr("class", "label")
        .attr("x", function (d, i) {
            return ((cDim.barWidth + cDim.barMargin) * i) + (cDim.barWidth / 2);
        })
        .attr("y", function () {
            return cDim.height - barHeight(10) + 8;
        })
        .text(function (d)  {
            return d.display_division;
        });
    // remove old elements
    // bars.exit().remove();
    //textNodes.exit().remove();
}
/*
function loadTableInformations() {
    var cDim = {
        height: 40,
        width: 1000,
        barMargin: 0
    };

    d3.select("#titlesInfos").selectAll("*").remove(); // Reinitialize the svg actions menu
    d3.select("#titlesInfosLabel").selectAll("*").remove(); // Reinitialize the svg labels menu
    var infos = d3.select("#titlesInfosLabel"); // Infos
    var titles = d3.select("#titlesInfos"); // Titles

    // Height of our menu
    var maxHeight = 10;

    // Scale function with heights.
    var barHeight = d3.scale.linear()
        .domain([0, maxHeight])
        .range([0, cDim.height]);

    // Set the height and width of our SVG element
    var svgTableInfos = d3.select("#svgTableInfos").attr({
        height: cDim.height,
        width: cDim.width
    });

    // Figure out how much space is actually available for the divisions
    var marginlessWidth = cDim.width - (cDim.barMargin * (tableInformations.length - 1));
    cDim.barWidth = marginlessWidth / tableInformations.length;
    var bars = titles.selectAll("rect").data(tableInformations);
    bars.enter().append("rect")
        .attr("width", function () {
            return cDim.barWidth
        })
        .attr("height", function () {
            return barHeight(10)
        })
        .attr("y", function () {
            return cDim.height - barHeight(10);
        })
        .attr("x", function (d, i) {
            return (cDim.barWidth + cDim.barMargin) * i;
        })
        .attr("id", function (d) {
            return d.information;
        })
        .attr("class", function() {
            return "info"
        });

    //Label drawing block

    var textNodes = infos.selectAll("text").data(tableInformations);

    textNodes.enter().append("text")
        .attr("class", "label")
        .attr("x", function (d, i) {
            return ((cDim.barWidth + cDim.barMargin) * i) + (cDim.barWidth / 2);
        })
        .attr("y", function () {
            return cDim.height - barHeight(10) + 8;
        })
        .text(function (d)  {
            return d.information;
        });
    // remove old elements
    // bars.exit().remove();
    //textNodes.exit().remove();
}*/

/**
 * Get SubDivisions of a searched division, using recursive calls
 * @param divisionToCheck
 * @param searchedDivision
 * @returns {*}
 */
function getSubDivisions (divisionToCheck, searchedDivision) {
    if (searchedDivision.indexOf("Shape") > -1) {
        return colorDivisions;
    }
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

d3.select("#svgMenu").style("display", "none");
//d3.select("#svgTableInfos").style("display", "none");


/**
 * Just to allow if you clicked on a node by mistake to shut down the appeared menus
 * @param e
 */
document.onkeydown = function (e) {
    // Key code of escape
    if (e.keyCode == 27) {
        d3.select('#svgMenu').style("display", "none");
        d3.selectAll('#nodeMenu').style("opacity", .9);
        d3.select("#svgTableInfos").style("display", "none");
    }
};