var mymap = L.map('mapid', {
    center: [50.879197, 4.701462],
    zoom: 15,
    maxZoom: 19
});

var CartoDB_Voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(mymap);

//var hrefvar;
//var srcvar;
//var altvar;
var active;
var inner;
var popupinner;
var popupcarousel;


//var Lat1;
//var Long1;

//the .addTo(mymap) adds it to the map when it initializes.
var parentGroup = L.markerClusterGroup().addTo(mymap);
var relig = L.featureGroup.subGroup(parentGroup).addTo(mymap);
var panogrp = L.featureGroup.subGroup(parentGroup).addTo(mymap);
var civicgrp = L.featureGroup.subGroup(parentGroup).addTo(mymap);
var parkwater = L.featureGroup.subGroup(parentGroup).addTo(mymap);
var uni = L.featureGroup.subGroup(parentGroup).addTo(mymap);
var obj = L.featureGroup.subGroup(parentGroup).addTo(mymap);
var religiouscluster = L.markerClusterGroup();
var panoramiccluster = L.markerClusterGroup();
var civiccluster = L.markerClusterGroup();
var parkcluster = L.markerClusterGroup();
var universitycluster = L.markerClusterGroup();
var objectcluster  = L.markerClusterGroup();
var y1500cluster = L.markerClusterGroup();
var y1600cluster = L.markerClusterGroup();
var y1700cluster = L.markerClusterGroup();
var y1800cluster = L.markerClusterGroup();
var y1900cluster = L.markerClusterGroup();

var religMarker = L.ExtraMarkers.icon({
    icon: 'fa-church',
    prefix: 'fa',
    markerColor: 'yellow'
});

var panoMarker = L.ExtraMarkers.icon({
    icon: 'fa-image',
    prefix: 'fa',
    markerColor: 'violet'
});

var civicMarker = L.ExtraMarkers.icon({
    icon: 'fa-building',
    prefix: 'fa',
    markerColor: 'red'
});

var parkMarker = L.ExtraMarkers.icon({
    icon: 'fa-tree',
    prefix: 'fa',
    markerColor: 'green'
});

var uniMarker = L.ExtraMarkers.icon({
    icon: 'fa-university',
    prefix: 'fa',
    markerColor: 'cyan'
});

var objMarker = L.ExtraMarkers.icon({
    icon: 'fa-shapes',
    prefix: 'fa',
    markerColor: 'purple'
});

var cent16Marker = L.ExtraMarkers.icon({
    shape: 'square',
    icon: 'fa-number',
    number: '16',
    prefix: 'fa',
    markerColor: 'orange-dark'
});

var cent17Marker = L.ExtraMarkers.icon({
    shape: 'square',
    icon: 'fa-number',
    number: '17',
    prefix: 'fa',
    markerColor: 'orange'
});

var cent18Marker = L.ExtraMarkers.icon({
    shape: 'square',
    icon: 'fa-number',
    number: '18',
    prefix: 'fa',
    markerColor: 'blue-dark'
});

var cent19Marker = L.ExtraMarkers.icon({
    shape: 'square',
    icon: 'fa-number',
    number: '19',
    prefix: 'fa',
    markerColor: 'pink'
});

var cent20Marker = L.ExtraMarkers.icon({
    shape: 'square',
    icon: 'fa-number',
    number: '20',
    prefix: 'fa',
    markerColor: 'green-dark'
});


function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

var data = d3.csv("VoLmodified.csv").then(function (data) {
    data.forEach(function (d) {
        d.Lat1 = +d.Lat1;
        d.Long1 = +d.Long1;
        d.Record_ID = +d.Record_ID;
    });
});
var count = 0;
//this array has all the PlaceNames1 only 1 time
var lvn = [];

