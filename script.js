$(document).ready(function() {
	const MAX_HISTORY_LENGTH = 6;
	const API_KEY = "bf50e52814990375acd6fc88460c1de0";

	function lookupWeatherForCity(city) {
		// fetch city coordinates
		let cityApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + API_KEY;

		// ajax to use cityApiUrl to get lat and lon
		$.ajax({
			url: cityApiUrl,
			method: "GET"
		}).then(function(response) { // then function for response to create
			let lat = response.city.coord.lat;
			let lon = response.city.coord.lon;

			let locApiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY;

			// new ajax to fetch locApiUrl data to add city, country, temperature
			$.ajax({
				url: locApiUrl,
				method: "GET",
				success: function(data) {
					let city = data.city.name;
					let country = data.city.country;
					let temperature = data.list[0].main.temp - 273.15; // convert to Celcius
					let humidity = data.list[0].main.humidity;
					let windSpeed = data.list[0].wind.speed;
					let date = moment(data.list[0].dt_txt).format('dddd, MMMM Do YYYY, h:mm:ss a');

					let icon = `<img class="weather-icon-today" src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png">`;

					let history = JSON.parse(localStorage.getItem("cities")) || [];
					history.push(city);
					history = history.slice(-MAX_HISTORY_LENGTH);
					localStorage.setItem("cities", JSON.stringify(history));
					displayHistory();

					$("#today").html(icon + "<h2>" + city + ", " + country + "</h2><p>Temperature: " + temperature.toFixed(2) + " °C</p><p>Humidity: " + humidity + "</p><p>Wind Speed: " + windSpeed + "</p><p>Date: " + date + "</p>");
				},
				error: function(error) {
				console.log(error);
				}
			});

			let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY;

			// ajax to use the lat, lon and API_KEY to get weather forecast data
			$.ajax({
				url: apiUrl,
				method: "GET"
			}).then(function(response) {
				// letiables for response data
				let data = response.list;
				let date = new Date();
				let currentDay = date.getDate();
				let currentMonth = date.getMonth();
				console.log(response)
				let elementIndex = 0
				// loop to get 5 days after currentday
				for (let i = 7; i < data.length; i+=8) {
					let forecastDate = new Date(data[i].dt_txt);
					let forecastDay = forecastDate.getDate();
					let forecastMonth = forecastDate.getMonth();
					console.log(forecastDay == currentDay + 1 && forecastMonth == currentMonth)
					// if (forecastDay == currentDay + 1 && forecastMonth == currentMonth) {
					let forecastTemperature = data[i].main.temp - 273.15; // convert to Celcius
					let forecastHumidity = data[i].main.humidity;
					let forecastWindSpeed = data[i].wind.speed;
					forecastDate = moment(forecastDate).format("D MMMM");
					console.log($(`#card${elementIndex}.date`))

					// add data to cards
					$(`#card${elementIndex}-icon`).attr("src", `http://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png`);
					$(`#card${elementIndex}-date`).text(forecastDate);
					$(`#card${elementIndex}-temp`).text("Temperature: " + forecastTemperature.toFixed(2) + " °C");
					$(`#card${elementIndex}-humidity`).text("Humidity: " + forecastHumidity + "%");
					$(`#card${elementIndex}-wind`).text("Wind Speed: " + forecastWindSpeed + "m/s");
					elementIndex++
					// }
				}
			});
		});
	}

	// submit form
	$("#search-form").submit(function(event) {
		event.preventDefault();

		// get city name from input field
		let city = $("#search-input").val();

		lookupWeatherForCity(city);
	});
  
  	$(document).ready(function() {
		// check if city is saved
		if (localStorage.getItem("city")) {
			// get city from local storage
			let city = localStorage.getItem("city");
			// search for saved city
			$("#search-input").val(city);
			$("#search-form").submit();
		}
	});

	
	function displayHistory() {
		// save searches
		let history = JSON.parse(localStorage.getItem("cities")) || []
		localStorage.setItem("cities", JSON.stringify(history))
		$("#history").empty()
		for (let i = history.length-1; i >= 0; i--) {
			let city = history[i];
			let cityEl = $("<div class='history-item theme-card'></div>");
			cityEl.text(city);
			cityEl.click(() => {
				lookupWeatherForCity(city);
			});
			$("#history").append(cityEl)
		}
	}
	displayHistory();
});