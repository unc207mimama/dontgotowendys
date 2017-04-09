

// Submit Function for Ingredient list

$("#submit").click(function() {
    event.preventDefault();
       
    // making the comma seperated string the hex syntax that the api query wants:
		var ingredients = $("#textArea").val().trim();
		console.log(ingredients);

    var HexIngredients = ingredients.replace(/, /gi, "%2C");
    console.log(HexIngredients);

       // query for the ingredients
        var queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=' + HexIngredients + '&limitLicense=false&number=5&ranking=1';

        $.ajax({
          url: queryURL,
          method: "GET",
          headers: {
          	'X-Mashape-Key': 'N6Iqu17EWCmshbX4K3FDHGcK8Zocp1Qy6mljsnMMwv92cEfZrE',
  		 	'Accept': 'application/json'
   		  }


     // done function that retrieves the titles and images of the response. prepends them to the recipe div. 
     }).done(function(response) {
          console.log(response);

          // for loop that goes through the response array 
          for (var i = 0; i < response.length; i++) {
            console.log(response[i].title);
           // creating the foodImage and giving it the attributes of the ID # and title, 
           // for use in getting the link to the recipe site
            var foodImage = $("<img>");
            var imageUrl = response[i].image;
            foodImage.attr("src", imageUrl);
            foodImage.attr("data-number", response[i].id);
            foodImage.attr("data-title", response[i].title);
            // creates the recipe Link:
            var recipeID = $(foodImage).attr("data-number");
            console.log(recipeID);
            var recipeTitle = $(foodImage).attr("data-title");
            console.log(recipeTitle);
            var urlRecipeTitle = recipeTitle.replace(" ", "_");
            var recipeLink = $("<a> Recipe Here </a>");
            recipeLink.attr("target", "blank");
            recipeLink.attr("href", "https://spoonacular.com/recipes/" + urlRecipeTitle + "-" + recipeID);
             // prints the image title, and recipe link to page:
            $("#recipes").prepend(recipeLink);
            $("#recipes").prepend(foodImage);
            $("#recipes").prepend("<p class ='paragraph'>"+ response[i].title + "</p>");

           }
         });
 });

// NEXT, 
// add buttons for diets and intolerances, maybe make the query only for dinner or lunch. 
// no drinks or desserts

// check with others to see how the netflix page is going
// fix input field, make larger, better, tell user a comma seperated string.
// what were nicks ideas about using firebase? Oh yea - ratings, recently searched, viewed by. 










