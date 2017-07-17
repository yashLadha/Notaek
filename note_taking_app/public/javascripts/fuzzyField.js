// Implement the async fuzzy search
$.get('/async', text, function(responseTxt, statusTxt, xhr) {
    if (responseTxt == "success") {
	console.log('Some fuzzy posts found');
	$.ajax({
	    type: 'GET',
	    url: '/notes/async/'+text,
	    success: function(data) {
		console.log(data);
		$.each(data, function(idx, item) {
		    console.log('Item received is: '+idx);
		});
	    }
	});
    } else {
	console.log('Some error occurred / No Fuzzy posts found');
    }
});
