$(document).ready(function(){
    $('form').submit(function(event){
      event.preventDefault();
      
      $('#image-funfacts').children().remove();
      $('#results').find('h1').remove();
      var band = $('#search').val();




      //URL build
      var bucketList = ['hotttnesss', 'familiarity', 'artist_location', 'images', 'biographies', 'news', 'songs', 'video'];
      var key = "api_key=TYBT0MP1Z3LXJEDIM&";
      var searchURL = "http://developer.echonest.com/api/v4/artist/search?" + key;

          //Adds bucket items from bucketList array to url
       
          for(i = 0; i < bucketList.length; i++){
            searchURL += 'bucket=' + bucketList[i] + "&";
            console.log(searchURL);
           }

      //end URL build
      
      var bandsOptions = { 
        name: band,
        start: 0,
        results: 1
       
      };

      function displayArtists(response) {

        console.log(response);

          var funFacts = '<ul>';
          var artistContent = '<p>';

          
        $.each(response.response.artists, function(i, item){
            $('#results').children('.container').prepend('<h1>' + item.name + '</h1>');
            $('#results').children('.container').find('#image-funfacts').append('<img src="' + item.images[0].url + '"/>');
            funFacts += '<li><h3>Hometown:</h3><p>' + item.artist_location.location + '</p></li>';
            funFacts += '<li class="list"><h3>World Familiarity:</h3><p>' + (Math.floor(item.familiarity * 100)) + '%</p></li>';
            funFacts += '<li><h3>Popularity</h3><p>' + Math.floor(item.hotttnesss * 100) + '%</p></li>';
            artistContent += item.biographies[0].text + '</p>';
            artistContent += '<a href="' + item.news[0].url + '"><h3>' + item.news[0].name + '</h3></a>';
            artistContent += '<p>' + item.news[0].summary + '</p>';
            artistContent += '<video src="' + item.video[0].url + '"></video>';
        });
        
          funFacts += '</ul>';
          $('#image-funfacts').html(funFacts);
        
          $('#main-content').html(artistContent); 
      };

      $.getJSON(searchURL, bandsOptions, displayArtists);

    });

});