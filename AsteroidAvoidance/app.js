var express = require('express')
var app = express()
var path = require('path')
var bodyparser = require('body-parser')
var mongoose = require('mongoose')

//setup body-parser middleware to use in application
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())

//setup connection to mongoose
mongoose.connect('mongodb://localhost:27017/scores',{
    useNewURLParser:true
}).then(function(){
    console.log("Connected to Mongo DB Database");
}).catch(function(err){
    console.log(err)
})

//Use Models for Database
require('./scripts/score')
var Score = mongoose.model('score')



//Setup the post route to save the data
app.post('/scores', function(req,res){
    console.log("Request Made")
    console.log(req.body)
    //save the data
    new Score(req.body).save().then(function(){
        res.redirect('scorelist.html') //MAKE THIS HIGH SCORES
    })
})

//setup get route to send data to Score List
app.get('/getData', function(req,res){
    Score.find({}).then(function(score){
        console.log("Retrieving Scores")
        console.log({score})
        res.json({score})
    })
})

//setup post route to delete score entry
app.post('/deleteScore', function(req,res){
    console.log("Score Deleted" , req.body._id)
    Score.findByIdAndDelete(req.body._id).exec()
    res.redirect('scorelist.html')
})

//sets up static server and sets up connection
app.use(express.static(__dirname+""))
app.listen(3000, function(){
    console.log("Listening on Port 3000")
})