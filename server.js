var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use('/js', express.static('app'));
app.use('/react', express.static('bower_components/react'));
app.use('/fetch', express.static('bower_components/fetch'));
app.use('/es6-promise', express.static('bower_components/es6-promise'));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/app/index.html'));
});

var server = app.listen(3000, function() {
    console.log('Listening on port 3000!');
});

var demoTodoList = [{index: 0, item: "eat food", isfinished: false}, {index: 1, item: "learn express", isfinished: true}];

app.get('/api', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.json(demoTodoList);
});

app.post('/api', function(req, res) {
        
    for (var i = 0; i < demoTodoList.length; i++) {
        if (demoTodoList[i].index === req.body.index && demoTodoList[i].isfinished != req.body.isfinished) {
            demoTodoList[i].isfinished = req.body.isfinished;
            return;
        }
    }

    demoTodoList.push(req.body);
});

app.get('/api/:id(\\d+)/', function(req, res) {
    res.send(demoTodoList[req.params.id]);
});

app.post('/api/:id(\\d+)/', function(req, res) {
    if (demoTodoList[req.params.id].isfinished != req.body.isfinished) { demoTodoList[req.params.id].isfinished = req.body.isfinished; }
});

module.exports = server;