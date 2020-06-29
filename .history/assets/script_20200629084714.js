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
    $("#city-name").html(response.name + " (" + now + ")" );
   var weatherIcon = response.weather[0].icon;
   var iconUrl = "http://openweathermap.org/img/w/"+weatherIcon+".png";
   $("#wicon").attr("src",iconUrl);
   $("#wicon").attr("alt",response.weather[0].description);
    $("#temperature").text("Temperature:"+response.main.temp+"°F");
    $("#humidity").text("Humidity:"+response.main.humidity+"%");
    $("#wind-speed").text("Wind Speed:"+response.wind.speed+"MPH");
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid="+ apiKey+ "& lat=" + lat + "&lon=" + lon + "&cnt=1";
    console.log(uvURL);
    







})
    
    
    
    
    })
}) 