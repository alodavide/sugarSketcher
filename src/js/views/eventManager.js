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
 * Manage the hover on the anomericity choice
 */
function addHoverManagerAnomericity() {
    var anomericityTitle = d3.select("#anomericityTitleChoice");
    anomericityTitle.on("mouseover", function (d) {
        var x = d3.select("#anomericityTitleChoice").attr("x");
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
        anomericityLabels.insert("text", ":first-child").attr("class", "label labelChoiceAnomericity").text("α").attr("x", x + 1000 / 18).attr("y", 8);
        anomericityLabels.insert("text", ":first-child").attr("class", "label labelChoiceAnomericity").text("β").attr("x", x + 1000 / 6).attr("y", 8);
        anomericityLabels.insert("text", ":first-child").attr("class", "label labelChoiceAnomericity").text("?").attr("x", x + 5000 / 18).attr("y", 8);
    });
}

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
    }
}

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
            return;
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
            d3.select("#tableSubstituents").transition().style("display", "block");
            //updateMenu(menuItem.subDivisions[0].division);
            return;
        });
}

function addHoverManagerIsomer() {

}

function addHoverManagerRingType() {

}
