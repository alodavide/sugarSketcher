/**
 * Created by Nicolas Hory on 04/08/16.
 */


var progress; // amount of progress for the green progress bar throughout the menus (out of 7)


/*
    Manage help button in informations svg
*/
var infosHelpButton = d3.select("#infosHelp");
infosHelpButton.on("click", function() {
    var svgInfos = d3.select("#svgInfos");
    svgInfos.style("height", "65px");
    $('#infosLabelHelp').fadeIn(400).delay(10000).fadeOut(400, function() {
        svgInfos.style("height", "40px");
    });
});

/*
    Manage help button in carbons svg
*/
var carbonsHelpButton = d3.select("#carbonsHelp");
carbonsHelpButton.on("click", function() {
    var svgCarbons = d3.select("#svgCarbons");
    svgCarbons.style("height", "65px");
    $('#carbonsLabelHelp').fadeIn(400).delay(10000).fadeOut(400, function() {
        svgCarbons.style("height", "40px");
    });
});

/**
 * Add hover manager for all three informations asked: anomericity, isomer and ring type
 */
function addHoverManagersInfos() {
    addHoverManagerAnomericity(); // Manager for the anomericity
    addHoverManagerAnomericity(true);
    addHoverManagerIsomer(); // Manager for the isomer
    addHoverManagerRingType(); // Manager for the ring type
}

/**
 * Add hover manager for the carbon selections: donor and acceptor
 */
function addHoverManagersCarbons() {
    addHoverManagerAcceptorPosition(); // Manager for the acceptor position
    addHoverManagerDonorPosition(); // Manager for the donor position
    addHoverManagerDonorPosition(true); // Manager for the donor position
}

/**
 * Manage the hover on the anomericity choice
 */
function addHoverManagerAnomericity(quick = false) {
    var choice;
    if (quick)
        choice = "quickAnomericityTitleChoice";
    else
        choice = "anomericityTitleChoice";
    var anomericityTitle = d3.select("#"+choice); // Select the rect of anomericity title
    anomericityTitle.on("mouseover", function () { // Hover event
        var x = parseInt(d3.select("#"+choice).attr("x")); // Get the x of the anomericity title rect
        var width = d3.select("#"+choice).attr("width"); // Get the width of the anomericity title rect
        var idActions = ["anomericityAlphaChoice", "anomericityBetaChoice", "anomericityUnknownChoice"]; // Id's for the new rects
        var associatedValues = ["α", "β", "?"]; // Labels for each possible action
        d3.select("#"+choice).style("display", "none"); // Hide the anomericity title rect
        if (quick)
        {
            var anomericityLabels = d3.select("#quickLabels"); // Get the labels rect
            var anomericityActions = d3.select("#quickActions"); // Get the actions rect
        }
        else {
            var anomericityLabels = d3.select("#labelsInfos"); // Get the labels rect
            var anomericityActions = d3.select("#actionsInfos"); // Get the actions rect
        }
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
                    if (mouseTarget != null && !mouseTarget.classed("choiceAnomericity")) {
                        manageMouseOutAnomericity(quick);
                    }
                })
                .on("click", function () {
                    // Manage click anomericity choice
                    selectAnomericity(this.id);
                });
        }
        if (quick)
            d3.select("#quickLabelAnomericityTitle").style("display", "none"); // Hide the anomericity title label
        else
            d3.select("#labelAnomericityTitle").style("display", "none"); // Hide the anomericity title label
        // Append a label for each possible value of anomericity (placement done in absolute pixels)
        if (quick)
        {
            anomericityLabels.append("text").attr("class", "label labelChoiceAnomericity").text("α").attr("x", x + 1000 / 12).attr("y", 8);
            anomericityLabels.append("text").attr("class", "label labelChoiceAnomericity").text("β").attr("x", x + 1000 / 4).attr("y", 8);
            anomericityLabels.append("text").attr("class", "label labelChoiceAnomericity").text("?").attr("x", x + 4930 / 12).attr("y", 8);
        }
        else
        {
            anomericityLabels.append("text").attr("class", "label labelChoiceAnomericity").text("α").attr("x", x + 1000 / 18).attr("y", 8);
            anomericityLabels.append("text").attr("class", "label labelChoiceAnomericity").text("β").attr("x", x + 1000 / 6).attr("y", 8);
            anomericityLabels.append("text").attr("class", "label labelChoiceAnomericity").text("?").attr("x", x + 5000 / 18).attr("y", 8);
        }
    });
}

/**
 * Select an anomericity
 * @param target
 */
