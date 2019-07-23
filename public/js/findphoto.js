
$(function(){
  var photoContainer = $("<div>")
  photoContainer.addClass("photo-container")
  // these variables will help shorten the ajaj call
  $("#find-photo").on("click", function(event){
    // prevent page reload on submit
    event.preventDefault()

    // setting up variables that will be passed into AJAX call
    var query = $("#search").val().trim()
    var key = "b60f6a6c801ca576e97101ece9d39ba893f3922e7512813462a0b14acaa823a2";
    var queryURL = "https://api.unsplash.com/search/photos?page=1&query=" + query + "&client_id=" + key + "&per_page=25&collections=space"

    // add the photo container to the bottom of the search div
    var searchDiv = $("#search-box")

    searchDiv.append(photoContainer);
    // the 'get' method here will display an empty image div with an apology to the user for not bringing back any photos, or bring back all of the photos
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){

      // DOM manipulation for the container of the photos
      photoContainer.empty();
      var resultsRow = $("<div>").addClass("row").attr("id", "results-row");
      photoContainer.append(resultsRow);
      var resultsCol = $("<div>").addClass("col-lg-12 justify-content-start");
      $("#results-row").append(resultsCol);
      var p = $("<p>");
      p.addClass("image-place");
      resultsCol.append(p);

      // empty array to hold response results so that they can be looped through
      var results = [];

      // declaring the results as a variable and pushing that into the empty array
      var photo = response.results
      results.push(photo);

      // loop that will go through the responses
      for (let i = 0; i < results.length; i++) {
        
        var photoIndex = results[i]
        
        // inner loop that goes through the results array within each response
        photoIndex.forEach(function(element){
        
          element = element.urls.small

          console.log(element);

          // DOM manipulation for inserting each image
          var img = $("<img>");
          img.attr("src", element);
          img.addClass("image img-responsive");
          $(".image-place").append(img);

        });
      }
      $("#search").val("");
    })
  })
})