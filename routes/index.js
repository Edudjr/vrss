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
	var json = feedr.retrieve("http://www.theverge.com/rss/index.xml");
	console.log("live post:");
	console.log(json);
	res.send(json);
});

router.post('/callback',function(req, res){
	console.log("body here: ");
	console.log(req.body);
});

module.exports = router;
