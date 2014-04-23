$(document).ready( function() {
	//google geocoding API
	var API_KEY="AIzaSyBst2dLYUIyELQrZMKtKg8QqSJ-1SDIFZk";
	//foursquare API
    var oauthToken= "oauth_token=ES11ZGZLL5T2RXXBJAZCYDIDNEXCRIMZ5ZLVBA2W3MQJQARA";
    var clientID = "client_id=VBJLVDU1E2LGY5YRSU2GA5OPVUU5KNQVAOFWNPM5CCQHLIH0";
    var clientSecret = "client_secret=ES11ZGZLL5T2RXXBJAZCYDIDNEXCRIMZ5ZLVBA2W3MQJQARA";
    var dateVerified = "v=20140423";

    //variables
    var locations = [];
    var venueName = "";
    var venueID = "";
    console.log(venueID);
    var geocoder;
    var latLng = new google.maps.LatLng(40.7127,-74.0059);


function showData(response){
    $('#venueResult').html('');
		for(var i=0; i<response.response.venues.length; i++){
			var venueLat = response.response.venues[i].location.lat;
			var venueLng = response.response.venues[i].location.lng;
			var venueHereNow = response.response.venues[i].hereNow.count;
				
				locations[i] = {};
				locations[i].lat = venueLat;
				locations[i].lng = venueLng;

				venueName = response.response.venues[i].name;
				venueID = response.response.venues[i].id;
				var URL = response.response.venues[i].url;
				var checkins = response.response.venues[i].stats.checkinsCount;
				
				var category = response.response.venues[i].categories[0].name;
				var venueIcon = response.response.venues[i].categories[0].icon.prefix+"bg_64.png";
				var address = response.response.venues[i].location.address;
				var city =  response.response.venues[i].location.city;
				var state = response.response.venues[i].location.state;
				var zipcode = response.response.venues[i].location.postalCode;
		
			var venueidHTML = "<div class='venueID-field'>"+ venueID + "</div>";
			var venueHTML = "<a href=" + URL + "><div class='venueName-field'><h2>" +[i+1]+ ".  " + venueName + "</h2></div></a>";
			var addressHTML = "<div class='address-field'><h3>"+ address + " " + city + ", " + state + " " + zipcode+"</h3></div>";
			var categoryHTML = "<div class='category-field'><p>(" + category + ")</p></div>";
			var checkinHTML = "<p class='herenow'>Here Now: " + venueHereNow +"<span class='checkins'>Checkins: " + checkins + "</span></p>";
			var venueiconHTML = "<img class='icon' src=" + venueIcon + ">";
			$(".venueDetail").append(venueHTML + "<p>" + checkinHTML + "</p>" + "<p>" + addressHTML + "</p>" + "<p>" + categoryHTML + "</p>");
			$(".venueIcon").append(venueiconHTML);
			//$(".placeName").append(venueHTML);
			//$(".numberCheckin").append(checkinHTML);
			//$(".venueAddress").append(addressHTML);
			//$(".venueType").append(categoryHTML);
	}
}

	var getData = function(latLng){
		var lat = latLng.lat();
		var lng = latLng.lng();
		var url = "https://api.foursquare.com/v2/venues/trending?ll=" + lat + ',' + lng + "&limit=17&radius=5000&" +clientID + "&" + clientSecret + "&" + dateVerified;
		console.log(url);
	$.ajax({
		type:"GET",
		dataType:"jsonp",
		cache:false,
		url:url,
		success: function(response){
			console.log(response);
			showData(response);
		}
	});
};
	$("#geocode-search").submit( function(event){
	var address = $("#address").val();
	console.log(address);

	geocoder.geocode({'address': address}, function(results, status){
		if(status == google.maps.GeocoderStatus.OK){
			latLng = results[0].geometry.location;
			initialize(latLng);
			console.log(initalize(latLng));
		}
		else{
			alert('Geocode Unsuccessful: ' +status);
		}
		});
});
	var initialize = function(latLng){
    geocoder = new google.maps.Geocoder();
    getData(latLng);
	};
initialize(latLng);
});

//var venuePhoto = response.response.venues[i].id.photos;
//var venuephotoHTML = "<div class='venuePhoto'>" + venuePhoto + "</div>";
//$(".venueImage").append(venuephotoHTML);
/*var getPhoto = function(){
		var id = venueID.val;
		var url = "https://api.foursquare.com/v2/venues/" + id + "/photos?limit=4&" +clientID + "&" + clientSecret + "&" + dateVerified;
	$.ajax({
		type:"GET",
		dataType: "jsonp",
		cache:false,
		url:url,
		success: function(response){
			getPhoto(response);
		}
	});
};
getPhoto();
*/