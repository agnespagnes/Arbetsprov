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

    $('#search-form').submit(function(){
        var top_suggestion = $('.search-suggestions li:first').text();
        SongSearch.pickSuggestion(top_suggestion);
        $('#search-form input').blur();
        SongSearch.clearSuggestions();
        return false;
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
	$('.search-suggestions li').unbind().click(function(){
		SongSearch.pickSuggestion($(this).text());
	});
}

SongSearch.clearSuggestions = function(){
    $('.search-suggestions').empty();
}

SongSearch.pickSuggestion = function(track){
    $('#search-form input').val(track);
    SongSearch.printSongData(track);
    SongSearch.clearSuggestions();
}

SongSearch.printSongData = function(track){
	var date = new Date();
    var year_month_day = date.toISOString().slice(0,10);
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
	$('.search-results').append('<li><span class="track-title">' + track + '</span><span class="track-date-added">' + year_month_day + ' ' + hours + ':' + minutes + '</span><span class="track-remove"><i class="fa fa-times"></i></span></li>');
    $('.track-remove').unbind().click(function(){
        SongSearch.removeSongData($(this));    
    })
}

SongSearch.removeSongData = function(clicked_row){
    clicked_row.parents('li').remove();
}
