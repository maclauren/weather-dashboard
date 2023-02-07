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
  
              }})})})})