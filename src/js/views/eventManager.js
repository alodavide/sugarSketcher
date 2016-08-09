/**
 * Created by Nicolas Hory on 04/08/16.
 */

/**
 * Add hover manager for all three informations asked: anomericity, isomer and ring type
 */
function addHoverManagersInfos() {
    addHoverManagerAnomericity();
    addHoverManagerIsomer();
    addHoverManagerRingType();
}

/**
 * Add hover manager for the carbon selections: linked and anomer
 */
function addHoverManagersCarbons() {
    addHoverManagerLinkedCarbon();
    addHoverManagerAnomerCarbon();
}

/**
 * Manage the hover on the anomericity choice
 */
function addHoverManagerAnomericity() {
    var anomericityTitle = d3.select("#anomericityTitleChoice");
    anomericityTitle.on("mouseover", function (d) {
        var x = parseInt(d3.select("#anomericityTitleChoice").attr("x"));
        var width = d3.select("#anomericityTitleChoice").attr("width");
        var idActions = ["anomericityAlphaChoice", "anomericityBetaChoice", "anomericityUnknownChoice"];
        var associatedValues = ["α", "β", "?"];
        d3.select("#anomericityTitleChoice").style("display", "none");
        var anomericityLabels = d3.select("#labelsInfos");
        var anomericityActions = d3.select("#actionsInfos");
        for (var i = 0; i < 3; i++) {
            const k = i;
            anomericityActions.insert("rect", ":first-child")
                .attr("class", "bar choice choiceAnomericity")
                .attr("id", idActions[k])
                .attr("width", width / 3)
                .attr("height", 40)
                .attr("x", x + i*width/3)
                .attr("rx", 15)
                .attr("value", associatedValues[k])
                .on("mouseout", function() {
                    manageMouseOutAnomericity();
                })
                .on("click", function () {
                    // Manage click
                    selectAnomericity(this.id);
                });
        }
        d3.select("#labelAnomericityTitle").style("display", "none");
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
    var clicked = d3.select("#"+target);
    if (clicked.classed("selectedAnomericity")) {
        clicked.classed("selectedAnomericity", false);
        clicked.style("fill", "#bd75b3");
    } else {
        var anomericityChoices = d3.selectAll(".choiceAnomericity")[0];
        for (var choice of anomericityChoices) {
            var current = d3.select("#" + choice.id);
            if (current.classed("selectedAnomericity")) {
                current.classed("selectedAnomericity", false);
                current.style("fill", "#bd75b3");
            }
        }
        d3.select("#" + target).style("fill", "#783a70").classed("selectedAnomericity", true);
        checkSelectedAllInfos();
    }
}

/**
 * Manage mouse out for anomericity choices
 */
function manageMouseOutAnomericity() {
    var anomericityChoices = d3.selectAll(".choiceAnomericity")[0];
    var selected = false;
    for (var choice of anomericityChoices) {
        if ((d3.select("#" +choice.id)).classed("selectedAnomericity")) {
            selected = true;
        }
    }
    if(!selected) {
        d3.selectAll(".choiceAnomericity").remove();
        d3.selectAll(".labelChoiceAnomericity").remove();
        d3.select("#anomericityTitleChoice").style("display", "block");
        d3.select("#labelAnomericityTitle").style("display", "block");
    }
}


/**
 * Function called on hover on add node menu. Split the rectangle in the two sub options (Sub or Mono)
 * @param actions
 * @param menuItem
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
        .attr("ry", 15)
        .on("mouseout", function() {
            updateMenu();
        }).on("click", function () {
            infosTable.push(menuItem.division);
            infosTable.push(menuItem.subDivisions[1].display_division);
            updateMenu(menuItem.subDivisions[1].division);
        });
    // Add Substituent rect and label
    actions.insert("rect", ":first-child")
        .attr("class", "bar choice")
        .attr("id", menuItem.subDivisions[0].division)
        .attr("width", 1000/6).attr("height", 40)
        .attr("x", 1000/6)
        .attr("rx", 15)
        .attr("ry", 15)
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
            d3.select("#svgSubstituents").transition().style("display", "block");
        });
}

/**
 * Manage the hover on the isomer choice
 */
function addHoverManagerIsomer() {
    var isomerTitle = d3.select("#isomerTitleChoice");
    isomerTitle.on("mouseover", function () {
        var x = parseInt(d3.select("#isomerTitleChoice").attr("x"));
        var width = d3.select("#isomerTitleChoice").attr("width");
        var idActions = ["isomerDChoice", "isomerLChoice", "isomerUnknownChoice"];
        var associatedValues = ["D", "L", "?"];
        d3.select("#isomerTitleChoice").style("display", "none");
        var isomerLabels = d3.select("#labelsInfos");
        var isomerActions = d3.select("#actionsInfos");
        for (var i = 0; i < 3; i++) {
            const k = i;
            isomerActions.append("rect")
                .attr("class", "bar choice choiceIsomer")
                .attr("id", idActions[k])
                .attr("width", width / 3)
                .attr("height", 40)
                .attr("x", x + i*width/3)
                .attr("rx", 15)
                .attr("value", associatedValues[k])
                .on("mouseout", function() {
                    manageMouseOutIsomer();
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
    var anomericityChoices = d3.selectAll(".choiceIsomer")[0];
    var selected = false;
    for (var choice of anomericityChoices) {
        if ((d3.select("#" +choice.id)).classed("selectedIsomer")) {
            selected = true;
        }
    }
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
    var clicked = d3.select("#"+target);
    if (clicked.classed("selectedIsomer")) {
        clicked.classed("selectedIsomer", false);
        clicked.style("fill", "#bd75b3");
    } else {
        var isomerChoices = d3.selectAll(".choiceIsomer")[0];
        for (var choice of isomerChoices) {
            var current = d3.select("#" + choice.id);
            if (current.classed("selectedIsomer")) {
                current.classed("selectedIsomer", false);
                current.style("fill", "#bd75b3");
            }
        }
        d3.select("#" + target).style("fill", "#783a70").classed("selectedIsomer", true);
        checkSelectedAllInfos();
    }
}

/**
 * Manage the hover on the isomer choice
 */
function addHoverManagerRingType() {
    var ringTypeTitle = d3.select("#ringTypeTitleChoice");
    ringTypeTitle.on("mouseover", function (d) {
        var x = parseInt(d3.select("#ringTypeTitleChoice").attr("x"));
        var width = d3.select("#ringTypeTitleChoice").attr("width");
        var idActions = ["ringTypePChoice", "ringTypeFChoice", "ringTypeUnknownChoice"];
        var associatedValues = ["P", "F", "?"];
        d3.select("#ringTypeTitleChoice").style("display", "none");
        var ringTypeLabels = d3.select("#labelsInfos");
        var ringTypeActions = d3.select("#actionsInfos");
        for (var i = 0; i < 3; i++) {
            const k = i;
            ringTypeActions.append("rect")
                .attr("class", "bar choice choiceRingType")
                .attr("id", idActions[k])
                .attr("width", width / 3)
                .attr("height", 40)
                .attr("x", x + i*width/3)
                .attr("rx", 15)
                .attr("value", associatedValues[k])
                .on("mouseout", function() {
                    manageMouseOutRingType();
                })
                .on("click", function () {
                    // Manage click
                    selectRingType(this.id);
                });
        }
        d3.select("#labelRingTypeTitle").style("display", "none");
        ringTypeLabels.append("text").attr("class", "label labelChoiceRingType").text("P").attr("x", x + 1000 / 18).attr("y", 8);
        ringTypeLabels.append("text").attr("class", "label labelChoiceRingType").text("F").attr("x", x + 1000 / 6).attr("y", 8);
        ringTypeLabels.append("text").attr("class", "label labelChoiceRingType").text("?").attr("x", x + 5000/18).attr("y", 8);
    });
}

/**
 * Manage mouse out for ring type choices
 */
function manageMouseOutRingType() {
    var ringTypeChoices = d3.selectAll(".choiceRingType")[0];
    var selected = false;
    for (var choice of ringTypeChoices) {
        if ((d3.select("#" +choice.id)).classed("selectedRingType")) {
            selected = true;
        }
    }
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
    var clicked = d3.select("#"+target);
    if (clicked.classed("selectedRingType")) {
        clicked.classed("selectedRingType", false);
        clicked.style("fill", "#bd75b3");
    } else {
        var ringTypeChoices = d3.selectAll(".choiceRingType")[0];
        for (var choice of ringTypeChoices) {
            var current = d3.select("#" + choice.id);
            if (current.classed("selectedRingType")) {
                current.classed("selectedRingType", false);
                current.style("fill", "#bd75b3");
            }
        }
        d3.select("#" + target).style("fill", "#783a70").classed("selectedRingType", true);
        checkSelectedAllInfos();
    }
}

/**
 * Checks that the user selected the three informations, and changes menu if he did
 */
function checkSelectedAllInfos() {
    var selectedAnomericity = (d3.selectAll(".selectedAnomericity")[0].length != 0); //boolean checking if anomericity selected
    var selectedIsomer = (d3.selectAll(".selectedIsomer")[0].length != 0); //boolean checking if isomer selected
    var selectedRingType = (d3.selectAll(".selectedRingType")[0].length != 0); //boolean checking if ring type selected
    if (selectedAnomericity && selectedIsomer && selectedRingType) {
        var anomericity = d3.select(".selectedAnomericity").attr("value");
        var isomer = d3.select(".selectedIsomer").attr("value");
        var ringType = d3.select(".selectedRingType").attr("value");
        infosTable.push(anomericity);
        infosTable.push(isomer);
        infosTable.push(ringType);
        reinitializeDisplayInfos();
        d3.select("#svgCarbons").transition().style("display", "block");
    }
}

/**
 * Reinitialize the display of infos title and remove all the choices
 */
function reinitializeDisplayInfos() {
    d3.select("#svgInfos").transition().style("display","none");
    d3.select("#anomericityTitleChoice").style("display", "block");
    d3.select("#labelAnomericityTitle").style("display", "block");
    d3.select("#isomerTitleChoice").style("display", "block");
    d3.select("#labelIsomerTitle").style("display", "block");
    d3.select("#ringTypeTitleChoice").style("display", "block");
    d3.select("#labelRingTypeTitle").style("display", "block");
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
    var linkedCarbonTitle = d3.select("#linkedCarbonTitleChoice");
    linkedCarbonTitle.on("mouseover", function () {
        var x = parseInt(d3.select("#linkedCarbonTitleChoice").attr("x"));
        var width = d3.select("#linkedCarbonTitleChoice").attr("width");
        var idActions = ["linkedCarbon1Choice", "linkedCarbon2Choice", "linkedCarbon3Choice", "linkedCarbon4Choice", "linkedCarbon5Choice", "linkedCarbon6Choice", "linkedCarbonUnknownChoice"];
        var associatedValues = ["1", "2", "3", "4", "5", "6", "?"];
        d3.select("#linkedCarbonTitleChoice").style("display", "none");
        var linkedCarbonLabels = d3.select("#labelsCarbons");
        var linkedCarbonActions = d3.select("#actionsCarbons");
        for (var i = 0; i < 7; i++) {
            const k = i;
            linkedCarbonActions.append("rect")
                .attr("class", "bar choice choiceLinkedCarbon")
                .attr("id", idActions[k])
                .attr("width", width / 7)
                .attr("height", 40)
                .attr("x", x + i*width/7)
                .attr("rx", 15)
                .attr("value", associatedValues[k])
                .on("mouseout", function() {
                    manageMouseOutLinkedCarbon();
                })
                .on("click", function () {
                    selectLinkedCarbon(this.id);
                });
        }
        d3.select("#labelLinkedCarbonTitle").style("display", "none");
        linkedCarbonLabels.append("text").attr("class", "label labelChoiceLinkedCarbon").text("1").attr("x", x + 500 / 14).attr("y", 8);
        linkedCarbonLabels.append("text").attr("class", "label labelChoiceLinkedCarbon").text("2").attr("x", x + 1500 / 14).attr("y", 8);
        linkedCarbonLabels.append("text").attr("class", "label labelChoiceLinkedCarbon").text("3").attr("x", x + 2500 / 14).attr("y", 8);
        linkedCarbonLabels.append("text").attr("class", "label labelChoiceLinkedCarbon").text("4").attr("x", x + 3500 / 14).attr("y", 8);
        linkedCarbonLabels.append("text").attr("class", "label labelChoiceLinkedCarbon").text("5").attr("x", x + 4500 / 14).attr("y", 8);
        linkedCarbonLabels.append("text").attr("class", "label labelChoiceLinkedCarbon").text("6").attr("x", x + 5500 / 14).attr("y", 8);
        linkedCarbonLabels.append("text").attr("class", "label labelChoiceLinkedCarbon").text("?").attr("x", x + 6500/14).attr("y", 8);
    });
}

/**
 * Manage mouse out for linked carbon choices
 */
function manageMouseOutLinkedCarbon() {
    var linkedCarbonChoices = d3.selectAll(".choiceLinkedCarbon")[0];
    var selected = false;
    for (var choice of linkedCarbonChoices) {
        if ((d3.select("#" +choice.id)).classed("selectedLinkedCarbon")) {
            selected = true;
        }
    }
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
    var clicked = d3.select("#"+target);
    if (clicked.classed("selectedLinkedCarbon")) {
        clicked.classed("selectedLinkedCarbon", false);
        clicked.style("fill", "#bd75b3");
    } else {
        var linkedCarbonChoices = d3.selectAll(".choiceLinkedCarbon")[0];
        for (var choice of linkedCarbonChoices) {
            var current = d3.select("#" + choice.id);
            if (current.classed("selectedLinkedCarbon")) {
                current.classed("selectedLinkedCarbon", false);
                current.style("fill", "#bd75b3");
            }
        }
        d3.select("#" + target).style("fill", "#783a70").classed("selectedLinkedCarbon", true);
        checkSelectedAllCarbons();
    }
}


/**
 * Manage the hover on the anomer carbon choice
 * */
function addHoverManagerAnomerCarbon() {
    var anomerCarbonTitle = d3.select("#anomerCarbonTitleChoice");
    anomerCarbonTitle.on("mouseover", function () {
        var x = parseInt(d3.select("#anomerCarbonTitleChoice").attr("x"));
        var width = d3.select("#anomerCarbonTitleChoice").attr("width");
        var idActions = ["anomerCarbon1Choice", "anomerCarbon2Choice", "anomerCarbon3Choice", "anomerCarbon4Choice", "anomerCarbon5Choice", "anomerCarbon6Choice", "anomerCarbonUnknownChoice"];
        var associatedValues = ["1", "2", "3", "4", "5", "6", "?"];
        d3.select("#anomerCarbonTitleChoice").style("display", "none");
        var anomerCarbonLabels = d3.select("#labelsCarbons");
        var anomerCarbonActions = d3.select("#actionsCarbons");
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
                    manageMouseOutAnomerCarbon();
                })
                .on("click", function () {
                    selectAnomerCarbon(this.id);
                });
        }
        d3.select("#labelAnomerCarbonTitle").style("display", "none");
        anomerCarbonLabels.append("text").attr("class", "label labelChoiceAnomerCarbon").text("1").attr("x", x + 500 / 14).attr("y", 8);
        anomerCarbonLabels.append("text").attr("class", "label labelChoiceAnomerCarbon").text("2").attr("x", x + 1500 / 14).attr("y", 8);
        anomerCarbonLabels.append("text").attr("class", "label labelChoiceAnomerCarbon").text("3").attr("x", x + 2500 / 14).attr("y", 8);
        anomerCarbonLabels.append("text").attr("class", "label labelChoiceAnomerCarbon").text("4").attr("x", x + 3500 / 14).attr("y", 8);
        anomerCarbonLabels.append("text").attr("class", "label labelChoiceAnomerCarbon").text("5").attr("x", x + 4500 / 14).attr("y", 8);
        anomerCarbonLabels.append("text").attr("class", "label labelChoiceAnomerCarbon").text("6").attr("x", x + 5500 / 14).attr("y", 8);
        anomerCarbonLabels.append("text").attr("class", "label labelChoiceAnomerCarbon").text("?").attr("x", x + 6500/14).attr("y", 8);
    });
}

/**
 * Manage mouse out for anomer carbon choices
 */
function manageMouseOutAnomerCarbon() {
    var anomerCarbonChoices = d3.selectAll(".choiceAnomerCarbon")[0];
    var selected = false;
    for (var choice of anomerCarbonChoices) {
        if ((d3.select("#" +choice.id)).classed("selectedAnomerCarbon")) {
            selected = true;
        }
    }
    if(!selected) {
        d3.selectAll(".choiceAnomerCarbon").remove();
        d3.selectAll(".labelChoiceAnomerCarbon").remove();
        d3.select("#anomerCarbonTitleChoice").style("display", "block");
        d3.select("#labelAnomerCarbonTitle").style("display", "block");
    }
}

/**
 * Select an anomer carbon
 * @param target
 */
function selectAnomerCarbon(target) {
    var clicked = d3.select("#"+target);
    if (clicked.classed("selectedAnomerCarbon")) {
        clicked.classed("selectedAnomerCarbon", false);
        clicked.style("fill", "#bd75b3");
    } else {
        var isomerChoices = d3.selectAll(".choiceAnomerCarbon")[0];
        for (var choice of isomerChoices) {
            var current = d3.select("#" + choice.id);
            if (current.classed("selectedAnomerCarbon")) {
                current.classed("selectedAnomerCarbon", false);
                current.style("fill", "#bd75b3");
            }
        }
        d3.select("#" + target).style("fill", "#783a70").classed("selectedAnomerCarbon", true);
        checkSelectedAllCarbons();
    }
}

/**
 * Checks that the user selected the two carbon values informations, and changes menu if he did
 */
function checkSelectedAllCarbons() {
    var selectedLinkedCarbon = (d3.selectAll(".selectedLinkedCarbon")[0].length != 0); //boolean checking if linked carbon selected
    var selectedAnomerCarbon = (d3.selectAll(".selectedAnomerCarbon")[0].length != 0); //boolean checking if anomer carbon selected
    if (selectedLinkedCarbon && selectedAnomerCarbon) {
        var linkedCarbon = d3.select(".selectedLinkedCarbon").attr("value");
        var anomerCarbon = d3.select(".selectedAnomerCarbon").attr("value");
        infosTable.push(linkedCarbon);
        infosTable.push(anomerCarbon);
        reinitializeDisplayCarbons();
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
}

/**
 * Reinitialize the display of carbons title and remove all the choices
 */
function reinitializeDisplayCarbons() {
    d3.select("#svgCarbons").transition().style("display","none");
    d3.select("#linkedCarbonTitleChoice").style("display", "block");
    d3.select("#labelLinkedCarbonTitle").style("display", "block");
    d3.select("#anomerCarbonTitleChoice").style("display", "block");
    d3.select("#labelAnomerCarbonTitle").style("display", "block");
    d3.selectAll(".choiceLinkedCarbon").remove();
    d3.selectAll(".labelChoiceLinkedCarbon").remove();
    d3.selectAll(".choiceAnomerCarbon").remove();
    d3.selectAll(".labelChoiceAnomerCarbon").remove();
}
