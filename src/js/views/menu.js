/**
 * Author:  Nicolas Hory
 * Version: 0.0.1
 */


// The sugar we use as data structure, to be visualized using d3 tree
var sugar, controller;

var repeatUnitConfirm = 0;

var quickIsomer = "";
var quickRingType = "";
var quickAnomerCarbon = "";

// Function called when document is ready

$(document).ready(function() {
    progress = 0;
    ctrl = false;
    quickMode = false;
    updateMenu();  // Update menu
    addHoverManagersInfos(); // Add hover managers for informations
    addHoverManagersCarbons(); // Add hover managers for carbons

    var svg = d3.select("#progressChart");
    d3.selectAll("#progressBar").remove();
    svg.append("rect")
        .attr("width", progress/7*1000)
        .attr("height", "4px")
        .attr("id", "progressBar")
        .attr("fill", "#02b600");

    // Add structures to the select element
    var div = document.getElementById("structuresDiv");
    var selectList = document.createElement("select");
    selectList.id = "structure";
    div.appendChild(selectList);
    for (var s of sb.Structures) {
        var option = document.createElement("option");
        option.value = s.glycoct;
        option.text = s.name;
        selectList.appendChild(option);
    }
    var submit = document.createElement("input");
    submit.type = "submit";
    submit.id = "submitStructure";
    div.appendChild(submit);

    d3.select("#submitStructure").on('click', function() {
        var glycoct = $('#structure').val();
        treeData = {};
        selectedNodes = [];
        if (sugar)
            sugar.clear();
        var parser = new sb.GlycoCTParser(glycoct);
        sugar = parser.parseGlycoCT();
        shapes = [];
        generateShapes();
        treeData = generateTree();
        updateRepeatingUnitsNodesInTree();
        var i = 1;
        while (sugar.graph.nodes()[sugar.graph.nodes().length-i] instanceof sb.Substituent)
        {
            i++;
        }
        clickedNode = sugar.graph.nodes()[sugar.graph.nodes().length-i];
        displayTree();
    });

    d3.select("#svgTree").on('click', function() {
        fadeOutContextMenu();
    })
        .on('contextmenu', function() {
            d3.event.preventDefault();
        });
    d3.select("#svgMenu").on('click', function() {
        fadeOutContextMenu();
    })
        .on('contextmenu', function() {
            d3.event.preventDefault();
        });
    d3.select("#svgMenu2").on('click', function() {
        fadeOutContextMenu();
    })
        .on('contextmenu', function() {
            d3.event.preventDefault();
        });
    var subChoices = d3.selectAll(".subChoice"); // Substituent choices
    subChoices.on('click', function() {
        if (infosTable.length == 2) { // If one substituent has already been clicked, remove it from infosTable
            infosTable.pop();
        }
        // Push the new clicked substituent in infosTable
        infosTable.push(d3.select(d3.event.target).attr("value"));
        displayPie(); // Dispaly the piechart to choose linked carbon
    });
});

var menuChosenPath; // Path taken by user in the menu
var infosTable = []; // Table with all informations selected by the user

// Event listeners for the shape choice
var shapeChoices= document.getElementsByClassName("shapeChoice");
for (var shape of shapeChoices) {
    shape.addEventListener('click', function(e) {
        // When a shape is clicked, we update the menu, and store the chosen shape in infosTable
        progress = 1;
        redrawProgress(0);
        infosTable.push(e.target.parentNode.id.split("Shape")[0]);
        d3.select("#svgShape").transition().style("display", "none");
        updateMenu("shape");
        if (!ctrl)
        {
            d3.select("#svgMenu").transition().style("display", "block");
        }
    });
}

// Exit button
var shapeExitButton = d3.selectAll(".cancelResidue");
shapeExitButton.on("click", function() {
    redrawProgress(progress, 0);
    progress = 0;
    reinitializeDisplayInfos(); // Reinitialize the display of informations
    reinitializeDisplayCarbons(); // Reinitialize display of carbons svg
    updateMenu(); // Update menu
});

// Cancel button in shape menu, coming back to main menu
var shapeCancelButton = d3.select("#cancelChoiceShape");
shapeCancelButton.on("click", function() {
    redrawProgress(progress, 0);
    progress = 0;
    updateMenu();
});

