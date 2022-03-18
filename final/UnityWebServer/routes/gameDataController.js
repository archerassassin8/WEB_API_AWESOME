var GameTest = require('../models/GameTest')


module.exports.getAllGameData = function(req,res){
  var sort = {"myName" : 1}
    GameTest.find().sort(sort).then(function(gamedata){
      console.log(gamedata)
      res.json(gamedata)
    })
}

module.exports.getOneByName = function(req,res){
    console.log("Selected by myName!", req.query.name);
    GameTest.findOne({"myName":req.query.name}).then(function(gamedata){
      console.log(gamedata)
      res.json(gamedata)
    })
}

module.exports.updateSingle = function(req,res){
console.log("Function ran")
    GameTest.updateOne(
      {myName : req.body.myName},
      {myName : req.body.myName,
      myHealth : req.body.myHealth,
      myScore : req.body.myScore,
      isDead : req.body.isDead}
    ).catch(function(err){
      console.log(err)
    })
}

module.exports.deleteSingle = function(req,res){
  console.log(req.query.myName)
  GameTest.deleteOne({"myName":req.query.myName}).then(function(){
    console.log("Awesome")
  }).catch(function(err){
    console.log(err)
  })
}

module.exports.saveEntry = function(req,res){
    var errors = []
    
    if(req.body.myName == ""){
      errors.push({text:"Name Not added"})
    }
    if(req.body.myScore == 0){
      errors.push({text:"No Score Added"})
    }
    if(req.body.myHealth == 0){
      errors.push({text:"No Health Added"})
    }
    //if there are errors don't validate if there aren't log and save data
    if(errors.length > 0){
      console.log({
        errors:errors
      })
    }else{
      console.log("Hello from Unity Post ", req.body)
      var gameTestData = {
        myName:req.body.myName,
        myScore:req.body.myScore,
        myHealth:req.body.myHealth,
        isDead:req.body.isDead
      }
      console.log(gameTestData)
      new GameTest(gameTestData).save().then(function(data){
        console.log("Data Saved")
      }).catch(function(err){
        console.log(data)
      })
    }
    
  }