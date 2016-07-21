/**
 * Author:  Nicolas Hory
 * Version: 0.0.1
 */

var infosTable = []; // Table with all infos selected by the user

// Event listener for infosChoice
var infoChoiceCells = document.getElementsByClassName("infoChoiceCell");
for (var cell of infoChoiceCells) {
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

        //If its a carbon choice, check if the two have been selected
        if (classNames[1].indexOf("Carbon") > -1) {
            checkSelectedCarbonValues();
        } else { // Else it is an info choice, so we check that three has been selected
            checkSelectedThreeInfoValues();
        }
    });
}

// Event listeners for the shape choice
var shapeChoices= document.getElementsByClassName("shapeChoice");
for (var shape of shapeChoices) {
    shape.addEventListener('click', function(e) {
        infosTable.push(e.target.parentNode.id.split("Shape")[0]);
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
    var menuDimensions = {
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
        .range([0, menuDimensions.height]);
    // Set the height and width of our SVG element
    var svgMenu = d3.select("#svgMenu").attr({
        height: menuDimensions.height,
        width: menuDimensions.width
    });
    var newMenuAction = [];

    // This case happens when update is called with no parameter (first update)
    if (typeof chosenDivision === 'undefined') { // First menu
        infosTable = []; // Re-initialize the list of clicks
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
    var marginlessWidth = menuDimensions.width - (menuDimensions.barMargin * (newMenuAction.length - 1));
    menuDimensions.barWidth = marginlessWidth / newMenuAction.length;
    var bars = actions.selectAll("rect").data(newMenuAction);
    bars.enter().append("rect")
        .attr("width", function () {
            return menuDimensions.barWidth
        })
        .attr("height", function () {
            return barHeight(10)
        })
        .attr("y", function () {
            return menuDimensions.height - barHeight(10);
        })
        .attr("x", function (d, i) {
            return (menuDimensions.barWidth + menuDimensions.barMargin) * i;
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
            infosTable.push(d);
            updateMenu(d.division);
        }).on("mouseover", function(d) {
            if(d.division == "addNode") {
                var x = d3.select("#svgMenu").select("#addNode").attr("x");
                d3.select("#svgMenu").select("#addNode").remove();
                actions.insert("rect", ":first-child").attr("class", "bar choice").attr("id", d.subDivisions[1].division).attr("width", 1000/6).attr("height", 40).attr("x", x).on("mouseout", function() {
                    updateMenu();
                }).on("click", function () {
                    infosTable.push(d);
                    infosTable.push(d.subDivisions[1]);
                    updateMenu(d.subDivisions[1].division);
                    return;
                });
                actions.insert("rect", ":first-child").attr("class", "bar choice").attr("id", d.subDivisions[0].division).attr("width", 1000/6).attr("height", 40).attr("x", 1000/6).on("mouseout", function() {
                    updateMenu();
                }).on("click", function () {
                    infosTable.push(d);
                    infosTable.push(d.subDivisions[0]);
                    updateMenu(d.subDivisions[0].division);
                    return;
                });
                labels.selectAll("text")[0][0].remove();
                labels.insert("text",":first-child").attr("class", "label").text(d.subDivisions[1].display_division).attr("x", 1000/12).attr("y", 8);
                labels.insert("text",":first-child").attr("class", "label").text(d.subDivisions[0].display_division).attr("x", 250).attr("y", 8);
            }
        });

    /*
     *  Label drawing block, if we are displaying colors, labels not needed because of color fill
     */
    if (newMenuAction != colorDivisions) {

        var textNodes = labels.selectAll("text").data(newMenuAction);

        textNodes.enter().append("text")
            .attr("class", "label")
            .attr("x", function (d, i) {
                return ((menuDimensions.barWidth + menuDimensions.barMargin) * i) + (menuDimensions.barWidth / 2);
            })
            .attr("y", function () {
                return menuDimensions.height - barHeight(10) + 8;
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
        unselectChoices();
        d3.select("#tableInformations").style("display", "none");
        d3.select("#tableCarbonValues").style("display", "none");
    }
};

/**
 * Check if the user has selected three values in the informations table
 */
function checkSelectedThreeInfoValues() {
    var selectedCells = d3.selectAll(".selectedChoice");
    // The user selected the three values
    if(selectedCells[0].length === 3) {
        getInfoSelections(selectedCells);
        d3.select("#tableInformations").transition().style("display","none");
        unselectChoices();
        d3.select("#tableCarbonValues").transition().style("display", "block");
    }
}

/**
 * Unselect the choices made in the informations table
 */
function unselectChoices() {
    var selectedChoices = d3.selectAll(".selectedChoice")[0];
    for (var selected of selectedChoices) {
        d3.select("#" + selected.id).style("background","black").style("color", "white").classed("selectedChoice", false);
    }
}

/**
 * Get the menus the user selected. Called when ended menus.
 */
function getInfoSelections(selectedCells) {
    var anomericity = selectedCells.filter(".choiceAnomericity")[0][0].innerText;
    var isomer = selectedCells.filter(".choiceIsomer")[0][0].innerText;
    var ringType = selectedCells.filter(".choiceRing")[0][0].innerText;
    infosTable.push(anomericity);
    infosTable.push(isomer);
    infosTable.push(ringType);
}

function checkSelectedCarbonValues() {
    var selectedCells = d3.selectAll(".selectedChoice");
    // The user selected the three values
    if(selectedCells[0].length === 2) {
        getCarbonSelections(selectedCells);
        d3.select("#tableCarbonValues").transition().style("display","none");
        unselectChoices();
    }
}

function getCarbonSelections(selectedCells) {
    var linkCarbon = selectedCells.filter(".choiceLinkCarbon")[0][0].innerText;
    var anomerCarbon = selectedCells.filter(".choiceAnomerCarbon")[0][0].innerText;
    console.log(infosTable);
    var methodToCall = infosTable[0].division; // Gets the method which has to be called
    if (methodToCall == "addNode") {
        console.log("Need to add a node");
        var typeNodeToAdd = infosTable[1].display_division; // Selected type, mono or sub
        var shape = infosTable[2]; // Selected shape
        var color = infosTable[3].display_division; // Selected color
        var anomericity = infosTable[4]; // Anomericity
        var isomer = infosTable[5]; // Isomer
        var ringType = infosTable[6]; // Ring type
        console.log("Node to add: " + anomericity + " " + isomer + " " + typeNodeToAdd + " " + ringType + " " + shape + " " + color + " " + linkCarbon + " " + anomerCarbon);
        // Manage add node
    } else if (methodToCall == "addStruct") {
        console.log("Need to add a structure");
        // Manage add structure
    } else {
        console.log("Need to modify the mono");
        console.log(clickedNode);
        var newShape = infosTable[1]; // Selected shape
        var newColor = infosTable[2].display_division; // Selected color
        var anomericity = infosTable[3]; // Anomericity
        var isomer = infosTable[4]; // Isomer
        var ringType = infosTable[5]; // Ring type
        console.log("New informations on the mono: " + anomericity + " " + isomer + " " + ringType + " " + newShape + " " + newColor + " " + linkCarbon + " " + anomerCarbon);
        //Manage modification of the monosaccharide
    }
}



//var sugarTest = new Sugar("firstSugar");
