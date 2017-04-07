


$("#submit").click(function() {
    event.preventDefault();
       

		var ingredients = $("#textArea").val().trim();
		console.log(ingredients);

    var HexIngredients = ingredients.replace(/, /gi, "%2C");
    console.log(HexIngredients);

       
        var queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=' + HexIngredients + '&limitLicense=false&number=5&ranking=1';


      //Query for recipes:
      // var queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/618388/analyzedInstructions?stepBreakdown=true';
 
       
        $.ajax({
          url: queryURL,
          method: "GET",
          headers: {
          	'X-Mashape-Key': 'N6Iqu17EWCmshbX4K3FDHGcK8Zocp1Qy6mljsnMMwv92cEfZrE',
  		 	'Accept': 'application/json'
   		  }

        }).done(function(response) {
          console.log(response);
        });

    });

// Display images and titles to html
// click event for the images and titles to do a api call to get the recipes
