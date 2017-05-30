const express = require('express');
const app = express();
const server = require("http").createServer(app);
const request = require('request');

app.use(express.static(__dirname+"/build"));

app.get('/',function (req,res) {
 res.sendFile(__dirname+'/views/index.html','utf8');
})

app.get('/:id',function (req,res) {
 res.sendFile(__dirname+'/views/gists.html','utf8');
})


app.listen("3000",()=> {
  console.log("App listen at: http://localhost:3000")
})
