var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index.ejs', { title: 'Express' });
});

router.get('/model',function(req, res){
	res.render('model.ejs',{ title: 'Model' });
});

router.post('/callback',function(req, res){
	console.log("body here: ");
	console.log(req.body);
});

module.exports = router;
