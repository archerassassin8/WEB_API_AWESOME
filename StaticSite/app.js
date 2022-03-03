const { response } = require('express');
const express = require('express')
const app = express()
const path = require('path')
const port = process.env.port||3000;

app.use(express.static(__dirname+"/views"))

app.get('/', (request, response)=>{
    response.sendFile(__dirname+"/views/index.html")
})

/*app.get('/highnoon', (request, response)=>{
    response.sendFile(__dirname+"/views/highscores.html")
})*/

//app lisen sets up a connection
app.listen(port, ()=>{
    console.log(`Connnected to port ${port}`)
})