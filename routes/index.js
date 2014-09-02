var express = require('express');
var feedr = require('./superfeedr');
var router = express.Router();
var last_item;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index.ejs', { title: 'Express' });
});

router.get('/model',function(req, res){
	res.render('model.ejs',{ title: 'Model' });
});

router.get('/live',function(req, res){
	res.render('live.ejs',{title: 'Live'});
});

router.post('/live',function(req, res){
	var send = {
		url:"http://www.theverge.com/rss/index.xml",
		count:9
	};
	
	feedr.retrieve(send, function(data){
		last_item = data.items[0].title;
		console.log("last item: ");
		console.log(last_item);
		res.send(data);
	});
});

router.post('/load',function(req, res){
	var send = {
		url:"http://www.theverge.com/rss/index.xml",
		count:1
	};
	
	feedr.retrieve(send, function(data){
		console.log(data.items[0].title);
		console.log(last_item);
		console.log(data.items[0].title===last_item)
		if(data.items[0].title===last_item)
			res.send("err");
		else
			data.items[0].title;
	});
});

router.post('/callback',function(req, res){
	console.log("body here: ");
	console.log(req.body);
});

module.exports = router;
