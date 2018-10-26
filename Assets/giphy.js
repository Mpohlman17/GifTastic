$(document).ready(function () {

    var NFL_Teams = ["eagles", "redskins", "packers", "stealers", "rams"];

    ////////Initializing buttons for starting NLF team names/////////
    function displayGifButtons() {
        $("#gifButtons").empty();
        for (var i = 0; i < NFL_Teams.length; i++) {
            var gifButton = $("<button>").text(NFL_Teams[i])
            gifButton.addClass("btn btn-primary, textBtn")
            gifButton.attr("data-name", NFL_Teams[i]);
            $("#gifButtons").append(gifButton);
        }
    }
    //////render the new buttons displayed after add button has been clicked/////
    function renderButton() {
        $("#addGif").on("click", function () {
            var textBtn = $("#team-input").val().trim();
            if (textBtn == "") {
                return false;
            }
            NFL_Teams.push(textBtn);
            displayGifButtons();
            return false;
        });
    }
    ////////////button to remove the last button the user has entered//////////
    function removeLastButton() {
        $("removeGif").on("click", function () {
            NFL_Teams.pop();
            displayGifButtons();
            return false;
        });
    }
    //////////Display ratings and gifs/////////
    function displayGifs() {
        var textBtn = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=nfl%20" + textBtn + "&api_key=wZOJWKJO3OPNwIVNf7M9hpPsX3lEngt3&limit=10";

        // console.log(queryURL);
        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            ///////calling back the function, callback function with ajax///////////
            .then(function (response) {
                // console.log(response);
                $("#gifsView").empty();
                var results = response.data;
                if (results == "") {
                    alert("Please enter an Offical NFL Team");
                }
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");

                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);

                    var gifImage = $("<img>")
                    gifImage.attr("src", results[i].images.fixed_height_still.url)
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url)
                    gifImage.attr("data-animate", results[i].images.fixed_height.url)
                    gifImage.attr("data-state", "still")
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);

                    $("#gifsView").prepend(gifDiv);
                }
            });
    }
    /////////deploy buttons/////////////
    displayGifButtons();
    renderButton();
    removeLastButton();
    ///////////////////////////////////
    //////Click function master///////
    /////////////////////////////////
    $(document).on("click", ".textBtn", displayGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});