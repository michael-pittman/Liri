// Grabs the bands variables
var keys = require("./keys.js");

var keyList = keys.twitterKeys;

var keyListSpot = keys.spotifyKeys;
 
var Spotify = require('node-spotify-api');

var Twitter = require('twitter');

var request = require('request');
 
var client = new Twitter(keyList);
 
var getTweets = function(){ 
    var params = {screen_name: 'mcxviiv'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
    console.log(tweets);
    for(var i=0; i<tweets.length; i++) {
        console.log(tweets[i].text);
        console.log(tweets[i].created_at + "\n");
    }
    }
    });
};

var getSong = function(songName){
    var spotify = new Spotify(keyListSpot);

        spotify
          .search({ type: 'track', query: songName })
          .then(function(response) {
            var songs = response.tracks.items;
                for(var i=0; i<songs.length; i++){
                 
                console.log(i);
                console.log('artist: ' + songs[i].artists[0].name);
                console.log('song name: ' + songs[i].name);
                console.log('album: ' + songs[i].album.name);
                console.log('popularity: ' + songs[i].popularity);
                console.log('link: ' + songs[i].href);
                console.log('______________________________________________________________\n');
             
              }  
          })
          .catch(function(err) {
            console.log(error);
          });
}

var getMovie = function(movieName) {
request('http://www.omdbapi.com/?apikey=40e9cece&t='+ movieName, function (error, response, body) {  
  var jsonData = JSON.parse(body)
    console.log('title: ' + jsonData.Title);
    console.log('plot: ' + jsonData.Plot); 
    console.log('rating: ' + jsonData.Metascore); 
});
}

var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'my-tweets' :
                getTweets();
                break;
        case 'spotify-this-song' :
                getSong(functionData);
                break;
        case 'movie-this' :
                getMovie(functionData);
                break;
        default:
        console.log("Liri doesn't know that, yet...")
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
}

runThis(process.argv[2], process.argv[3]);