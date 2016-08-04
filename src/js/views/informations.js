/**
 * Author:  Nicolas Hory
 * Version: 0.0.1
 */


// The sugar we use as data structure, to be visualized using d3 tree
var sugar;

// Update the menu when page is loaded
$(document).ready(function() {
    updateMenu();
    var subChoices = d3.selectAll(".subChoice");
    subChoices.on('click', function() {
        infosTable.push(d3.event.target.innerHTML);
        displayPie();
    });
});

var menuChosenPath; // Path taken by user in the menu
var infosTable = []; // Table with all informations selected by the user

// Event listener for infosChoice
var infoChoiceCells = document.getElementsByClassName("infoChoiceCell");
for (var cell of infoChoiceCells) {
    cell.addEventListener('click', function(e) {
        // Get the clicked cell
        var clickedCell = d3.select("#"+e.target.id);
        // Gets classes of the clicked cell
        var classNames =  $(e.target).attr("class").split(' ');
        updateSelectionCells(e,classNames); // Update the selection
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

/**
 * Function changing the selected cells classes and styles
 * @param classNames
 */
function updateSelectionCells(event, classNames) {
    //Remove the selected classes of the list, because unneeded
    var indexSelected = classNames.indexOf("selectedChoice");
    if(indexSelected > -1) {
        classNames.splice(indexSelected, 1);
    }
    // Get the other cells with same classes (i.e for the same choice)
    var otherCells = d3.selectAll("." + classNames[0]).filter("." + classNames[1]);
    for (var other of otherCells[0]) {
        // If one is selected, it's unselected
        if (other.id != event.target.id) {
            if (d3.select("#" + other.id).attr("class").split(' ').indexOf("selectedChoice") > -1) {
                d3.select("#" + other.id).style("background", "black").style("color", "white").classed("selectedChoice", false);
            }
        }
    }
}

// Event listeners for the shape choice
var shapeChoices= document.getElementsByClassName("shapeChoice");
for (var shape of shapeChoices) {
    shape.addEventListener('click', function(e) {
        infosTable.push(e.target.parentNode.id.split("Shape")[0]);
        d3.select("#svgShape").transition().style("display", "none");
        updateMenu("shape");
        d3.select("#svgMenu").transition().style("display", "block");
    });
}

// Cancel button in shape menu, coming back to main menu
var shapeCancelButton = d3.select("#cancelChoiceShape");
shapeCancelButton.on("click", function() {
    updateMenu();
});

// Cancel button in informations table, coming back to shape svg, managing displays
var infosCancelButton = d3.select("#cancelChoiceInfos");
infosCancelButton.on("click", function() {
    infosTable.pop();
    menuChosenPath.pop();
    menuChosenPath.pop();
    d3.select("#tableInformations").transition().style("display", "none");
    updateMenu("shape");
    d3.select("#svgMenu").transition().style("display", "block");
});

// Cancel button in carbon table, coming back to informations table, managing displays
var carbonCancelButton = d3.select("#cancelChoiceCarbon");
carbonCancelButton.on("click", function() {
    infosTable.pop();
    infosTable.pop();
    infosTable.pop();
    d3.select("#tableCarbonValues").transition().style("display", "none");
    d3.select("#tableInformations").transition().style("display", "block");
});

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
        display_division: "Substituent"
    }, {
        division: "monosaccharideNode",
        display_division: "Monosaccharide",
        subDivisions: "shape"
    }]
}, {
    division: "addStructure",
    display_division: "Add Structure"
}, {
    division: "changeMono",
    display_division: "Change Mono",
    subDivisions: "shape"
}];


//Managing displaying more rows for subs
var substituentRowButton = d3.select("#showSecondSubRow");
substituentRowButton.on("click", function() {
    $('#pieLinkCarbon').css("display", "none");
    var tableSub = d3.select("#substituents").select("tbody");
    var subTypes = [];
    var mostUsedTypes = ["S", "P", "NAc", "Acetyl", "Methyl"];
    for (var type of sb.SubstituentType) {
        if (type.label != 'undefined' && mostUsedTypes.indexOf(type.label) == -1) {
            subTypes.push(type.label);
        }
    }
    if(d3.selectAll(".newRowSub")[0].length != 5) {
        var currentIndex = 0;
        while (currentIndex < subTypes.length) {
            var newRow = tableSub.append("tr").attr("class", "newRowSub");
            newRow.selectAll("td").data(subTypes.slice(currentIndex, currentIndex + 5)).enter().append("td").attr("class", "subChoice")
                .text(function (d) {
                    return d;
                })
                .on("click", function (d) {
                    infosTable.push(d);
                    displayPie();
                });
            currentIndex += 5;
        }
    }
});

