$(document).ready(function() {
// you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.

// Your app should take the topics in this array and create buttons in your HTML.

// Try using a loop that appends a button for each string in the array.
// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// Under every gif, display its rating (PG, G, so on).

// Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.
 
// maximum of 42 search requests an hour, 1000 search requests a day and 10 upload requests a day 
// q: string
// Search query term or phrase.

    // apiKey = "4BxAtLQS1DBCV2uh00Cgo6U8Y4odQHu8";

    //  Initial topics array
    var topicsArray = ["Video Games", "Board Games", "Wine", "Anime", "Swimming", "Animals"];

    //  Function for displaying data
    renderButtons();

    // Add a click event listener to all elements with a class of "topic"
    $(document).on("click", ".topic", displayTopicGifs);
    $(document).on("click", ".gif", animate);  
    
    function displayTopicGifs(){
        var topic = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=4BxAtLQS1DBCV2uh00Cgo6U8Y4odQHu8&limit=10&lang=en";

        // creating AJAX call for the actual button clicked
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {

        var results = response.data;
        console.log(results);
        // Looping through each result item and creating information divs to put the results in the html
        for (let i = 0; i < results.length; i++) {

            var topicDiv = $("<div class='topicDiv'>");
            var rating = results[i].rating;   
            var ratedP = $('<p>').text("Rated: " + rating);
            var topicImage = $("<img>")
            topicImage.addClass("gif")
            topicImage.attr({src: results[i].images.downsized_still.url, 
                            dataStill: results[i].images.downsized_still.url, 
                            dataAnimate: results[i].images.downsized.url,
                            dataState: "still"});

            topicDiv.append(topicImage);
            topicDiv.append(ratedP);
            $("#topic-view").prepend(topicDiv);
        }
    });
}
    // event listener when gif clicked animate/still
    function animate() {
        var state = $(this).attr("dataState");

        if (state === "still") {
            $(this).attr("src", $(this).attr("dataAnimate"));
            $(this).attr("dataState", "animate");
        }else {
            $(this).attr("src", $(this).attr("dataStill"));
            $(this).attr("dataState", "still");
          }
    };

    // function to make buttons 
    function renderButtons(){
        // Delete buttons before adding so that we don't repeat previous buttons
        $("#buttons-view").empty();

        //  create buttons from the array of topics above
        var topicsArrayLength = topicsArray.length;
        for(let i = 0; i < topicsArrayLength; i++){
            
            console.log(topicsArray[i]);
            var buttonTopic = $("<button>");
            buttonTopic.addClass("topic")
            buttonTopic.attr('data-topic', topicsArray[i]);
            buttonTopic.text(topicsArray[i]);
            $("#buttons-view").append(buttonTopic);
            
        }
    }

    // event listener to activate ajax call for data
    $("#add-topic").on("click", function() {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // gets input from the textbox
        var topicInput = $("#topic-input").val().trim();

        // Add topic from the textbox to our array and clear text
        topicsArray.push(topicInput);
        $("#topic-input").val("");
        // Calling renderButtons which handles the processing of our topic array
        renderButtons();

    });

});
