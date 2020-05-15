$(document).ready(function() {

    const $valueSpan = $('.valueSpan');
    const $value = $('#slider11');
    $valueSpan.html($value.val());
    $value.on('input change', () => {
  
      $valueSpan.html($value.val());
    });
  });
  
  $('#search-btn1').on("click",function(event){
    event.preventDefault();
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=day&targetCalories=2000&diet=vegetarian&exclude=shellfish%252C%20olives",
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "69873bfbe3mshc65b70ea31b76c8p14c4e2jsn321f5f41b73a"
      }
    }
    
    $.ajax(settings).done(function (response) {
      for (i=0;i<3;i++){
        var title=response.meals[i].title;
        var url=response.meals[i].sourceUrl;
        $('#')
      }

    });

  })