// Cancel button in informations svg, coming back to shape svg, managing displays
var infosCancelButton = d3.select("#cancelChoiceInfos");
infosCancelButton.on("click", function() {
    redrawProgress(progress, 1);
    progress = 1;
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
    redrawProgress(progress, 2);
    progress = 2;
    infosTable.pop();
    infosTable.pop();
    infosTable.pop();
    d3.select("#svgCarbons").transition().style("display", "none"); // Hide the svg of carbon choice
    reinitializeDisplayInfos(); // Reinitialize display of informations svg
    reinitializeDisplayCarbons(); // Reinitialize display of carbons svg
    d3.select("#svgInfos").transition().style("display", "block"); // Display main menu
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
}];

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
    division: "repeatUnit",
    display_division: "Repeat Unit"
}, {
    division: "updateNode",
    display_division: "Update Node",
    subDivisions: "shape"
}];

var menu2Action = [
    {
        division: "addStructure",
        display_division: "Load Structure"
    },
    {
        division: "quickMode",
        display_division: "Toggle Quick Mode"
    },
    {
        division: "io",
        display_division: "GlycoCT",
        subDivisions: [{
            division: "exportFormula",
            display_division: "Export"
        }, {
            division: "typeFormula",
            display_division: "Import"
        }]
    }
    ];


