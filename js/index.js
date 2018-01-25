
function getCoords() {
    // HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocation, function() {
               handleLocationError(true);
           });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false);
     }
}

function getLocation(position) {
    // Get position
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var urlApi = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&result_type=country|administrative_area_level_1|administrative_area_level_2&key=AIzaSyBlfhTguKmRPS94B4TAsEaX7iS-AocGyIE";
    var urlWeatherApi = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=506418f083c7eea828e460c367e1359f";
    // Call to Google api
    $.getJSON(urlApi, displayLocation);
    // Call to weather api
    $.getJSON(urlWeatherApi, displayWeather);
}

function displayLocation(json) {
    var location = "";
    // Get location names
    location =  json.results[0].address_components[0].long_name+", "+
                json.results[0].address_components[1].long_name+", "+
                json.results[0].address_components[2].short_name;
    // Display location name
    $("#location").html(location);
}

function displayWeather(json) {
    var weather = json.weather[0].description;
    var temp = json.main.temp;
    var humidity = "<p>Humidity: " + json.main.humidity + " %</p>";
    var windSpeed = "<p>Wind: " + json.wind.speed + " m/s</p>";
    var weatherId = json.weather[0].id;
    var celsius = convertKtoCelsius(temp);
    var fahrenheit = convertKtoFahrenheit(temp);
    var weatherCode = json.weather[0].icon;

    // Display weather parameters
    $("#weather").html(weather);
    $("#temp").html(celsius);
    $("#humidity").html(humidity);
    $("#windspeed").html(windSpeed);

    if ($("#temp").html() === celsius) {
        $("#celsius").addClass("active-temp");
    } else {
        $("#fahrenheit").addClass("active-temp");
    }
    // Change button states
    $("#celsius").on("click", function() {
        $("#temp").html(celsius);
        $("#fahrenheit").removeClass("active-temp");
        $("#celsius").addClass("active-temp");
    });
    $("#fahrenheit").on("click", function() {
        $("#temp").html(fahrenheit);
        $("#celsius").removeClass("active-temp");
        $("#fahrenheit").addClass("active-temp");
    });

    // Display time parameters
    $("#day").html(displayDate());
    $("#time").html(displayTime());

    // Display background image
    displayBackgroundImage(weatherCode);

    // Display weather icon
    displayIcon(weatherId);
}

function displayDate() {
    // Get today's date
    var today = new Date();
    // Get current day of the week
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = weekday[today.getDay()];
    return day;
}

function displayTime() {
    // Get today's date
    var today = new Date();
    // Get current time
    var hour = today.getHours();
    var minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    var noOfHours = 12;
    var currentTime = "";
    // Convert to 12-hour time format
    // if hour is equal than 0
    if (hour == 0) {
        currentTime = 12 + ":" + minutes + " AM";
    // if hour is less than 12
    } else if (hour < noOfHours) {
        currentTime = hour + ":" + minutes + " AM";
    // if hour is equal to 12
    } else if (hour == noOfHours) {
        currentTime = hour + ":" + minutes + " PM";
    } else {
    // if hour is more than 12
        currentTime = (hour - noOfHours) + ":" + minutes + " PM";
    }
    return currentTime;
}

function displayBackgroundImage(weatherCode) {
    // Display background according to the weather
    switch(weatherCode) {
        case "01d":
            $("body").css("background-image", "url('https://crisner.github.io/weather-app/images/sebastien-gabriel-13684.jpg')");
            break;
        case "01n":
            $("body").css("background-image", "url('https://crisner.github.io/weather-app/images/massimiliano-reginato-357364.jpg')");
            break;
        case "02d":
        case "03d":
            $("body").css("background-image", "url('https://crisner.github.io/weather-app/images/vashti-collins-53161.jpg')");
            break;
        case "02n":
        case "03n":
            $("body").css("background-image", "url('https://crisner.github.io/weather-app/images/jack-b-389959.jpg')");
            break;
        case "04d":
            $("body").css("background-image", "url('https://crisner.github.io/weather-app/images/matthew-kane-77216.jpg')");
            break;
        case "04n":
            $("body").css("background-image", "url('https://crisner.github.io/weather-app/images/dorin-vancea-215017.jpg')");
            break;
        case "09d":
        case "10d":
            $("body").css("background-image", "url('https://crisner.github.io/weather-app/images/thanun-buranapong-179.jpg')");
            break;
        case "09n":
        case "10n":
            $("body").css("background-image", "url('https://crisner.github.io/weather-app/images/gabriele-diwald-201135.jpg')");
            break;
        case "11d":
            $("body").css("background-image", "url('https://crisner.github.io/weather-app/images/john-fowler-397527.jpg')");
            break;
        case "11n":
            $("body").css("background-image", "url('https://crisner.github.io/weather-app/images/riccardo-chiarini-260264.jpg')");
            break;
        case "13d":
            $("body").css("background-image", "url('https://crisner.github.io/weather-app/images/max-sandelin-239035.jpg')");
            break;
        case "13n":
            $("body").css("background-image", "url('https://crisner.github.io/weather-app/images/grant-lemons-68726.jpg')");
            break;
        case "50d":
            $("body").css("background-image", "url('https://crisner.github.io/weather-app/images/sunbeam-fog-autumn-nature-69825.jpeg')");
            break;
        case "50n":
            $("body").css("background-image", "url('https://crisner.github.io/weather-app/images/pexels-photo-327308.jpeg')");
            break;
        default:
            $("body").css("background-image", "url('https://crisner.github.io/weather-app/images/ryan-waring-366060.jpg')");
    }
}

function displayIcon(weatherId) {
    // If weatherId value is available display deafault icons
    var iconClass = "wi wi-owm-" + weatherId;
    var icon;
    // If weatherId value is outside the available values
    if (weatherId < 200 || weatherId > 957) {
        // Get today's date
        var today = new Date();
        // Get current time
        var hour = today.getHours();
        if (hour < 19) {
            iconClass = "wi wi-day-sunny";
        } else {
            iconClass = "wi wi-night-clear";
        }
    }
    // Fix for wi-own-701 class for mist
    if (weatherId === 701) {
        // Get today's date
        var today = new Date();
        // Get current time
        var hour = today.getHours();
        if (hour < 19) {
            iconClass = "wi wi-day-fog";
        } else {
            iconClass = "wi wi-night-fog";
        }
    }
    // Display icon
    icon = "<i class='"+ iconClass +"'></i>";
    $("#icon").html(icon);
}


function convertKtoCelsius(num) {
    // Convert Kelvin to Celsius
    var celsius = Math.round(num - 273.15) + "<i class=\"wi wi-degrees\"></i>";
    return celsius;
}

function convertKtoFahrenheit(num) {
    // Convert Kelvin to Fahrenheit
    var fahrenheit = Math.round((num * (9/5)) - 459.67) + "<i class=\"wi wi-degrees\"></i>";
    return fahrenheit;
}

function handleLocationError(browserHasGeolocation) {
    alert(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
}