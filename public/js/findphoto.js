
$(function(){

  // these variables will help shorten the ajaj call
  $("#find-photo").on("click", function(event){
    // prevent page reload on submit
    event.preventDefault()

    var photoContainer = $(".photo-container");

    // setting up variables that will be passed into AJAX call
    var query = $("#search").val().trim()
    var key = "b60f6a6c801ca576e97101ece9d39ba893f3922e7512813462a0b14acaa823a2";
    var queryURL = "https://api.unsplash.com/search/photos?page=1&query=" + query + "&client_id=" + key + "&per_page=25&collections=space"

    // add the photo container to the bottom of the search div
    var searchID = $("#search-now");
    searchID.append(photoContainer);
    // the 'get' method here will display an empty image div with an apology to the user for not bringing back any photos, or bring back all of the photos
    $.get(queryURL, function(data) {
      console.log("Photos", data);
      photos = data.results[0].url.small;
      if (!photos || !photos.length) {
        displayEmpty()
      } else {
        initializeRows(photos);
      }
    })
  })
  // this gives functionality if no search results are returned
  function displayEmpty(){
    photoContainer.empty();
    var noResultsRow = photoContainer.html("<div></div>");
    noResultsRow = noResultsRow.addClass("row");
    var noResultsCol = noResultsRow.append("<div></div>");
    var noResultsColFormatted = noResultsCol.addClass("col-lg-12 justify-content-center");
    var noResultsImage = noResultsColFormatted.append("<div></div>");
    var noResultsImageFormatted = noResultsImage.addClass("img-responsive no-results text-center");
    var noResultsMessage = noResultsImageFormatted.html("<h1>Sorry Human Our Astronaut Couldn't Find The Images You Sought!</h1>");
    noResultsMessage.addClass("no-results-message")
  }
})

// this function will place each of the photos in a neat organized dynamically generated manner
function initializeRows(photos){
  photoContainer.empty();
  var resultsRow = photoContainer.html("<div></div>");
  resultsRow = resultsRow.addClass("row");
  var resultsCol = resultsRow.append("<div></div>");
  resultsCol = resultsCol.addClass("col-lg-12 justify-content-start");

  // create a loop that takes each photo and inserts it into the page with set attributes
  $.each(photos, function(i, item){
    $("<img />").attr("src", item).appendTo(resultsCol);
  })
}