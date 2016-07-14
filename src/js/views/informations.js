// Event listener for td
var choiceCells = document.getElementsByClassName("infoChoiceCell");
for (var cell of choiceCells) {
    cell.addEventListener('click', function(e) {
        // Select or unselect a cell
        var clickedCell = d3.select("#"+e.target.id);
        // Gets classes of the clicked cell
        var classNames =  $(e.target).attr("class").split(' ');
        //Remove the selected classes of the list, because unneeded
        var indexSelected = classNames.indexOf("selectedChoice");
        if(indexSelected > -1) {
            classNames.splice(indexSelected, 1);
        }
        var otherCells = d3.selectAll("." + classNames[0]).filter("." + classNames[1]);
        for (var other of otherCells[0]) {
            console.log(other);
            if (other.id != e.target.id) {
                if (d3.select("#" + other.id).attr("class").split(' ').indexOf("selectedChoice") > -1) {
                    d3.select("#" + other.id).style("background", "black").style("color", "white").classed("selectedChoice", false);
                }
            }
        }
        console.log("yo");
        console.log(otherCells);
        // Invert color and background
        if (clickedCell.classed("selectedChoice")) {
            clickedCell.style("background", "black").style("color", "white").classed("selectedChoice", false);
        } else {
            clickedCell.style("background", "white").style("color", "black").classed("selectedChoice", true);
        }
    });
}


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
        if (chosenDivision.indexOf("Color") > -1) {
            d3.select("#tableInformations").transition().duration(200).style("display", "block");
            d3.select("#svgMenu").transition().duration(200).style("display", "none");
            return;
        } else {
            newMenuAction = getSubDivisions(menuAction, chosenDivision)
        }
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


/**
 * Just to allow if you clicked on a node by mistake to shut down the appeared menus
 * @param e
 */
document.onkeydown = function (e) {
    // Key code of escape
    if (e.keyCode == 27) {
        d3.select('#svgMenu').style("display", "none");
        console.log(d3.selectAll('#nodeMenu'));
        d3.selectAll('#nodeMenu').transition().duration(200).style("opacity", 0);
        d3.select("#tableInformations").style("display", "none");
    }
};

