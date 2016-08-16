/**
 * Created by Nicolas Hory on 04/08/16.
 */

/**
 * Add hover manager for all three informations asked: anomericity, isomer and ring type
 */
function addHoverManagersInfos() {
    addHoverManagerAnomericity(); // Manager for the anomericity
    addHoverManagerIsomer(); // Manager for the isomer
    addHoverManagerRingType(); // Manager for the ring type
}

/**
 * Add hover manager for the carbon selections: linked and anomer
 */
function addHoverManagersCarbons() {
    addHoverManagerLinkedCarbon(); // Manager for the linked carbon
    addHoverManagerAnomerCarbon(); // Manager for the anomer carbon
}

/**
 * Manage the hover on the anomericity choice
 */
function addHoverManagerAnomericity() {
    var anomericityTitle = d3.select("#anomericityTitleChoice"); // Select the rect of anomericity title
    anomericityTitle.on("mouseover", function () { // Hover event
        var x = parseInt(d3.select("#anomericityTitleChoice").attr("x")); // Get the x of the anomericity title rect
        var width = d3.select("#anomericityTitleChoice").attr("width"); // Get the width of the anomericity title rect
        var idActions = ["anomericityAlphaChoice", "anomericityBetaChoice", "anomericityUnknownChoice"]; // Id's for the new rects
        var associatedValues = ["α", "β", "?"]; // Labels for each possible action
        d3.select("#anomericityTitleChoice").style("display", "none"); // Hide the anomericity title rect
        var anomericityLabels = d3.select("#labelsInfos"); // Get the labels rect
        var anomericityActions = d3.select("#actionsInfos"); // Get the actions rect
        // Loop three times (one for each possible action)
        for (var i = 0; i < 3; i++) {
            const k = i; // Put the current index in a const variable (to access it in events)
            anomericityActions.append("rect") // Append a new rect
                .attr("class", "bar choice choiceAnomericity") // Classes for choice styles
                .attr("id", idActions[k]) // Give the id from the table idActions
                .attr("width", width / 3) // 1/3 of the width of the anomericity title (cause three values possible for anomericity)
                .attr("height", 40) // Height, fixed to 40
                .attr("x", x + i*width/3) // Calculate the x in function of the index
                .attr("rx", 15) // Corners of the rect
                .attr("value", associatedValues[k]) // Associate the value to the rect
                .on("mouseout", function() { // Mouseout event
                    var newHovered = document.querySelectorAll(":hover"); // Get the hovered target information
                    var mouseTarget = d3.select(newHovered[newHovered.length -1]); // Most precise hovered target information
                    // If mouse not moving to another choice of anomericity, then we manage the event (to avoid having display on and off when moving between choices)
                    if (!mouseTarget.classed("choiceAnomericity")) {
                        manageMouseOutAnomericity();
                    }
                })
                .on("click", function () {
                    // Manage click anomericity choice
                    selectAnomericity(this.id);
                });
        }
        d3.select("#labelAnomericityTitle").style("display", "none"); // Hide the anomericity title label
        // Append a label for each possible value of anomericity (placement done in absolute pixels)
        anomericityLabels.append("text").attr("class", "label labelChoiceAnomericity").text("α").attr("x", x + 1000 / 18).attr("y", 8);
        anomericityLabels.append("text").attr("class", "label labelChoiceAnomericity").text("β").attr("x", x + 1000 / 6).attr("y", 8);
        anomericityLabels.append("text").attr("class", "label labelChoiceAnomericity").text("?").attr("x", x + 5000 / 18).attr("y", 8);
    });
}

/**
 * Select an anomericity
 * @param target
 */
