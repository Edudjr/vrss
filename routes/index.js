var express = require('express');
var feedr = require('./superfeedr');
var router = express.Router();
var last_item;

feedr.retrieve({url:"http://www.theverge.com/rss/index.xml"},function(data){
	last_item=data.items[0].title;
});


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
		res.send(data);
	});
});

router.get('/load',function(req, res){
	var send = {
		url:"http://www.theverge.com/rss/index.xml",
		count:1
	};
	
	feedr.retrieve(send, function(data){
		console.log("Current item: ");
		console.log(data.items[0].title);
		console.log("last saved item: ");
		console.log(last_item);
		if(data.items[0].title===last_item){
			//res.send(data.items[0]);
			res.status(304).end();
		}else{
			last_item = data.items[0].title;
			res.send(data.items[0]);
		}
	});
});

router.post('/callback',function(req, res){
	console.log("body here: ");
	console.log(req.body);
});

//GAME REQUESTS
router.get('/getverge',function(req, res){
	var send = {
		url:"http://www.theverge.com/rss/index.xml",
		count:10
	};
	
	feedr.retrieve(send, function(data){
		res.send(data);
	});
});


module.exports = router;
