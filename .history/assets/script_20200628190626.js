$(document).ready(function(){
//getWeatherData function re-renders the HTMLto display the appropriate content
$("#button-addon2").on("click",function(event) {
    event.preventDefault();
var cityName = $("#city-input").val();
var apiKey = "5f584dea4905bdcfd827fd723b8f4edf";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName+"&units=imperial&appid=" + apiKey;
console.log(cityName);
console.log(queryURL);
//Creating an AJAX call forthe specific search button being clicked
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);









})
    
    
    
    
    })
}) 