function selectAnomericity(target) {
    var clicked = d3.select("#"+target); // Select the target of the click
    if (clicked.classed("selectedAnomericity")) { // If it was already selected
        clicked.classed("selectedAnomericity", false); // Unselect and change color
        clicked.style("fill", "#cc0000");
    } else { // If it's a new selection
        var anomericityChoices = d3.selectAll(".choiceAnomericity")[0];
        // Unselect all anomericity choices
        for (var choice of anomericityChoices) {
            var current = d3.select("#" + choice.id);
            if (current.classed("selectedAnomericity")) {
                current.classed("selectedAnomericity", false);
                current.style("fill", "#cc0000");
            }
        }
        // Select the clicked one
        d3.select("#" + target).style("fill", "#990000").classed("selectedAnomericity", true);
        checkSelectedAllInfos(); // Check if the three informations (anomericity, isomer and ring type) have been selected
    }
}

/**
 * Manage mouse out for anomericity choices
 */
function manageMouseOutAnomericity() {
    var anomericityChoices = d3.selectAll(".choiceAnomericity")[0]; // Get the three choices
    var selected = false;
    // Check if one anomericity is selected
    for (var choice of anomericityChoices) {
        if ((d3.select("#" +choice.id)).classed("selectedAnomericity")) {
            selected = true;
        }
    }
    if(!selected) { // If there is not any selected anomericity choice
        d3.selectAll(".choiceAnomericity").remove(); // Remove all choice rects
        d3.selectAll(".labelChoiceAnomericity").remove(); // Remove all labels
        d3.select("#anomericityTitleChoice").style("display", "block"); // Display the anomericity title rect
        d3.select("#labelAnomericityTitle").style("display", "block"); // Display the anomericity title label
    }
}


/**
 * Function called on hover on add node menu. Split the rectangle in the two sub options (Sub or Mono)
 * @param actions The actions group of the svgMenu
 * @param menuItem The current menu item
 */
