var express = require('express');
var feedr = require('./superfeedr');
var router = express.Router();

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

router.post('/callback',function(req, res){
	console.log("body here: ");
	console.log(req.body);
});

module.exports = router;
