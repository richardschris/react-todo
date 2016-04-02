'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var cradle = require('cradle');

app.use('/js', express.static('app'));
app.use('/react', express.static('bower_components/react'));
app.use('/fetch', express.static('bower_components/fetch'));
app.use('/es6-promise', express.static('bower_components/es6-promise'));
app.use(bodyParser.json());

/*
CouchDB items/allitems view function
function(doc) { emit(doc.index, {index: doc.index, item: doc.item,
isfinished: doc.isfinished});}

DB format: {index: integer, item: string, isfinished: boolean}
*/

cradle.setup({
    host: 'localhost',
    cache: true,
    raw: false,
    forceSave: true,
    port: 5984
});

var c = new(cradle.Connection)();
var db = c.database('todo');

var todoListLength = 0;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/app/index.html'));
});

var server = app.listen(3000, function() {
    console.log('Listening on port 3000!');
});

var demoTodoList = [{index: 0, item: "eat food", isfinished: false}, {index: 1, item: "learn express", isfinished: true}];

app.get('/api', function(req, res){
    // TODO: Promisify the view!

    let todoList = [];
    db.view('items/allitems', function(err, doc) {
        if (doc) {for (let item of doc) {
            todoList.push(item['value']);
        }}

        res.setHeader('Content-Type', 'application/json');
        res.json(todoList);
        todoListLength = todoList.length;
    });

});

app.post('/api', function(req, res) {
    db.save({index: req.body.index, item: req.body.item, isfinished: req.body.isfinished});
});

app.get('/api/:id(\\d+)/', function(req, res) {
    db.view('items/allitems', {key: Number(req.params.id)}, function(err, doc) {
        res.setHeader('Content-Type', 'application/json');
        res.json(doc);
    });
});

app.post('/api/:id(\\d+)/', function(req, res) {

    db.view('items/allitems', {key: Number(req.params.id)}, function (err, doc)     {
        doc[0].value.isfinished = req.body.isfinished;
        db.save(doc[0].id, doc[0].value);
    });
});

// testing couchdb

app.get('/test', function(req, res) {
    db.view('items/allitems', function(err, doc) {
    });
});

module.exports = server;
