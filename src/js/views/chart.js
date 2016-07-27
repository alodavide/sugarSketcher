/**
 * Created by Nicolas Hory on 27/07/16.
 */

var datasetLinkCarbon = [
    {name: '1', percent: 1},
    {name: '2', percent: 1},
    {name: '3', percent: 1},
    {name: '4', percent: 1},
    {name: '5', percent: 1},
    {name: '6', percent: 1},
    {name: '?', percent: 1}
];


function displayPie() {
    var width = 230,
        height = 150,
        radius = Math.min(width, height) /1.5;

    var color = d3.scale.category20();

    var pie = d3.layout.pie()
        .value(function (d) {
            return d.percent;
        })
        .sort(null)
        .padAngle(.03);

    var arc = d3.svg.arc()
        .innerRadius(radius - 100)
        .outerRadius(radius - 50);

    if ($("#pieLinkCarbon").length){
        $('#pieLinkCarbon').css("display", "block");
        $('#pieLinkCarbon').css({'top': mouseY, 'left': mouseX - 115});
    } else {
        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("id", "pieLinkCarbon")
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        $('#pieLinkCarbon').css({'top': mouseY, 'left': mouseX - 115});

        var path = svg.selectAll('path')
            .data(pie(datasetLinkCarbon))
            .enter()
            .append('path')
            .attr({
                d: arc,
                fill: function (d, i) {
                    return color(d.data.name);
                },
                class: 'choiceLinkCarbon'
            })
            .on("click", function (d) {
                console.log("you chose" + d.data.name);
            });

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
}