function selectAnomericity(target) {
    var prev = progress;
    var clicked = d3.select("#"+target); // Select the target of the click
    if (clicked.classed("selectedAnomericity")) { // If it was already selected
        clicked.classed("selectedAnomericity", false); // Unselect and change color
        clicked.style("fill", "#cc0000");
        if (quickMode)
        {
            progress -= 2;
            redrawProgress(prev);
        }
        else
        {
            progress--;
            redrawProgress(prev);
        }
    } else { // If it's a new selection
        var anomericityChoices = d3.selectAll(".choiceAnomericity")[0];
        // Unselect all anomericity choices
        for (var choice of anomericityChoices) {
            var current = d3.select("#" + choice.id);
            if (current.classed("selectedAnomericity")) {
                if (quickMode)
                    progress -= 2;
                else
                    progress--;
                current.classed("selectedAnomericity", false);
                current.style("fill", "#cc0000");
            }
        }
        // Select the clicked one
        d3.select("#" + target).style("fill", "#000592").classed("selectedAnomericity", true);
        if (quickMode)
        {
            checkSelectedQuickInfo();
            progress += 2;
        }
        else
        {
            checkSelectedAllInfos();
            progress++;

        } // Check if the three informations (anomericity, isomer and ring type) have been selected
        redrawProgress(prev);
    }
}

/**
 * Manage mouse out for anomericity choices
 */
