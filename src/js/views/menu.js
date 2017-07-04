/**
 * Author:  Nicolas Hory
 * Version: 0.0.1
 */


// The sugar we use as data structure, to be visualized using d3 tree
var sugar;

// Function called when document is ready


$(document).ready(function() {
    updateMenu();  // Update menu
    addHoverManagersInfos(); // Add hover managers for informations
    addHoverManagersCarbons(); // Add hover managers for carbons
    var subChoices = d3.selectAll(".subChoice"); // Substituent choices
    subChoices.on('click', function() {
        if (infosTable.length == 2) { // If one substituent has already been clicked, remove it from infosTable
            infosTable.pop();
        }
        // Push the new clicked substituent in infosTable
        infosTable.push(d3.select(d3.event.target).attr("value"));
        displayPie(); // Dispaly the piechart to choose linked carbon
    });
    d3.select("#exportGlycoCT").on('click', function() {
        d3.select("#formula").style("display","block");
        $('#formula').val(exportGlycoCT());
        $('#formula').select();
        var formula = document.querySelector("#formula");

        try {
            var successful = document.execCommand('copy');
            d3.select("#copyMsg")
                .transition(1000)
                .style("color", "green")
                .style("opacity", 1)
                .text("The formula has been copied to the Clipboard.");
        } catch (err) {
            d3.select("#copyMsg")
                .transition(1000)
                .style("color", "black")
                .style("opacity", 1)
                .text("Please use Ctrl+C.");
        }
        d3.select("#validateFormula").style("display", "none");
    });

    d3.select("#typeFormula").on('click', function() {
        d3.select("#formula").style("display","block");
        d3.select("#validateFormula").style("display", "block");
        $('#formula').val("");
        $('#formula').focus();
        d3.select("#copyMsg")
            .text("");
        d3.select("#validateFormula")
            .style("display", "block")
            .on('click', function(d) {
                treeData = {};
                if (sugar)
                    sugar.clear();
                shapes = [];
                parseGlycoCT($('#formula').val());
            });
    });
});

var menuChosenPath; // Path taken by user in the menu
var infosTable = []; // Table with all informations selected by the user

