/**
 * Created by Renaud on 18/08/2017.
 */

export default class ImageExporter {

    constructor() {

    }

    get_xml_svg_code(div_svg) {
        // Get the d3js SVG element
        var tmp = document.getElementById(div_svg);
        var svg = tmp.getElementsByTagName("svg")[0];

        // Extract the data as SVG text string
        var xml = (new XMLSerializer()).serializeToString(svg);
        return xml.replace('xmlns="http://www.w3.org/2000/svg"', 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"');

    }

    get_html_svg_code(div_svg) {
        // Get the d3js SVG element
        var tmp = document.getElementById(div_svg);
        var svg = tmp.getElementsByTagName("svg")[0];

        // Extract the data as SVG text string
        return svg.innerHTML;
    }

    show_svg_code(div_svg, div_svg_code) {
        var svg_xml = get_xml_svg_code(div_svg);

        //Optional: prettify the XML with proper indentations
        svg_xml = vkbeautify.xml(svg_xml);

        // Set the content of the <pre> element with the XML
//    $("#svg_code").text(svg_xml);
        $(div_svg_code).text(svg_xml);

        //Optional: Use Google-Code-Prettifier to add colors.
        //prettyPrint();

    }

    save() {

        var html = this.get_xml_svg_code("viz");

        var imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(html)));

        return imgsrc;
    }


    download(imgsrc) {

        var image = new Image();
        image.src = imgsrc;
        image.onload = function () {

            var link = document.createElement("a");

            link.addEventListener('click', function(ev) {
                link.download = 'glycan.svg';
                link.href = imgsrc;
                link.id = "link_img";
            }, false);
            document.body.appendChild(link);

            link.click();
        };
    }


}

