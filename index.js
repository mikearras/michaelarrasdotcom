const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const path = require('path');
const fs = require('fs');
const Datastore = require('nedb');
const http = require('http');
const enforce = require('express-sslify');

const database = new Datastore('database.db');
database.loadDatabase();



const bodyParser = require('body-parser');
const { response } = require("express");
app.use(bodyParser.urlencoded({ extended: true }));

//express.json parses incoming JSON strings
app.use(express.json())
app.use(express.static('public'))
app.use(enforce.HTTPS({ trustProtoHeader: true }))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) =>{
    database.find({}, function (err, docs) {

        database.find({}).sort({ combinedScore: -1 }).limit(10).exec(function (err, data){
            if (err){
                res.end();
                return
            }
            res.render('index.ejs', {data})

        })   
        
    });
})



app.get('/api', (req, res) =>{
    // No query used means all results are returned (before the Cursor modifiers)
    database.find({}).sort({ combinedScore: -1 }).exec(function (err, data) {
     
        if (err){
            res.end();
            return
        }
        res.json(data)
    });
})

app.get('/scores', (req, res) =>{
    database.find({}, function (err, docs) {

        database.find({}, function(err, data){
            if (err){
                res.end();
                return
            }
            res.render('scores.ejs', {data})

        })   
        
    });

  
})

app.post('/api', (req, res) =>{
  //req.body comes in and is parsed into a JS object by express.json middleware
   data = req.body
   database.insert(data);  
})


app.post('/name', (req, res) =>{
  //req.body comes in and is parsed into a JS object by express.json middleware
  res.send('submitted'); 
})

app.listen(port, ()=>{
    console.log ('Server Started')
})