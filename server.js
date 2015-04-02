// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express')
var app = express()
var port = process.env.PORT || 80
var bodyParser = require('body-parser')
var http = require('http')
var mongoose = require('mongoose');

// DATBASE CRUMS ======================================

mongoose.connect('mongodb://usc_admin:admin1@ds031701.mongolab.com:31701/usc_web', function(err, db) {
    if (err) throw err;
    console.log("Connected to Database");
    _db = db //this is our global database object
})

app.use(bodyParser.json()) // get information from html forms
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static(__dirname + '/public'))



// routes ======================================================================

// **** GETOS **** 
app.get('/companies', function(req, res) {
    res.send('Hello World!');
});

app.get('/buyOrder', function(req, res) {
    res.send('Hello World!');
});

app.get('/saleOrder', function(req, res) {
    res.send('Hello World!');
});


// **** POSTOS **** 
app.post('/companies', function(req, res) {
    res.send('Hello World!');
});

app.post('/buyOrder', function(req, res) {
    res.send('Hello World!');
});

app.post('/saleOrder', function(req, res) {
    res.send('Hello World!');
});

app.post('/transaction', function(req, res) {
    res.send('Hello World!');
});

// **** PUTOS ****
app.put('/companies/:company_id', function(req, res) {
    res.send('Hello World!');
});

// **** REMOVEOS ****
app.delete('/buyOrders/:buyOrder_id', function(req, res) {
    res.send('Hello World!');
});

app.delete('/buyOrders/:saleOrder_id', function(req, res) {
    res.send('Hello World!');
});

// launch ======================================================================
app.listen(port)
console.log('The magic happens on port ' + port)