function manageMouseOutAnomericity(quick) {
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
        if (quick)
        {
            d3.select("#quickAnomericityTitleChoice").style("display", "block"); // Display the anomericity title rect
            d3.select("#quickLabelAnomericityTitle").style("display", "block"); // Display the anomericity title label
        }
        else
        {
            d3.select("#anomericityTitleChoice").style("display", "block"); // Display the anomericity title rect
            d3.select("#labelAnomericityTitle").style("display", "block"); // Display the anomericity title label
        }

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
    d3.select("#repeatUnit").style("opacity", "0.2"); // Lower opacity of add Structure
    d3.select("#updateNode").style("opacity", "0.2"); // Lower opacity of update Node
    d3.select("#help").style("opacity", "0.2"); // Lower opacity of update Node

    // Add Monosaccharide rect and label
    actions.append("rect")
        .attr("class", "bar choice")
        .attr("id", menuItem.subDivisions[1].division)
        .attr("width", 1000/8) // Width is 1/6 of the total menu width
        .attr("height", 40) // Height is the same as the menu one
        .attr("x", x) // Place this rect at the same x as the addNode title
        .attr("rx", 15) // Corners for the rect
        .attr("ry", 15) // Corners for the rect
        .on("mouseout", function() { //Mouseout event
            // Check if moving to substituent node rect, if not then update menu
            var newHovered = document.querySelectorAll(":hover");
            var mouseTarget = d3.select(newHovered[newHovered.length -1]);
            if (mouseTarget != null && mouseTarget.attr("id") != "substituentNode") {
                updateMenu();
                d3.select("#repeatUnit").style("opacity", "1");
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
        .attr("width", 1000/8).attr("height", 40)
        .attr("x", 1000/8)
        .attr("rx", 15)
        .attr("ry", 15)
        .on("mouseout", function() {
            if(d3.select("#svgMenu").style("display") != "none") {
                var newHovered = document.querySelectorAll(":hover");
                var mouseTarget = d3.select(newHovered[newHovered.length - 1]);
                if (mouseTarget != null && mouseTarget.attr("id") != "monosaccharideNode") {
                    updateMenu();
                    d3.select("#repeatUnit").style("opacity", "1");
                    d3.select("#updateNode").style("opacity", "1");
                }
            }
        })
        .on("click", function () {
            infosTable.push(menuItem.division);
            infosTable.push(menuItem.subDivisions[0].display_division);
            // If root has not been set yet, then display an error popup
            if (Object.keys(treeData).length === 0) {
                var svgMenu = d3.select("#svgMenu");
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
                    .text("Cannot have a substituent as a root. Add a Monosaccharide first.");
                    $('#menuSubError').fadeIn(400).delay(10000).fadeOut(400, function() {
                        svgMenu.style("height", "40px");
                        svgMenu.select("#menuSubError").remove();
                        svgMenu.select("#menuSubErrorRect").remove();
                });
                return;
            }
            d3.select("#svgMenu").style("display", "none"); // Hide the menu
            d3.select("#svgSubstituents").transition().style("display", "block"); // Display substituents menu
        });
}

function manageHoverIO(menuItem,actions)
{
    var x = parseInt(d3.select("#svgMenu2").select("#io").attr("x")); // Get the x attribute of the title
    var y = parseInt(d3.select("#svgMenu2").select("#io").attr("y")); // Get the y attribute of the title
    d3.select("#svgMenu2").select("#io").remove();
    d3.select("#addStructure").style("opacity", "0.2"); // Lower opacity of add Structure
    d3.select("#quickMode").style("opacity", "0.2"); // Lower opacity of update Node

    // Export
    actions.append("rect")
        .attr("class", "bar choice")
        .attr("id", menuItem.subDivisions[0].division)
        .attr("width", 1000/8) // Width is 1/6 of the total menu width
        .attr("height", 40) // Height is the same as the menu one
        .attr("x", x)
        .attr("y", y)
        .attr("rx", 15) // Corners for the rect
        .attr("ry", 15) // Corners for the rect
        .on("mouseout", function() { //Mouseout event
            // Check if moving to substituent node rect, if not then update menu
            var newHovered = document.querySelectorAll(":hover");
            var mouseTarget = d3.select(newHovered[newHovered.length -1]);
            if (mouseTarget != null && mouseTarget.attr("id") != "typeFormula") {
                updateMenu();
                d3.select("#addStructure").style("opacity", "1");
                d3.select("#quickMode").style("opacity", "1");
            }
        }).on("click", function () {
            d3.select("#exportImage").style("display", "block").on("click", function() {
                exporting = true;
                displayTree();
                var exporter = new sb.ImageExporter();
                var img = exporter.save();
                exporter.download(img);
                exporting = false;
                displayTree();
            });
            d3.select("#formula").style("display","block");
            d3.select("#validateFormula").style("display", "none");
            d3.select("#structuresDiv").style("display", "none");
            var writer = new sb.GlycoCTWriter(glycan, treeData);
            $('#formula').val(writer.exportGlycoCT());
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

    // Import
    actions.append("rect")
        .attr("class", "bar choice")
        .attr("id", menuItem.subDivisions[1].division)
        .attr("width", 1000/8) // Width is 1/6 of the total menu width
        .attr("height", 40) // Height is the same as the menu one
        .attr("x", x+1000/8) // Place this rect at the same x as the addNode title
        .attr("y", y)
        .attr("rx", 15) // Corners for the rect
        .attr("ry", 15) // Corners for the rect
        .on("mouseout", function() { //Mouseout event
            // Check if moving to substituent node rect, if not then update menu
            var newHovered = document.querySelectorAll(":hover");
            var mouseTarget = d3.select(newHovered[newHovered.length -1]);
            if (mouseTarget != null && mouseTarget.attr("id") != "exportFormula") {
                updateMenu();
                d3.select("#addStructure").style("opacity", "1");
                d3.select("#quickMode").style("opacity", "1");
            }
        }).on("click", function () {
            d3.select("#formula").style("display","block");
            d3.select("#validateFormula").style("display", "block");
            d3.select("#structuresDiv").style("display", "none");
            d3.select("#exportImage").style("display", "none");
            $('#formula').val("");
            $('#formula').focus();
            d3.select("#copyMsg")
                .text("");
            d3.select("#validateFormula")
                .style("display", "block")
                .on('click', function() {
                    treeData = {};
                    selectedNodes = [];
                    if (glycan)
                        glycan.clear();
                    var parser = new sb.GlycoCTParser($('#formula').val());
                    glycan = parser.parseGlycoCT();
                    shapes = [];
                    generateShapes();
                    treeData = generateTree();
                    updateRepeatingUnitsNodesInTree();
                    var i = 1;
                    // Select the latest selectable node
                    while (glycan.graph.nodes()[glycan.graph.nodes().length-i] instanceof sb.Substituent)
                    {
                        i++;
                    }
                    clickedNode = glycan.graph.nodes()[glycan.graph.nodes().length-i];
                    displayTree();
                });
    });
}

/**
 * Creates a tree from the Glycan
 * Called after using the parser, which only returns a Glycan
 * @returns {Array}
 */
function generateTree() {
    // Put parentId in each node
    var nodes = glycan.graph.nodes();
    for (var nodePos in nodes)
    {
        var parent;
        for (var edge of glycan.graph.edges())
        {
            if (edge.target == nodes[nodePos].id)
            {
                parent = edge.sourceNode;
            }
        }
        if (parent !== undefined)
            nodes[nodePos] = {"node":nodes[nodePos],"parentId":parent.id,"children":[]};
        else
            nodes[nodePos] = {"node":nodes[nodePos],"children":[]};
    }

    // Switch to tree view
    var map = {}, node, roots = [];
    var parentsIds = {};
    var nodesDepths = {};
    for (var i = 0; i < nodes.length; i += 1) {
        node = nodes[i];
        node.children = [];
        map[node.node.id] = i; // use map to look-up the parents
        if (node.parentId !== undefined) {
            nodes[map[node.parentId]].children.push(node);
            parentsIds[node.node.id] = node;
            if (node.node.id !== node.parentId)
                nodes[map[node.parentId]].parent = parentsIds[node.parentId];

            if (nodesDepths[node.node.id] === undefined)
            {
                nodes[map[node.parentId]].depth = nodesDepths[node.parentId]+1;
                nodesDepths[node.node.id] = nodesDepths[node.parentId]+1;
            }

            delete nodes[map[node.parentId]].parentId;
        } else {
            roots = node;
            parentsIds[node.node.id] = node;
            nodesDepths[node.node.id] = 0;
            roots.depth = 0;
        }
    }

    delete roots.parent;

    return roots;

}

/**
 * After using the parser, the RepeatingUnits don't carry all their needed information (the nodes they contain)
 * This function fills in the repeatingUnits
 */
function updateRepeatingUnitsNodesInTree()
{
    var repeatingUnits = [], node;
    for (node of glycan.graph.nodes()) // We gather all the Rep
    {
        if (node.repeatingUnit != undefined)
        {
            if (!repeatingUnits.includes(node.repeatingUnit))
            {
                repeatingUnits.push(node.repeatingUnit);
            }
        }
    }
    for (var rep of repeatingUnits) // For each one we gather all the nodes that have it
    {
        var nodes = [];
        for (node of glycan.graph.nodes())
        {
            if (node.repeatingUnit && node.repeatingUnit.id == rep.id)
            {
                nodes.push(findNodeInTree(treeData,node));
            }
        }
        rep.nodes = nodes;
    }
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
                .attr("rx", function() {
                    if (i == 1)
                    {
                        return 15; //
                    }
                    else {
                        return 15;
                    }
                }) // Corners of the rect
                .attr("value", associatedValues[k])
                .on("mouseout", function() {
                    var newHovered = document.querySelectorAll(":hover");
                    var mouseTarget = d3.select(newHovered[newHovered.length -1]);
                    // If we are not moving to another choice of isomer, then we manage the event
                    if (mouseTarget != null && !mouseTarget.classed("choiceIsomer")) {
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
    var prev = progress;
    var clicked = d3.select("#"+target); // Get the selected isomer choice
    // If it was already selected, unselect and change color
    if (clicked.classed("selectedIsomer")) {
        clicked.classed("selectedIsomer", false);
        clicked.style("fill", "#cc0000");
        progress--;
        redrawProgress(prev);
    } else {
        // If was not selected, unselect all the other isomer choices, and adapt color
        var isomerChoices = d3.selectAll(".choiceIsomer")[0];
        for (var choice of isomerChoices) {
            var current = d3.select("#" + choice.id);
            if (current.classed("selectedIsomer")) {
                progress--;
                current.classed("selectedIsomer", false);
                current.style("fill", "#cc0000");
            }
        }
        d3.select("#" + target).style("fill", "#000592").classed("selectedIsomer", true); // Add class and change color
        progress++;
        redrawProgress(prev);
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
                    if (mouseTarget != null && !mouseTarget.classed("choiceRingType")) {
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
    var prev = progress;
    var clicked = d3.select("#"+target); // Get the selected choice
    // If already selected, unselect and change color
    if (clicked.classed("selectedRingType")) {
        clicked.classed("selectedRingType", false);
        clicked.style("fill", "#cc0000");
        progress--;
        redrawProgress(prev);
    } else {
        // If not selected, unselect all the other ring type choices, and adapt colors
        var ringTypeChoices = d3.selectAll(".choiceRingType")[0];
        for (var choice of ringTypeChoices) {
            var current = d3.select("#" + choice.id);
            if (current.classed("selectedRingType")) {
                progress--;
                current.classed("selectedRingType", false);
                current.style("fill", "#cc0000");
            }
        }
        d3.select("#" + target).style("fill", "#000592").classed("selectedRingType", true); // Add selected class and change color
        progress++;
        redrawProgress(prev);
        checkSelectedAllInfos(); // Check if the three informations have been selected
    }
}

/**
 * Checks if the user selected Anomericity and Donor Position
 */
function checkSelectedQuickInfo() {
    var selectedAnomericity = (d3.selectAll(".selectedAnomericity")[0].length != 0); //boolean checking if anomericity selected
    var selectedDonorPosition = (d3.selectAll(".selectedDonorPosition")[0].length != 0); //boolean checking if donor position selected
    if (selectedAnomericity && selectedDonorPosition)
    {

        var anomericity = d3.select(".selectedAnomericity").attr("value");

        // Add the values in infosTable
        infosTable.push(anomericity);
        infosTable.push(quickIsomer);
        infosTable.push(quickRingType);

        var donorPosition = d3.select(".selectedDonorPosition").attr("value"); // Donor Position value

        infosTable.push(donorPosition); // Push the donor position to the infosTable
        infosTable.push(quickAcceptorPosition); // Push the acceptor position to the infosTable

        quickIsomer = "";
        quickRingType = "";
        quickAcceptorPosition = "";

        reinitializeQuickInfos();

        createNewNode();

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
        reinitializeDisplayCarbons();
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

    removeInfosChoices();
}

function removeInfosChoices()
{
    // Remove all the choices rects and labels
    d3.selectAll(".choiceAnomericity").remove();
    d3.selectAll(".labelChoiceAnomericity").remove();
    d3.selectAll(".choiceIsomer").remove();
    d3.selectAll(".labelChoiceIsomer").remove();
    d3.selectAll(".choiceRingType").remove();
    d3.selectAll(".labelChoiceRingType").remove();
}

function reinitializeQuickInfos() {
    d3.select("#svgQuickInfos").transition().style("display","none"); // Hide the svg of information
    d3.select("#quickAnomericityTitleChoice").style("display", "block");
    d3.select("#quickLabelAnomericityTitle").style("display", "block");
    d3.selectAll(".choiceAnomericity").remove();
    d3.selectAll(".labelChoiceAnomericity").remove();

    d3.select("#quickDonorPositionTitleChoice").style("display", "block");
    d3.select("#quickLabelDonorPositionTitle").style("display", "block");

    // Remove all choices rects and labels
    d3.selectAll(".choiceDonorPosition").remove();
    d3.selectAll(".labelChoiceDonorPosition").remove();
}

/**
 * Manage the hover on the donor position choice
 */
function addHoverManagerDonorPosition(quick = false) {
    var choice;
    if (quick)
        choice = "quickDonorPositionTitleChoice";
    else
        choice = "donorPositionTitleChoice";
    var donorPositionTitle = d3.select("#"+choice); // Donor position title
    donorPositionTitle.on("mouseover", function () { // Mouseover event
        var maxCarbons = getNumberCarbons(clickedNode);
        var x = parseInt(d3.select("#"+choice).attr("x")); // Get the x of the donor position title
        var width = d3.select("#"+choice).attr("width"); // Get the width of the donor position title
        var idActions = ["donorPositionUnknownChoice", "donorPosition1Choice", "donorPosition2Choice", "donorPosition3Choice", "donorPosition4Choice", "donorPosition5Choice", "donorPosition6Choice", "donorPosition7Choice", "donorPosition8Choice", "donorPosition9Choice"];
        var associatedValues = ["?", "1", "2", "3", "4", "5", "6", "7", "8", "9"]; // Values for each choice
        d3.select("#"+choice).style("display", "none"); // Hide the donor position title
        if (quick)
        {
            var donorPositionLabels = d3.select("#quickLabels"); // Donor positions labels
            var donorPositionActions = d3.select("#quickActions"); // Donor positions actions
        }
        else
        {
            var donorPositionLabels = d3.select("#labelsCarbons"); // Donor positions labels
            var donorPositionActions = d3.select("#actionsCarbons"); // Donor positions actions
        }
        for (var i = 0; i < maxCarbons+1; i++) {
            const k = i;
            donorPositionActions.append("rect")
                .attr("class", "bar choice choiceDonorPosition")
                .attr("id", idActions[k])
                .attr("width", width / (maxCarbons+1)) // 1/maxCarbons+1 the width of the title (number of carbons + "?")
                .attr("height", 40)
                .attr("x", x + i*width/ (maxCarbons+1)) // Calculate the x for each choice
                .attr("rx", 15) // Corners of the rect
                .attr("value", associatedValues[k]) // Get the value associated to the choice
                .attr("opacity", function(d) {
                    // Lower opacity of already used donor position values
                    var usedCarbons = checkUsedCarbons();
                    if (usedCarbons.indexOf(parseInt(k)) != -1) {
                        return 0.2;
                    } else {
                        return 1;
                    }
                })
                .on("mouseout", function() {
                    // If we dont move to another choice of donor position, manage the mouseout
                    var newHovered = document.querySelectorAll(":hover");
                    var mouseTarget = d3.select(newHovered[newHovered.length -1]);
                    if (mouseTarget != null && !mouseTarget.classed("choiceDonorPosition")) {
                        manageMouseOutDonorPosition(quick);
                    }
                })
                .on("click", function () {
                    // If we are not selecting an already used donor position value, manage the selection
                    var usedCarbons = checkUsedCarbons();
                    if (usedCarbons.indexOf(parseInt(associatedValues[k])) == -1) {
                        selectDonorPosition(this.id);
                    }
                });
        }
        // Hide the label of the title, and append all the labels for the choices (x in absolute)
        if (quick)
            d3.select("#quickLabelDonorPositionTitle").style("display", "none");
        else
            d3.select("#labelDonorPositionTitle").style("display", "none");
        var i = 1;
        donorPositionLabels.append("text").attr("class", "label labelChoiceDonorPosition").text("?").attr("x", x + (980 * i - 490) / (2*(maxCarbons+1))).attr("y", 8);
        while (i <= maxCarbons)
        {
            i++;
            donorPositionLabels.append("text").attr("class", "label labelChoiceDonorPosition").text(i-1).attr("x", x + (980 * i - 490) / (2*(maxCarbons+1))).attr("y", 8);
        }
    });
}

/**
 * Manage mouse out for donor position choices
 */
function manageMouseOutDonorPosition(quick) {
    var donorPositionChoices = d3.selectAll(".choiceDonorPosition")[0]; // Get all the donor position choices
    var selected = false;
    // Check if one is selected
    for (var choice of donorPositionChoices) {
        if ((d3.select("#" +choice.id)).classed("selectedDonorPosition")) {
            selected = true;
        }
    }
    // If not any selected, removed all the choices and display title rect and label
    if(!selected) {
        d3.selectAll(".choiceDonorPosition").remove();
        d3.selectAll(".labelChoiceDonorPosition").remove();
        if (quick)
        {
            d3.select("#quickDonorPositionTitleChoice").style("display", "block");
            d3.select("#quickLabelDonorPositionTitle").style("display", "block");
        }
        else
        {
            d3.select("#donorPositionTitleChoice").style("display", "block");
            d3.select("#labelDonorPositionTitle").style("display", "block");
        }
    }
}

/**
 * Select a donor position
 * @param target
 */
function selectDonorPosition(target) {
    var prev = progress;
    var clicked = d3.select("#"+target); // Get the target choice
    if (clicked.classed("selectedDonorPosition")) { // If already selected, unselect  and change color
        clicked.classed("selectedDonorPosition", false);
        clicked.style("fill", "#cc0000");
        if (quickMode)
        {
            progress -= 2;
            redrawProgress(prev);
        }
        else
        {
            progress--;
            redrawProgress(prev);
        }
    } else {
        // If was not selected, unselect all the other choices and adapt color
        var donorPositionChoices = d3.selectAll(".choiceDonorPosition")[0];
        for (var choice of donorPositionChoices) {
            var current = d3.select("#" + choice.id);
            if (current.classed("selectedDonorPosition")) {
                if (quickMode)
                    progress -= 2;
                else
                    progress--;
                current.classed("selectedDonorPosition", false);
                current.style("fill", "#cc0000");
            }
        }
        d3.select("#" + target).style("fill", "#000592").classed("selectedDonorPosition", true);
        if (quickMode)
        {
            progress += 2;
            redrawProgress(prev);
        }
        else
        {
            progress++;
            redrawProgress(prev);
        }
        if (quickMode)
            checkSelectedQuickInfo();
        else
            checkSelectedAllCarbons(); // Check selected the two carbons values
    }
}


/**
 * Returns the number of carbons the residue can be linked by
 */
function getNumberCarbons(node)
{
    if (node == undefined)
    {
        return 6;
    }
    var monoType = sb.MonosaccharideGlycoCT[node.monosaccharideType.name];
    if (monoType == undefined)
    {
        monoType = sb.MonosaccharideGlycoCT[node.monosaccharideType.name.substring(0,3)];
        if (monoType == undefined)
        {
            monoType = sb.MonosaccharideGlycoCT[node.monosaccharideType.name.substring(0,4)];
            if (monoType == undefined && node.monosaccharideType.name.substring(0,3) == "Neu")
            {
                monoType = sb.MonosaccharideGlycoCT.Kdn;
            }
        }
    }
    var glycoct = monoType.glycoct;
    if (glycoct.indexOf("PEN") != -1)
    {
        return 5;
    }
    else if (glycoct.indexOf("NON") != -1)
    {
        return 9;
    }
    else
    {
        return 6;
    }
}

/**
 * Manage the hover on the acceptor position choice
 * */
function addHoverManagerAcceptorPosition() {
    var acceptorPositionTitle = d3.select("#acceptorPositionTitleChoice"); // Get the acceptor position title rect
    acceptorPositionTitle.on("mouseover", function () { // Mouseover event
        var x = parseInt(d3.select("#acceptorPositionTitleChoice").attr("x")); // Get the x of the title
        var width = d3.select("#acceptorPositionTitleChoice").attr("width"); // Get the width of the title
        var idActions = ["acceptorPosition1Choice", "acceptorPosition2Choice", "acceptorPosition3Choice", "acceptorPositionUnknownChoice"];
        var associatedValues = ["1", "2", "3", "?"]; // Values for each choice
        d3.select("#acceptorPositionTitleChoice").style("display", "none"); // Hide the acceptor position title
        var acceptorPositionLabels = d3.select("#labelsCarbons"); // Labels for acceptor positions choices
        var acceptorPositionActions = d3.select("#actionsCarbons"); // Rects for acceptor positions choices
        // Loop for each value
        for (var i = 0; i < 4; i++) {
            const k = i;
            acceptorPositionActions.append("rect")
                .attr("class", "bar choice choiceAcceptorPosition")
                .attr("id", idActions[k])
                .attr("width", width / 4)
                .attr("height", 40)
                .attr("x", x + i*width/4)
                .attr("rx", 15)
                .attr("value", associatedValues[k])
                .attr("opacity", function() {
                    var i = 1;
                    if (infosTable[0] == "addNode")
                        i++;
                    var color = getColorCodeFromString(infosTable[i+1]);
                    var shape = infosTable[i];
                    var isBisected = (shape.indexOf("bisected") != -1); // Check if the shape is bisected
                    if (isBisected) {
                        shape = shape.split("bisected")[1]; // We update the value of the shape by removing keywork "bisected"
                    }
                    var newType = getMonoTypeWithColorAndShape(color, shape, isBisected);
                    if (!(sb.SubstituentsPositions[newType.name] && sb.SubstituentsPositions[newType.name].position == parseInt(associatedValues[k]))) {
                            return 1;
                    }
                    return 0.2;
                })
                .on("mouseout", function() {
                    var newHovered = document.querySelectorAll(":hover");
                    var mouseTarget = d3.select(newHovered[newHovered.length -1]);
                    // If not moving to another anomer choice, manage the event
                    if (mouseTarget != null && !mouseTarget.classed("choiceAcceptorPosition")) {
                        manageMouseOutAcceptorPosition();
                    }
                })
                .on("click", function () {
                    var i = 1;
                    if (infosTable[0] == "addNode")
                        i++;
                    var color = getColorCodeFromString(infosTable[i+1]);
                    var shape = infosTable[i];
                    var isBisected = (shape.indexOf("bisected") != -1); // Check if the shape is bisected
                    if (isBisected) {
                        shape = shape.split("bisected")[1]; // We update the value of the shape by removing keywork "bisected"
                    }
                    var newType = getMonoTypeWithColorAndShape(color, shape, isBisected);
                    if (!(sb.SubstituentsPositions[newType.name] && sb.SubstituentsPositions[newType.name].position == parseInt(associatedValues[k]))) {
                        selectAcceptorPosition(this.id);
                    }
                });
        }
        // Hide the label of the title, and append all the labels for the choices (x in absolute)
        d3.select("#labelAcceptorPositionTitle").style("display", "none");
        acceptorPositionLabels.append("text").attr("class", "label labelChoiceAcceptorPosition").text("1").attr("x", x + 490 / 8).attr("y", 8);
        acceptorPositionLabels.append("text").attr("class", "label labelChoiceAcceptorPosition").text("2").attr("x", x + 1470 / 8).attr("y", 8);
        acceptorPositionLabels.append("text").attr("class", "label labelChoiceAcceptorPosition").text("3").attr("x", x + 2450 / 8).attr("y", 8);
        acceptorPositionLabels.append("text").attr("class", "label labelChoiceAcceptorPosition").text("?").attr("x", x + 3430 / 8).attr("y", 8);
    });
}

/**
 * Manage mouse out for acceptor position choices
 */
function manageMouseOutAcceptorPosition() {
    var acceptorPositionChoices = d3.selectAll(".choiceAcceptorPosition")[0]; // Get all the acceptor position choices
    var selected = false;
    // Check if one is already selected
    for (var choice of acceptorPositionChoices) {
        if ((d3.select("#" +choice.id)).classed("selectedAcceptorPosition")) {
            selected = true;
        }
    }
    // If not any choice was selected, remove all the rects and labels and display title rect and label
    if(!selected) {
        d3.selectAll(".choiceAcceptorPosition").remove();
        d3.selectAll(".labelChoiceAcceptorPosition").remove();
        d3.select("#acceptorPositionTitleChoice").style("display", "block");
        d3.select("#labelAcceptorPositionTitle").style("display", "block");
    }
}

/**
 * Select an acceptor position
 * @param target The clicked acceptor position choice
 */
function selectAcceptorPosition(target) {
    var prev = progress;
    var clicked = d3.select("#"+target); // Get the selected choice
    if (clicked.classed("selectedAcceptorPosition")) { // If it was selected, unselect it and change color
        clicked.classed("selectedAcceptorPosition", false);
        clicked.style("fill", "#cc0000");
        progress--;
        redrawProgress(prev);
    } else { // If it was not selected, unselect all other anomer choices, and adapt style
        var isomerChoices = d3.selectAll(".choiceAcceptorPosition")[0];
        for (var choice of isomerChoices) {
            var current = d3.select("#" + choice.id);
            if (current.classed("selectedAcceptorPosition")) {
                current.classed("selectedAcceptorPosition", false);
                progress--;
                current.style("fill", "#cc0000");
            }
        }
        d3.select("#" + target).style("fill", "#000592").classed("selectedAcceptorPosition", true); // Add the selected class and change color
        progress++;
        redrawProgress(prev);
        checkSelectedAllCarbons(); // Check if the two carbon values have been selected
    }
}

/**
 * Checks that the user selected the two carbon values informations, and changes menu if he did
 */
function checkSelectedAllCarbons() {
    var selectedDonorPosition = (d3.selectAll(".selectedDonorPosition")[0].length != 0); //boolean checking if donor position selected
    var selectedAcceptorPosition = (d3.selectAll(".selectedAcceptorPosition")[0].length != 0); //boolean checking if acceptor position selected
    if (selectedDonorPosition && selectedAcceptorPosition) { // If both have been selected
        var donorPosition = d3.select(".selectedDonorPosition").attr("value"); // Donor Position value
        var acceptorPosition = d3.select(".selectedAcceptorPosition").attr("value"); // Acceptor Position value
        infosTable.push(donorPosition); // Push the donor position to the infosTable
        infosTable.push(acceptorPosition); // Push the acceptor position to the infosTable
        reinitializeDisplayCarbons(); // Reinitialize the display of carbons rects and labels
        var methodToCall = infosTable[0]; // Get the method which has to be called
        if (methodToCall == "addNode") {
            createNewNode(); // Manage add node
        } else if (methodToCall == "addStruct") {
            console.log("Need to add a structure"); // Manage add structure
        } else {
            updateExistingNode(); // Manage update of node
            updateMenu();
        }
    }
}

/**
 * Reinitialize the display of carbons title and remove all the choices
 */
function reinitializeDisplayCarbons() {
    d3.select("#svgCarbons").transition().style("display","none"); // Hide the carbon menu
    // Put back the titles rects and labels
    d3.select("#donorPositionTitleChoice").style("display", "block");
    d3.select("#labelDonorPositionTitle").style("display", "block");
    d3.select("#acceptorPositionTitleChoice").style("display", "block");
    d3.select("#labelAcceptorPositionTitle").style("display", "block");

    // Remove all choices rects and labels
    d3.selectAll(".choiceDonorPosition").remove();
    d3.selectAll(".labelChoiceDonorPosition").remove();
    d3.selectAll(".choiceAcceptorPosition").remove();
    d3.selectAll(".labelChoiceAcceptorPosition").remove();
}

/**
 * Checks the used donor position values of a node so that we can't use a carbon twice
 */
function checkUsedCarbons() {
    // If glycan not created yet, return empty array
    if (Object.keys(treeData).length === 0) {
        return [];
    } else {
        var usedCarbons = [];
        if (sb.SubstituentsPositions[clickedNode.monosaccharideType.name])
        {
            usedCarbons.push(sb.SubstituentsPositions[clickedNode.monosaccharideType.name].position);
        }
        var edges = glycan.graph.edges();
        // For each edge, if the source is the clickedNode, we add the donor position value to the array
        if (clickedNode == treeData.node && infosTable[0] != "updateNode")// If first node
        {
            usedCarbons.push(rootAcceptorPosition.value);
        }
        for (var edge of edges) {
            if (edge.sourceNode == clickedNode) {
                usedCarbons.push(edge.donorPosition.value);
            }
            else if (edge.targetNode == clickedNode) {
                if (infosTable[0] != "updateNode")
                    usedCarbons.push(edge.acceptorPosition.value);
            }
        }
        return usedCarbons; // Return the final array
    }
}

function redrawProgress(prev, newValue = progress)
{
    d3.select("#progressBar").transition()
    .styleTween("width", function() { return d3.interpolate(prev/7*1000, newValue/7*1000); });
}
