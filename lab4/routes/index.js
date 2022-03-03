var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lab4', num: "", size: ""  });
});

router.post('/send', function(req, res, next) {
  res.render('index', { title: 'Lab4', num: "", size: req.body.numbers });
});

module.exports = router;
