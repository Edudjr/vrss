var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + 'http://image.noelshack.com/fichiers/2010/38/1285529970-favicon2.png'));
//app.use(express.favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;


//URL for website feed
var FEED_URL="http://www.theverge.com/rss/index.xml";
var login = "edudjr";
var token = "3eecd0c8ea5efc3c0c36809507dfa152";
var URL= "https://"+login+":"+token+"@push.superfeedr.com";

var send_data =	"?hub.mode=retrieve" 
								+"&hub.topic=" + FEED_URL
								+"&format=json"
								+"&count=1";

//Retrieving Entries with PubSubHubbub
request(
    { 	method: 'GET',
		url: URL+send_data,
		dataType : 'json'
	},
	function (error, response, body) {
		if (!error && response.statusCode == 200) {
			//parse the json string to a json object		
			var json = JSON.parse(body);
			console.log(json.items[0].title);
			
		}
});

function myjsonfunction(data){
	   console.log(data.responseData.results) ;//showing results data
  }

	  
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});