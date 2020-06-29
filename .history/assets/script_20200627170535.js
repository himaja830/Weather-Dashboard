$(document).ready(function(){
//getWeatherData function re-renders the HTMLto display the appropriate content
function getWeatherData(){
var cityName = $("#city-input");
var APIkey = "bb43f41b7ee7fd144353daa5cfbf158d";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q="+cityName+"&cnt={6}&appid=" + APIKey;

//Creating an AJAX call forthe specific search button being clicked
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
})
    
    
    
    
    }

})     