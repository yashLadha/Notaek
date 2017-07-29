// Implement the async fuzzy search

function fuzzyAjaxCall(text) {
  $.ajax({
    url: '/notes/async/'+text,
    dataType: 'application/json',
    complete: function(data) {
      console.log(data);
    },
    success: function(data) {
      console.log('Success');
    }
  });
};

$(function() { // Executes when the document is ready
  $("#search-bar").keyup(function(){
    console.log($(this).val());
    text = $(this).val(); // grabs the text inside the search bar
    // send an ajax call to the api, requesting the contents of posts (fuzzy)
    var results = fuzzyAjaxCall(text);
  });
});

// Finds all the notes that fuzzy search matches
$(function() {   
  $('#search').click(function() {
    console.log('Fetching Fuzzy search post');
    // Text for fuzzy search
    var text = document.getElementById('search-bar').value;
    var results = fuzzyAjaxCall(text);
  });
});
