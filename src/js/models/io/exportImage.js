/**
 * Created by Renaud on 18/08/2017.
 */

/*
 Utility function: populates the <FORM> with the SVG data
 and the requested output format, and submits the form.
 */
//function submit_download_form(output_format, div_svg) {
//    var svg_xml = get_xml_svg_code(div_svg);
//
//
//    // Get the d3js SVG element
//    //var tmp = document.getElementById("sankey");
//    //var svg = tmp.getElementsByTagName("svg")[0];
//    // Extract the data as SVG text string
//    //var svg_xml = (new XMLSerializer).serializeToString(svg);
//
//
//    // Submit the <FORM> to the server.
//    // The result will be an attachment file to download.
//    var form = document.getElementById("svgform");
//    form['output_format'].value = output_format;
//    form['data'].value = svg_xml;
//    form.submit();
//}
/*
function get_xml_svg_code(div_svg) {
    // Get the d3js SVG element
    var tmp = document.getElementById(div_svg);
    var svg = tmp.getElementsByTagName("svg")[0];

    // Extract the data as SVG text string
    var xml = (new XMLSerializer).serializeToString(svg);
    return xml.replace('xmlns="http://www.w3.org/2000/svg"', 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"');

}

function get_html_svg_code(div_svg) {
    // Get the d3js SVG element
    var tmp = document.getElementById(div_svg);
    var svg = tmp.getElementsByTagName("svg")[0];

    // Extract the data as SVG text string
    return svg.innerHTML;
}

function show_svg_code(div_svg, div_svg_code) {
    var svg_xml = get_xml_svg_code(div_svg);

    //Optional: prettify the XML with proper indentations
    svg_xml = vkbeautify.xml(svg_xml);

    // Set the content of the <pre> element with the XML
//    $("#svg_code").text(svg_xml);
    $(div_svg_code).text(svg_xml);

    //Optional: Use Google-Code-Prettifier to add colors.
    //prettyPrint();

}

function save(div_svg, div_svg_data_url) {

    var html = get_xml_svg_code(div_svg, div_svg_data_url);
//    console.log(html);
    //var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
    var imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(html)));
    //console.log(imgsrc);

    //var img = '<img src="' + imgsrc + '">';
//    console.log(img);
    d3.select(div_svg_data_url).html(img);

    return imgsrc;
}
function download(div_svg, imgsrc) {


    var canvas = document.querySelector("canvas");
    var context = canvas.getContext("2d");

    var image = new Image;
    image.src = imgsrc;
    image.onload = function () {
        context.drawImage(image, 0, 0);

        var canvasdata = canvas.toDataURL("image/svg+xml");

        //var img = '<img src="' + canvasdata + '">';
        d3.select("#imgdataurl").html(img);
        var link = document.createElement("a");

        link.addEventListener('click', function(ev) {
            link.download = div_svg + "_" + getDateToString() + '.svg';
            link.href = imgsrc;
            link.id = "link_img";
        }, false);
        document.body.appendChild(link);

        link.click();
    }
}

function getDateToString() {
    var now = new Date();

    var datetime = now.getFullYear() + ""
        + leadingZero(now.getMonth() + 1)
        + leadingZero(now.getDate())
        + "_"
        + leadingZero(now.getHours())
        + leadingZero(now.getMinutes())
        + leadingZero(now.getSeconds());
    return datetime;

    function leadingZero(val) {
        var str = val.toString();
        if (str.length == 1) {
            str = '0' + str;
        }

        return str;
    }
}*/