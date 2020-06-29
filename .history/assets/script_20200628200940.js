$(document).ready(function(){
//getWeatherData function re-renders the HTMLto display the appropriate content
$("#button-addon2").on("click",function(event) {
    event.preventDefault();
var now = moment().format("MMM Do YY");
var cityName = $("#city-input").val();
var apiKey = "5f584dea4905bdcfd827fd723b8f4edf";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName+"&units=imperial&appid=" + apiKey;
//Creating an AJAX call forthe specific search button being clicked
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
   var input = $("#city-name").html("<h1>"+response.name+"("+now+")" +"</h1>");
   $("#city-name").prepend(input);
    $("#temperature").text("Temperature:"+response.main.temp+"°F");
    $("#humidity").text("Humidity:"+response.main.humidity+"%");
    $("#wind-speed").text("Wind Speed:"+response.wind.speed+"MPH");
    







})
    
    
    
    
    })
}) 