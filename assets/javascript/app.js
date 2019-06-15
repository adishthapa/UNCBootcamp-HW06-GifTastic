var topics = ["black widow", "captain america", "hulk", "ironman", "spiderman", "thor"]

function addButtons() {
    $("#topics").empty();
    for (var i = 0; i < topics.length; i++) {
        console.log(topics[i]);
        var button = $("<button>").addClass("btn btn-lg btn-superhero p-3 m-3").val(topics[i]).text(topics[i]);
        $("#topics").append(button);
    }
};

function addGifs(superhero) {
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + superhero + "&api_key=O5gqK18l7eNt8ypQ4z8w0TnVSSukgLzF&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;
        $("#gifs").html("");
        for (var i = 0; i < results.length; i++) {
            var imageDiv = $("<div>").addClass("d-inline-block m-3");
            var rating = $("<h6>").text(results[i].rating.toUpperCase());
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

addButtons();

$("#submit").on("click", function() {
    var superhero = $("#name").val();
    topics.push(superhero);
    addButtons();
});

$(document).on("click", ".btn-superhero", function() {
    console.log($(this));
    console.log($(this).val());
    addGifs($(this).val());
});

$(document).on("click", "img", function() {
    if ($(this).attr("data-state") === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else if ($(this).attr("data-state") === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});