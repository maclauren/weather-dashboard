$(document).ready(function() {
  // submit form
  $("#search-form").submit(function(event) {
      event.preventDefault();
  
  // get city name from input field
      var city = $("#search-input").val();
      var apiKey = "bf50e52814990375acd6fc88460c1de0";
  
  // fetch city coordinates
      var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
  
  // ajax to use apiUrl to gete lat and lon
      $.ajax({
          url: apiUrl,
          method: "GET"
          
  // then function for response to create
      }).then(function(response) {
          var lat = response.city.coord.lat;
          var lon = response.city.coord.lon;
          var newApiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
  
  
  // TODO: Create an object with city lat long, save to local storage if a response comes back
  
  
  // new ajax to fetch newApiUrl data to add city, country, temperature
          $.ajax({
              url: newApiUrl,
              method: "GET",
              success: function(data) {
                  var city = data.city.name;
                  var country = data.city.country;
                  var temperature = data.list[0].main.temp;
                  var humidity = data.list[0].main.humidity;
                  var windSpeed = data.list[0].wind.speed;
                  var date = moment(data.list[0].dt_txt).format('dddd, MMMM Do YYYY, h:mm:ss a');
  
  // displayHistory()
  var history = JSON.parse(localStorage.getItem("cities")) || []
  history.push(city)
  localStorage.setItem("cities", JSON.stringify(history))
  
                  $("#today").html("<h2>" + city + ", " + country + "</h2><p>Temperature: " + temperature + "</p><p>Humidity: " + humidity + "</p><p>Wind Speed: " + windSpeed + "</p><p>Date: " + date + "</p>");
                },
                error: function(error) {
                  console.log(error);
                }
              });
              var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
  
              // ajax to use the lat, lon and apiKey to get weather forecast data
              $.ajax({
                  url: apiUrl,
                  method: "GET"
              }).then(function(response) {
          // variables for response data
                  var data = response.list;
                  var date = new Date();
                  var currentDay = date.getDate();
                  var currentMonth = date.getMonth();
          console.log(response)
          var elementIndex = 0
          // loop to get 5 days after currentday
                  for (var i = 7; i < data.length; i+=8) {
                      var forecastDate = new Date(data[i].dt_txt);
                      var forecastDay = forecastDate.getDate();
                      var forecastMonth = forecastDate.getMonth();
          console.log(forecastDay == currentDay + 1 && forecastMonth == currentMonth)
                      // if (forecastDay == currentDay + 1 && forecastMonth == currentMonth) {
                          var forecastTemperature = data[i].main.temp;
                          var forecastHumidity = data[i].main.humidity;
                          var forecastWindSpeed = data[i].wind.speed;
                          var forecastDate = moment(forecastDate).format("MM/DD/YYYY");
          console.log($(`#card${elementIndex}.date`))
          // add data to cards
                          $(`#card${elementIndex}-date`).text(forecastDate);
                          $(`#card${elementIndex}-temp`).text("Temperature: " + forecastTemperature + "°C");
                          $(`#card${elementIndex}-humidity`).text("Humidity: " + forecastHumidity + "%");
                          $(`#card${elementIndex}-wind`).text("Wind Speed: " + forecastWindSpeed + "m/s");
                          elementIndex++
                      }
                  // }
              })
            })
          });
  
        })