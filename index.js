function getWikiPage(title) {
  $.ajax({
    type: "GET",
    url:
      "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts|info&piprop=thumbnail&pithumbsize=200&pilimit=max&inprop=url&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" +
      title +
      "&callback=JSON_CALLBACK",
    // contentType: 'application/jsonp; charset=utf-8',
    // async: false,
    dataType: "jsonp",
    success: function(data) {
      console.log(data);
      if (data.query) {
        var results = data.query.pages;
        $.each(results, function(index, value) {
          $("#results").hide();
          $("#results").append(
            '<div class="card card-block"><h3 class="card-title">' +
              value.title +
              '</h3><p class="card-text">' +
              value.extract +
              '</p><a href="' +
              value.canonicalurl +
              '" class="btn btn-primary" id="visit-btn" target="_blank">Visit Page</a></div>'
          );
          $("#results").fadeIn("slow");
        });
      } else {
        $("#results").html("<h3 style='padding:1em;'>Oops! No results!</h3>");
      }
    },
    error: function(errorMessage) {
      $("#results").html(errorMessage);
    }
  });
}

function setupSearch(text) {
  getWikiPage(text.replace(/ /g, "%20"));
}
$(document).ready(function() {
  $("#search-input").keypress(function(e) {
    var key = e.which;
    if (key == 13 && $("#search-input").val().length > 0) {
      // the Enter key
      $("#results").html("");
      setupSearch($("#search-input").val());
      return false;
    }
  });
  $("#search-button").on("click", function() {
    $("#results").html("");
    if ($("#search-input").val().length > 0) {
      setupSearch($("#search-input").val());
    }
  });
});