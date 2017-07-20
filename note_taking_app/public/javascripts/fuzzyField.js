// Implement the async fuzzy search
$(function() { // Executes when the document is ready
    $("#search-bar").keyup(function(){
        console.log($(this).val());
        text = $(this).val();
        $.ajax({
            type: 'GET',
            url: '/notes/async/'+text,
            success: function(msg) {
                console.log(msg);
            },
            error: function(request, status, error) {
                console.log(error);
            }
        });
    });  
});

$(function() {   
    $('#search').click(function() {
        console.log('Seatch Button is pressed');
    });
});
