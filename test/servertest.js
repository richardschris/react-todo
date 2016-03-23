var assert = require('chai').assert;
var request = require('request');

describe('Getting data from the API', function() {
    var server;
    

    server = require('../server');
        
    it('responds to /', function(done) {
        request('http://localhost:3000', function(error, res, body) {
            done();
            assert.equal(res.statusCode, 200);
        });
    });
    
    var testObject = {
        index: 0, item: 'eat food', isfinished: false
    };
    
    it('gets back the test data', function(done) {
        request('http://localhost:3000/api/0', function(error, res, body) {
            done();
            assert.equal(body, testObject);
        });
    });
    
    it('gets the full list with length 2', function(done) {
        request('http://localhost:3000/api', function(error, res, body) {
            done();
            assert.equal(body.length, 2);
        });
    });
});

describe('Posting data to the API', function() {
    var server;
    server = require('../server');
    
    it('accepts new data', function(done) {
        var testObject = {index: 2, item: 'Testing!', isfinished: false};
        request.post({url: 'http://localhost:3000/api', body: JSON.stringify(testObject), headers: {
            'Content-Type': 'application/json'
        }});
        
        request('http://localhost:3000/api/2', function(error, res, body) {
            done();
            assert.equal(testObject, body);
        });
    });
});