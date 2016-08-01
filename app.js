$(document).ready(function() {
    //google geocoding API
    const API_KEY = "AIzaSyBst2dLYUIyELQrZMKtKg8QqSJ-1SDIFZk";

    //foursquare api
    const apicredentials = {
        clientID: "client_id=VBJLVDU1E2LGY5YRSU2GA5OPVUU5KNQVAOFWNPM5CCQHLIH0",
        clientSecret: "client_secret=ES11ZGZLL5T2RXXBJAZCYDIDNEXCRIMZ5ZLVBA2W3MQJQARA",
        dateVerified: "v=20140423"
    };

    var locations = [],
        venueName = "",
        venueID = "",
        geocoder,
        latLng = new google.maps.LatLng(40.7127, -74.0059); //default NYC


    function showData(response) {
        for (let i = 0; i < response.length; i++) {
            let venueLat = response[i].location.lat;
            let venueLng = response[i].location.lng;
            let venueHereNow = response[i].hereNow.count;

            locations.push({
                lat: venueLat,
                lng: venueLng
            });

            venueName = response[i].name;
            var URL = "https://www.foursquare.com/v/" + response[i].id;
            var checkins = response[i].stats.checkinsCount;

            var category = response[i].categories[0].name;
            var venueIcon = response[i].categories[0].icon.prefix + "bg_64.png";
            var address = !response[i].location.address ? "" : response[i].location.address;

            var city = !response[i].location.city ? "" : response[i].location.city;
            var state = !response[i].location.state ? "" : response[i].location.state;
            var zipcode = !response[i].location.postalCode ? "" : response[i].location.postalCode;

            var venueHTML = "<a target='_blank' href=" + URL + "><h2>" + [i + 1] + ".  " + venueName + "</h2></a>";

            var addressHTML = "<div>" + address + " " + city + " " + state + " " + zipcode + "</div>";
            var categoryHTML = "<div>" + category + "</div>";
            var checkinHTML = "<div>Here Now: " + venueHereNow + "</div><div>Total Check-ins: " + checkins + "</div>";
            var venueiconHTML = "<img class='icon' src=" + venueIcon + ">";

            $('.venueDetail').append("<div class='place'>" + venueHTML + addressHTML + '<div>' + venueiconHTML + checkinHTML + categoryHTML + "</div></div>");
            $(".place > div > div:not(:first-child)").addClass("place-detail");
            $(".place > div > div:last-child").css("color", "gray");
        }
    }
    var foursquareCred = apicredentials.clientID + "&" + apicredentials.clientSecret + "&" + apicredentials.dateVerified;
    var getData = function(latLng) {
        var lat = latLng.lat();
        var lng = latLng.lng();
        var url = "https://api.foursquare.com/v2/venues/trending?ll=" + lat + ',' + lng + "&limit=16&radius=5000&" + foursquareCred;

        $.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: false,
            url: url,
            success: function(response) {
                console.log(response)
                var res = response.response.venues;
                if (res.length) {
                    $('#no-match').hide();
                    $('.venueDetail').show();
                    $('.venueDetail').html('');
                    showData(res);
                } else {
                    $('#no-match').show();
                    $('.venueDetail').hide();
                }

            }
        });
    };
    var initialize = function(latLng) {
        geocoder = new google.maps.Geocoder();
        getData(latLng);
    };

    $("form").submit(function(event) {
        var address = $("#address").val();

        geocoder.geocode({ 'address': address }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                latLng = results[0].geometry.location;
                initialize(latLng);
            } else {
                alert('Geocode Unsuccessful: ' + status);
            }
        });
    });
    initialize(latLng).focus();
});