function manageHoverAddNode(menuItem,actions) {
    var x = d3.select("#svgMenu").select("#addNode").attr("x"); // Get the x attribute of the add Node rect
    d3.select("#svgMenu").select("#addNode").remove(); // Remove the add Node rect
    d3.select("#addStructure").style("opacity", "0.2"); // Lower opacity of add Structure
    d3.select("#updateNode").style("opacity", "0.2"); // Lower opacity of update Node

    // Add Monosaccharide rect and label
    actions.append("rect")
        .attr("class", "bar choice")
        .attr("id", menuItem.subDivisions[1].division)
        .attr("width", 1000/6) // Width is 1/6 of the total menu width
        .attr("height", 40) // Height is the same as the menu one
        .attr("x", x) // Place this rect at the same x as the addNode title
        .attr("rx", 15) // Corners for the rect
        .attr("ry", 15) // Corners for the rect
        .on("mouseout", function() { //Mouseout event
            // Check if moving to substituent node rect, if not then update menu
            var newHovered = document.querySelectorAll(":hover");
            var mouseTarget = d3.select(newHovered[newHovered.length -1]);
            if (mouseTarget.attr("id") != "substituentNode") {
                updateMenu();
                d3.select("#addStructure").style("opacity", "1");
                d3.select("#updateNode").style("opacity", "1");
            }
        }).on("click", function () { // On click, simply update menu and push information to infosTable
            infosTable.push(menuItem.division);
            infosTable.push(menuItem.subDivisions[1].display_division);
            updateMenu(menuItem.subDivisions[1].division);
        });

    // Add Substituent rect and label, same treatment as for monosaccharide
    actions.append("rect")
        .attr("class", "bar choice")
        .attr("id", menuItem.subDivisions[0].division)
        .attr("width", 1000/6).attr("height", 40)
        .attr("x", 1000/6)
        .attr("rx", 15)
        .attr("ry", 15)
        .on("mouseout", function() {
            if(d3.select("#svgMenu").style("display") != "none") {
                var newHovered = document.querySelectorAll(":hover");
                var mouseTarget = d3.select(newHovered[newHovered.length - 1]);
                if (mouseTarget.attr("id") != "monosaccharideNode") {
                    updateMenu();
                    d3.select("#addStructure").style("opacity", "1");
                    d3.select("#updateNode").style("opacity", "1");
                }
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
            d3.select("#svgMenu").style("display", "none"); // Hide the menu
            d3.select("#svgSubstituents").transition().style("display", "block"); // Display substituents menu
        });
}

/**
 * Manage the hover on the isomer choice
 */
function addHoverManagerIsomer() {
    var isomerTitle = d3.select("#isomerTitleChoice"); // Get the title rect
    isomerTitle.on("mouseover", function () { // Mouseover event
        var x = parseInt(d3.select("#isomerTitleChoice").attr("x")); // Get the x of the title rect
        var width = d3.select("#isomerTitleChoice").attr("width"); // Get the width of the title rect
        var idActions = ["isomerDChoice", "isomerLChoice", "isomerUnknownChoice"]; // Id's for choices
        var associatedValues = ["D", "L", "?"]; // Values for each choice
        d3.select("#isomerTitleChoice").style("display", "none"); // Hide the title rect
        var isomerLabels = d3.select("#labelsInfos"); // Labels for isomer choice
        var isomerActions = d3.select("#actionsInfos"); // Rects for isomer choice
        // Loop on the three values
        for (var i = 0; i < 3; i++) {
            const k = i;
            isomerActions.append("rect")
                .attr("class", "bar choice choiceIsomer")
                .attr("id", idActions[k])
                .attr("width", width / 3) // 1/3 of the title width
                .attr("height", 40) // Fixed height
                .attr("x", x + i*width/3) // Calculate the current x
                .attr("rx", 15) // Corners of the rect
                .attr("value", associatedValues[k])
                .on("mouseout", function() {
                    var newHovered = document.querySelectorAll(":hover");
                    var mouseTarget = d3.select(newHovered[newHovered.length -1]);
                    // If we are not moving to another choice of isomer, then we manage the event
                    if (!mouseTarget.classed("choiceIsomer")) {
                        manageMouseOutIsomer();
                    }
                })
                .on("click", function () {
                    // Manage click
                    selectIsomer(this.id);
                });
        }
        d3.select("#labelIsomerTitle").style("display", "none");
        isomerLabels.append("text").attr("class", "label labelChoiceIsomer").text("D").attr("x", x + 1000 / 18).attr("y", 8);
        isomerLabels.append("text").attr("class", "label labelChoiceIsomer").text("L").attr("x", x + 1000 / 6).attr("y", 8);
        isomerLabels.append("text").attr("class", "label labelChoiceIsomer").text("?").attr("x", x + 5000/18).attr("y", 8);
    });
}

/**
 * Manage mouse out for isomer choices
 */
function manageMouseOutIsomer() {
    var anomericityChoices = d3.selectAll(".choiceIsomer")[0]; // Get all the isomer choices
    var selected = false;
    // Check if one is selected
    for (var choice of anomericityChoices) {
        if ((d3.select("#" +choice.id)).classed("selectedIsomer")) {
            selected = true;
        }
    }
    // If not any is selected, remove al lthe choice labels and rects, and display title rect and label
    if(!selected) {
        d3.selectAll(".choiceIsomer").remove();
        d3.selectAll(".labelChoiceIsomer").remove();
        d3.select("#isomerTitleChoice").style("display", "block");
        d3.select("#labelIsomerTitle").style("display", "block");
    }
}

/**
 * Select an isomer value
 * @param target
 */
function selectIsomer(target) {
    var clicked = d3.select("#"+target); // Get the selected isomer choice
    // If it was already selected, unselect and change color
    if (clicked.classed("selectedIsomer")) {
        clicked.classed("selectedIsomer", false);
        clicked.style("fill", "#cc0000");
    } else {
        // If was not selected, unselect all the other isomer choices, and adapt color
        var isomerChoices = d3.selectAll(".choiceIsomer")[0];
        for (var choice of isomerChoices) {
            var current = d3.select("#" + choice.id);
            if (current.classed("selectedIsomer")) {
                current.classed("selectedIsomer", false);
                current.style("fill", "#cc0000");
            }
        }
        d3.select("#" + target).style("fill", "#990000").classed("selectedIsomer", true); // Add class and change color
        checkSelectedAllInfos(); // Check if the three infos have been selected
    }
}

/**
 * Manage the hover on the isomer choice
 */
function addHoverManagerRingType() {
    var ringTypeTitle = d3.select("#ringTypeTitleChoice"); // Get the ring type title
    ringTypeTitle.on("mouseover", function () { // Mouseover event
        var x = parseInt(d3.select("#ringTypeTitleChoice").attr("x")); // Get the x of the ring type title rect
        var width = d3.select("#ringTypeTitleChoice").attr("width"); // Get the width of the ring type title rect
        var idActions = ["ringTypePChoice", "ringTypeFChoice", "ringTypeUnknownChoice"]; // Id's for the choices
        var associatedValues = ["P", "F", "?"]; // Values for each choice
        d3.select("#ringTypeTitleChoice").style("display", "none"); // Hide the title rect
        var ringTypeLabels = d3.select("#labelsInfos"); // Labels for ring types
        var ringTypeActions = d3.select("#actionsInfos"); // Rects for ring types
        // Loop on each ring type value
        for (var i = 0; i < 3; i++) {
            const k = i;
            ringTypeActions.append("rect")
                .attr("class", "bar choice choiceRingType")
                .attr("id", idActions[k])
                .attr("width", width / 3) // 1/3 of the title width
                .attr("height", 40) // Fixed height
                .attr("x", x + i*width/3) // Calculate the x
                .attr("rx", 15) // Corners of the rect
                .attr("value", associatedValues[k])
                .on("mouseout", function() {
                    var newHovered = document.querySelectorAll(":hover");
                    var mouseTarget = d3.select(newHovered[newHovered.length -1]);
                    // If we are not moving to another choice of ring type, then we manage the event
                    if (!mouseTarget.classed("choiceRingType")) {
                        manageMouseOutRingType();
                    }
                })
                .on("click", function () {
                    // Manage click
                    selectRingType(this.id);
                });
        }
        d3.select("#labelRingTypeTitle").style("display", "none"); // Hide the title label
        // Add the three labels for ring type choices
        ringTypeLabels.append("text").attr("class", "label labelChoiceRingType").text("P").attr("x", x + 1000 / 18).attr("y", 8);
        ringTypeLabels.append("text").attr("class", "label labelChoiceRingType").text("F").attr("x", x + 1000 / 6).attr("y", 8);
        ringTypeLabels.append("text").attr("class", "label labelChoiceRingType").text("?").attr("x", x + 5000/18).attr("y", 8);
    });
}

/**
 * Manage mouse out for ring type choices
 */
function manageMouseOutRingType() {
    var ringTypeChoices = d3.selectAll(".choiceRingType")[0]; // Get all the ring type choices
    var selected = false;
    // Check if one is selected
    for (var choice of ringTypeChoices) {
        if ((d3.select("#" +choice.id)).classed("selectedRingType")) {
            selected = true;
        }
    }

    // If no ring type selected, remove all choice rects and labels, and display title rect and label
    if(!selected) {
        d3.selectAll(".choiceRingType").remove();
        d3.selectAll(".labelChoiceRingType").remove();
        d3.select("#ringTypeTitleChoice").style("display", "block");
        d3.select("#labelRingTypeTitle").style("display", "block");
    }
}

/**
 * Select a ring type
 * @param target
 */
function selectRingType(target) {
    var clicked = d3.select("#"+target); // Get the selected choice
    // If already selected, unselect and change color
    if (clicked.classed("selectedRingType")) {
        clicked.classed("selectedRingType", false);
        clicked.style("fill", "#cc0000");
    } else {
        // If not selected, unselect all the other ring type choices, and adapt colors
        var ringTypeChoices = d3.selectAll(".choiceRingType")[0];
        for (var choice of ringTypeChoices) {
            var current = d3.select("#" + choice.id);
            if (current.classed("selectedRingType")) {
                current.classed("selectedRingType", false);
                current.style("fill", "#cc0000");
            }
        }
        d3.select("#" + target).style("fill", "#990000").classed("selectedRingType", true); // Add selected class and change color
        checkSelectedAllInfos(); // Check if the three informations have been selected
    }
}

/**
 * Checks that the user selected the three informations, and changes menu if he did
 */
function checkSelectedAllInfos() {
    var selectedAnomericity = (d3.selectAll(".selectedAnomericity")[0].length != 0); //boolean checking if anomericity selected
    var selectedIsomer = (d3.selectAll(".selectedIsomer")[0].length != 0); //boolean checking if isomer selected
    var selectedRingType = (d3.selectAll(".selectedRingType")[0].length != 0); //boolean checking if ring type selected
    if (selectedAnomericity && selectedIsomer && selectedRingType) { // If the three have been selected
        // Get the three informations
        var anomericity = d3.select(".selectedAnomericity").attr("value");
        var isomer = d3.select(".selectedIsomer").attr("value");
        var ringType = d3.select(".selectedRingType").attr("value");

        // Add the values in infosTable
        infosTable.push(anomericity);
        infosTable.push(isomer);
        infosTable.push(ringType);
        reinitializeDisplayInfos(); // Reinitialize display of the infos svg
        d3.select("#svgCarbons").transition().style("display", "block"); // Display the carbon choice svg
    }
}

/**
 * Reinitialize the display of infos title and remove all the choices
 */
function reinitializeDisplayInfos() {
    d3.select("#svgInfos").transition().style("display","none"); // Hide the svg of information
    // Display titles rects and labels for anomericity, isomer and ring type
    d3.select("#anomericityTitleChoice").style("display", "block");
    d3.select("#labelAnomericityTitle").style("display", "block");
    d3.select("#isomerTitleChoice").style("display", "block");
    d3.select("#labelIsomerTitle").style("display", "block");
    d3.select("#ringTypeTitleChoice").style("display", "block");
    d3.select("#labelRingTypeTitle").style("display", "block");

    // Remove all the choices rects and labels
    d3.selectAll(".choiceAnomericity").remove();
    d3.selectAll(".labelChoiceAnomericity").remove();
    d3.selectAll(".choiceIsomer").remove();
    d3.selectAll(".labelChoiceIsomer").remove();
    d3.selectAll(".choiceRingType").remove();
    d3.selectAll(".labelChoiceRingType").remove();
}

/**
 * Manage the hover on the linked carbon choice
 */
function addHoverManagerLinkedCarbon() {
    var linkedCarbonTitle = d3.select("#linkedCarbonTitleChoice"); // Linked carbon title
    linkedCarbonTitle.on("mouseover", function () { // Mouseover event
        var x = parseInt(d3.select("#linkedCarbonTitleChoice").attr("x")); // Get the x of the linked carbon title
        var width = d3.select("#linkedCarbonTitleChoice").attr("width"); // Get the width of the linked carbon title
        var idActions = ["linkedCarbon1Choice", "linkedCarbon2Choice", "linkedCarbon3Choice", "linkedCarbon4Choice", "linkedCarbon5Choice", "linkedCarbon6Choice", "linkedCarbonUnknownChoice"];
        var associatedValues = ["1", "2", "3", "4", "5", "6", "?"]; // Values for each choice
        d3.select("#linkedCarbonTitleChoice").style("display", "none"); // Hide the linked carbon title
        var linkedCarbonLabels = d3.select("#labelsCarbons"); // Linked carbons labels
        var linkedCarbonActions = d3.select("#actionsCarbons"); // Linked carbons actions
        for (var i = 0; i < 7; i++) {
            const k = i;
            linkedCarbonActions.append("rect")
                .attr("class", "bar choice choiceLinkedCarbon")
                .attr("id", idActions[k])
                .attr("width", width / 7) // 1/7 of the width of the title
                .attr("height", 40)
                .attr("x", x + i*width/7) // Calculate the x for each choice
                .attr("rx", 15) // Corners of the rect
                .attr("value", associatedValues[k]) // Get the value associated to the choice
                .attr("opacity", function() {
                    // Lower opacity of already used linked carbon values
                    var usedCarbons = checkUsedLinkedCarbons();
                    if (usedCarbons.indexOf(parseInt(associatedValues[k])) != -1) {
                        return 0.2;
                    } else {
                        return 1;
                    }
                })
                .on("mouseout", function() {
                    // If we dont move to another choice of linked carbon, manage the mouseout
                    var newHovered = document.querySelectorAll(":hover");
                    var mouseTarget = d3.select(newHovered[newHovered.length -1]);
                    if (!mouseTarget.classed("choiceLinkedCarbon")) {
                        manageMouseOutLinkedCarbon();
                    }
                })
                .on("click", function () {
                    // If we are not selecting an already used linked carbon value, manage the selection
                    var usedCarbons = checkUsedLinkedCarbons();
                    if (usedCarbons.indexOf(parseInt(associatedValues[k])) == -1) {
                        selectLinkedCarbon(this.id);
                    }
                });
        }
        // Hide the label of the title, and append all the labels for the choices (x in absolute)
        d3.select("#labelLinkedCarbonTitle").style("display", "none");
        linkedCarbonLabels.append("text").attr("class", "label labelChoiceLinkedCarbon").text("1").attr("x", x + 490 / 14).attr("y", 8);
        linkedCarbonLabels.append("text").attr("class", "label labelChoiceLinkedCarbon").text("2").attr("x", x + 1470 / 14).attr("y", 8);
        linkedCarbonLabels.append("text").attr("class", "label labelChoiceLinkedCarbon").text("3").attr("x", x + 2450 / 14).attr("y", 8);
        linkedCarbonLabels.append("text").attr("class", "label labelChoiceLinkedCarbon").text("4").attr("x", x + 3430 / 14).attr("y", 8);
        linkedCarbonLabels.append("text").attr("class", "label labelChoiceLinkedCarbon").text("5").attr("x", x + 4410 / 14).attr("y", 8);
        linkedCarbonLabels.append("text").attr("class", "label labelChoiceLinkedCarbon").text("6").attr("x", x + 5390 / 14).attr("y", 8);
        linkedCarbonLabels.append("text").attr("class", "label labelChoiceLinkedCarbon").text("?").attr("x", x + 6370/14).attr("y", 8);
    });
}

/**
 * Manage mouse out for linked carbon choices
 */
function manageMouseOutLinkedCarbon() {
    var linkedCarbonChoices = d3.selectAll(".choiceLinkedCarbon")[0]; // Get all the linked carbon choices
    var selected = false;
    // Check if one is selected
    for (var choice of linkedCarbonChoices) {
        if ((d3.select("#" +choice.id)).classed("selectedLinkedCarbon")) {
            selected = true;
        }
    }
    // If not any selected, removed all the choices and display title rect and label
    if(!selected) {
        d3.selectAll(".choiceLinkedCarbon").remove();
        d3.selectAll(".labelChoiceLinkedCarbon").remove();
        d3.select("#linkedCarbonTitleChoice").style("display", "block");
        d3.select("#labelLinkedCarbonTitle").style("display", "block");
    }
}

/**
 * Select a linked carbon
 * @param target
 */
function selectLinkedCarbon(target) {
    var clicked = d3.select("#"+target); // Get the target choice
    if (clicked.classed("selectedLinkedCarbon")) { // If already selected, unselect  and change color
        clicked.classed("selectedLinkedCarbon", false);
        clicked.style("fill", "#cc0000");
    } else {
        // If was not selected, unselect all the other choices and adapt color
        var linkedCarbonChoices = d3.selectAll(".choiceLinkedCarbon")[0];
        for (var choice of linkedCarbonChoices) {
            var current = d3.select("#" + choice.id);
            if (current.classed("selectedLinkedCarbon")) {
                current.classed("selectedLinkedCarbon", false);
                current.style("fill", "#cc0000");
            }
        }
        d3.select("#" + target).style("fill", "#990000").classed("selectedLinkedCarbon", true);
        checkSelectedAllCarbons(); // Check selected the two carbons values
    }
}


/**
 * Manage the hover on the anomer carbon choice
 * */
function addHoverManagerAnomerCarbon() {
    var anomerCarbonTitle = d3.select("#anomerCarbonTitleChoice"); // Get the anomer carbon title rect
    anomerCarbonTitle.on("mouseover", function () { // Mouseover event
        var x = parseInt(d3.select("#anomerCarbonTitleChoice").attr("x")); // Get the x of the title
        var width = d3.select("#anomerCarbonTitleChoice").attr("width"); // Get the width of the title
        var idActions = ["anomerCarbon1Choice", "anomerCarbon2Choice", "anomerCarbon3Choice", "anomerCarbon4Choice", "anomerCarbon5Choice", "anomerCarbon6Choice", "anomerCarbonUnknownChoice"];
        var associatedValues = ["1", "2", "3", "4", "5", "6", "?"]; // Values for each choice
        d3.select("#anomerCarbonTitleChoice").style("display", "none"); // Hide the anomer carbon title
        var anomerCarbonLabels = d3.select("#labelsCarbons"); // Labels for anomer carbons choices
        var anomerCarbonActions = d3.select("#actionsCarbons"); // Rects for anomer carbons choices
        // Loop for each value
        for (var i = 0; i < 7; i++) {
            const k = i;
            anomerCarbonActions.append("rect")
                .attr("class", "bar choice choiceAnomerCarbon")
                .attr("id", idActions[k])
                .attr("width", width / 7)
                .attr("height", 40)
                .attr("x", x + i*width/7)
                .attr("rx", 15)
                .attr("value", associatedValues[k])
                .on("mouseout", function() {
                    var newHovered = document.querySelectorAll(":hover");
                    var mouseTarget = d3.select(newHovered[newHovered.length -1]);
                    // If not moving to another anomer choice, manage the event
                    if (!mouseTarget.classed("choiceAnomerCarbon")) {
                        manageMouseOutAnomerCarbon();
                    }
                })
                .on("click", function () {
                    selectAnomerCarbon(this.id);
                });
        }
        // Hide the label of the title, and append all the labels for the choices (x in absolute)
        d3.select("#labelAnomerCarbonTitle").style("display", "none");
        anomerCarbonLabels.append("text").attr("class", "label labelChoiceAnomerCarbon").text("1").attr("x", x + 490 / 14).attr("y", 8);
        anomerCarbonLabels.append("text").attr("class", "label labelChoiceAnomerCarbon").text("2").attr("x", x + 1470 / 14).attr("y", 8);
        anomerCarbonLabels.append("text").attr("class", "label labelChoiceAnomerCarbon").text("3").attr("x", x + 2450 / 14).attr("y", 8);
        anomerCarbonLabels.append("text").attr("class", "label labelChoiceAnomerCarbon").text("4").attr("x", x + 3430 / 14).attr("y", 8);
        anomerCarbonLabels.append("text").attr("class", "label labelChoiceAnomerCarbon").text("5").attr("x", x + 4410 / 14).attr("y", 8);
        anomerCarbonLabels.append("text").attr("class", "label labelChoiceAnomerCarbon").text("6").attr("x", x + 5390 / 14).attr("y", 8);
        anomerCarbonLabels.append("text").attr("class", "label labelChoiceAnomerCarbon").text("?").attr("x", x + 6370/14).attr("y", 8);
    });
}

/**
 * Manage mouse out for anomer carbon choices
 */
function manageMouseOutAnomerCarbon() {
    var anomerCarbonChoices = d3.selectAll(".choiceAnomerCarbon")[0]; // Get all the anomer carbon choices
    var selected = false;
    // Check if one is already selected
    for (var choice of anomerCarbonChoices) {
        if ((d3.select("#" +choice.id)).classed("selectedAnomerCarbon")) {
            selected = true;
        }
    }
    // If not any choice was selected, remove all the rects and labels and display title rect and label
    if(!selected) {
        d3.selectAll(".choiceAnomerCarbon").remove();
        d3.selectAll(".labelChoiceAnomerCarbon").remove();
        d3.select("#anomerCarbonTitleChoice").style("display", "block");
        d3.select("#labelAnomerCarbonTitle").style("display", "block");
    }
}

/**
 * Select an anomer carbon
 * @param target The clicked anomer carbon choice
 */
function selectAnomerCarbon(target) {
    var clicked = d3.select("#"+target); // Get the selected choice
    if (clicked.classed("selectedAnomerCarbon")) { // If it was selected, unselect it and change color
        clicked.classed("selectedAnomerCarbon", false);
        clicked.style("fill", "#cc0000");
    } else { // If it was not selected, unselect all other anomer choices, and adapt style
        var isomerChoices = d3.selectAll(".choiceAnomerCarbon")[0];
        for (var choice of isomerChoices) {
            var current = d3.select("#" + choice.id);
            if (current.classed("selectedAnomerCarbon")) {
                current.classed("selectedAnomerCarbon", false);
                current.style("fill", "#cc0000");
            }
        }
        d3.select("#" + target).style("fill", "#990000").classed("selectedAnomerCarbon", true); // Add the selected class and change color
        checkSelectedAllCarbons(); // Check if the two carbon values have been selected
    }
}

/**
 * Checks that the user selected the two carbon values informations, and changes menu if he did
 */
function checkSelectedAllCarbons() {
    var selectedLinkedCarbon = (d3.selectAll(".selectedLinkedCarbon")[0].length != 0); //boolean checking if linked carbon selected
    var selectedAnomerCarbon = (d3.selectAll(".selectedAnomerCarbon")[0].length != 0); //boolean checking if anomer carbon selected
    if (selectedLinkedCarbon && selectedAnomerCarbon) { // If both have been selected
        var linkedCarbon = d3.select(".selectedLinkedCarbon").attr("value"); // Linked Carbon value
        var anomerCarbon = d3.select(".selectedAnomerCarbon").attr("value"); // Anomer Carbon value
        infosTable.push(linkedCarbon); // Push the linked carbon to the infosTable
        infosTable.push(anomerCarbon); // Push the anomer carbon to the infosTable
        reinitializeDisplayCarbons(); // Reinitialize the display of carbons rects and labels
        var methodToCall = infosTable[0]; // Get the method which has to be called
        if (methodToCall == "addNode") {
            createNewNode(); // Manage add node
        } else if (methodToCall == "addStruct") {
            console.log("Need to add a structure"); // Manage add structure
        } else {
            updateExistingNode(); // Manage update of node
        }
    }
}

/**
 * Reinitialize the display of carbons title and remove all the choices
 */
function reinitializeDisplayCarbons() {
    d3.select("#svgCarbons").transition().style("display","none"); // Hide the carbon menu
    // Put back the titles rects and labels
    d3.select("#linkedCarbonTitleChoice").style("display", "block");
    d3.select("#labelLinkedCarbonTitle").style("display", "block");
    d3.select("#anomerCarbonTitleChoice").style("display", "block");
    d3.select("#labelAnomerCarbonTitle").style("display", "block");

    // Remove all choices rects and labels
    d3.selectAll(".choiceLinkedCarbon").remove();
    d3.selectAll(".labelChoiceLinkedCarbon").remove();
    d3.selectAll(".choiceAnomerCarbon").remove();
    d3.selectAll(".labelChoiceAnomerCarbon").remove();
}

/**
 * Checks the used linked carbon values of a node
 */
function checkUsedLinkedCarbons() {
    // If sugar not created yet, return empty array
    if (Object.keys(treeData).length === 0) {
        return [];
    } else {
        var usedCarbons = [];
        var edges = sugar.graph.edges();
        // For each edge, if the source is the clickedNode, we add the linked carbon value to the array
        for (var edge of edges) {
            if (edge.sourceNode == clickedNode) {
                usedCarbons.push(edge.linkedCarbon.value);
            }
        }
        return usedCarbons; // Return the final array
    }
}
