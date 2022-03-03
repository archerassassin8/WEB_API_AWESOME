var express = require('express');
var router = express.Router();
var ctrlReviews = require('./controllers/review.controller')

//include routes for REST API Example
router.get('/reviews', ctrlReviews.readReviewsAll)
router.get('/reviews/:reviewid', ctrlReviews.reviewsReadOne)
router.post('/reviews', ctrlReviews.reviewCreate)
router.put('/reviews/:reviewid', ctrlReviews.reviewUpdateOne)
router.delete('/reviews/:reviewid', ctrlReviews.reviewDeleteOne)
router.get('/QueryExample', ctrlReviews.queryPage)
router.get('/reviews/Sorting?_sort=:column/:order', ctrlReviews.sorting)
router.get('/reviews/Searching?:column=:value', ctrlReviews.searching)


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
