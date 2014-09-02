var request = require('request');

var FEED_URL="http://www.theverge.com/rss/index.xml";
var login = "edudjr";
var token = "3eecd0c8ea5efc3c0c36809507dfa152";
var URL= "https://"+login+":"+token+"@push.superfeedr.com";
var send_data;
var callback_url;

//http://push-pub.appspot.com/feed  <-- debug link


//Retrieving Entries with PubSubHubbub
exports.retrieve = function(feed){
	FEED_URL=feed;

	send_data =	"?hub.mode=retrieve" 
							+"&hub.topic=" + FEED_URL
							+"&format=json"
							+"&count=1";
									
	request(
		{ 	
			method: 'GET',
			url: URL + send_data
		},
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				//parse the json string to a json object		
				var json = JSON.parse(body);
				console.log(json.items[0].title);
			}
	});
}

//Subscribing to feeds
exports.subscribe= function(feed){
	callback_url = "https://edudjr.ngrok.com/callback";
	FEED_URL = feed;

	send_data = "?hub.mode=subscribe"
							+"&hub.topic="+FEED_URL
							+"&hub.callback="+callback_url
							+"&format=json";
	request(
		{	
			method: 'POST',
			url: URL + send_data
		},
		function(error, response, body){
			if (!error && response.statusCode == 204) {
				console.log("Successfuly subscribed");
			}
	});
}

//Unsubscribing to feeds
exports.unsubscribe= function(feed){
	FEED_URL = feed;

	send_data = "?hub.mode=unsubscribe"
							+"&hub.topic="+FEED_URL;
							
	request(
		{	
			method: 'POST',
			url: URL + send_data
		},
		function(error, response, body){
			if (!error && response.statusCode == 204) {
				console.log("Successfuly unsubscribed");
			}
	});
}