$(document).ready(function(){

    //URL build
    var bucketList = ['hotttnesss', 'familiarity', 'artist_location', 'images', 'biographies', 'news', 'songs', 'video', 'genre', 'years_active', 'blogs'];
    var key = "api_key=TYBT0MP1Z3LXJEDIM&";
    var searchURL = "http://developer.echonest.com/api/v4/artist/search?" + key;
    var band = null;
    var buttonValue = null;

    //Adds bucket items from bucketList array to url
    for(i = 0; i < bucketList.length; i++){
    searchURL += 'bucket=' + bucketList[i] + "&";
    console.log(searchURL);
    }
    //end URL build

    $('form').submit(function(event){
      event.preventDefault();
      
      //Removes previous search content on submit
      $('#image-funfacts').children().remove();
      $('#results').find('h1').remove();
      $('#main-content').children().remove();
      $('#image-funfacts').addClass('padding'); //Adds padding to fun facts section
      $('.artist-btn').removeClass('onclick');
      $('#artist-btns').show();
      
      band = $('#search').val(); //stores user search value

      getArtist(band);

      });

      function getArtist(band) {

        //echonest GET request params
        var bandsOptions = { 
        name: band,
        start: 0,
        results: 1
        };

         $.getJSON(searchURL, bandsOptions, function(data){
            displayArtists(data.response)
         });
      }

      //Callback function for echonest json data
      function displayArtists(response) {

        console.log(response);

          var funFacts = '<ul>';
          var artistContent = '<p>';
          var p = 0;

          
        $.each(response.artists, function(i, item){
            $('#results').prepend('<h1>' + item.name + '</h1>');
            $('#image-funfacts').append('<img id="artist-image" src="' + item.images[p].url + '"/>');
            
            
            //Adds content to be appended to #image-funfacts
            funFacts += '<li><h3>Hometown:</h3><p>' + item.artist_location.location + '</p></li>';
            funFacts += '<li><h3>Genre:</h3><p>' + item.genres[p].name + '</p></li>';
            funFacts += '<li><h3>World Familiarity:</h3><p>' + (Math.floor(item.familiarity * 100)) + '%</p></li>';
            funFacts += '<li><h3>Popularity:</h3><p>' + Math.floor(item.hotttnesss * 100) + '%</p></li>';
            funFacts += '<li><h3>Active Since:</h3><p>' + item.years_active[p].start + '</p></li>';
            
            //If artist image fails to load go to the next array index until successful load
            $('#artist-image').error(function(){
              $('#artist-image').remove();
              p++;
              $('#image-funfacts').prepend('<img id="artist-image" src="' + item.images[p].url + '"/>');;
            });

  
         });

          funFacts += '</ul>';
          $('#image-funfacts').append(funFacts);
        
          $('#main-content').append(artistContent); 
          
      };
      

      //On button click display selection content in #main-content
      $('.artist-btn').click(function(){

          buttonValue = $(this).text();

          requestArtistCategory();

          $('#main-content').children().remove();
          $('.artist-btn').removeClass('onclick');
          $(this).addClass('onclick');


      });

          function requestArtistCategory() {

            //echonest GET request params
            var bandsOptions = { 
            name: band,
            start: 0,
            results: 1
            };

            $.getJSON(searchURL, bandsOptions, function(data){
                displayCategory(data.response)
            });
          }

          function displayCategory(response) {

              console.log(response);

              $.each(response.artists, function(i, item){

                  if(buttonValue === "Biographies") {

                      var list = '<ul>';
                      
                      for(i = 0; i < item.biographies.length; i++) {
                        list += '<li><a target="_blank" href="' + item.biographies[i].url + '"><h3>' + item.biographies[i].url + '</h3></a></li>';
                      }
                  } 
                   
                   else if(buttonValue === "News") {
                      
                      var list = '<ul>';

                      for(i = 0; i < item.news.length; i++) {
                        list += '<li><a target="_blank" href="' + item.news[i].url + '"><h3 class="title">' + item.news[i].name + '</h3></a></li>';
                      }
                    }

                  else if(buttonValue === "Popular Songs") {
                      
                      var list = '<ul>';

                      for(i = 0; i < item.news.length; i++) {
                        list += '<li><h3>' + item.songs[i].title + '</h3></li>';
                      }
                  }

                  else if(buttonValue === "Blogs") {
                      
                      var list = '<ul>';

                      for(i = 0; i < item.blogs.length; i++) {
                        list += '<li><a target="_blank" href="' + item.blogs[i].url + '"><h3 class="blog-header">' + item.blogs[i].name + '</h3><p>' + item.blogs[i].summary + '</p></a></li>';
                      }
                  }
                  

                   list += '</ul>'
                   $('#main-content').html(list);
              });
          }


/*------------Youtube video API json request -------------------------------------*/

          $('#video').click(function(event){
              event.preventDefault();
              var videos = $(this).text();
              bandFix = band;                   
              if(videos === 'Videos'){
                  bandFix += ' band'       //added for more relevant search results
                  getRequest();
              }
          }); 
         

            function getRequest(){
              var params = {
                s: bandFix,
                r: 'json',
                part: 'snippet',
                key: 'AIzaSyC5dmobf66jthC1x1Th6a-8GKlFE0D8r6s',
                q: bandFix,
                type: 'video',
                maxResults: '6',
                order: 'rating',
                id: 'videoId',
                autoplay: 0

              };
                url = "https://www.googleapis.com/youtube/v3/search";
              

              $.getJSON(url, params, function(data){
                  console.log(data.items);
                  showResults(data.items);
              });
            }


            function showResults(results){
              var html = '<div id="video-player">';
              $.each(results, function(index, value){
                html += '<iframe class="video-player" width="640" height="390" style="margin-top: 1em; margin-bottom: 2em; border-radius: 5px" src="http://www.youtube.com/embed/' + value.id.videoId + '"/>';
                console.log(value);
              });

              html += '</div>'
              $('#main-content').html(html);
            }


          
}); //end document ready



        