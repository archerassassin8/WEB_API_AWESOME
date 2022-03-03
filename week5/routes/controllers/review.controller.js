var debug = require('debug')('demo')
const { query } = require('express')
var Review = require('../models/review.model')

function sendJSONresponse(res, status, content){
    res.status(status)
    res.json(content)
}

module.exports.readReviewsAll = function(req, res){
    debug('Getting all reviews')
    console.log('Getting all reviews')
    Review.find().exec().then(function(results){
        sendJSONresponse(res, 200, results)
    }).catch(function(err){
        sendJSONresponse(res, 404, err)
    })
}

module.exports.reviewsReadOne = function(req, res){
    debug('Reading one review')
    console.log('Reading one review')

    if(req.params && req.params.reviewid){

        Review.findById(req.params.reviewid).exec().then(
            function(result){
                sendJSONresponse(res,200,result)
            }
        ).catch(function(err){
            sendJSONresponse(res,404,err)
        })
    }else{
        sendJSONresponse(res, 404, {"message":"Review not found."})
    }
}

module.exports.reviewCreate = function(req, res){
    debug('Create one review', req.body)
    console.log('Create one review', req.body)

    Review.create({
        author:req.body.author,
        rating:req.body.rating,
        reviewText:req.body.reviewText
    }).then(function(dataSaved){
        sendJSONresponse(res, 201, dataSaved)
    }).catch(function(err){
        debug(err)
        sendJSONresponse(res, 404, err)
    })

}

module.exports.reviewUpdateOne = function(req, res){
    debug('Update one review')
    console.log('Update one review')
    if(!req.params.reviewid){
        sendJSONresponse(res, 404, {"message":"Not found...request id required"})
        return
    }

    Review.findById(req.params.reviewid).exec().then(
        function(reviewData){
            reviewData.author = req.body.author;
            reviewData.rating = req.body.rating;
            reviewData.reviewText = req.body.reviewText;
            return reviewData.save()
        }
    ).then(function(data){
        sendJSONresponse(res,200, data)
    }).catch(function(err){
        sendJSONresponse(res, 400, err)
    })

}

module.exports.reviewDeleteOne = function(req, res){
    debug('Delete one review')
    console.log('Delete one review')

    if(!req.params.reviewid){
        sendJSONresponse(res, 404, {"message":"Not found...request id required"})
        return
    }

    Review.findByIdAndRemove(req.params.reviewid).exec().then(
        function(reviewData){
            console.log("Review ID " + req.params.reviewid + " deleted")
            debug(reviewData)
        }
    ).catch(function(err){
        sendJSONresponse(res, 400, err)
    })
}

module.exports.queryPage = function(req, res){
    res.render("QueryExample", {title: "Query"})
}

module.exports.sorting = function(req, res){

    Review.find().then(function(review){
        if(req.params.order === "Ascending"){
            switch(req.params.sort){
                case "Author": review.sort(function(a, b){ 
                    return a.author.localeCompare(b.author)
                }) 
                break;
                case "Rating": review.sort(function(a, b){ 
                    return parseFloat(a.rating)-parseFloat(b.rating)
                }) 
                break;
                case "Date": review.sort(function(a, b){ 
                    return new Date(a.Date).getTime() - new Date(b.Date).getTime()
                }) 
                break;
            }
        }
        if(req.params.order === "Descending"){
            switch(req.params.sort){
                case "Author": review.sort(function(a, b){ 
                    return b.author.localeCompare(a.author)
                }) 
                break;
                case "Rating": review.sort(function(a, b){ 
                    return parseFloat(b.rating)-parseFloat(a.rating)
                }) 
                break;
                case "Date": review.sort(function(a, b){ 
                    return new Date(b.Date).getTime() - new Date(a.Date).getTime()
                }) 
                break;
            }
        }
        res.json({review})
    })

    
}

module.exports.searching = function(req, res){

    var value = req.params.value

    switch(req.params.search){
        case search = "Author": Review.find({search:value}).then(function(review){
            res.json({review})
        })
        break;
        case search = "Rating": Review.find({search:value}).then(function(review){
            res.json({review})
        })
        break;
        case search = "Date": Review.find({search:value}).then(function(review){
            res.json({review})
        })
        break;
    }

}