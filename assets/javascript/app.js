// Initial superheros
var topics = ["black widow", "captain america", "hawkeye", "hulk", "ironman", "thor"]

// Function that populates the html with buttons with texts from the topics array
function addButtons() {
    $("#topics").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>").addClass("btn btn-lg btn-superhero p-3 m-3").val(topics[i]).text(topics[i]);
        $("#topics").append(button);
    }
};

// Function that populates the html with the superhero gifs based on the button pressed
function addGifs(superhero) {
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + superhero + "&api_key=O5gqK18l7eNt8ypQ4z8w0TnVSSukgLzF&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;
        $("#gifs").html("");
        for (var i = 0; i < results.length; i++) {
            var imageDiv = $("<div>").addClass("d-inline-block m-3");
            var rating = $("<h6>").text("Rating: " + results[i].rating.toUpperCase());
            var image = $("<img>").attr("src", results[i].images.fixed_height_still.url);
            image.attr("src", results[i].images.fixed_height_still.url);
            image.attr("alt", superhero + "-gif");
            image.attr("data-still", results[i].images.fixed_height_still.url);
            image.attr("data-animate", results[i].images.fixed_height.url);
            image.attr("data-state", "still");
            image.attr("class", "gif");
            imageDiv.append(rating);
            imageDiv.append(image);
            $("#gifs").append(imageDiv);
        }
    });
}

// Initial population of the buttons with original superhero names
addButtons();

// Checks for the click of the submit button and creates a new button accordingly
$("#submit").on("click", function() {
    event.preventDefault();
    var superhero = $("#name").val();
    topics.push(superhero);
    addButtons();
    $("#name").val("");
});

// Adds giff based on which button was pressed
$(document).on("click", ".btn-superhero", function() {
    addGifs($(this).val());
});

// Animates or Pauses the Gif
$(document).on("click", "img", function() {
    if ($(this).attr("data-state") === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else if ($(this).attr("data-state") === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});