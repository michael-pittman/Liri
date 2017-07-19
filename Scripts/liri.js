// Grabs the bands variables
var keys = require("./keys.js");

var keyList = keys.twitterKeys;

var Twitter = require('twitter');
 
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
}

var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'my-tweets' :
                getTweets();
                break;
        default:
        console.log("Liri doesn't know that, yet...")
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
}

runThis(process.argv[2], process.argv[3]);