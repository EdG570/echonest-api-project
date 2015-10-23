$(document).ready(function(){
    $('form').submit(function(event){
      event.preventDefault();
      
      $('#image-funfacts').children().remove();
      $('#artist-name').children().remove();
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
          
        $.each(response.response.artists, function(i, item){
            $('#results').children('.container').prepend('<h2>' + item.name + '</h2>');
            $('#image-funfacts').append('<img src="' + item.images[0].url + '"/>');
            funFacts += '<li><p><span>Hometown:</span>' + item.artist_location.location + '</p></li>';
            funFacts += '<li class="list"><p><span>World Familiarity:</span>' + (Math.floor(item.familiarity * 100)) + '%</p></li>';
            funFacts += '<li><p>' + Math.floor(item.hotttnesss * 100) + '%</p></li>';
            musicianHTML += '<li><p>' + item.biographies[0].text + '</p></li>';
            musicianHTML += '<li><p>' + item.news[0].name + '</p></li>';
            musicianHTML += '<li><p>' + item.news[0].summary + '</p></li>';
            musicianHTML += '<li><a href="' + item.news[0].url + '">' + item.news[0].name + '</a></li>';
            musicianHTML += '<li><video src="' + item.video[0].url + '"></video></li>';
        });
        
         funFacts += '</ul>';
         $('#image-funfacts').html(funFacts);
        
        $('#results').html(musicianHTML); 
      };

      $.getJSON(searchURL, bandsOptions, displayArtists);

    });