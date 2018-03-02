$(document).ready(function(){
	var lat;
	var lon;
	var string;
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
	  	lat = 'lat=' + position.coords.latitude;
	  	lon = 'lon=' + position.coords.longitude;
	  	string = lon + '&' + lat;
	  	getWeather(string);
	    // $(".main").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
	  });
	}

	function getWeather(string) {
		var api = "https://fcc-weather-api.glitch.me/api/current?" + string
		$.getJSON(api, function(json){
			var html;
			var temp = json.main.temp;
			html += '<ul id="weather">'
			html += '<li>' + 'The current weather in ' + json.name + ", " + 
			json.sys.country + " is:" + '<br>' + json.weather[0].main;
			html += '<li class="icon"></li>'
			html += '<li id="main">' + 'Temperature:  ' + '<span class="temp">' + temp + '</span' + '<span class="symbol"> C</span></li>'
			html += '</li>' + 'Humidity:  ' + json.main.humidity + '</li>' + '<br>'
			html += '</li>' + 'Wind speed:  ' + json.wind.speed + '</li>' + '<br>'
			html += '</li>' + 'Wind direction:  ' + json.wind.deg + '</li>' + '<br>'
			html += '</ul';
			$(".main").html(html);

			var iconCode = json.weather[0].icon;
			$(".icon").html('<img src=' + iconCode + '>');

		})
		$(".temp").on("click", function(){
			if ($("span.symbol").text() == "C") {
				var theTemp = parseFloat($(".temp").text());
				var toFar = (theTemp*1.8)+32;
				$(".temp").text(toFar);
			} else {
				var toCelc = (parseFloat$((".temp").text())-32)/1.8;
				$(".temp").text(toCelc);
			}
		})
		// (valNum*1.8)+32;
// 		function convert(valNum){
// 		  valNum = parseFloat(valNum);
// 		  (valNum-32) / 1.8;
// }
		// }
	}
//things I want = weather[0].main, weather[0].description, icon
//main.temp, maybe base.stations, main.humidity, temp_min, temp_max; wind.speed, wind.deg;
//sys.country; json.name
}) //end doc ready
