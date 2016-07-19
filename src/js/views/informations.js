/**
 * Author:  Nicolas Hory
 * Version: 0.0.1
 */

var clicksTable = []; // Table with all clicks of the user on the

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
        // Get the other cells with same classes (i.e for the same choice)
        var otherCells = d3.selectAll("." + classNames[0]).filter("." + classNames[1]);
        for (var other of otherCells[0]) {
            // If one is selected, it's unselected
            if (other.id != e.target.id) {
                if (d3.select("#" + other.id).attr("class").split(' ').indexOf("selectedChoice") > -1) {
                    d3.select("#" + other.id).style("background", "black").style("color", "white").classed("selectedChoice", false);
                }
            }
        }
        // Invert color and background
        if (clickedCell.classed("selectedChoice")) {
            clickedCell.style("background", "black").style("color", "white").classed("selectedChoice", false);
        } else {
            clickedCell.style("background", "white").style("color", "black").classed("selectedChoice", true);
        }
        checkSelectedThreeValues();
    });
}

var shapeChoices= document.getElementsByClassName("shapeChoice");
for (var shape of shapeChoices) {
    shape.addEventListener('click', function(e) {
        clicksTable.push(e.target.parentNode.id.split("Shape")[0]);
        console.log("just added click on shape");
        console.log(clicksTable);
        d3.select("#svgShape").transition().style("display", "none");
        updateMenu("Shape");
        d3.select("#svgMenu").transition().style("display", "block");
    });
}

// Color Divisions with all possible colors
var colorDivisions = [{
        division: "whiteColor",
        display_division: '#FFFFFF'
    }, {
        division: "blueColor",
        display_division: '#0080FF'
    }, {
        division: "greenColor",
        display_division: '#00FF00'
    }, {
        division: "yellowColor",
        display_division: '#FFD900'
    }, {
        division: "orangeColor",
        display_division: '#FF8000'
    }, {
        division: "pinkColor",
        display_division: '#FF87C2'
    }, {
        division: "purpleColor",
        display_division: '#9E1FFF'
    }, {
        division:"lightBlueColor",
        display_division: '#96F2F7'
    }, {
        division:"brownColor",
        display_division: '#977335'
    }, {
        division:"redColor",
        display_division: '#FF0000'
    }
];

// Menu, stocking the divisions of our menu, and subdivisions
var menuAction = [{
    division: "addNode",
    display_division: "Add Node",
    subDivisions : [{
        division: "substituentNode",
        display_division: "Substituent",
        subDivisions: "shape"
    }, {
        division: "monosaccharideNode",
        display_division: "Monosaccharide",
        subDivisions: "shape"
    }]
}, {
    division: "addStructure",
    display_division: "Add Structure",
    subDivisions : [{
        division: "subStruct",
        display_division: "Sub Struct"
    }]
}, {
    division: "changeMono",
    display_division: "Change Mono",
    subDivisions: "shape"
}];

/**
 * Update the menu. Can be called with or without one parameter.
 * @param chosenDivision
 */
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
        clicksTable = []; // Re-initialize the list of clicks
        newMenuAction = menuAction;
    } else { // Get SubDivisions that we want to update menu

        // If chose a color, then we hide the svg and show the table for anomericity, isomer and type
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
    // If shape menu has to be shown
    if (newMenuAction == "shape") {
        d3.select("#svgShape").transition().style("display", "block");
        d3.select("#svgMenu").transition().style("display", "none");
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
        }).style("fill", function(d) {
            return d.display_division
        })
        .on("click", function(d) {
            clicksTable.push(d);
            updateMenu(d.division);
        });

    /*
     *  Label drawing block, if we are displaying colors, labels not needed because of color fill
     */
    if (newMenuAction != colorDivisions) {

        var textNodes = labels.selectAll("text").data(newMenuAction);

        textNodes.enter().append("text")
            .attr("class", "label")
            .attr("x", function (d, i) {
                return ((cDim.barWidth + cDim.barMargin) * i) + (cDim.barWidth / 2);
            })
            .attr("y", function () {
                return cDim.height - barHeight(10) + 8;
            })
            .text(function (d) {
                return d.display_division;
            });
    }
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
        d3.selectAll('#nodeMenu').transition().duration(200).style("opacity", 0);
        unselectInfoChoices();
        d3.select("#tableInformations").style("display", "none");
    }
};

/**
 * Check if the user has selected three values in the informations table
 */
function checkSelectedThreeValues() {
    var selectedCells = d3.selectAll(".selectedChoice");
    // The user selected the three values
    if(selectedCells[0].length === 3) {
        getMenuSelections(selectedCells);
        d3.select("#tableInformations").transition().style("display","none");
        unselectInfoChoices();
        d3.select("#tableCarbonValues").transition().style("display", "block");
    }
}

/**
 * Unselect the choices made in the informations table
 */
function unselectInfoChoices() {
    var selectedChoices = d3.selectAll(".selectedChoice")[0];
    for (var selected of selectedChoices) {
        d3.select("#" + selected.id).style("background","black").style("color", "white").classed("selectedChoice", false);
    }
}

/**
 * Get the menus the user selected. Called when ended menus.
 */
function getMenuSelections(selectedCells) {
    var anomericity = selectedCells.filter(".choiceAnomericity")[0][0].innerText;
    var isomer = selectedCells.filter(".choiceIsomer")[0][0].innerText;
    var type = selectedCells.filter(".choiceRing")[0][0].innerText;
    var methodToCall = clicksTable[0].division; // Gets the method which has to be called
    if (methodToCall == "addNode") {
        console.log("Need to add a node");
        var typeNodeToAdd = clicksTable[1].display_division; // Selected type, mono or sub
        var shape = clicksTable[2]; // Selected shape
        var color = clicksTable[3].display_division; // Selected color
        console.log("Node to add: " + anomericity + " " + isomer + " " + typeNodeToAdd + " " + type + " " + shape + " " + color);
        // Manage add node
    } else if (methodToCall == "addStruct") {
        console.log("Need to add a structure");
        // Manage add structure
    } else {
        console.log("Need to modify the mono");
        console.log(clickedNode);
        var newShape = clicksTable[1]; // Selected shape
        var newColor = clicksTable[2].display_division; // Selected color
        console.log("New informations on the mono: " + anomericity + " " + isomer + " " + type + " " + newShape + " " + newColor);
        //Manage modification of the monosaccharide
    }
}

//var sugarTest = new Sugar("firstSugar");
