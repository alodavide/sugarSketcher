/**
 * Created by Nicolas Hory on 27/07/16.
 */

// The possible values for the donor position


var datasetLinkCarbon = [
        {name: '1', percent: 1},
        {name: '2', percent: 1},
        {name: '3', percent: 1},
        {name: '4', percent: 1},
        {name: '5', percent: 1},
        {name: '6', percent: 1},
        {name: '7', percent: 1},
        {name: '8', percent: 1},
        {name: '9', percent: 1},
        {name: '?', percent: 1}
    ];


/**
 * Display the piechart for donor position for substituent
 */
function displayPie() {
    var carbons = getNumberCarbons(clickedNode);
    var width = 230, // Fixed width
        height = 150, // Fixed height
        radius = Math.min(width, height) /1.5;

    var color = d3.scale.category20(); // Colors used for choices

    // Create the piechart
    var pie = d3.layout.pie()
        .value(function (d) {
            return d.percent;
        })
        .sort(null)
        .padAngle(.03);

    var arc = d3.svg.arc()
        .innerRadius(radius - 100)
        .outerRadius(radius - 50);

    // If the piechart already exists, remove it
    if ($("#pieLinkCarbon").length){
        d3.select("#pieLinkCarbon").remove();

    }

    // Append a new svg to the body
    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", "pieLinkCarbon")
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"); // Translation for visualization

    $('#pieLinkCarbon').css("display", "block"); // Display the piechart
    $('#pieLinkCarbon').css({'top': mouseY, 'left': mouseX - 115}); // Adapt the position of the piechart to where the user clicked

    // Create a new choice in piechart for each possible value of the dataset
    var path = svg.selectAll('path')
        .data(pie(datasetLinkCarbon))
        .enter()
        .append('path')
        .attr({
            d: arc,
            fill: function (d) {
                return color(d.data.name);
            },
            class: 'choiceLinkCarbon'
        })
        .attr("opacity", function(d) {
            // Change the opacity of the donor positions which are already used by the node
            var usedCarbons = checkUsedCarbons();
            if (usedCarbons.indexOf(parseInt(d.data.name)) != -1 || parseInt(d.data.name) > carbons) {
                return 0.2;
            } else {
                return 1;
            }
        })
        .on("click", function (d) {
            // For each possible donor position, manage click
            var usedCarbons = checkUsedCarbons();
            if (d.data.name == '?' || (usedCarbons.indexOf(parseInt(d.data.name)) == -1 && parseInt(d.data.name) <= carbons)) {
                // Hide the piechart and the substituents menu
                $('#pieLinkCarbon').css("display", "none");
                d3.select("#svgSubstituents").style("display", "none");
                d3.select("#svgSubstituents").style("height", "50px");

                // Remove all substituent choices
                d3.selectAll(".createdSubChoice").remove();
                d3.selectAll(".createdSubLabel").remove();
                createNewSubstituent(d.data.name); // Create the wanted substituent
            }
        });

    // Labels for each donor position
    var text = svg.selectAll('text')
        .data(pie(datasetLinkCarbon))
        .enter()
        .append("text")
        .transition()
        .duration(200)
        .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("dy", ".4em")
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d.data.name;
        })
        .style({
            fill: '#fff',
            'font-size': '10px'
        });

}
