
// Global Variables

var recipeTitle ="";
var title = "";
var review = "";
// Configure and Initialize Firebase Database :

  var config = {
    apiKey: "AIzaSyDJ60Tn4emnSJO004fnIpuqkeNG9fxuENE",
    authDomain: "group-project-fa72e.firebaseapp.com",
    databaseURL: "https://group-project-fa72e.firebaseio.com",
    projectId: "group-project-fa72e",
    storageBucket: "group-project-fa72e.appspot.com",
    messagingSenderId: "193456247309"
  };
  firebase.initializeApp(config);

// Database
var database = firebase.database();




// on click function for the diet choices buttons, addClass active makes them continue to look "pressed"
// this is for the query that uses the diet choices - NOT WORKING.
$(".choices").click(function(){
  $(this).addClass('active');

});

// Submit Function for Ingredient list ================================================================

$("#submit").click(function() {
    event.preventDefault();
       
    // making the comma seperated string the hex syntax that the api query wants:
		var ingredients = $("#textArea").val().trim();
		console.log(ingredients);

    var HexIngredients = ingredients.replace(/, /gi, "%2C");
    console.log(HexIngredients);

    // selecting the diet choices (the query is not working)
    var veggieChoice = $(".active#veggie").attr("data-type");
    console.log(veggieChoice);

    var veegChoice = $(".active#veeg").attr("data-type");
    console.log(veegChoice);

    var glutenFree =$(".active#gluten").attr("data-type");
    console.log(glutenFree);

    // query for the ingredients
     var queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=' + HexIngredients + '&limitLicense=false&number=5&ranking=1&diet=' + veggieChoice + '&intolerances='+ glutenFree;

      // query tries for using the diet choices (NOT WORKING)

      // var queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?diet=' +veggieChoice+ '&includeIngredients=' + HexIngredients+ '&instructionsRequired=false&intolerances='+ gluten +'&limitLicense=false&number=5&offset=0&type=main+course';

      // var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=false&fillIngredients=false&includeIngredients" +HexIngredients+ "&instructionsRequired=false&intolerances=" +glutenFree+ "&diet=" +veggieChoice + "&limitLicense=false&number=5&offset=0&ranking=1&type=main+course" 

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
            recipeTitle = $(foodImage).attr("data-title");
            console.log(recipeTitle);
            var urlRecipeTitle = recipeTitle.replace(" ", "_");
            
            var recipeLink = $("<a>");
            $(recipeLink).attr("href", "https://spoonacular.com/recipes/" + urlRecipeTitle + "-" + recipeID);
            $(recipeLink).attr("target", "blank");
            $(recipeLink).append(foodImage);
            
            $("#recipes").prepend(recipeLink);
            $("#recipes").prepend( "<p> <span class = 'paragraph'>" +response[i].title +  "</span><br>" + "Did you make this recipe? Leave a review!" + "<input class='review'></input>" + "<button class='comment'>Submit</button>"+"</p>");
            
           
           
         }
 });
 });

// making reviews for each recipe, pushing to a firebase database =======================================

$("#recipes").on("click", ".comment", function(){
  // jquery use parent elements or data attributes - look at to do list. 
              var comment = $(this).siblings(".review").val();
              console.log(comment);
              // make a variable for to match the title to the comment
              var commentTitle = JSON.stringify($(this).siblings(".paragraph").text());
              console.log(commentTitle);
             var newCommentTitle = commentTitle.replace(/"/g, " ");
            // Firebase values
             // push the title of recipes to firebase, 
             database.ref().push({
              title: newCommentTitle,
              review: comment
              });   

});
// FIREBASE WATCHER + INITIAL LOADER - updates or snapshot everytime a child is added to database 
 database.ref().on("child_added", function(childSnapshot){
  var review = childSnapshot.val().review;
  var title = childSnapshot.val().title;

  console.log(review);

  $("#ppl-saying").prepend("<p class='reviews'>" + title + ": " + '"'  +review + '"' + "</p>");
  
    });


// NETFLIX==============================================================

// submit movie function
$("#submit-movie").click(function() {

// retrieving the value of the actor input, creating a variable for the query
  var actors = $("#actorZone").val().trim();
  var actorsQuery = actors.replace(" " , "+");
  console.log(actorsQuery);
  
  // netflix roulette query for an actor 
  var queryURL = "https://community-netflix-roulette.p.mashape.com/api.php?actor=" +actorsQuery;
                  
  
   $.ajax({
          url: queryURL,
          method: "GET",
          headers: {
            'X-Mashape-Key': 'N6Iqu17EWCmshbX4K3FDHGcK8Zocp1Qy6mljsnMMwv92cEfZrE',
        'Accept': 'application/json'
        }

    // done function for the response array 
    }).done(function(response) {
          console.log(response);
      // for loop that goes through the response array 
          for (var i = 0; i < response.length; i++) {

            console.log(response[i].title);
            // creating an img for the movie poster and prepending that to the movie div
            var moviePoster = $("<img>");
            var movieUrl = response[i].poster;
            moviePoster.attr("src", movieUrl);

            $("#recipes").prepend(moviePoster);
      }   
  });
});










