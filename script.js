$(document).ready(function () {

  const $valueSpan = $('.valueSpan');
  const $value = $('#slider1');
  $valueSpan.html($value.val());
  $value.on('input change', () => {

    $valueSpan.html($value.val());
  });

  var checkbox = $('#use-weather');
  checkbox.click(function () {
    checkBox();
    getLocation();
  })
  function checkBox() {
    if (checkbox.hasClass('checked')) {
      checkbox.removeClass('checked');
    }

<<<<<<< HEAD
// Add listner to the 'Search for Recipe button
$('#search-btn1').on("click", function (event) {
  event.preventDefault();
  retreiveRecipie();
})


function retreiveRecipie() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://recipe-puppy.p.rapidapi.com/?p=1&q="+$('#recipe-value').val(),
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
      "x-rapidapi-key": "69873bfbe3mshc65b70ea31b76c8p14c4e2jsn321f5f41b73a"
    }
  }

  // First retrive three meals

  $.ajax(settings).done(function (response) {
    response=JSON.parse(response);


    for (i = 0; i < 3; i++) {
      var title = response.results[i].title;
      var url = response.results[i].href;
      var img = response.results[i].thumbnail;
      $('#recipe-title' + String(i + 1)).text(title);
      $('#recipe-btn' + String(i + 1)).attr('href', url);
      $('#img'+String(i+1)).attr('src',img);
=======
    else {
      checkbox.addClass('checked');
    }
  }

  function getLocation() {
    // Make sure browser supports this feature
    if (checkbox.hasClass('checked')) {
      if (navigator.geolocation) {
        // Provide our showPosition() function to getCurrentPosition
        navigator.geolocation.getCurrentPosition(showPosition);
      }
      else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  }

  // This will get called after getCurrentPosition()
  function showPosition(position) {
    // Grab coordinates from the given object
    console.log(position);
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log("Your coordinates are Latitude: " + lat + " Longitude " + lon);

    var APIKey = "69299ee3f1473733a3c1d646aa060339";
    var queryURLWeather = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;

    $.ajax({
      url: queryURLWeather,
      method: "GET"
    })
      .then(function (response) {
        console.log('response', response);


        var temp = response.main.temp;
        var feelsLikeTemp = response.main.feels_like;
        var heading = $('.weather-heading');
        var weatherRecipeDiv = $('.weather-div');
        var iconTag = $('<img>');
        var iconCode = response.weather[0].icon;
        var icon = iconTag.attr('src', 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png');
        var stayWarmArray = ['squash', 'potatoe', 'oats', 'broth', 'soup', 'meat', 'chili', 'ginger', 'brown rice', 'garlic','coconut oil'];
        var stayCoolArray = ['cucumber', 'watermelon', 'smoothie', 'apple', 'pineapple', 'orange', 'avocado', 'melon', 'grapes', 'berries'];

        if (temp < '68' || feelsLikeTemp < '68') {
          weatherRecipeDiv.removeClass('hide');
          heading.append('Your Curent Temperature is ' + temp + ' \xB0', 'F ' + icon + ' And it Feels Like ' + feelsLikeTemp + ' \xB0', 'F. Looks Kinda Chilly. Stay Warm With These Recipes:');

          //split ingredients array in the recipe object(?) if title contents or at ingrediens in recipe object matches 2 an item in the stayWarmArray/stayCoolArray, display the first 3 recipes

        }
        else {
          weatherRecipeDiv.removeClass('hide');
          heading.append('Your Curent Temperature is ' + temp + ' \xB0', 'F ' + icon + ' And it Feels Like ' + feelsLikeTemp + ' \xB0', 'F. Looks Warm. Stay Cool With These Recipes:');
        }
      })
  }


>>>>>>> master




  // Add listner to the 'Search for Recipe button
  $('#search-btn1').on("click", function (event) {
    event.preventDefault();
    retreiveRecipieGivenCalorie();
  })


  function retreiveRecipieGivenCalorie() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?targetCalories=" + $('#slider1').val() + "&timeFrame=day",
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        // "x-rapidapi-key": "69873bfbe3mshc65b70ea31b76c8p14c4e2jsn321f5f41b73a"
      }
    }

    // First retrive three meals

    $.ajax(settings).done(function (response) {
      console.log(response);


      for (i = 0; i < 3; i++) {
        var title = response.meals[i].title;
        var url = response.meals[i].sourceUrl;
        var id = response.meals[i].id;
        $('#recipe-title' + String(i + 1)).text(title);
        $('#recipe-btn' + String(i + 1)).attr('href', url);
        // Retrieve recipe summaries for each meal
        var settings = {
          "async": false,
          "crossDomain": true,
          "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + id + "/summary",
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "69873bfbe3mshc65b70ea31b76c8p14c4e2jsn321f5f41b73a"
          }
        }

        $.ajax(settings).done(function (response2) {
          console.log(response2);
          var summary = response2.summary;
          $('#recipe-description' + String(i + 1)).html(summary);

        });

      }

    });
  }

});