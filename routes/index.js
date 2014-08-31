var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index.ejs', { title: 'Express' });
});

router.get('/model',function(req, res){
	res.render('model.ejs',{ title: 'Model' });
});

module.exports = router;
