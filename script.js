


$("#submit").click(function() {
    event.preventDefault();
       

		var ingredients = $("#textArea").val().trim();
		console.log(ingredients);

      //   var queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=false&cuisine=american&excludeIngredients=coconut%2C+mango&fillIngredients=false&includeIngredients=onions%2C+lettuce%2C+tomato&instructionsRequired=false&intolerances=peanut%2C+shellfish&limitLicense=false&maxCalories=1500&maxCarbs=100&maxFat=100&maxProtein=100&minCalories=150&minCarbs=5&minFat=5&minProtein=5&number=10&offset=0&query=burger&ranking=1&type=main+course';

 
       
      //   $.ajax({
      //     url: queryURL,
      //     method: "GET",
      //     headers: {
      //     	'X-Mashape-Key': 'N6Iqu17EWCmshbX4K3FDHGcK8Zocp1Qy6mljsnMMwv92cEfZrE',
  		 	// 'Accept': 'application/json'
   		 //  }

      //   }).done(function(response) {
      //   	var title = response.results[i].title;
      //     $("#recipes-here").html(title);
      //     console.log(response);
      //   });

    });

// capture input from site make variables, put those in a queryURL.
