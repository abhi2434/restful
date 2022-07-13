var express = require('express');
var app = express();
var fs = require("fs");
var index = 3;
app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})
app.get('/products', function (req, res) {
    fs.readFile( __dirname + "/" + "products.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
    });
 })

app.post('/addUser', function (req, res) {
    // First read existing users.
    var user = {
        "user" : {
           "name" : req.params.name,
           "password" : req.params.password,
           "profession" : req.params.profession,
           "id": (index + 1)
        }
     };
     index++;
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data.push(user["user"]);
       console.log( data );
       res.end( JSON.stringify(data));
    });
 })

 app.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
    });
 })
 app.delete('/deleteUser', function (req, res) {
    
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 2];
        
       console.log( data );
       res.end( JSON.stringify(data));
    });
 })
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})