// Event listeners for the shape choice
var shapeChoices= document.getElementsByClassName("shapeChoice");
for (var shape of shapeChoices) {
    shape.addEventListener('click', function(e) {
        // When a shape is clicked, we update the menu, and store the chosen shape in infosTable
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

// Cancel button in informations svg, coming back to shape svg, managing displays
var infosCancelButton = d3.select("#cancelChoiceInfos");
infosCancelButton.on("click", function() {
    infosTable.pop(); // Remove last chosen information
    // Remove last two paths taken in the menu
    menuChosenPath.pop();
    menuChosenPath.pop();
    d3.select("#svgInfos").transition().style("display", "none"); // Hide the informations svg
    reinitializeDisplayInfos(); // Reinitialize the display of informations
    updateMenu("shape"); // Update the menu
    d3.select("#svgMenu").transition().style("display", "block"); // Display the main menu
});

// Cancel button in carbon table, coming back to informations table, managing displays
var carbonCancelButton = d3.select("#cancelChoiceCarbon");
carbonCancelButton.on("click", function() {
    // Remove anomericity, isomer and ring type
    infosTable.pop();
    infosTable.pop();
    infosTable.pop();
    d3.select("#svgCarbons").transition().style("display", "none"); // Hide the svg of carbon choice
    reinitializeDisplayInfos(); // Reinitialize display of informations svg
    reinitializeDisplayCarbons(); // Reinitialize display of carbons svg
    d3.select("#svgInfos").transition().style("display", "block"); // Display main menu
    document.getElementById("error").innerHTML = "Hover on anomericity, isomer and ring types buttons to choose values";
    $('#error').css({'top': 300, 'left': 500}).fadeIn(400).delay(1000).fadeOut(400);
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
    division: "updateNode",
    display_division: "Update Node",
    subDivisions: "shape"
}];


//Managing displaying more rows for subs
var substituentDisplayMore = d3.select("#displayMoreSubs"); // Button to display all substituents
substituentDisplayMore.on("click", function() {
    $('#pieLinkCarbon').css("display", "none"); // Hide the piechart
    var subsRects = d3.select("#actionsSubs"); // Rects for substituents
    var subsLabels = d3.select("#labelsSubs"); // Labels for substituents
    var subTypes = [];
    var mostUsedTypes = ["S", "P", "NAc", "Acetyl", "Methyl"]; // Most used substituent types
    // Add all substituent in an array, except the most used ones and the undefined one
    for (var type of sb.SubstituentType) {
        if (type.label != 'undefined' && mostUsedTypes.indexOf(type.label) == -1) {
            subTypes.push(type.label);
        }
    }

    // If only the 5 most used are actually displayed
    if(d3.selectAll(".subChoice")[0].length == 5) {
        var currentIndex = 0;
        var currentY = 40;
        // Loop to add new substituents to the menu
        while (currentIndex < subTypes.length) {
            var currentXLabels = 90; // x to place labels
            var currentXRects = 0; // x to place rects
            subsRects.selectAll("rect").data(subTypes.slice(currentIndex, currentIndex + 5), function(d){return d;}).enter().append("rect")
                .attr("width", 180) // 1/5 of the menu
                .attr("height", 40) // Fixed height
                .attr("x",function() {
                    var tmp = currentXRects; // Temporary variable to stock current x of rects
                    currentXRects += 180; // Increase current x of rects
                    return tmp; // Return the temporary variable
                })
                .attr("y", currentY)
                .attr("rx", 15) // Corner for rect
                .attr("ry", 15) // Corner for rect
                .attr("value", function(d) {
                    return d;
                })
                .attr("class", "bar choice subChoice createdSubChoice")
                .on("click", function (d) {
                    // On click, add the information to the table and then display piechart to choose linked carbon
                    infosTable.push(d);
                    displayPie();
                });
            subsLabels.selectAll("text").data(subTypes.slice(currentIndex, currentIndex + 5), function(d){return d;}).enter().append("text")
                .text(function(d) {
                    return d;
                })
                .attr("x", function() {
                    var tmp = currentXLabels; // Temporary variable to stock current x of labels
                    currentXLabels += 180; // Increase current x of labels
                    return tmp; // Return the temporary variable
                })
                .attr("y", currentY + 8 )
                .attr("class", "label createdSubLabel");
            currentIndex += 5; // Increase the current index by 5
            currentXLabels = 90; // Reinitialize x of labels when ended a row
            currentY += 40; // Increase current y
            currentXRects = 0; // Reinitialize x of rects when ended a row
        }
        d3.select("#svgSubstituents").style("height", "240px"); // Increase height of substituents svg to see all the added ones
    }
});

//Cancel Button Substituent
var cancelSubButton = d3.select("#cancelChoiceSubs");
cancelSubButton.on("click", function() {
    $('#pieLinkCarbon').css("display", "none"); // Hide the piechart
    d3.select("#svgSubstituents").style("height", "40px"); // Reinitialize svg height
    d3.select("#svgSubstituents").transition().style("display", "none"); // Hide the substituent svg
    d3.selectAll(".createdSubChoice").remove(); // Remove all added rects
    d3.selectAll(".createdSubLabel").remove(); // Remove all added labels
    updateMenu(); // Update to main menu
    d3.select("#svgMenu").transition().style("display", "block"); // Display main menu
});

/**
 * Update the menu. Can be called with or without one parameter.
 * @param chosenDivision
 */
function updateMenu(chosenDivision) {
    // Fixed size of the menu
    var menuDimensions = {
        height: 40,
        width: 1000
    };

    d3.select("#actions").selectAll("*").remove(); // Reinitialize the svg rectangles menu
    d3.select("#labels").selectAll("*").remove(); // Reinitialize the svg labels menu
    var actions = d3.select("#actions"); // Rectangles
    var labels = d3.select("#labels"); // Labels

    // Set the height and width of our svg menu
    var svgMenu = d3.select("#svgMenu").attr({
        height: menuDimensions.height,
        width: menuDimensions.width
    });
    var svgMenu2 = d3.select("#svgMenu2").attr({
        height: menuDimensions.height,
        width: menuDimensions.width
    });
    var newMenuAction = [];

    // This case happens when update is called with no parameter (first update)
    if (typeof chosenDivision === 'undefined') {
        menuChosenPath = []; // Reinitialize the path
        infosTable = []; // Reinitialize the list of clicks
        // Hide all other svgs
        d3.select("#svgShape").transition().style("display", "none");
        d3.select("#svgSubstituents").transition().style("display", "none");
        d3.select("#svgInfos").transition().style("display", "none");
        d3.select("#svgCarbons").transition().style("display", "none");
        d3.select("#svgMenu").transition().style("display", "block");
        d3.select("#svgMenu2").transition().style("display", "block");
        newMenuAction = menuAction;
    } else { // Get SubDivisions that we want to update menu
        menuChosenPath.push(chosenDivision);
        // If chose a color, then we hide the svg and show the svg for anomericity, isomer and type
        if (chosenDivision.indexOf("Color") > -1) {
            d3.select("#svgInfos").transition().duration(200).style("display", "block");
            d3.select("#svgMenu").transition().duration(200).style("display", "none");
            return;
        } else {
            // Get the subdivisions of chosen menu
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


    menuDimensions.barWidth = menuDimensions.width / newMenuAction.length; // Calculate width of each rect of the menu
    var bars = actions.selectAll("rect").data(newMenuAction);
    var textNodes = labels.selectAll("text").data(newMenuAction); // Get all the labels of the menu

    // If we are not displaying colors
    if (newMenuAction != colorDivisions) {
        d3.select("#svgMenu").style("height", "40px"); // Set height of the menu bac kto 40 px

        // Append a rect with calculated width, height; x and y
        bars.enter().append("rect")
            .attr("width", menuDimensions.barWidth)
            .attr("height", menuDimensions.height)
            .attr("y", 0)
            .attr("x", function (d, i) {
                return menuDimensions.barWidth * i;
            })
            .attr("id", function (d) {
                return d.division;
            })
            .attr("rx", 15) // Corner for the rect
            .attr("ry", 15) // Cornet for the rect
            .attr("class",  "bar choice")
            .style("fill", function (d) {
                return d.display_division
            })
            .on("click", function (d) {
                // If the update has been clicked but no node selected, error popup displayed
                if (d.division == "updateNode") {
                    if (clickedNode == null) {
                        document.getElementById("error").innerHTML = "No node selected to update !";
                        $('#error').css({'top': mouseY - 80, 'left': mouseX - 50}).fadeIn(400).delay(1000).fadeOut(400);
                        return;
                    }
                    if (clickedNode instanceof sb.Substituent) {
                        document.getElementById("error").innerHTML = "No update possible for Substituent !";
                        $('#error').css({'top': mouseY - 80, 'left': mouseX - 50}).fadeIn(400).delay(1000).fadeOut(400);
                        return;
                    }
                }
                // Push the information in the table and update the menu
                infosTable.push(d.division);
                updateMenu(d.division);
            }).on("mouseover", function (d) {
            // On hover of addNode, we display its two subdivisions
            if (d.division == "addNode") {
                manageHoverAddNode(d, actions);
                // Add the two labels for monosaccharide and substituents
                labels.selectAll("text")[0][0].remove();
                labels.append("text").attr("class", "label").text(d.subDivisions[1].display_division).attr("x", 1000 / 12).attr("y", 8);
                labels.append("text").attr("class", "label").text(d.subDivisions[0].display_division).attr("x", 250).attr("y", 8);
            }
        });
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
    } else { // If we are displaying colors
        d3.select("#svgMenu").style("height", "60px"); // Update height to show circles and labels of monosaccharides
        bars.enter().append("circle")
            .attr("cy", 20)
            .attr("cx", function (d, i) {
                return menuDimensions.barWidth * i + menuDimensions.barWidth/2;
            })
            .attr("id", function (d) {
                return d.division;
            })
            .attr("r", 20)
            .attr("class", "bar choice choiceWhiteStroke")
            .style("fill", function (d) {
                return d.display_division;
            })
            .style("opacity", function(d) {
                // Check if the color is possible with the chosen shape, and change opacity in consequence
                var chosenShape = infosTable[infosTable.length - 1]; // Get the selected shape
                // Check if the shape is bisected
                var isBisected = false;
                if (chosenShape.indexOf("bisected") > -1) {
                    chosenShape = chosenShape.split("bisected")[1];
                    isBisected = true;
                }
                var color = getColorCodeFromString(d.division); // Get the clicked color
                var existingMonoType = getMonoTypeWithColorAndShape(color, chosenShape, isBisected);
                // If there is no type for this combination, lower the opacity
                if (existingMonoType == sb.MonosaccharideType.UNDEFINED) {
                    return 0.1
                } else {
                    return 1;
                }
            })
            .on("click", function (d) {
                // Manage click, if combination impossible the click is not doing anything
                var chosenShape = infosTable[infosTable.length - 1]; // Get the selected shape
                // Check if the shape is bisected
                var isBisected = false;
                if (chosenShape.indexOf("bisected") > -1) {
                    chosenShape = chosenShape.split("bisected")[1];
                    isBisected = true;
                }
                var color = getColorCodeFromString(d.division); // Get the clicked color
                var existingMonoType = getMonoTypeWithColorAndShape(color, chosenShape, isBisected);
                // If there is no type for this combination, no action
                if (existingMonoType != sb.MonosaccharideType.UNDEFINED) {
                    infosTable.push(d.division);
                    updateMenu(d.division);
                }
            });
        textNodes.enter().append("text")
            .attr("class", "labelMonoChoice")
            .attr("x", function(d, i) {
                return 50 + i * 100;
            })
            .attr("y", 45)
            .text(function(d) {
                var shape = infosTable[infosTable.length-1];
                var isBisected = false;
                if (shape.indexOf("bisected") != -1) {
                    shape = shape.split("bisected")[1];
                    isBisected = true;
                }
                var color = d.display_division;
                var monoType = getMonoTypeWithColorAndShape(color, shape, isBisected);
                var labelMono = monoType.toString().split(".")[1];
                if (labelMono == "UNDEFINED") {
                    labelMono = "";
                }
                return labelMono;
            });
    }

    // If not the first menu, we add a cancel button to come back to last step
    if (typeof chosenDivision != 'undefined') {
        addCancelOperation(actions, labels);
    }
}

/**
 * Add a cancel button (rectangle), enabling to come back to last step
 * @param actions The rects of the svg
 * @param labels The labels (texts) of the svg
 */
function addCancelOperation (actions, labels) {
    // We add the rect and the label to cancel last click
    actions.append("rect")
        .attr("width", 80)
        .attr("class", "bar")
        .attr("height", 40)
        .attr("id", "cancelChoice")
        .attr("x", 1010).attr("y", 0)
        .style("fill", "#505656")
        .on("click", function () {
            menuChosenPath.pop(); // Remove last information from menuChosenPath
            updateMenu(menuChosenPath.pop()); // Update menu from last step
            infosTable.pop(); // Remove the last added information in infosTable
        });

    labels.append("text")
        .attr("class", "label cancelLabel")
        .attr("x", 1050)
        .attr("y", 8)
        .text("<<")
}
/**
 * Get SubDivisions of a searched division, using recursive calls
 * @param divisionToCheck The currently checked division
 * @param searchedDivision The division searched
 * @returns {*}
 */
function getSubDivisions (divisionToCheck, searchedDivision) {
    // If current division is shape, next step is color choice
    if (searchedDivision.indexOf("shape") > -1) {
        return colorDivisions;
    }
    if (divisionToCheck) {
        // Loop on divisions, recursive calls on subDivisions if needed
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
        // If tree is empty, don't hide menus because there would be no way to display them back
        if (Object.keys(treeData).length !== 0) {
            d3.select('#svgMenu').style("display", "none");
            d3.select("#svgInfos").style("display", "none");
            d3.select("#svgShape").style("display", "none");
            d3.select("#svgCarbons").style("display", "none");
            d3.select("#svgSubstituents").style("display", "none");
            d3.select("#pieLinkCarbon").style("display", "none");
        }
    } else if (e.keyCode == 46) { // Delete button keycode
        if (clickedNode != null) { // If there is no clicked node, then no action
            // Else delete the node from the graph, and then from the tree
            deleteNode(clickedNode);
        }
    }
};

/**
 * Delete the clicked node from the graph and the tree
 * @param node The node to delete
 */
function deleteNode(node) {
    if (node == sugar.getRootNode()) {
        // Clear treeData
        treeData = {};
        sugar.clear();
        shapes = [];
    } else {
        deleteAllChildrenInGraph(node);
        sugar.removeNodeById(node.id);
        searchAndRemoveNodeInTree(treeData, node);
    }
    delete shapes[node.id]; // TODO: REMOVE ALL CHILDREN TOO
    displayTree(); // Display back the tree
    clickedNode = null; // Reinitialize the clicked node
    // Hide all menus
    d3.select('#svgMenu').style("display", "none");
    d3.select("#svgInfos").style("display", "none");
    d3.select("#svgShape").style("display", "none");
    d3.select("#svgCarbons").style("display", "none");
    d3.select("#svgSubstituents").style("display", "none");
    d3.select("#pieLinkCarbon").style("display", "none");
    if (!sugar.rootIsSet()) { // If we deleted the root, update menu
        updateMenu();
    }
}

/**
 * Delete all children nodes in the graph structure
 * @param node The node from which we want to delete children
 */
function deleteAllChildrenInGraph(node) {
    for (var edge of sugar.graph.edges()) {
        if (edge.sourceNode == node) {
            sugar.removeNodeById(edge.targetNode.id);
            deleteAllChildrenInGraph(edge.targetNode);
        }
    }
}

/**
 * Create a new node using the informations selected by the user
 */
function createNewNode() {
    var typeNodeToAdd = infosTable[1]; // Selected type, monosaccharide or substituent
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
        var linkedCarbon = getLinkedCarbonWithSelection(infosTable[7]); // Get the linked carbon
        var anomerCarbon = getAnomerCarbonWithSelection(infosTable[8]); // Get the anomer carbon
        var monoType = getMonoTypeWithColorAndShape(color, shape, isBisected); // Get the monosaccharide type
        var generatedNodeId = randomString(7); // Generate an id
        var monosaccharide = new sb.Monosaccharide(generatedNodeId,monoType,anomericity, isomer, ring); // Create new monosaccharide


        if (Object.keys(treeData).length === 0) { // If tree is empty, instantiate the sugar with the monosaccharide as the root
            sugar = new sb.Sugar("Sugar", monosaccharide);
            var node = {"node":monosaccharide};
            var shape = calculateXandYNode(node);
            shapes[generatedNodeId] = shape;
            updateTreeVisualization(); // Update visualization in the svg
            displayTree();
        } else {
            var generatedEdgeId = randomString(7); // If tree not empty, generate id, create linkage and update visualziation
            var glycosidicLink = new sb.GlycosidicLinkage(generatedEdgeId, clickedNode, monosaccharide, anomerCarbon, linkedCarbon);
            sugar.addMonosaccharide(monosaccharide, glycosidicLink);
            updateTreeVisualization(glycosidicLink);
            var node = {"node":monosaccharide};
            var shape = calculateXandYNode(node);
            shapes[generatedNodeId] = shape;
            displayTree();
        }
        return generatedNodeId;
    }
}

/**
 * Function called to create a new substituent in the sugar
 * @param linkCarbon The link carbon value
 */
function createNewSubstituent (linkCarbon) {
    if (infosTable[1] == "Substituent")
        var subLabel = infosTable[2];
    else
        var subLabel = infosTable[1]; // Get the label of the substituent
    var subType = getSubstituentTypeFromLabel(subLabel); // Get the SubstituentType
    var generatedSubId = randomString(7); // Random id for Substituent
    var newSubstituent = new sb.Substituent(generatedSubId, subType); // Create a new substituent
    var linkedCarbon = getLinkedCarbonWithSelection(linkCarbon); // Get the linkedCarbon value
    var generatedEdgeSubId = randomString(7); // Random id for edge
    // Create the linkage
    var subLinkage = new sb.SubstituentLinkage(generatedEdgeSubId, clickedNode, newSubstituent, linkedCarbon);
    sugar.addSubstituent(newSubstituent, subLinkage); // Add the substituent to the sugar, with the linkag;
    updateTreeVisualization(subLinkage);
    displayTree();
}

/**
 * Find in the SubstituentType enum the corresponding type for a given label
 * @param label The label of the SubstituentType
 * @returns {*}
 */
function getSubstituentTypeFromLabel (label) {
    // Loop on substituent types, and return the one we want
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
    // Loop on monosaccharide types, and return the one we want
    for (var type of sb.MonosaccharideType) {
        if(type.color == color && type.shape == shape && type.bisected == isBisected) {
            return type;
        }
    }
    return sb.MonosaccharideType.UNDEFINED; // Return undefined if combination doesn't exist
}

/**
 * Find in the Anomericity enum the corresponding value for a given selected value
 * @param anomericity The anomericity we are seeking
 * @returns {*}
 */
function getAnomericityWithSelection(anomericity) {
    var anomericityName;
    // Get the string associated to display label
    if (anomericity == "α") {
        anomericityName = "ALPHA";
    } else if (anomericity == "β") {
        anomericityName = "BETA"
    }

    // Loop on anomericity values, and return the one we want
    for (var anom of sb.Anomericity) {
        if (anom.name == anomericityName)
            return anom;
    }
    return sb.Anomericity.UNDEFINED; // Return undefined if not found (not supposed to happen)
}

/**
 * Find in the Isomer enum the corresponding value for a given selected value
 * @param isomer The isomer we are seeking
 * @returns {*}
 */
function getIsomerWithSelection(isomer) {
    // Loop on isomers, and return the one we want
    for (var anom of sb.Isomer) {
        if (anom.name == isomer)
            return anom;
    }
    return sb.Isomer.UNDEFINED; // Return undefined if not found (not supposed to happen)
}

/**
 * Find in the RingType enum the corresponding value for a given selected value
 * @param ringType The ring type we are seeking
 * @returns {*}
 */
function getRingTypeWithSelection(ringType) {
    // Loop on ring types, and return the one we want
    for (var ring of sb.RingType) {
        if (ring.name == ringType)
            return ring;
    }
    return sb.RingType.UNDEFINED; // Return undefined if not found (not supposed to happen)
}

/**
 * Find in the AnomerCarbon enum the corresponding value for a given selected value
 * @param anomerCarbon The anomer carbon we are seeking
 * @returns {*}
 */
function getAnomerCarbonWithSelection(anomerCarbon) {
    // Loop on anomer carbons, and return the one we want
    for (var carbon of sb.AnomerCarbon) {
        if (carbon.value == anomerCarbon)
            return carbon;
    }
    return sb.AnomerCarbon.UNDEFINED; // Return undefined if not found (not supposed to happen)
}

/**
 * Find in the LinkedCarbon enum the corresponding value for a given selected value
 * @param linkedCarbon The linked carbon we are seeking
 * @returns {*}
 */
function getLinkedCarbonWithSelection(linkedCarbon) {
    // Loop on linked carbons, and return the one we want
    for (var carbon of sb.LinkedCarbon) {
        if (carbon.value == linkedCarbon)
            return carbon;
    }
    return sb.LinkedCarbon.UNDEFINED; // Return undefined if not found (not supposed to happen)
}

/**
 * Get color code from a string, using colorDivisions
 * @param colorName The color string we are seeking the translated code
 * @returns {string|string|string|string|string|string|*}
 */
function getColorCodeFromString(colorName) {
    // Loop on colors, and return the code when found
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
    // Possible chars in the generated string
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) { // If no length specified, get a random length
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) { // Add random chars till length is the one specified
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}


/**
 * Generates n glycan for testing purposes
 * @param n
 */
function test(n)
{
    for (var i = 0; i < n; i++)
    {
        var linked = Math.abs(Math.floor(Math.random()*10) - 3);
        if (linked == 0)
            linked = "?";
        const colorChoice = ["blue", "yellow", "green", "orange", "pink", "purple", "lightBlue", "brown"];
        var color = colorChoice[Math.abs(Math.floor(Math.random()*10) - 2)];
        infosTable = [];
        infosTable.push("addNode");
        infosTable.push("Monosaccharide");
        infosTable.push("square");
        infosTable.push(color+"Color");
        infosTable.push("β");
        infosTable.push("L");
        infosTable.push("F");
        infosTable.push(linked);
        infosTable.push(linked);
        createNewNode();
        clickedNode = sugar.graph.nodes()[sugar.graph.nodes().length-1];
    }
}