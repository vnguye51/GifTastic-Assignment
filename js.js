var topics = ['League of Legends','Soulsborne','Pokemon','Super Smash Bros','Legend of Zelda']
var windowWidth = screen.innerWidth

for(var i = 0; i < topics.length; i++){
    $('#buttons').append($('<button>').text(topics[i]).attr('data',topics[i]).addClass('button'))
}

$(document).on("click",'.button', function() {
    var item = $(this).attr("data");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      item + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log(response)
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
          var itemDiv = $("<div>").addClass('imagebox');
          var p = $("<p>").text("Rating: " + results[i].rating);
          var itemImage = $("<img>").attr('data-state','still').attr('data-animate',results[i].images.fixed_height.url).attr('data-still',results[i].images.fixed_height_still.url)
          itemImage.attr("src", results[i].images.fixed_height_still.url);
          itemDiv.append(itemImage,p);
          $("#gifs").prepend(itemDiv);
        }
    })
})

$('#search').on('click',function(){
  var input = $('#input').val()
  $('#buttons').append($('<button>').text(input).attr('data',input).addClass('button'))
})

$(document).on("click",'img', function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});