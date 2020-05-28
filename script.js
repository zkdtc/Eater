var recipeColumn = $('.recipe-column')
var weatherbtn = $('#search-btn0');

weatherbtn.click(function () {
  $('#weather-heading').text('');
  $('#weather-heading').text('Loading...');
  getLocation();
})

function getLocation() {
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
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  var APIKey = "69299ee3f1473733a3c1d646aa060339";
  var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;

  $.ajax({
    url: queryURLWeather,
    method: "GET"
  })
    .then(function (response) {
      console.log('response', response);


      var temp = parseInt(response.main.temp);
      var heading = $('#weather-heading');
      heading.text('');
      var iconTag = $('<img>');
      var iconCode = response.weather[0].icon;
      var icon = iconTag.attr('src', 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png');
      iconTag.attr('style', 'width:50px; height:50px;');

      var stayWarmArray = ['squash', 'potatoe', 'oats', 'broth', 'hot', 'soup', 'meat', 'chili', 'ginger', 'brown rice', 'garlic', 'coconut oil', 'potatoe', 'roast'];
      var stayCoolArray = ['cucumber', 'smoothie', 'cold', 'taco', 'avocado', 'melon', 'ice', 'berries', 'salad', 'champagne'];

      if (temp < 68 || temp < 68) {
        heading.append('Current Temperature is ' + temp + ' \xB0', 'F ');
        heading.append(icon)
        heading.append(' Stay Warm With These Recipes:');
        index = Math.floor(Math.random() * stayWarmArray.length);
        var warm = stayWarmArray[index];
        retrieveRecipie(warm);
        console.log('retrieveRecipie(warm)', retrieveRecipie(warm));

        //split ingredients array in the recipe object(?) if title contents or at ingrediens in recipe object matches 2 an item in the stayWarmArray/stayCoolArray, display the first 3 recipes
      }

      else {
        heading.append('Current Temperature is ' + temp + ' \xB0', 'F ');
        heading.append(icon)
        heading.append(' Stay Cool With These Recipes:');
        index = Math.floor(Math.random() * stayCoolArray.length);
        var cool = stayCoolArray[index];
        retrieveRecipie(cool);
        console.log('retrieveRecipie(cool)', retrieveRecipie(cool))
      }
    }) 
}

// Add listner to the 'Search for Recipe button
$('#search-btn1').on("click", function (event) {
  event.preventDefault();
  retrieveRecipie();
})


function retrieveRecipie() {
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

  // First retrieve three meals

  $.ajax(settings).done(function (response) {
    response = JSON.parse(response);

    results = response.results;
    var results2 = [];
    for (i = 0; i < results.length; i++) {
      if (results[i].thumbnail) {
        results2.push(results[i]);
      }
    }

    
    for (i = 0; i < 3; i++) {
      index = Math.floor(Math.random() * results2.length);
      var title = results2[index].title;
      var url = results2[index].href;
      var img = results2[index].thumbnail;
      var ingredients = results2[index].ingredients;
      $('#recipe-title' + String(i + 1)).text(title);
      $('#recipe-btn' + String(i + 1)).attr('href', url);
      $('#img' + String(i + 1)).attr('src', img);
      $('#ingredients' + String(i + 1)).text('Ingredients: ' + ingredients);
      results2.splice(index, 1);
    }
    recipeColumn.removeClass('hide');
  })
};


// Add listner to the 'Search for Recipe button
$('#search-btn2').on("click", function (event) {
  event.preventDefault();
  retrieveRecipieByIngredients();
})


function retrieveRecipieByIngredients() {
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
    results = response.results;
    var results2 = [];
    for (i = 0; i < results.length; i++) {
      if (results[i].thumbnail) {
        results2.push(results[i]);
      }
    }

    for (i = 0; i < 3; i++) {
      index = Math.floor(Math.random() * results2.length);
      var title = results2[index].title;
      var url = results2[index].href;
      var img = results2[index].thumbnail;
      var ingredients = results2[index].ingredients;
      $('#recipe-title' + String(i + 1)).text(title);
      $('#recipe-btn' + String(i + 1)).attr('href', url);
      $('#img' + String(i + 1)).attr('src', img);
      $('#ingredients' + String(i + 1)).text('Ingredients: ' + ingredients);
      results2.splice(index, 1);
    }
    recipeColumn.removeClass('hide');
  })
};

// Add listner to the 'Search for Recipe button
$('#search-btn3').on("click", function (event) {
  event.preventDefault();
  retrieveRecipieByBoth();
})


function retrieveRecipieByBoth() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://recipe-puppy.p.rapidapi.com/?p=1&i=" + $('#ingredients-value').val() + "&q=" + $('#recipe-value').val(),
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
      "x-rapidapi-key": "69873bfbe3mshc65b70ea31b76c8p14c4e2jsn321f5f41b73a"
    }
  }

  // First retrieve three meals

  $.ajax(settings).done(function (response) {
    response = JSON.parse(response);
    console.log(response);
    results = response.results;
    var results2 = [];
    for (i = 0; i < results.length; i++) {
      if (results[i].thumbnail) {
        results2.push(results[i]);
      }
    }
    console.log(results2);

    for (i = 0; i < 3; i++) {
      index = Math.floor(Math.random() * results2.length);
      var title = results2[index].title;
      var url = results2[index].href;
      var img = results2[index].thumbnail;
      var ingredients = results2[index].ingredients;
      $('#recipe-title' + String(i + 1)).text(title);
      $('#recipe-btn' + String(i + 1)).attr('href', url);
      $('#img' + String(i + 1)).attr('src', img);
      $('#ingredients' + String(i + 1)).text('Ingredients: ' + ingredients);
      results2.splice(index, 1);
    }
    recipeColumn.removeClass('hide');
  })
};


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
  if (recentItems.indexOf(searchString) != -1){
    return
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
    button.addEventListener("click", updateRecentItemsUI)
    storedKeywords.prepend(br)
    storedKeywords.prepend(button)
  }
}
function updateRecentItemsUI(event){
  var finalStep = event.target.textContent
  retreiveRecipie(finalStep)
}
updateRecentSearches()