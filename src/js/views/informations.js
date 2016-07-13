menuFirstAction = [{
    division: "addNode",
    display_division: "Add Node"
}, {
    division: "addStructure",
    display_division: "Add Structure"
}, {
    division: "changeMono",
    display_division: "Change Mono"
}];

menuSecondAction  = [{
    division: "sub",
    display_division: "Sub"
}, {
    division: "new",
    display_division: "New"
}];

function updateMenu(chosenDivision) {
    // Define the size of our chart and
    // some common layout properties
        cDim = {
            height: 50,
            width: 500,
            barMargin: 0
        };

    d3.select("#actions").selectAll("*").remove(); // Reinitialize the svg menu
    d3.select("#labels").selectAll("*").remove(); // Reinitialize the svg menu
    var actions = d3.select("#actions");
    var labels = d3.select("#labels");

    // Let's make a scale so the bar data fills the chart space.
    // First, we need to get the maximum value of our data set
    maxHeight = 10;

    // Now make the scale function.
    barHeight = d3.scale.linear()
        .domain([0, maxHeight])
        .range([0, cDim.height]);
    // Set the height and width of our SVG element
    svgMenu = d3.select("#svgMenu").attr({
        height: cDim.height,
        width: cDim.width
    });

    if (typeof chosenDivision === 'undefined') {
        // Figure out how much space is actually available
        // for the bars.
        marginlessWidth = cDim.width - (cDim.barMargin * (menuFirstAction.length - 1));
        cDim.barWidth = marginlessWidth / menuFirstAction.length;
        console.log("undefined");
        // Join our data to the rectangles
        bars = actions.selectAll("rect").data(menuFirstAction);

        bars.enter().append("rect")
            .attr("width", function (d, i) {
                return cDim.barWidth
            })
            .attr("height", function (d, i) {
                return barHeight(10)
            })
            .attr("y", function (d, i) {
                return cDim.height - barHeight(10);
            })
            .attr("x", function (d, i) {
                return (cDim.barWidth + cDim.barMargin) * i;
            })
            .attr("id", function (d) {
                return d.division;
            })
            .attr("class", function(d) {
                return "bar firstChoice"
            })
            .on('click', function(d) {
                updateMenu(d.division)
            });

        /*
         *  Label drawing block
         *  Place some simple labels
         */

        textNodes = labels.selectAll("text").data(menuFirstAction);

        textNodes.enter().append("text")
            .attr("class", "label")
            .attr("x", function (d, i) {
                return ((cDim.barWidth + cDim.barMargin) * i) + (cDim.barWidth / 2);
            })
            .attr("y", function (d, i) {
                return cDim.height - barHeight(10) + 8;
            })
            .text(function (d, i) {
                return d.display_division;
            });
    } else {
        // Figure out how much space is actually available
        // for the bars.
        marginlessWidth = cDim.width - (cDim.barMargin * (menuSecondAction.length - 1));
        cDim.barWidth = marginlessWidth / menuSecondAction.length;
        bars = actions.selectAll("rect").data(menuSecondAction);
        console.log("clicked on " + chosenDivision);
        bars.enter().append("rect")
            .attr("width", function (d, i) {
                return cDim.barWidth
            })
            .attr("height", function (d, i) {
                return barHeight(10)
            })
            .attr("y", function (d, i) {
                return cDim.height - barHeight(10);
            })
            .attr("x", function (d, i) {
                return (cDim.barWidth + cDim.barMargin) * i;
            })
            .attr("id", function (d) {
                return d.division;
            })
            .attr("class", function(d) {
                return "bar secondChoice"
            })
            .on("click", function(d) {
                console.log("clicked on " + d.display_division);
            });

        /*
         *  Label drawing block
         *  Place some simple labels
         */

        textNodes = labels.selectAll("text").data(menuSecondAction);

        textNodes.enter().append("text")
            .attr("class", "label")
            .attr("x", function (d, i) {
                return ((cDim.barWidth + cDim.barMargin) * i) + (cDim.barWidth / 2);
            })
            .attr("y", function (d, i) {
                return cDim.height - barHeight(10) + 8;
            })
            .text(function (d, i) {
                return d.display_division;
            });
        // remove old elements
        bars.exit().remove();
        textNodes.exit().remove();
    }
}

updateMenu();