d3.csv("VoLmodified.csv").then(function (data) {
    data.forEach(function (d) {
        if (lvn.includes(data[count].PlaceName1)){
        }
        else{
            lvn.push(data[count].PlaceName1);
        }
        count +=1;
    });

    var groupbyName = d3.nest()
        .key(function (d) { return d.PlaceName1;})
        .entries(data);

    var groupbyNameDate = d3.nest()
        .key(function (d) {return d.PlaceName1; })
        .key(function (d) {return d.RoundedDate; })
        .entries(data);

    for (var i=0; i<groupbyName.length; i++) {
        hrefarray = [];
        srcarray = [];
        altarray = [];

        for (var k = 0; k < groupbyName[i].values.length; k++) {
            hrefvar = groupbyName[i].values[k].URL_Digital_Object;
            srcvar = groupbyName[i].values[k].URL_Thumbnail;
            altvar = groupbyName[i].values[k].PlaceName1;

            var singleImage = "<div class='carousel-inner' data-interval='false'> \n" +
                "<div id='caroID' class='carousel-item active' data-interval='false'> \n" +
                "<a href=" + hrefvar + " target='_blank'><img alt=" + altvar + " src=" + srcvar + " height='100%' width='100%'></a> \n" +
                "</div> \n" +
                "</div>";

            if (groupbyName[i].values[k].Local_Uniform_Title_Category.includes("Religious buildings")) {
                hrefarray.push(hrefvar);
                srcarray.push(srcvar);
                altarray.push(altvar);
                hrefarray = hrefarray.filter(onlyUnique);
                srcarray = srcarray.filter(onlyUnique);
                altarray = altarray.filter(onlyUnique);
                if (groupbyName[i].values.length === 1) {
                    var testmarker = L.marker([groupbyName[i].values[k].Lat1, groupbyName[i].values[k].Long1], {icon: religMarker}).bindPopup(groupbyName[i].values[0].PlaceName1 + " " + singleImage, {
                        maxWidth: 220,
                        minWidth: 200
                    }).addTo(religiouscluster);
                    testmarker.addTo(relig);
                }else if (groupbyName[i].values.length > 1) {
                    active = "<a target=\'_blank\' href=" + hrefarray[0] + "><img src=" + srcarray[0] + " alt=" + altarray[0] + "></a>";
                    inner = "";
                    for (var item = 1; item < hrefarray.length; item++) {
                        inner += "<div class='carousel-item' data-interval='false'> \n" +
                            "<a target='_blank' href=" + hrefarray[item] + "><img src=" + srcarray[item] + " alt=" + altarray[item] + "> </a>\n" +
                            "</div>"
                    }
                    popupinner = " <div class='carousel-inner' data-interval='false'> \n" +
                        "     <div class='carousel-item active' data-interval='false'> \n" + active +
                        "</div> \n" + inner +
                        "</div>";

                    popupcarousel = "<div id='carouselExampleControls' class='carousel slide' data-ride='carousel'> \n" + popupinner +
                        " <a class='carousel-control-prev' href='#carouselExampleControls' role='button' data-slide='prev'> \n" +
                        " <span class='carousel-control-prev-icon' aria-hidden='true'></span> \n" +
                        " <span class='sr-only'>Previous</span> \n" +
                        " </a>  \n" +
                        "<a class='carousel-control-next' href='#carouselExampleControls' role='button' data-slide='next'>  \n" +
                        " <span class='carousel-control-next-icon' aria-hidden='true'></span>  \n" +
                        "<span class='sr-only'>Next</span>  \n" +
                        "</a>  \n" +
                        "</div>";

                    if (k<1){
                        var testmarker1 = L.marker([groupbyName[i].values[k].Lat1, groupbyName[i].values[k].Long1], {icon: religMarker}).addTo(religiouscluster);
                        testmarker1.addTo(relig);
                    }
                    testmarker1.bindPopup(groupbyName[i].values[0].PlaceName1 + " "+popupcarousel, {
                        maxWidth:220,
                        minWidth:200
                    });
                }
            }
            if (groupbyName[i].values[k].Local_Uniform_Title_Category.includes("Panoramic view")) {
                hrefarray.push(hrefvar);
                srcarray.push(srcvar);
                altarray.push(altvar);
                hrefarray = hrefarray.filter(onlyUnique);
                srcarray = srcarray.filter(onlyUnique);
                altarray = altarray.filter(onlyUnique);
                if (groupbyName[i].values.length === 1) {
                    var testmarker = L.marker([groupbyName[i].values[k].Lat1, groupbyName[i].values[k].Long1], {icon: panoMarker}).bindPopup(groupbyName[i].values[0].PlaceName1 + " " + singleImage, {
                        maxWidth: 220,
                        minWidth: 200
                    }).addTo(panoramiccluster);
                    testmarker.addTo(panogrp);
                }else {
                    active = "<a target=\'_blank\' href=" + hrefarray[0] + "><img src=" + srcarray[0] + " alt=" + altarray[0] + "></a>";
                    inner = "";
                    for (var item = 1; item < hrefarray.length; item++) {
                        inner += "<div class='carousel-item' data-interval='false'> \n" +
                            "<a target='_blank' href=" + hrefarray[item] + "><img src=" + srcarray[item] + " alt=" + altarray[item] + "> </a>\n" +
                            "</div>"
                    }
                    popupinner = " <div class='carousel-inner' data-interval='false'> \n" +
                        "     <div class='carousel-item active' data-interval='false'> \n" + active +
                        "</div> \n" + inner +
                        "</div>";

                    popupcarousel = "<div id='carouselExampleControls' class='carousel slide' data-ride='carousel'> \n" + popupinner +
                        " <a class='carousel-control-prev' href='#carouselExampleControls' role='button' data-slide='prev'> \n" +
                        " <span class='carousel-control-prev-icon' aria-hidden='true'></span> \n" +
                        " <span class='sr-only'>Previous</span> \n" +
                        " </a>  \n" +
                        "<a class='carousel-control-next' href='#carouselExampleControls' role='button' data-slide='next'>  \n" +
                        " <span class='carousel-control-next-icon' aria-hidden='true'></span>  \n" +
                        "<span class='sr-only'>Next</span>  \n" +
                        "</a>  \n" +
                        "</div>";
                    if (k<1){
                        var testmarker1 = L.marker([groupbyName[i].values[k].Lat1, groupbyName[i].values[k].Long1], {icon: panoMarker}).addTo(panoramiccluster);
                        testmarker1.addTo(panogrp);
                    }
                    testmarker1.bindPopup(groupbyName[i].values[0].PlaceName1 + " "+popupcarousel, {
                        maxWidth:220,
                        minWidth:200
                    });
                }
            }

            if (groupbyName[i].values[k].Local_Uniform_Title_Category.includes("Civic building")) {
                hrefarray.push(hrefvar);
                srcarray.push(srcvar);
                altarray.push(altvar);
                hrefarray = hrefarray.filter(onlyUnique);
                srcarray = srcarray.filter(onlyUnique);
                altarray = altarray.filter(onlyUnique);
                if (groupbyName[i].values.length === 1) {
                    var testmarker = L.marker([groupbyName[i].values[k].Lat1, groupbyName[i].values[k].Long1], {icon: civicMarker}).bindPopup(groupbyName[i].values[0].PlaceName1 + " " + singleImage, {
                        maxWidth: 220,
                        minWidth: 200
                    }).addTo(civiccluster);
                    testmarker.addTo(civicgrp);
                }else {
                    active = "<a target=\'_blank\' href=" + hrefarray[0] + "><img src=" + srcarray[0] + " alt=" + altarray[0] + "></a>";
                    inner = "";
                    for (var item = 1; item < hrefarray.length; item++) {
                        inner += "<div class='carousel-item' data-interval='false'> \n" +
                            "<a target='_blank' href=" + hrefarray[item] + "><img src=" + srcarray[item] + " alt=" + altarray[item] + "> </a>\n" +
                            "</div>"
                    }
                    popupinner = " <div class='carousel-inner' data-interval='false'> \n" +
                        "     <div class='carousel-item active' data-interval='false'> \n" + active +
                        "</div> \n" + inner +
                        "</div>";
                    popupcarousel = "<div id='carouselExampleControls' class='carousel slide' data-ride='carousel'> \n" + popupinner +
                        " <a class='carousel-control-prev' href='#carouselExampleControls' role='button' data-slide='prev'> \n" +
                        " <span class='carousel-control-prev-icon' aria-hidden='true'></span> \n" +
                        " <span class='sr-only'>Previous</span> \n" +
                        " </a>  \n" +
                        "<a class='carousel-control-next' href='#carouselExampleControls' role='button' data-slide='next'>  \n" +
                        " <span class='carousel-control-next-icon' aria-hidden='true'></span>  \n" +
                        "<span class='sr-only'>Next</span>  \n" +
                        "</a>  \n" +
                        "</div>";
                    if (k<1){
                        var testmarker1 = L.marker([groupbyName[i].values[k].Lat1, groupbyName[i].values[k].Long1], {icon: civicMarker}).addTo(civiccluster);
                        testmarker1.addTo(civicgrp);
                    }
                    testmarker1.bindPopup(groupbyName[i].values[0].PlaceName1 + " "+popupcarousel, {
                        maxWidth:220,
                        minWidth:200
                    });
                }
            }

            if (groupbyName[i].values[k].Local_Uniform_Title_Category.includes("Parks") || groupbyName[i].values[k].Local_Uniform_Title_Category.includes("Waterways")) {
                hrefarray.push(hrefvar);
                srcarray.push(srcvar);
                altarray.push(altvar);
                hrefarray = hrefarray.filter(onlyUnique);
                srcarray = srcarray.filter(onlyUnique);
                altarray = altarray.filter(onlyUnique);
                if (groupbyName[i].values.length === 1) {
                    var testmarker = L.marker([groupbyName[i].values[k].Lat1, groupbyName[i].values[k].Long1], {icon: parkMarker}).bindPopup(groupbyName[i].values[0].PlaceName1 + " " + singleImage, {
                        maxWidth: 220,
                        minWidth: 200
                    }).addTo(parkcluster);
                    testmarker.addTo(parkwater);
                }else {
                    active = "<a target=\'_blank\' href=" + hrefarray[0] + "><img src=" + srcarray[0] + " alt=" + altarray[0] + "></a>";
                    inner = "";
                    for (var item = 1; item < hrefarray.length; item++) {
                        inner += "<div class='carousel-item' data-interval='false'> \n" +
                            "<a target='_blank' href=" + hrefarray[item] + "><img src=" + srcarray[item] + " alt=" + altarray[item] + "> </a>\n" +
                            "</div>"
                    }
                    popupinner = " <div class='carousel-inner' data-interval='false'> \n" +
                        "     <div class='carousel-item active' data-interval='false'> \n" + active +
                        "</div> \n" + inner +
                        "</div>";

                    popupcarousel = "<div id='carouselExampleControls' class='carousel slide' data-ride='carousel'> \n" + popupinner +
                        " <a class='carousel-control-prev' href='#carouselExampleControls' role='button' data-slide='prev'> \n" +
                        " <span class='carousel-control-prev-icon' aria-hidden='true'></span> \n" +
                        " <span class='sr-only'>Previous</span> \n" +
                        " </a>  \n" +
                        "<a class='carousel-control-next' href='#carouselExampleControls' role='button' data-slide='next'>  \n" +
                        " <span class='carousel-control-next-icon' aria-hidden='true'></span>  \n" +
                        "<span class='sr-only'>Next</span>  \n" +
                        "</a>  \n" +
                        "</div>";
                    if (k<1){
                        var testmarker1 = L.marker([groupbyName[i].values[k].Lat1, groupbyName[i].values[k].Long1], {icon: parkMarker}).addTo(parkcluster);
                        testmarker1.addTo(parkwater);
                    }
                    testmarker1.bindPopup(groupbyName[i].values[0].PlaceName1 + " "+popupcarousel, {
                        maxWidth:220,
                        minWidth:200
                    });
                }
            }

            if (groupbyName[i].values[k].Local_Uniform_Title_Category.includes("University buildings")||groupbyName[i].values[k].Local_Uniform_Title_Category.includes("University buildings°°° Civic buildings")) {
                hrefarray.push(hrefvar);
                srcarray.push(srcvar);
                altarray.push(altvar);
                hrefarray = hrefarray.filter(onlyUnique);
                srcarray = srcarray.filter(onlyUnique);
                altarray = altarray.filter(onlyUnique);
                if (groupbyName[i].values.length === 1) {
                    var testmarker = L.marker([groupbyName[i].values[k].Lat1, groupbyName[i].values[k].Long1], {icon: uniMarker}).bindPopup(groupbyName[i].values[0].PlaceName1 + " " + singleImage, {
                        maxWidth: 220,
                        minWidth: 200
                    }).addTo(universitycluster);
                    testmarker.addTo(uni);
                }else {
                    active = "<a target=\'_blank\' href=" + hrefarray[0] + "><img src=" + srcarray[0] + " alt=" + altarray[0] + "></a>";
                    inner = "";
                    for (var item = 1; item < hrefarray.length; item++) {
                        inner += "<div class='carousel-item' data-interval='false'> \n" +
                            "<a target='_blank' href=" + hrefarray[item] + "><img src=" + srcarray[item] + " alt=" + altarray[item] + "> </a>\n" +
                            "</div>"
                    }
                    popupinner = " <div class='carousel-inner' data-interval='false'> \n" +
                        "     <div class='carousel-item active' data-interval='false'> \n" + active +
                        "</div> \n" + inner +
                        "</div>";
                    popupcarousel = "<div id='carouselExampleControls' class='carousel slide' data-ride='carousel'> \n" + popupinner +
                        " <a class='carousel-control-prev' href='#carouselExampleControls' role='button' data-slide='prev'> \n" +
                        " <span class='carousel-control-prev-icon' aria-hidden='true'></span> \n" +
                        " <span class='sr-only'>Previous</span> \n" +
                        " </a>  \n" +
                        "<a class='carousel-control-next' href='#carouselExampleControls' role='button' data-slide='next'>  \n" +
                        " <span class='carousel-control-next-icon' aria-hidden='true'></span>  \n" +
                        "<span class='sr-only'>Next</span>  \n" +
                        "</a>  \n" +
                        "</div>";
                    if (k<1){
                        var testmarker1 = L.marker([groupbyName[i].values[k].Lat1, groupbyName[i].values[k].Long1], {icon: uniMarker}).addTo(universitycluster);
                        testmarker1.addTo(uni);
                    }
                    testmarker1.bindPopup(groupbyName[i].values[0].PlaceName1 + " "+popupcarousel, {
                        maxWidth:220,
                        minWidth:200
                    });
                }
            }

            if (groupbyName[i].values[k].Object === "yes") {
                hrefarray.push(hrefvar);
                srcarray.push(srcvar);
                altarray.push(altvar);
                hrefarray = hrefarray.filter(onlyUnique);
                srcarray = srcarray.filter(onlyUnique);
                altarray = altarray.filter(onlyUnique);
                if (groupbyName[i].values.length === 1) {
                    var testmarker = L.marker([groupbyName[i].values[k].Lat1, groupbyName[i].values[k].Long1], {icon: objMarker}).bindPopup(groupbyName[i].values[0].PlaceName1 + " " + singleImage, {
                        maxWidth: 220,
                        minWidth: 200
                    }).addTo(objectcluster);
                    testmarker.addTo(obj);
                }else {
                    active = "<a target=\'_blank\' href=" + hrefarray[0] + "><img src=" + srcarray[0] + " alt=" + altarray[0] + "></a>";
                    inner = "";
                    for (var item = 1; item < hrefarray.length; item++) {
                        inner += "<div class='carousel-item' data-interval='false'> \n" +
                            "<a target='_blank' href=" + hrefarray[item] + "><img src=" + srcarray[item] + " alt=" + altarray[item] + "> </a>\n" +
                            "</div>"
                    }
                    popupinner = " <div class='carousel-inner' data-interval='false'> \n" +
                        "     <div class='carousel-item active' data-interval='false'> \n" + active +
                        "</div> \n" + inner +
                        "</div>";
                    popupcarousel = "<div id='carouselExampleControls' class='carousel slide' data-ride='carousel'> \n" + popupinner +
                        " <a class='carousel-control-prev' href='#carouselExampleControls' role='button' data-slide='prev'> \n" +
                        " <span class='carousel-control-prev-icon' aria-hidden='true'></span> \n" +
                        " <span class='sr-only'>Previous</span> \n" +
                        " </a>  \n" +
                        "<a class='carousel-control-next' href='#carouselExampleControls' role='button' data-slide='next'>  \n" +
                        " <span class='carousel-control-next-icon' aria-hidden='true'></span>  \n" +
                        "<span class='sr-only'>Next</span>  \n" +
                        "</a>  \n" +
                        "</div>";
                    if (k<1){
                        var testmarker1 = L.marker([groupbyName[i].values[k].Lat1, groupbyName[i].values[k].Long1], {icon: objMarker}).addTo(objectcluster);
                        testmarker1.addTo(obj);
                    }
                    testmarker1.bindPopup(groupbyName[i].values[0].PlaceName1 + " "+popupcarousel, {
                        maxWidth:220,
                        minWidth:200
                    });
                }
            }
        }
    }

    for (var i=0; i<groupbyNameDate.length; i++) {
        hrefarray = [];
        srcarray = [];
        altarray = [];

        for (var k = 0; k < groupbyNameDate[i].values.length; k++) {
            hrefarray.length=0;
            srcarray.length=0;
            altarray.length=0;
            for (var l=0; l<groupbyNameDate[i].values[k].values.length;l++) {
                var hrefvar = groupbyNameDate[i].values[k].values[l].URL_Digital_Object;
                var srcvar = groupbyNameDate[i].values[k].values[l].URL_Thumbnail;
                var altvar = groupbyNameDate[i].values[k].values[l].PlaceName1;

                var singleImage = "<div class='carousel-inner' data-interval='false'> \n" +
                    "<div id='caroID' class='carousel-item active' data-interval='false'> \n" +
                    "<a href=" + hrefvar + " target='_blank'><img alt=" + altvar + " src=" + srcvar + " height='100%' width='100%'></a> \n" +
                    "</div> \n" +
                    "</div>";

                if (groupbyNameDate[i].values[k].key.startsWith("15")) {
                    hrefarray.push(hrefvar);
                    srcarray.push(srcvar);
                    altarray.push(altvar);
                    hrefarray = hrefarray.filter(onlyUnique);
                    srcarray = srcarray.filter(onlyUnique);
                    altarray = altarray.filter(onlyUnique);
                    if (groupbyNameDate[i].values[k].values.length === 1) {
                        var testmarker = L.marker([groupbyNameDate[i].values[0].values[0].Lat1, groupbyNameDate[i].values[0].values[0].Long1], {icon: cent16Marker}).bindPopup(groupbyNameDate[i].key + " " + singleImage, {
                            maxWidth: 200,
                            minWidth: 150
                        });
                        testmarker.addTo(y1500cluster);
                    } else {
                        active = "<a target=\'_blank\' href=" + hrefarray[0] + "><img src=" + srcarray[0] + " alt=" + altarray[0] + "></a>";
                        inner = "";
                        for (var item = 1; item < hrefarray.length; item++) {
                            inner += "<div class='carousel-item' data-interval='false'> \n" +
                                "<a target='_blank' href=" + hrefarray[item] + "><img src=" + srcarray[item] + " alt=" + altarray[item] + "> </a>\n" +
                                "</div>"
                        }
                        popupinner = " <div class='carousel-inner' data-interval='false'> \n" +
                            "     <div class='carousel-item active' data-interval='false'> \n" + active +
                            "</div> \n" + inner +
                            "</div>";

                        popupcarousel = "<div id='carouselExampleControls' class='carousel slide' data-ride='carousel'> \n" + popupinner +
                            " <a class='carousel-control-prev' href='#carouselExampleControls' role='button' data-slide='prev'> \n" +
                            " <span class='carousel-control-prev-icon' aria-hidden='true'></span> \n" +
                            " <span class='sr-only'>Previous</span> \n" +
                            " </a>  \n" +
                            "<a class='carousel-control-next' href='#carouselExampleControls' role='button' data-slide='next'>  \n" +
                            " <span class='carousel-control-next-icon' aria-hidden='true'></span>  \n" +
                            "<span class='sr-only'>Next</span>  \n" +
                            "</a>  \n" +
                            "</div>";
                        if(l<1){
                            var testmarker1 = L.marker([groupbyNameDate[i].values[0].values[0].Lat1, groupbyNameDate[i].values[0].values[0].Long1], {icon: cent16Marker}).addTo(y1500cluster);
                        }
                        testmarker1.bindPopup(groupbyNameDate[i].key + " " + popupcarousel, {
                            maxWidth: 220,
                            minWidth: 200
                        });
                    }
                }

                if (groupbyNameDate[i].values[k].key.startsWith("16")) {
                    hrefarray.push(hrefvar);
                    srcarray.push(srcvar);
                    altarray.push(altvar);
                    hrefarray = hrefarray.filter(onlyUnique);
                    srcarray = srcarray.filter(onlyUnique);
                    altarray = altarray.filter(onlyUnique);
                    if (groupbyNameDate[i].values[k].values.length === 1) {
                        var testmarker = L.marker([groupbyNameDate[i].values[0].values[0].Lat1, groupbyNameDate[i].values[0].values[0].Long1], {icon: cent17Marker}).bindPopup(groupbyNameDate[i].key + " " + singleImage, {
                            maxWidth: 200,
                            minWidth: 150
                        });
                        testmarker.addTo(y1600cluster);
                    } else {
                        active = "<a target=\'_blank\' href=" + hrefarray[0] + "><img src=" + srcarray[0] + " alt=" + altarray[0] + "></a>";
                        inner = "";
                        for (var item = 1; item < hrefarray.length; item++) {
                            inner += "<div class='carousel-item' data-interval='false'> \n" +
                                "<a target='_blank' href=" + hrefarray[item] + "><img src=" + srcarray[item] + " alt=" + altarray[item] + "> </a>\n" +
                                "</div>"
                        }
                        popupinner = " <div class='carousel-inner' data-interval='false'> \n" +
                            "     <div class='carousel-item active' data-interval='false'> \n" + active +
                            "</div> \n" + inner +
                            "</div>";

                        popupcarousel = "<div id='carouselExampleControls' class='carousel slide' data-ride='carousel'> \n" + popupinner +
                            " <a class='carousel-control-prev' href='#carouselExampleControls' role='button' data-slide='prev'> \n" +
                            " <span class='carousel-control-prev-icon' aria-hidden='true'></span> \n" +
                            " <span class='sr-only'>Previous</span> \n" +
                            " </a>  \n" +
                            "<a class='carousel-control-next' href='#carouselExampleControls' role='button' data-slide='next'>  \n" +
                            " <span class='carousel-control-next-icon' aria-hidden='true'></span>  \n" +
                            "<span class='sr-only'>Next</span>  \n" +
                            "</a>  \n" +
                            "</div>";
                        if(l<1){
                            var testmarker1 = L.marker([groupbyNameDate[i].values[0].values[0].Lat1, groupbyNameDate[i].values[0].values[0].Long1], {icon: cent17Marker}).addTo(y1600cluster);
                        }
                        testmarker1.bindPopup(groupbyNameDate[i].key + " " + popupcarousel, {
                            maxWidth: 220,
                            minWidth: 200
                        });
                    }
                }
                if (groupbyNameDate[i].values[k].key.startsWith("17")) {
                    hrefarray.push(hrefvar);
                    srcarray.push(srcvar);
                    altarray.push(altvar);
                    hrefarray = hrefarray.filter(onlyUnique);
                    srcarray = srcarray.filter(onlyUnique);
                    altarray = altarray.filter(onlyUnique);
                    if (groupbyNameDate[i].values[k].values.length === 1) {
                        var testmarker = L.marker([groupbyNameDate[i].values[0].values[0].Lat1, groupbyNameDate[i].values[0].values[0].Long1], {icon: cent18Marker}).bindPopup(groupbyNameDate[i].key + " " + singleImage, {
                            maxWidth: 200,
                            minWidth: 150
                        });
                        testmarker.addTo(y1700cluster);
                    } else {
                        active = "<a target=\'_blank\' href=" + hrefarray[0] + "><img src=" + srcarray[0] + " alt=" + altarray[0] + "></a>";
                        inner = "";
                        for (var item = 1; item < hrefarray.length; item++) {
                            inner += "<div class='carousel-item' data-interval='false'> \n" +
                                "<a target='_blank' href=" + hrefarray[item] + "><img src=" + srcarray[item] + " alt=" + altarray[item] + "> </a>\n" +
                                "</div>"
                        }
                        popupinner = " <div class='carousel-inner' data-interval='false'> \n" +
                            "     <div class='carousel-item active' data-interval='false'> \n" + active +
                            "</div> \n" + inner +
                            "</div>";

                        popupcarousel = "<div id='carouselExampleControls' class='carousel slide' data-ride='carousel'> \n" + popupinner +
                            " <a class='carousel-control-prev' href='#carouselExampleControls' role='button' data-slide='prev'> \n" +
                            " <span class='carousel-control-prev-icon' aria-hidden='true'></span> \n" +
                            " <span class='sr-only'>Previous</span> \n" +
                            " </a>  \n" +
                            "<a class='carousel-control-next' href='#carouselExampleControls' role='button' data-slide='next'>  \n" +
                            " <span class='carousel-control-next-icon' aria-hidden='true'></span>  \n" +
                            "<span class='sr-only'>Next</span>  \n" +
                            "</a>  \n" +
                            "</div>";
                        if(l<1){
                            var testmarker1 = L.marker([groupbyNameDate[i].values[0].values[0].Lat1, groupbyNameDate[i].values[0].values[0].Long1], {icon: cent18Marker}).addTo(y1700cluster);
                        }
                        testmarker1.bindPopup(groupbyNameDate[i].key + " " + popupcarousel, {
                            maxWidth: 220,
                            minWidth: 200
                        });
                    }
                }
                if (groupbyNameDate[i].values[k].key.startsWith("18")) {
                    hrefarray.push(hrefvar);
                    srcarray.push(srcvar);
                    altarray.push(altvar);
                    hrefarray = hrefarray.filter(onlyUnique);
                    srcarray = srcarray.filter(onlyUnique);
                    altarray = altarray.filter(onlyUnique);
                    if (groupbyNameDate[i].values[k].values.length === 1) {
                        var testmarker = L.marker([groupbyNameDate[i].values[0].values[0].Lat1, groupbyNameDate[i].values[0].values[0].Long1], {icon: cent19Marker}).bindPopup(groupbyNameDate[i].key + " " + singleImage, {
                            maxWidth: 200,
                            minWidth: 150
                        });
                        testmarker.addTo(y1800cluster);
                    } else {
                        active = "<a target=\'_blank\' href=" + hrefarray[0] + "><img src=" + srcarray[0] + " alt=" + altarray[0] + "></a>";
                        inner = "";
                        for (var item = 1; item < hrefarray.length; item++) {
                            inner += "<div class='carousel-item' data-interval='false'> \n" +
                                "<a target='_blank' href=" + hrefarray[item] + "><img src=" + srcarray[item] + " alt=" + altarray[item] + "> </a>\n" +
                                "</div>"
                        }
                        popupinner = " <div class='carousel-inner' data-interval='false'> \n" +
                            "     <div class='carousel-item active' data-interval='false'> \n" + active +
                            "</div> \n" + inner +
                            "</div>";

                        popupcarousel = "<div id='carouselExampleControls' class='carousel slide' data-ride='carousel'> \n" + popupinner +
                            " <a class='carousel-control-prev' href='#carouselExampleControls' role='button' data-slide='prev'> \n" +
                            " <span class='carousel-control-prev-icon' aria-hidden='true'></span> \n" +
                            " <span class='sr-only'>Previous</span> \n" +
                            " </a>  \n" +
                            "<a class='carousel-control-next' href='#carouselExampleControls' role='button' data-slide='next'>  \n" +
                            " <span class='carousel-control-next-icon' aria-hidden='true'></span>  \n" +
                            "<span class='sr-only'>Next</span>  \n" +
                            "</a>  \n" +
                            "</div>";
                        if(l<1){
                            var testmarker1 = L.marker([groupbyNameDate[i].values[0].values[0].Lat1, groupbyNameDate[i].values[0].values[0].Long1], {icon: cent19Marker}).addTo(y1800cluster);
                        }
                        testmarker1.bindPopup(groupbyNameDate[i].key + " " + popupcarousel, {
                            maxWidth: 220,
                            minWidth: 200
                        });
                    }
                }
                if (groupbyNameDate[i].values[k].values[l].Date_1.startsWith("19")) {
                    hrefarray.push(hrefvar);
                    srcarray.push(srcvar);
                    altarray.push(altvar);
                    hrefarray = hrefarray.filter(onlyUnique);
                    srcarray = srcarray.filter(onlyUnique);
                    altarray = altarray.filter(onlyUnique);
                    if (groupbyNameDate[i].values[k].values.length === 1) {
                        var testmarker = L.marker([groupbyNameDate[i].values[0].values[0].Lat1, groupbyNameDate[i].values[0].values[0].Long1], {icon: cent20Marker}).bindPopup(groupbyNameDate[i].key + " " + singleImage, {
                            maxWidth: 200,
                            minWidth: 150
                        });
                        testmarker.addTo(y1900cluster);
                    } else {
                        active = "<a target=\'_blank\' href=" + hrefarray[0] + "><img src=" + srcarray[0] + " alt=" + altarray[0] + "></a>";
                        inner = "";
                        for (var item = 1; item < hrefarray.length; item++) {
                            inner += "<div class='carousel-item' data-interval='false'> \n" +
                                "<a target='_blank' href=" + hrefarray[item] + "><img src=" + srcarray[item] + " alt=" + altarray[item] + "> </a>\n" +
                                "</div>"
                        }
                        popupinner = " <div class='carousel-inner' data-interval='false'> \n" +
                            "     <div class='carousel-item active' data-interval='false'> \n" + active +
                            "</div> \n" + inner +
                            "</div>";

                        popupcarousel = "<div id='carouselExampleControls' class='carousel slide' data-ride='carousel'> \n" + popupinner +
                            " <a class='carousel-control-prev' href='#carouselExampleControls' role='button' data-slide='prev'> \n" +
                            " <span class='carousel-control-prev-icon' aria-hidden='true'></span> \n" +
                            " <span class='sr-only'>Previous</span> \n" +
                            " </a>  \n" +
                            "<a class='carousel-control-next' href='#carouselExampleControls' role='button' data-slide='next'>  \n" +
                            " <span class='carousel-control-next-icon' aria-hidden='true'></span>  \n" +
                            "<span class='sr-only'>Next</span>  \n" +
                            "</a>  \n" +
                            "</div>";
                        if(l<1){
                            var testmarker1 = L.marker([groupbyNameDate[i].values[0].values[0].Lat1, groupbyNameDate[i].values[0].values[0].Long1], {icon: cent20Marker}).addTo(y1900cluster);
                        }
                        testmarker1.bindPopup(groupbyNameDate[i].key + " " + popupcarousel, {
                            maxWidth: 220,
                            minWidth: 200
                        });
                    }
                }
                hrefarray = hrefarray.filter(onlyUnique);
                srcarray = srcarray.filter(onlyUnique);
                altarray = altarray.filter(onlyUnique);
            }
        }
    }
});

var overlayMaps = {
    "Leuven Places": parentGroup,
    "Religious Buildings": religiouscluster,
    "Public Places": civiccluster,
    "University Buildings": universitycluster,
    "Panoramic Views": panoramiccluster,
    "Parks & Waterways": parkcluster,
    "Objects": objectcluster,
    "16th Century Places": y1500cluster,
    "17th Century Places": y1600cluster,
    "18th Century Places": y1700cluster,
    "19th Century Places": y1800cluster,
    "20th Century Places": y1900cluster

};

L.control.layers(null, overlayMaps).addTo(mymap);
