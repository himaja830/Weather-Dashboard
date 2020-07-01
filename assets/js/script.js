$(document).ready(function () {

    displaycityNames();

    //Adding event listner to the search button 
    $("#button-addon2").on("click", function (event) {
        event.preventDefault();
        //Calling getAndDisplayCurrentWeather function when search button is clicked
        var cityName = $("#city-input").val();
        getAndDisplayCurrentWeather(cityName);
        setLocalStorage(cityName);
        displaycityNames();
    });

    // creating getAndDisplayCurrentWeather function which we called in event listner
    function getAndDisplayCurrentWeather(cityName) {
        var now = moment().format("MMM Do YY");
        var apiKey = "5f584dea4905bdcfd827fd723b8f4edf";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;
        //Creating an AJAX call to get current day weather details and displaying them
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("#city-name").html(response.name + " (" + now + ")");
            var weatherIcon = response.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
            $("#wicon").attr("src", iconUrl);
            $("#wicon").attr("alt", response.weather[0].description);
            $("#temperature").text("Temperature:" + response.main.temp + "°F");
            $("#humidity").text("Humidity:" + response.main.humidity + "%");
            $("#wind-speed").text("Wind Speed:" + response.wind.speed + "MPH");

            //generating lat & lon values from response
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            //Displaying UV index value along with current day weather 
            getAndDisplayUVIndex(lat, lon, apiKey);
            //Display next five days weather details
            getDailyForeCastDataAndDisplay(lat, lon, apiKey);
        })
    }

    //Creating getAndDisplayUVIndex function and making ajax calls to get UV index data for current weather using lat & lon values
    function getAndDisplayUVIndex(lat, lon, apiKey) {
        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon + "&cnt=1";
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) {
            $("#UV-index").text("UV Index:" + response.value);
            if (response.value > 6) {
                $("#UV-index").attr("class", ".badge badge-danger");
            }

        })
    }

    //Creating getDailyForeCastDataAndDisplay function and making ajax call to get daily weather details 
    function getDailyForeCastDataAndDisplay(lat, lon, apiKey) {
        var forecastURl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly,minutely,current&appid=" + apiKey;
        console.log('forecastURl', forecastURl);
        $.ajax({
            url: forecastURl,
            method: "GET"
        }).then(function (response) {
            console.log('dailyForeCastResponse', response);
            displayDailyForecast(response);
        });
    }

    // function to display weather data for next five days
    function displayDailyForecast(data) {

        $('.dailyForecast').remove();

        var weatherDate;
        var weatherIcon;
        var weatherIconAlt;
        var iconUrl;
        var temperature;
        var humidity;

        var cnt = 0;

        for (var i = 1; i < 6; i++) {
            var daily = data.daily[i];
            weatherDate = moment.unix(daily.dt).format("MM/DD/YYYY");
            weatherIcon = daily.weather[0].icon;
            weatherIconAlt = daily.weather[0].description;
            iconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
            temperature = daily.temp.day;
            humidity = daily.humidity;

            var cloneForecastElement = $('#dailyForecast').clone();
            cloneForecastElement.attr('id', cloneForecastElement.attr('id') + i);
            cloneForecastElement.addClass('dailyForecast');
            cloneForecastElement.show();
            cloneForecastElement.find('.dailyForecast-date').text(weatherDate);
            cloneForecastElement.find('.dailyForecast-icon').attr('src', iconUrl);
            cloneForecastElement.find('.dailyForecast-icon').attr('alt', weatherIconAlt);
            cloneForecastElement.find('.dailyForecast-temp').text(temperature + "F");
            cloneForecastElement.find('.dailyForecast-humidity').text(humidity);
            $('#forecastContainer').append(cloneForecastElement);


        }
    }
    // function to add input cityNames to local storage
    function setLocalStorage(data) {
        if (!getLocalStorage()) {
            localStorage.setItem("cityNames", JSON.stringify([]));
        }
        var cityNames = getLocalStorage();
        cityNames.push(data);
        localStorage.setItem("cityNames", JSON.stringify(cityNames));

    }
    // function to get citNames from localstorage
    function getLocalStorage() {
        var cityNames = localStorage.getItem('cityNames');
        return JSON.parse(cityNames);
    }
    // function to display city names on search history
    function displaycityNames() {
        var cityNames = getLocalStorage();
        $("#searchHistory").empty();
        if (cityNames) {
            for (cityName of cityNames) {
                $('#searchHistory').append('<div class="row history-city-name">' + cityName + '</div>');
            }
        }
    }
    //Adding event listner to clear button, So that when clicked clears search history
    $("#clearButton").on("click", function () {
        localStorage.removeItem("cityNames");
        displaycityNames();
    });

})