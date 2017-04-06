


$("#submit").click(function() {
    event.preventDefault();
       

		// var ingredients = $("#textArea").val().trim();
		// console.log(ingredients);

        var queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=carrots%2Conion%2Ckale&limitLicense=false&number=5&ranking=1';

 
       
        $.ajax({
          url: queryURL,
          method: "GET",
          headers: {
          	'X-Mashape-Key': 'N6Iqu17EWCmshbX4K3FDHGcK8Zocp1Qy6mljsnMMwv92cEfZrE',
  		 	'Accept': 'application/json'
   		  }

        }).done(function(response) {
        	// var title = response.results[i].title;
         //  $("#recipes-here").html(title);
          console.log(response);
        });

    });

// capture input from site make variables, put those in a queryURL.
