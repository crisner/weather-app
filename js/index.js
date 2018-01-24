
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
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var urlApi = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&result_type=country|administrative_area_level_1|administrative_area_level_2&key=AIzaSyBlfhTguKmRPS94B4TAsEaX7iS-AocGyIE";
    var urlWeatherApi = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=506418f083c7eea828e460c367e1359f";
    console.log(urlWeatherApi);
    $.getJSON(urlApi, displayLocation);
    $.getJSON(urlWeatherApi, displayWeather);
}

function displayLocation(json) {
    var location = "";
    location =  json.results[0].address_components[0].long_name+", "+
                json.results[0].address_components[1].long_name+", "+
                json.results[0].address_components[2].short_name;
    $("#location").html(location);
}

function displayDate() {
    var today = new Date();
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = weekday[today.getDay()];
    return day;
}

function displayTime() {
    var today = new Date();
    var hour = today.getHours();
    var noOfHours = 12;
    var currentTime = "";
    // Convert to 12-hour time format
    // if hour is less than 12
    if (hour < noOfHours) {
        currentTime = hour + ":00 AM";
    // if hour is equal to 12
    } else if (hour == noOfHours) {
        currentTime = hour + ":00 PM";
    } else {
        // if hour equal to 24
        if ((hour - noOfHours) == 12) {
            currentTime = "00:00 AM";
        }
        // if hour is more than 12
        currentTime = (hour - noOfHours) + ":00 PM";
    }
    return currentTime;
}

function displayWeather(json) {
    var weather = json.weather[0].main;
    var temp = json.main.temp;
    var celsius = convertKtoCelsius(temp);
    var fahrenheit =convertKtoFahrenheit(temp);
    // Display weather parameters
    $("#weather").html(weather);
    $("#temp").html(fahrenheit);
    // Display time parameters
    $("#day").html(displayDate());
    $("#time").html(displayTime());
}

function convertKtoCelsius(num) {
    return Math.round(num - 273.15);
}

function convertKtoFahrenheit(num) {
    return Math.round((num * (9/5)) - 459.67);
}

function handleLocationError(browserHasGeolocation) {
    alert(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
}