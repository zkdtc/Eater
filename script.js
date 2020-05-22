$(document).ready(function () {

  const $valueSpan = $('.valueSpan');
  const $value = $('#slider1');
  $valueSpan.html($value.val());
  $value.on('input change', () => {

    $valueSpan.html($value.val());
  });
});



var weatherbtn = $('#search-btn0');
weatherbtn.click(function () {
  getLocation();

})


// Add listner to the 'Search for Recipe button
$('#search-btn1').on("click", function (event) {
  event.preventDefault();
  retreiveRecipie();
})


function retreiveRecipie() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://recipe-puppy.p.rapidapi.com/?p=1&q=" + $('#recipe-value').val(),
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
      "x-rapidapi-key": "69873bfbe3mshc65b70ea31b76c8p14c4e2jsn321f5f41b73a"
    }
  }

  // First retrive three meals

  $.ajax(settings).done(function (response) {
    response = JSON.parse(response);


    for (i = 0; i < 3; i++) {
      index=Math.floor(Math.random()*response.results.length);
      var title = response.results[index].title;
      var url = response.results[index].href;
      var img = response.results[index].thumbnail;
      var ingredients = response.results[index].ingredients;
      $('#recipe-title' + String(i + 1)).text(title);
      $('#recipe-btn' + String(i + 1)).attr('href', url);
      $('#img' + String(i + 1)).attr('src', img);
      $('#ingredients'+String(i + 1)).text('Ingredients: '+ingredients);
    }
  })
};


// Add listner to the 'Search for Recipe button
$('#search-btn2').on("click", function (event) {
  event.preventDefault();
  retreiveRecipieByIngredients();
})


function retreiveRecipieByIngredients() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://recipe-puppy.p.rapidapi.com/?p=1&i=" + $('#ingredients-value').val(),
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
      "x-rapidapi-key": "69873bfbe3mshc65b70ea31b76c8p14c4e2jsn321f5f41b73a"
    }
  }

  // First retrive three meals

  $.ajax(settings).done(function (response) {
    response = JSON.parse(response);
    console.log(response);

    for (i = 0; i < 3; i++) {
      index=Math.floor(Math.random()*response.results.length);
      var title = response.results[index].title;
      var url = response.results[index].href;
      var img = response.results[index].thumbnail;
      var ingredients = response.results[index].ingredients;
      $('#recipe-title' + String(i + 1)).text(title);
      $('#recipe-btn' + String(i + 1)).attr('href', url);
      $('#img' + String(i + 1)).attr('src', img);
      $('#ingredients'+String(i + 1)).text('Ingredients: '+ingredients);
    }
  })
};

// Add listner to the 'Search for Recipe button
$('#search-btn3').on("click", function (event) {
  event.preventDefault();
  retreiveRecipieByBoth();
})


function retreiveRecipieByBoth() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://recipe-puppy.p.rapidapi.com/?p=1&i=" + $('#ingredients-value').val()+"&q=" + $('#recipe-value').val(),
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
      "x-rapidapi-key": "69873bfbe3mshc65b70ea31b76c8p14c4e2jsn321f5f41b73a"
    }
  }

  // First retrive three meals

  $.ajax(settings).done(function (response) {
    response = JSON.parse(response);
    console.log(response);

    for (i = 0; i < 3; i++) {
      index=Math.floor(Math.random()*response.results.length);
      var title = response.results[index].title;
      var url = response.results[index].href;
      var img = response.results[index].thumbnail;
      var ingredients = response.results[index].ingredients;
      $('#recipe-title' + String(i + 1)).text(title);
      $('#recipe-btn' + String(i + 1)).attr('href', url);
      $('#img' + String(i + 1)).attr('src', img);
      $('#ingredients'+String(i + 1)).text('Ingredients: '+ingredients);
    }
  })
};






function getLocation() {
  $('#weather-heading').text('');
  $('#weather-heading').text('Loading');
  // Make sure browser supports this feature
  if (navigator.geolocation) {
    // Provide our showPosition() function to getCurrentPosition
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  else {
    alert("Geolocation is not supported by this browser.");
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


      var temp = parseInt(response.main.temp);
      var feelsLikeTemp = parseInt(response.main.feels_like);
      var heading = $('#weather-heading');
      heading.text('');
      var weatherRecipeDiv = $('.weather-div');
      var iconTag = $('<img>');
      var iconCode = response.weather[0].icon;
      var icon = iconTag.attr('src', 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png');
      iconTag.attr('style', 'width:50px; height:50px;');

      var stayWarmArray = ['squash', 'potatoe', 'oats', 'broth', 'soup', 'meat', 'chili', 'ginger', 'brown rice', 'garlic', 'coconut oil'];
      var stayCoolArray = ['cucumber', 'watermelon', 'smoothie', 'apple', 'pineapple', 'orange', 'avocado', 'melon', 'grapes', 'berries'];
      console.log(temp);
      console.log(feelsLikeTemp);

      if (temp < 68 || feelsLikeTemp < 68) {
        heading.append('Your Curent Temperature is ' + temp + ' \xB0', 'F ');
        heading.append(icon)
        heading.append(' Chilly. Stay Warm With These Recipes:');
        index = Math.floor(Math.random() * stayWarmArray.length);
        $('#recipe-value').val(stayWarmArray[index]);
        retreiveRecipie();

        //split ingredients array in the recipe object(?) if title contents or at ingrediens in recipe object matches 2 an item in the stayWarmArray/stayCoolArray, display the first 3 recipes

      }
      else {
        heading.append('Your Curent Temperature is ' + temp + ' \xB0', 'F ');
        heading.append(icon)
        heading.append('Warm... Stay cool With These Recipes:');
        index = Math.floor(Math.random() * stayCoolarray.length);
        $('#recipe-value').val(stayCoolArray[index]);
        retreiveRecipie();
      }
    })
}

var clicky = document.querySelector("#search-btn1")
var searches = document.querySelector("#recipe-value")
var storedKeywords = document.querySelector(".stored-keywords")
clicky.addEventListener("click", recentSearchList)



function recentSearchList() {
  var searchString = searches.value

  let recentItems = localStorage.getItem("recentItems")
  if (!recentItems) {
    recentItems = []
  }
  else {
    recentItems = JSON.parse(recentItems)
  }

  recentItems.push(searchString)
  while (recentItems.length > 10) {
    recentItems.shift()
  }

  localStorage.setItem("recentItems", JSON.stringify(recentItems))
  updateRecentSearches()
}

function updateRecentSearches() {
  storedKeywords.innerHTML = ""
  let recentItems = localStorage.getItem("recentItems")
  if (!recentItems) {
    return
  }
  recentItems = JSON.parse(recentItems)
  for (let index = 0; index < recentItems.length; index++) {
    const element = recentItems[index];
    var button = document.createElement("button")
    button.textContent = element
    var br = document.createElement("br")
    button.setAttribute("class", "btn btn-danger button m-2")
    storedKeywords.prepend(br)
    storedKeywords.prepend(button)
  }
}
updateRecentSearches()

