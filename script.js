$(document).ready(function () {

  const $valueSpan = $('.valueSpan');
  const $value = $('#slider1');
  $valueSpan.html($value.val());
  $value.on('input change', () => {

    $valueSpan.html($value.val());
  });
});


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
      "x-rapidapi-key": "69873bfbe3mshc65b70ea31b76c8p14c4e2jsn321f5f41b73a"
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
        "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+id+"/summary",
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key": "69873bfbe3mshc65b70ea31b76c8p14c4e2jsn321f5f41b73a"
        }
      }

      $.ajax(settings).done(function (response2) {
         console.log(response2);
         var summary=response2.summary;
         $('#recipe-description'+String(i+1)).html(summary);
        
      });

    }

  });
}

