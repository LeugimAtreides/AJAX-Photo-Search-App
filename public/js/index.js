$(document).on("ready", function(){

  // photo container holds all the requests
  var photoContainer = $(".photo-container");
  
  // these variables will help shorten the ajaj call
  var search = $("#search");
  var query = $("#search");
  var key = "b0a2431dd332a0620c24ca6ecb88732b";
  var queryURL = "http://www.flickr.com/services/rest/?api_key=" + key + "&predicate=outerspace&method=flickr.photos.search&per_page=25&tags=outer space&tag_mode=any&text=" + query + "&format=json&extras=url_m"

  search.on("submit", function(){

    // the 'get' method here will display an empty image div with an apology to the user for not bringing back any photos, or bring back all of the photos
    $.get(queryURL, function(data) {
      console.log("Photos", data);
      photos = data;
      if (!photos || !photos.length) {
        displayEmpty(query)
      } else {
        initializeRows();
      }
      
    })

    
  })
  // this gives functionality if no search results are returned
  function displayEmpty(query){
    photoContainer.empty()
  }
})