//Managing displaying more rows for subs
var substituentDisplayMore = d3.select("#displayMoreSubs"); // Button to display all substituents
substituentDisplayMore.on("click", function() {
    $('#pieLinkCarbon').css("display", "none"); // Hide the piechart
    var subsRects = d3.select("#actionsSubs"); // Rects for substituents
    var subsLabels = d3.select("#labelsSubs"); // Labels for substituents
    var subTypes = [];
    var mostUsedTypes = ["S", "P", "NAc", "Ac", "Me"]; // Most used substituent types
    // Add all substituent in an array, except the most used ones and the undefined one
    for (var type of sb.SubstituentType) {
        if (type.label != 'undefined' && mostUsedTypes.indexOf(type.label) == -1) {
            subTypes.push(type.name);
        }
    }

    // If only the 5 most used are actually displayed
    if(d3.selectAll(".subChoice")[0].length == 5) {
        var moreSubs = subsRects.append("g").attr("id", "moreSubs");
        var currentIndex = 0;
        var currentY = 40;
        // Loop to add new substituents to the menu
        while (currentIndex < subTypes.length) {
            var currentXLabels = 90; // x to place labels
            var currentXRects = 0; // x to place rects
            moreSubs.selectAll("rect").data(subTypes.slice(currentIndex, currentIndex + 5), function(d){return d;}).enter().append("rect")
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
            moreSubs.selectAll("text").data(subTypes.slice(currentIndex, currentIndex + 5), function(d){return d;}).enter().append("text")
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
    else
    {
        d3.select("#svgSubstituents").style("height", "50px");
        subsRects.select("#moreSubs").remove();
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

var cancelQuickInfos = d3.select("#cancelQuickInfos");
cancelQuickInfos.on("click", function() {
    $('#pieLinkCarbon').css("display", "none"); // Hide the piechart
    reinitializeQuickInfos();
    updateMenu(); // Update to main menu
    d3.select("#svgQuickMono").transition().style("display", "block"); // Display main menu
    progress = 0;
    redrawProgress(0);
});


/**
 * Update the menu. Can be called with or without one parameter.
 * @param chosenDivision
 */
function updateMenu(chosenDivision) {

    if (quickMode)
    {
        d3.select("#quickMode").style("fill", "#000592");
    }
    else
    {
        d3.select("#quickMode").style("fill", "#cc0000");
    }

    // Fixed size of the menu
    var menuDimensions = {
        height: 40,
        width: 1000
    };

    d3.select("#actions").selectAll("*").remove(); // Reinitialize the svg rectangles menu
    d3.select("#labels").selectAll("*").remove(); // Reinitialize the svg labels menu
    if (infosTable.length == 0)
    {
        d3.select("#actions2").selectAll("*").remove();
        d3.select("#labels2").selectAll("*").remove();
    }

    if (chosenDivision == undefined)
    {
        progress = 0;
        removeInfosChoices();
        redrawProgress(0);
    }

    var actions = d3.select("#actions"); // Rectangles
    var actions2 = d3.select("#actions2");
    var labels = d3.select("#labels"); // Labels
    var labels2 = d3.select("#labels2");

    // Set the height and width of our svg menu
    var svgMenu = d3.select("#svgMenu").attr({
        height: menuDimensions.height,
        width: menuDimensions.width
    });
    var svgMenu2 = d3.select("#svgMenu2").attr({
        height: menuDimensions.height,
        width: menuDimensions.width
    });
    var svgProgress = d3.select("#svgProgress").attr({
        height: menuDimensions.height,
        width: menuDimensions.width
    })
    var newMenuAction = [];

    // This case happens when update is called with no parameter (first update)
    if (typeof chosenDivision === 'undefined') {
        menuChosenPath = []; // Reinitialize the path
        infosTable = []; // Reinitialize the list of clicks
        // Hide all other svgs
        d3.select("#svgShape").transition().style("display", "none");
        d3.select("#svgMultiselectMenu").transition().style("display", "none");
        d3.select("#svgSubstituents").transition().style("display", "none");
        d3.select("#svgInfos").transition().style("display", "none");
        d3.select("#svgCarbons").transition().style("display", "none");
        d3.select("#svgQuickInfos").transition().style("display", "none");
        if (quickMode)
        {
            d3.select("#svgMenu").transition().style("display", "none");
            var svgQuick = d3.select("#svgQuickMono").style("height","50px").style("width","1000px").style("margin", "0 auto 10px").style("display", "block").attr("x",0);

            var common = [];
            for (var mono of sb.QuickModeMonosaccharides)
            {
                common.push(mono);
            }

            var g = svgQuick.selectAll("rect").data(common)
                .enter()
                .append("g")
                .attr("id", function (d) {
                    return d.name;
                })
                .attr("class", "shapeChoice")
                .on("click", function(d) {
                    infosTable.push("addNode");
                    infosTable.push("Monosaccharide");
                    infosTable.push(sb.MonosaccharideType[d.name].shape);
                    var color;
                    for (var c of colorDivisions) {
                        if (c.display_division == sb.MonosaccharideType[d.name].color) {
                            color = c.division;
                        }
                    }
                    infosTable.push(color);
                    quickRingType = d.ringType;
                    quickAnomerCarbon = d.anomerCarbon;
                    quickIsomer = d.isomer;
                    progress = 3;
                    redrawProgress(2);
                    updateMenu(d);
                });

            g.append("rect")
                .attr("width", 91)
                .attr("height", 40)
                .attr("x", function(d)
                {
                    return d.ordinal*91;
                })
                .attr("y", 0)
                .attr("class", "bar choice")
                .style("fill", "gray");

            g.append("path")
                .attr("class", "shapeElement")
                .attr("d", d3.superformula()
                    .size(400)
                    .type(function (d) {
                        return sb.MonosaccharideType[d.name].shape.toLowerCase(); // Get the shape of the monosaccharide type
                    }))
                .attr("transform", function (d) {
                    var rotate = 0, translate = d.ordinal*91+45;
                    var shape = sb.MonosaccharideType[d.name].shape;
                    if (shape == "star") {
                        rotate = -20;
                    } else if (shape == "triangle") {
                        rotate = 30;
                    }
                    return "translate("+translate+",20) rotate("+rotate+")";
                })
                .style("fill", function(d) {
                     return sb.MonosaccharideType[d.name].color;
                });

            g.append("text")
                .attr("class", "labelMonoChoice")
                .attr("x", function(d)
                {
                    return d.ordinal*91+45;
                })
                .attr("y", 45)
                .text(function(d) {
                    return d.name;
                });
        }
        else
        {
            d3.select("#svgQuickMono").transition().style("display", "none");
            d3.select("#svgMenu").transition().style("display", "block");
        }
        d3.select("#svgMenu2").transition().style("display", "block");
        newMenuAction = menuAction;
    } else { // Get SubDivisions that we want to update menu
        if (quickMode && sb.QuickModeMonosaccharides[chosenDivision.name]) // If quickMode
        {
            d3.select("#svgQuickMono").transition().style("display", "none");
            var svgQuick = d3.select("#svgQuickInfos").style("height","50px").style("width","1000px").style("margin", "0 auto 10px").style("display", "block");
        }
        else
        {
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
    var bars2 = actions2.selectAll("rect").data(menu2Action);
    var textNodes = labels.selectAll("text").data(newMenuAction); // Get all the labels of the menu
    var textNodes2 = labels2.selectAll("text").data(menu2Action);

    bars2.enter().append("rect")
        .attr("width", 1000 / 3)
        .attr("height", 40)
        .attr("y", 0)
        .attr("x", function (d, i) {
            return (1000 / 3) * i;
        })
        .attr("id", function (d) {
            return d.division;
        })
        .attr("rx", 15) // Corner for the rect
        .attr("ry", 15) // Cornet for the rect
        .attr("class",  "bar choice")
        .style("fill", function (d) {
            if (quickMode && d.division == "quickMode")
            {
                return "#000592";
            }
        })
        .on("click", function (d) {
            if (d.division == "quickMode")
            {
                quickMode = !quickMode;
                reinitializeQuickInfos();
                reinitializeDisplayCarbons();
                reinitializeDisplayInfos();
                updateMenu();
            }
            else if (d.division == "addStructure")
            {
                d3.select("#formula").style("display","none");
                d3.select("#validateFormula").style("display", "none");
                d3.select("#copyMsg").style("display", "none");

                d3.select("#structuresDiv").style("display", "block");
            }
        }).on("mouseover", function (d) {
        // On hover of addNode, we display its two subdivisions
        if (d.division == "io") {
            if (infosTable.length == 0) // If the user is not creating a node
            {
                manageHoverIO(d, actions2);
                if (labels2.selectAll("text")[0][2])
                    labels2.selectAll("text")[0][2].remove();
                labels2.append("text").attr("class", "label").text(d.subDivisions[0].display_division).attr("x", 9000 / 12).attr("y", 8);
                labels2.append("text").attr("class", "label").text(d.subDivisions[1].display_division).attr("x", 11000 / 12).attr("y", 8);
            }
        }
    });
    textNodes2.enter().append("text")
        .attr("class", "label")
        .attr("x", function (d, i) {
            var barWidth = 333.3333333333333;
            return (barWidth * i) + (barWidth / 2);
        })
        .attr("y", function () {
            var barHeight = 40;
            return barHeight/5; // Choose an y to center label
        })
        .text(function (d) {
            return d.display_division;
        });

    // If we are not displaying colors
    if (newMenuAction != colorDivisions) {
        d3.select("#svgMenu").style("height", "50px"); // Set height of the menu bac kto 40 px

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
                    // Push the information in the table and update the menu
                    infosTable.push(d.division);
                    updateMenu(d.division);
                }
                else if (d.division == "repeatUnit")
                {
                    if (sugar)
                    {
                        var svgMenu = d3.select("#svgMenu");
                        if (repeatUnitConfirm > 0)
                        {
                            handleRepetition();
                            repeatUnitConfirm = 0;
                        }
                        else if (selectedNodes.length == 0)
                        {
                            svgMenu.style("height", "65px");
                            svgMenu.select("#actions").append("rect")
                                .attr("width", 1000)
                                .attr("class", "bar")
                                .attr("height", 30)
                                .attr("id", "menuSubErrorRect")
                                .attr("x", 0)
                                .attr("y", 40)
                                .style("fill", "#ffffff");
                            svgMenu.select("#labels").append("text")
                                .attr("class", "errorLabel")
                                .attr("id", "menuSubError")
                                .attr("x", 500)
                                .attr("y", 50)
                                .text("Use Ctrl + Click to select several nodes. Click again to only repeat the selected node.");
                            $('#menuSubError').fadeIn(400).delay(10000).fadeOut(400, function() {
                                svgMenu.style("height", "40px");
                                svgMenu.select("#menuSubError").remove();
                                svgMenu.select("#menuSubErrorRect").remove();
                            });
                            repeatUnitConfirm = 1;
                        }
                        else if (selectedNodes.length > 0)
                        {
                            handleRepetition();
                            repeatUnitConfirm = 0;
                        }
                    }
                }
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
        d3.select("#svgMenu").style("height", "50px"); // Update height to show circles and labels of monosaccharides
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
                progress = 2;
                redrawProgress(1);
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
                    reinitializeDisplayInfos();
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
                var labelMono;
                if (monoType == undefined)
                {
                    labelMono = "";
                }
                else
                {
                    labelMono = monoType.name;
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
        .attr("width", 40)
        .attr("class", "bar")
        .attr("height", 40)
        .attr("id", "cancelChoice")
        .attr("x", 1010).attr("y", 0)
        .style("fill", "#505656")
        .on("click", function () {
            progress--;
            redrawProgress(progress+1);
            menuChosenPath.pop(); // Remove last information from menuChosenPath
            updateMenu(menuChosenPath.pop()); // Update menu from last step
            infosTable.pop(); // Remove the last added information in infosTable
        });

    actions.append("rect")
        .attr("width", 40)
        .attr("class", "bar")
        .attr("height", 40)
        .attr("id", "cancelChoice")
        .attr("x", 1050).attr("y", 0)
        .style("fill", "#505656")
        .on("click", function () {
            redrawProgress(progress, 0);
            progress = 0;
            menuChosenPath = []; // Remove all information from menuChosenPath
            removeInfosChoices();
            updateMenu(); // Update menu
            infosTable = []; // Remove all added information in infosTable
        });

    labels.append("text")
        .attr("class", "label cancelLabel")
        .attr("x", 1030)
        .attr("y", 8)
        .text("<<");

    labels.append("text")
        .attr("class", "label cancelLabel")
        .attr("x", 1070)
        .attr("y", 8)
        .text("X");
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
    if (e.keyCode == 17 || e.keyCode == 16) // Ctrl or Shift
    {
        ctrl = true;
    }
    if (e.keyCode == 27) { //Esc
        // If tree is empty, don't hide menus because there would be no way to display them back
        updateMenu();
        selectedNodes = [];
        displayTree();
    } else if (e.keyCode == 46) { // Delete button keycode
        if (clickedNode != null) { // If there is no clicked node, then no action
            // Else delete the node from the graph, and then from the tree
            if (selectedNodes.length != 0)
            {
                var wholeSelection = [clickedNode].concat(selectedNodes);
                for (var n of wholeSelection)
                {
                    var parent = getNodeParent(n);
                    if (parent == undefined || !wholeSelection.includes(parent)) // highest node in selection
                    {
                        selectedNodes = [];
                        deleteNode(n);

                    }
                }
            }
            else
            {
                deleteNode(clickedNode); // Delete the node clicked
            }
        }
    }
    else if (e.keyCode == 82) { // r key
        handleRepetition();
    }
};

function isBranchSelected(nodes)
{
    for (var node of nodes)
    {
        if (node.children != undefined)
        {
            var selectedChildren = 0;
            for (var child of node.children)
            {
                if (nodes.includes(child))
                {
                    selectedChildren++;
                }
            }
            if (selectedChildren > 1)
            {
                return true;
            }
        }
    }
    return false;
}

function handleRepetition()
{
    var nodes = [clickedNode].concat(selectedNodes);
    if (!isRepeated(nodes))
    {
        findNodesInTree(nodes);
        var repEntry, repExit;
        if (isBranchSelected(nodes)) // BRANCH
        {
            repEntry = nodes[0].node;
            repExit = findRepExit(nodes[0]);
            if (repExit.length != 1) // If the rep unit has 2 exits
            {
                return;
            }
            repExit = repExit[0].node;
        }
        else // NO BRANCH
        {
            var entryExit = findEntryAndExit(nodes);
            if (!entryExit)
            {
                return;
            }
            repEntry = entryExit[0];
            repExit = entryExit[1];
        }



        if (repExit != undefined) // Doesn't finish by a fork
        {
            var min = prompt("Minimum number of repetitions");
            if (min == null || min == "")
            {
                return;
            }
            var max = prompt("Maximum number of repetitions");
            if (max == null || max == "")
            {
                return;
            }
            var linked = prompt("Linked Carbon on the "+repExit.monosaccharideType.name + " (\"?\" for unknown linkage)");
            if (linked != "?" && (linked > getNumberCarbons(repExit) || linked < 1))
                return;
            var anomer = prompt("Anomer Carbon on the "+repEntry.monosaccharideType.name + " (\"?\" for unknown linkage)");
            if (anomer != "?" && (anomer > 3 || anomer < 1))
                return;
            var id = randomString(7);
            var repeatingUnit = new sb.RepeatingUnit(id,nodes,min,max,repEntry,repExit,linked,anomer);
            for  (var node of nodes)
            {
                node.node.repeatingUnit = repeatingUnit;
            }
            moveNodesInsideRep();
            displayTree();
            updateMenu();
        }
    }
}

function moveNodesInsideRep()
{
    var nodes = tree.nodes(treeData);
    var repeatingUnits = generateRepeatingUnits(nodes);
    for (var rep of repeatingUnits) // for each Repeating unit
    {
        var repCoord = getRepCoord(rep);
        for (var node of nodes) // and for each node
        {
            if (node.node instanceof sb.Monosaccharide)
            {
                var linkedCarbon;
                var dontMove = false;
                // if the node is not part of the repeating unit AND is located inside the square, move it
                while (((node.node.repeatingUnit == undefined || node.node.repeatingUnit.id != rep.id) &&
                    (shapes[node.node.id][0] >= repCoord[0] &&
                    shapes[node.node.id][0] <= repCoord[1] &&
                    shapes[node.node.id][1] >= repCoord[2] &&
                    shapes[node.node.id][1] <= repCoord[3])) && !dontMove)
                {
                    var link;
                    for (var e of sugar.graph.edges())
                    {
                        if (e.target == node.node.id)
                            link = e;
                    }
                    linkedCarbon = link.linkedCarbon.value;
                    if (!checkNodesInLine(shapes[node.node.id][0], shapes[node.node.id][1], XYvalues[linkedCarbon][0], XYvalues[linkedCarbon][1], repCoord))
                        moveNodeAndChildren(node,XYvalues[linkedCarbon][1],XYvalues[linkedCarbon][0]);
                    else
                    {
                        dontMove = true;
                    }
                }
            }
        }
    }
}

/**
 *
 * @param startX
 * @param startY
 * @param dx
 * @param dy
 * @param limit
 * This function will check if a node can escape a repeating unit without hitting another node
 */
function checkNodesInLine(startX, startY, dy, dx, repCoord)
{
    var limit;
    var x = startX+dx, y = startY+dy;
    if (dx == 0) // Horizontal
    {
        if (dy > 0) // going to the right
        {
            limit = repCoord[3];
            while (y < limit)
            {
                if (isAvailible(x, y) != "")
                    return true;
                y += dy;
            }
        }
        else if (dy < 0) // going to the left
        {
            limit = repCoord[2];
            while (y > limit)
            {
                if (isAvailible(x, y) != "")
                    return true;
                y += dy;
            }
        }
    }
    else if (dy == 0) // Vertical
    {
        if (dx > 0) // going to the bottom
        {
            limit = repCoord[1];
            while (x < limit)
            {
                if (isAvailible(x, y) != "")
                    return true;
                x += dx;
            }
        }
        else if (dx < 0) // going to the top
        {
            limit = repCoord[0];
            while (x > limit)
            {
                if (isAvailible(x, y) != "")
                    return true;
                x += dx;
            }
        }
    }
    return false;
}

function moveNodeAndChildren(node, dx, dy)
{
    var stack = [node];
    while (stack.length != 0)
    {
        var n = stack.pop();
        shapes[n.node.id][0] += dx;
        shapes[n.node.id][1] += dy;
        if (n.children != undefined)
        {
            for (var child of n.children)
            {
                stack.push(child);
            }
        }
    }
}

function findEntryAndExit(nodes)
{
    var maxDepth = nodes[0].depth;
    var minDepth = nodes[0].depth;
    var maxNode = nodes[0].node;
    var minNode = nodes[0].node;
    var unselectedChildren = 0;
    for (var node of nodes)
    {
        unselectedChildren += countUnselectedChildren(node, nodes);
        if (node.depth > maxDepth)
        {
            maxDepth = node.depth;
            maxNode = node.node;
        }
        if (node.depth < minDepth)
        {
            minDepth = node.depth;
            minNode = node.node;
        }
    }
    if (unselectedChildren > 1)
    {
        return false;
    }
    else
    {
        return [minNode,maxNode];
    }
}

function countUnselectedChildren(node, nodes)
{
    var count = 0;
    if (node.children != undefined)
    {
        for (var child of node.children)
        {
            if (!nodes.includes(child) && child.node instanceof sb.Monosaccharide)
            {
                count++
            }
        }
        return count;
    }
    else
    {
        return 0;
    }
}


function findRepExit(root)
{
    var wholeSelection = [clickedNode].concat(selectedNodes);
    findNodesInTree(wholeSelection);
    var exits = [];
    var stack = [root];

    while (stack.length > 0)
    {
        var node = stack.pop();
        if (countUnselectedChildren(node, wholeSelection) == 1)
        {
            if (!exits.includes(node))
                exits.push(node);
        }
        if (node.children != undefined)
        {
            for (var child of node.children)
            {
                if (wholeSelection.includes(child))
                    stack.push(child);
            }
        }
    }
    return exits;
}

function findNodesInTree(arr)
{
    for (var i in arr)
    {
        arr[i] = findNodeInTree(treeData,arr[i]);
    }
    return arr;
}

document.onkeyup = function(e) {
    if (e.keyCode == 17 || e.keyCode == 16) // Ctrl or Shift
    {
        ctrl = false;
    }
};

function isRepeated(arr)
{
    for (var node of arr)
    {
        if (node.repeatingUnit !== undefined)
        {
            return true;
        }
    }
    return false;
}

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
        clickedNode = null;
        d3.selectAll("#rootAttach").remove();
    } else {
        deleteAllShapesInGraph(node);
        deleteAllChildrenInGraph(node);
        searchAndRemoveNodeInTree(treeData, node);
        var nbNodes = sugar.graph.nodes().length;
        var i = 1;
        while (sugar.graph.nodes()[sugar.graph.nodes().length-i] instanceof sb.Substituent)
        {
            i++;
        }
        clickedNode = sugar.graph.nodes()[sugar.graph.nodes().length-i];
    }
    delete shapes[node.id];
    if (node instanceof sb.Monosaccharide)
        reassembleNodes();
    displayTree(); // Display back the tree
    // Hide all menus
    d3.select('#svgMenu').style("display", "none");
    d3.select("#svgInfos").style("display", "none");
    d3.select("#svgShape").style("display", "none");
    d3.select("#svgMultiselectMenu").style("display", "none");
    d3.select("#svgCarbons").style("display", "none");
    d3.select("#svgSubstituents").style("display", "none");
    d3.select("#pieLinkCarbon").style("display", "none");

    updateMenu();
}


function deleteSubs(node)
{
    var name = node.monosaccharideType.name;
    var deleted = 0;
    for (var edge of sugar.graph.edges())
    {
        if (edge.sourceNode == node)
        {
            if (edge.targetNode instanceof sb.Substituent)
            {
                deleteNode(edge.targetNode);
                deleted++;
            }
        }
    }
    if (deleted == 0 && sb.SubstituentsPositions[name])
    { // Has an embedded sub to be deleted
        if (name.substring(0,3) == "Neu")
        {
            updateNodeType(node, sb.MonosaccharideType.Kdn);
        }
        else
        {
            var i = 1;
            while ((!sb.MonosaccharideType[name.substring(0,name.length-i)] || sb.SubstituentsPositions[name.substring(0,name.length-i)])&& i < 10)
            {
                i++;
            }
            updateNodeType(node, sb.MonosaccharideType[name.substring(0,name.length-i)]);
        }
    }
    displayTree();
    updateMenu();
}

/**
 * Gathers all the scattered nodes
 * (because after a deletion some nodes can stay far away)
 */
function reassembleNodes()
{
    for (var edge of sugar.graph.edges())
    {
        var source = edge.source;
        var target = edge.target;
        var linkedCarbon = edge.linkedCarbon.value;
        var usualX = shapes[source][0]+XYvalues[linkedCarbon][1];
        var usualY = shapes[source][1]+XYvalues[linkedCarbon][0];
        if (shapes[target] != undefined && (shapes[target][0] != usualX || shapes[target][1] != usualY)) // If the node is not where it should be
        {
            if (isAvailible(usualX, usualY) == "")
            {
                shapes[target] = [usualX, usualY];
            }
            else
            {
                shapes[target] = findNewSpot(usualX, usualY, linkedCarbon);
            }
        }
    }
}


/**
 * Delete all children nodes in the graph structure
 * @param node The node from which we want to delete children
 */
function deleteAllChildrenInGraph(node) {
    for (var edge of sugar.graph.edges()) {
        if (edge.sourceNode == node) {
            deleteAllChildrenInGraph(edge.targetNode);
        }
    }
    if (node.children === undefined) // leaf
    {
        sugar.removeNodeById(node.id);
    }
}

function deleteAllShapesInGraph(node) { // has to be separate from deleteAllChildrenInGraph because it updates the sugar on the fly
    for (var edge of sugar.graph.edges()) {
        if (edge.sourceNode == node) {
            delete shapes[node.id];
            delete shapes[edge.target];
            deleteAllShapesInGraph(edge.targetNode);
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
            var rootShape = [origin[0],origin[1]+gap];
            shapes["root"] = rootShape;
            rootLinkedCarbon = linkedCarbon;
            rootAnomerCarbon = anomerCarbon;
            updateTreeVisualization(); // Update visualization in the svg
        } else {
            var generatedEdgeId = randomString(7); // If tree not empty, generate id, create linkage and update visualziation
            var glycosidicLink = new sb.GlycosidicLinkage(generatedEdgeId, clickedNode, monosaccharide, anomerCarbon, linkedCarbon);
            sugar.addMonosaccharide(monosaccharide, glycosidicLink);
            updateTreeVisualization(glycosidicLink);
            var parent = getNodeParent(monosaccharide);
            var node = {"node":monosaccharide, "parent":parent};
            var shape = calculateXandYNode(node);
            shapes[generatedNodeId] = shape;
        }
        moveNodesInsideRep();
        clickedNode = monosaccharide;
        displayTree();
        updateMenu();
        redrawProgress(progress, 0);
        progress = 0;
        return generatedNodeId;
    }
}

function getNodeParent(node)
{
    for (var e of sugar.graph.edges())
    {
        if (e.target == node.id)
        {
            return e.sourceNode;
        }
    }
}

/**
 * Function called to create a new substituent in the sugar
 * @param linkCarbon The link carbon value
 */
function createNewSubstituent (linkCarbon) {
    if (infosTable[1] == "Substituent")
        var subName = infosTable[2];
    else
        var subName = infosTable[1]; // Get the label of the substituent
    var subType = sb.SubstituentType[subName]; // Get the SubstituentType
    var generatedSubId = randomString(7); // Random id for Substituent
    var newSubstituent = new sb.Substituent(generatedSubId, subType); // Create a new substituent

    // Try if we can bind them together
    var newType = getMono(this.clickedNode.monosaccharideType.name + sb.SubstituentType[subName].label);
    if (newType && sb.SubstituentsPositions[newType.name].position == linkCarbon) {
        updateNodeType(this.clickedNode, newType);
    }
    else
    {
        var linkedCarbon = getLinkedCarbonWithSelection(linkCarbon); // Get the linkedCarbon value
        var generatedEdgeSubId = randomString(7); // Random id for edge
        // Create the linkage
        var subLinkage = new sb.SubstituentLinkage(generatedEdgeSubId, clickedNode, newSubstituent, linkedCarbon);
        sugar.addSubstituent(newSubstituent, subLinkage); // Add the substituent to the sugar, with the linkag;
        updateTreeVisualization(subLinkage);
    }
    displayTree();
    updateMenu();
    return generatedSubId;
}

function getMono(name)
{
    switch (name)
    {
        case "KdnNAc":
            return sb.MonosaccharideType.Neu5Ac;
        case "KdnNGc":
            return sb.MonosaccharideType.Neu5Gc;
        case "KdnN":
            return sb.MonosaccharideType.Neu;
    }
    return sb.MonosaccharideType[name];
}

function updateNodeType(node, type)
{
    for (var sugarNode of this.sugar.graph.nodes())
    {
        if (node === sugarNode)
        {
            sugarNode.monosaccharideType = type;
        }
    }
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
    displayTree();
}

function generateShapes()
{
    for (var mono of sugar.graph.nodes())
    {
        var link;
        for (var edge of sugar.graph.edges())
        {
            if (edge.target == mono.id)
            {
                link = edge;
            }
        }
        if (shapes.length === 0) { // If tree is empty, instantiate the sugar with the monosaccharide as the root
            var node = {"node":mono};
            var shape = calculateXandYNode(node);
            shapes[node.node.id] = shape;
            var rootShape = [origin[0],origin[1]+gap];
            shapes["root"] = rootShape;
            rootLinkedCarbon = sb.LinkedCarbon.UNDEFINED;
            rootAnomerCarbon = sb.AnomerCarbon.ONE;
            updateTreeVisualization(); // Update visualization in the svg
        } else {
            if (link instanceof sb.GlycosidicLinkage) {
                updateTreeVisualization(link);
                var node = {"node":mono};
                var shape = calculateXandYNode(node);
                shapes[node.node.id] = shape;
            }
            else
            {
                updateTreeVisualization(link);
            }
        }
    }
}
