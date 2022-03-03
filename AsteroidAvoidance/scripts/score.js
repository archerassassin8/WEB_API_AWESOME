var mongoose = require('mongoose')
var Score = mongoose.Schema

var Score = new mongoose.Schema({
    score:{
        type:String,
        required:true
    }
})

mongoose.model('score', Score)