//Cancel Button Subs
var cancelSubButton = d3.select("#cancelSubButton");
cancelSubButton.on("click", function() {
    currentIndexOfSubs = 0;
    //Reinitialize table
    $('#pieLinkCarbon').css("display", "none");
    d3.select("#tableSubstituents").transition().style("display", "none");
    d3.selectAll(".newRowSub").remove();
    updateMenu();
    d3.select("#svgMenu").transition().style("display", "block");
});

/**
 * Update the menu. Can be called with or without one parameter.
 * @param chosenDivision
 */
function updateMenu(chosenDivision) {
    // Size and margin properties
    var menuDimensions = {
        height: 40,
        width: 1000
    };

    d3.select("#actions").selectAll("*").remove(); // Reinitialize the svg actions menu
    d3.select("#labels").selectAll("*").remove(); // Reinitialize the svg labels menu
    var actions = d3.select("#actions"); // Actions
    var labels = d3.select("#labels"); // Labels

    // Set the height and width of our SVG element
    var svgMenu = d3.select("#svgMenu").attr({
        height: menuDimensions.height,
        width: menuDimensions.width
    });
    var newMenuAction = [];

    // This case happens when update is called with no parameter (first update)
    if (typeof chosenDivision === 'undefined') { // First menu
        menuChosenPath = []; // Re-initialize the path
        infosTable = []; // Re-initialize the list of clicks
        d3.select("#svgShape").transition().style("display", "none");
        d3.select("#tableInformations").transition().style("display", "none");
        d3.select("#tableCarbonValues").transition().style("display", "none");
        d3.select("#svgMenu").transition().style("display", "block");
        newMenuAction = menuAction;
    } else { // Get SubDivisions that we want to update menu
        menuChosenPath.push(chosenDivision);
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

    menuDimensions.barWidth = menuDimensions.width / newMenuAction.length;
    var bars = actions.selectAll("rect").data(newMenuAction);
    bars.enter().append("rect")
        .attr("width", menuDimensions.barWidth)
        .attr("height",menuDimensions.height)
        .attr("y", 0)
        .attr("x", function (d, i) {
            return menuDimensions.barWidth * i;
        })
        .attr("id", function (d) {
            return d.division;
        })
        .attr("rx", 15)
        .attr("ry", 15)
        .attr("class", "bar choice")
        .style("fill", function(d) {
            return d.display_division
        })
        .on("click", function(d) {
            // If we are choosing a color
            if (d.division.indexOf("Color") > -1) {
                var chosenShape = infosTable[infosTable.length-1]; // Get the selected shape
                var isBisected = false;
                if (chosenShape.indexOf("bisected") > -1) {
                    chosenShape = chosenShape.split("bisected")[1];
                    isBisected = true;
                }
                var color = getColorCodeFromString(d.division); // Get the clicked color
                var existingMonoType = getMonoTypeWithColorAndShape(color, chosenShape, isBisected);
                // If there is no type for this combination, display an error
                if (existingMonoType == sb.MonosaccharideType.UNDEFINED) {
                    document.getElementById("error").innerHTML = "Impossible combination: " + d.division.split("Color")[0] + " " + chosenShape;
                    if (isBisected) {
                        document.getElementById("error").innerHTML += " bisected";
                    }
                    $('#error').css({'top': mouseY - 80, 'left': mouseX - 50}).fadeIn(400).delay(1000).fadeOut(400);
                    return;
                }
            }
            infosTable.push(d.division);
            updateMenu(d.division);

        }).on("mouseover", function(d) {
            // On hover of addNode, we display its two subdivisions
            if(d.division == "addNode") {
                manageHoverAddNode(d,actions);
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
                return (menuDimensions.barWidth * i) + (menuDimensions.barWidth / 2);
            })
            .attr("y", function () {
                return menuDimensions.height/5; // Choose an y to center label
            })
            .text(function (d) {
                return d.display_division;
            });
    }

    // If not the first menu, we add a cancel button to come back to last step
    if (typeof chosenDivision != 'undefined') {
        addCancelOperation(actions, labels);
    }
}

/**
 * Function called on hover on add node menu. Split the rectangle in the two sub options (Sub or Mono)
 * @param actions
 */
function manageHoverAddNode(menuItem,actions) {
    var x = d3.select("#svgMenu").select("#addNode").attr("x");
    d3.select("#svgMenu").select("#addNode").remove();
    // Add Monosaccharide rect and label
    actions.insert("rect", ":first-child")
        .attr("class", "bar choice")
        .attr("id", menuItem.subDivisions[1].division)
        .attr("width", 1000/6).attr("height", 40)
        .attr("x", x)
        .attr("rx", 15)
        .on("mouseout", function() {
        updateMenu();
    }).on("click", function () {
        infosTable.push(menuItem.division);
        infosTable.push(menuItem.subDivisions[1].display_division);
        updateMenu(menuItem.subDivisions[1].division);
        return;
    });
    // Add Substituent rect and label
    actions.insert("rect", ":first-child")
        .attr("class", "bar choice")
        .attr("id", menuItem.subDivisions[0].division)
        .attr("width", 1000/6).attr("height", 40)
        .attr("x", 1000/6)
        .attr("rx", 15)
        .on("mouseout", function() {
            if(d3.select("#svgMenu").style("display") != "none") {
                updateMenu();
            }
        })
        .on("click", function () {
        infosTable.push(menuItem.division);
        infosTable.push(menuItem.subDivisions[0].display_division);
        // If root has not been set yet, then display an error popup
        if (Object.keys(treeData).length === 0) {
            document.getElementById("error").innerHTML = "Can not have a substituent as a root";
            $('#error').css({'top': mouseY - 80, 'left': mouseX - 50}).fadeIn(400).delay(1000).fadeOut(400);
            return;
        }
        d3.select("#svgMenu").style("display", "none");
        d3.select("#tableSubstituents").transition().style("display", "block");
        //updateMenu(menuItem.subDivisions[0].division);
        return;
    });
}

/**
 * Add a cancel button (rectangle), enabling to come back to last step
 * @param actions
 * @param labels
 */
function addCancelOperation (actions, labels) {
    // We add the rect and the label to cancel last click
    actions.append("rect")
        .attr("width", 80)
        .attr("class", "bar")
        .attr("height", 40)
        .attr("id", "cancelChoice")
        .attr("x", 1000).attr("y", 0)
        .style("fill", "red")
        .attr("transform", "translate(10)")
        .on("click", function () {
            console.log(menuChosenPath);
            menuChosenPath.pop();
            updateMenu(menuChosenPath.pop());
            infosTable.pop();
        });
    labels.append("text")
        .attr("class", "label")
        .attr("x", 1050)
        .attr("y", 8)
        .text("Cancel");
}
/**
 * Get SubDivisions of a searched division, using recursive calls
 * @param divisionToCheck
 * @param searchedDivision
 * @returns {*}
 */
function getSubDivisions (divisionToCheck, searchedDivision) {
    if (searchedDivision.indexOf("shape") > -1) {
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

/**
 * Checks if the user selected the two carbon values
 */
function checkSelectedCarbonValues() {
    var selectedCells = d3.selectAll(".selectedChoice");
    // The user selected the three values
    if(selectedCells[0].length === 2) {
        getCarbonSelections(selectedCells);
        d3.select("#tableCarbonValues").transition().style("display","none");
        unselectChoices();
    }
}

/**
 * Get the carbon selections and launch treatment of informations
 * @param selectedCells
 */
function getCarbonSelections(selectedCells) {
    var linkCarbon = selectedCells.filter(".choiceLinkCarbon")[0][0].innerText;
    var anomerCarbon = selectedCells.filter(".choiceAnomerCarbon")[0][0].innerText;
    infosTable.push(linkCarbon);
    infosTable.push(anomerCarbon);
    var methodToCall = infosTable[0]; // Gets the method which has to be called
    if (methodToCall == "addNode") {
        // Manage add node
        createNewNode();
    } else if (methodToCall == "addStruct") {
        console.log("Need to add a structure");
        // Manage add structure
    } else {
        // Manage update of node
        updateExistingNode();
    }
}

/**
 * Create a new node using the informations selected by the user
 */
function createNewNode() {
    var typeNodeToAdd = infosTable[1]; // Selected type, mono or sub
    if (typeNodeToAdd == "Monosaccharide") {
        var shape = infosTable[2]; // Selected shape
        var isBisected = (shape.indexOf("bisected") != -1); // Check if the shape is bisected
        if (isBisected) {
            shape = shape.split("bisected")[1]; // We update the value of the shape by removing keywork "bisected"
        }
        var color = getColorCodeFromString(infosTable[3]); // Selected color
        var anomericity = getAnomericityWithSelection(infosTable[4]); // Anomericity
        var isomer = getIsomerWithSelection(infosTable[5]); // Isomer
        var ring = getRingTypeWithSelection(infosTable[6]); // Ring type
        var linkedCarbon = getLinkedCarbonWithSelection(infosTable[7]);
        var anomerCarbon = getAnomerCarbonWithSelection(infosTable[8]);
        var monoType = getMonoTypeWithColorAndShape(color, shape, isBisected);
        //TODO change id here when knowing how to generate
        var generatedNodeId = randomString(4);
        var monosaccharide = new sb.Monosaccharide(generatedNodeId,monoType,anomericity, isomer, ring);
        if (Object.keys(treeData).length === 0) {
            sugar = new sb.Sugar("Sugar", monosaccharide);
            updateTreeVisualization();
        } else {
            var generatedEdgeId = randomString(4);
            var glycosidicLink = new sb.GlycosidicLinkage(generatedEdgeId, clickedNode, monosaccharide, anomerCarbon, linkedCarbon);
            sugar.addMonosaccharide(monosaccharide, glycosidicLink);
            updateTreeVisualization(glycosidicLink);
        }
    }
}

/**
 * Function called to create a new substituent in the sugar
 * @param subLabel The label we have to create the new Substituent
 */
function createNewSubstituent (linkCarbon) {
    var subLabel = infosTable[2];
    var subType = getSubstituentTypeFromLabel(subLabel);
    var generatedSubId = randomString(4); // Random if for Substituent
    var newSubstituent = new sb.Substituent(generatedSubId, subType); // Create a new substituent
    var linkedCarbon = getLinkedCarbonWithSelection(linkCarbon);
    var generatedEdgeSubId = randomString(4); // Random id for edge
    // Create the linkage
    var subLinkage = new sb.SubstituentLinkage(generatedEdgeSubId, clickedNode, newSubstituent, linkedCarbon);
    sugar.addSubstituent(newSubstituent, subLinkage); // Add the substituent to the sugar, with the linkage
    // TODO visualization with subs
    updateTreeVisualization(subLinkage);
}

/**
 * Find in the SubstituentType enum the corresponding type for a given label
 * @param label The label of the SubstituentType
 * @returns {*}
 */
function getSubstituentTypeFromLabel (label) {
    for (var type of sb.SubstituentType) {
        if(type.label == label) {
            return type;
        }
    }
}

/**
 * Find in the MonosaccharideType enum the corresponding type for a given color and shape
 * @param color The color of the MonosaccharideType
 * @param shape The shape of the MonosaccharideType
 * @param isBisected Boolean telling if the shape is bisected
 */
function getMonoTypeWithColorAndShape(color, shape, isBisected) {
    for (var type of sb.MonosaccharideType) {
        if(type.color == color && type.shape == shape && type.bisected == isBisected) {
            return type;
        }
    }
    return sb.MonosaccharideType.UNDEFINED;
}

/**
 * Find in the Anomericity enum the corresponding value for a given selected value
 * @param anomericity The anomericity we are seeking
 * @returns {*}
 */
function getAnomericityWithSelection(anomericity) {
    var anomericityName;
    if (anomericity == "α") {
        anomericityName = "ALPHA";
    } else if (anomericity == "β") {
        anomericityName = "BETA"
    }
    for (var anom of sb.Anomericity) {
        if (anom.name == anomericityName)
            return anom;
    }
    return sb.Anomericity.UNDEFINED;
}

/**
 * Find in the Isomer enum the corresponding value for a given selected value
 * @param isomer The isomer we are seeking
 * @returns {*}
 */
function getIsomerWithSelection(isomer) {
    for (var anom of sb.Isomer) {
        if (anom.name == isomer)
            return anom;
    }
    return sb.Isomer.UNDEFINED;
}

/**
 * Find in the RingType enum the corresponding value for a given selected value
 * @param ringType The ring type we are seeking
 * @returns {*}
 */
function getRingTypeWithSelection(ringType) {
    for (var ring of sb.RingType) {
        if (ring.name == ringType)
            return ring;
    }
    return sb.RingType.UNDEFINED;
}

/**
 * Find in the AnomerCarbon enum the corresponding value for a given selected value
 * @param anomerCarbon The anomer carbon we are seeking
 * @returns {*}
 */
function getAnomerCarbonWithSelection(anomerCarbon) {
    for (var carbon of sb.AnomerCarbon) {
        if (carbon.value == anomerCarbon)
            return carbon;
    }
    return sb.AnomerCarbon.UNDEFINED;
}

/**
 * Find in the LinkedCarbon enum the corresponding value for a given selected value
 * @param linkedCarbon The linked carbon we are seeking
 * @returns {*}
 */
function getLinkedCarbonWithSelection(linkedCarbon) {
    for (var carbon of sb.LinkedCarbon) {
        if (carbon.value == linkedCarbon)
            return carbon;
    }
    return sb.LinkedCarbon.UNDEFINED;
}

/**
 * Get color code from a string, using colorDivisions
 * @param colorName The color string we are seeking the translated code
 * @returns {string|string|string|string|string|string|*}
 */
function getColorCodeFromString(colorName) {
    for (var color of colorDivisions) {
        if (color.division == colorName) {
            return color.display_division;
        }
    }
}

/**
 * Generate a random string (used for identifiers) with a given length
 * @param length The length of the string we want to generate
 * @returns {string}
 */
function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}


