var SongSearch = this.SongSearch || {};

SongSearch.init = function () {
	$('#search-form input').keyup(function () {
        var input_value = $(this).val();
        if (input_value.length > 2) {
        	SongSearch.clearSuggestions();
            SongSearch.getSongs(input_value);
        }
        else if (input_value.length === 0) {
            SongSearch.clearSuggestions();
        }
    });
}

SongSearch.getSongs = function (querystring) {
	$.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: querystring,
            type: 'track',
            limit: 5
        },
        success: function (response) {
            response.tracks.items.forEach(SongSearch.showSuggestions);
        },
        error: function(){
        	$('body').append('<p>No songs found.</p>')
        }
    });
}

SongSearch.showSuggestions = function(track){
	$('.search-suggestions').append('<li>' + track.name + '</li>');
	//$('.search-suggestions').fadeIn();
	$('.search-suggestions li').unbind().click(function(){
		SongSearch.printSongData($(this).text());
		SongSearch.clearSuggestions();
	});
}

SongSearch.clearSuggestions = function(){
	//$('.search-suggestions').fadeOut();
	$('.search-suggestions').empty();
}

SongSearch.printSongData = function(track){
	var date = new Date ();
	$('.search-results').append('<li>' + track + ' ' + date + '</li>');
}

