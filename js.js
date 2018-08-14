var topics = ['League of Legends','Soulsborne','Pokemon','Smash','Legend of Zelda']

for(var i = 0; i < topics.length; i++){
    $('#buttons').append($('<button>').text(topics[i]).attr('data',topics[i]).addClass('button'))
}

$(document).on("click",'.button', function() {
    var item = $(this).attr("data");
    console.log(item)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      item + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
          var itemDiv = $("<div>");
          var p = $("<p>").text("Rating: " + results[i].rating);
          var itemImage = $("<img>");
          itemImage.attr("src", results[i].images.fixed_height.url);

          itemDiv.append(p);
          itemDiv.append(itemImage);
            console.log(itemDiv)
          $("#gifs").prepend(itemDiv);
        }
    })
})

function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons").empty();

  // Looping through the array of movies
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("gif-btn");
    // Adding a data-attribute
    a.attr("data", movies[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#search").on("click", function(event) {
  // This line grabs the input from the textbox
  var gif = $("#gif-input").val();

  // Adding movie from the textbox to our array
  topics.push(gif);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"

// Calling the renderButtons function to display the intial buttons
renderButtons();