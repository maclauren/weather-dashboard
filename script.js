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
      })})})