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

    }

  });
}

