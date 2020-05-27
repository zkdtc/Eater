# Eater
Welcome to the Eater wiki!

Project title: Eater.com!

Project description: This app provide you with recipes given certain ingredients and calorie limit.

User story: AS A human being that eats everyday I WANT to change my menu daily SO THAT I don’t eat out much, make better plan and make selections easier.

Sketch: This app will plan your daily meal according to the calories limit and ingredients available. It is smart to judge what is the best calorie limit according to the weather today. Besides, it enables you to do calorie search for any specific ingredient.

APIs to be used: Recipe - Food - Nutrition https://rapidapi.com/spoonacular/api/recipe-food-nutrition

Food calories https://rapidapi.com/kenpi04/api/food-calorie-data-search

Weather API https://rapidapi.com/weatherbit/api/weather

Moment.JS

Acceptance Criteria:

GIVEN a recipe dashboard with form inputs

WHEN I input a food to search for a recipe THEN I am presented with recommended recipes for that food and that food is added to the search history

WHEN I input ingredients to search for a recipe THEN I am presented with recommended recipes for those ingredients and the ingredients keywords are added to the search history

WHEN I input the amount of calories I want to consume using the slider THEN I am presented with recommended recipes within a reasonable range of the calorie amount inputted and that calorie amount is added to the search history

WHEN I view a recommended recipe for any given input (or combination of inputs) THEN I am presented with the recipe image, title, description, calorie amount, and link

WHEN I don’t know what to eat and need recommendation THEN the eater dashboard just gives me random recipes

WHEN my current weather is cool or cold* THEN I am presented with an additional set of recommended recipes that fits my input criteria and keep me warm and comforted

WHEN my current weather is warm or hot* THEN I am presented with an additional set of recommended recipes that still fit my input criteria and keep me cool and relaxed

WHEN I click on a keyword, phrase, or calorie count in the search history THEN I am again presented with all recommended recipes for that keyword, phrase, or calorie count

WHEN I open the eater dashboard THEN I am presented with the last searched keyword, phrase, or calorie count

We can use the Geolocation and Open Weather APIs to get the users latitude and longitude, then temperature. Then create two string arrays (i.e. coolCold and warmHot) each with all foods/ingredients that serve to keep the eater either warm and comforted or cool and relaxed.

