var mjsdom = require('mocha-jsdom');
var ReactDOM = require('react-dom');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var assert = require('chai').assert;


// Item component tests
describe('Item component', function() {
    mjsdom({skipWindowCheck: true});
    var item = {item: "Testing!", isfinished: false};
  
    var ItemDiv = require('./compiledjs/Item.jsx');
    var myDiv = TestUtils.renderIntoDocument(
        <ItemDiv item={item} />
    );

    it('should take a prop with the text: Testing!', function() {
        var divText = TestUtils.findRenderedDOMComponentWithTag(myDiv, 'li');
        
        assert.equal(divText.textContent, 'Testing!');
    });
    
    it('should return true', function() {       
       var divInput = TestUtils.findRenderedDOMComponentWithTag(myDiv, 'input');
       
       assert.equal(divInput.checked, false);
    });
});

// AddItem component tests
describe('AddItem component', function() {
    mjsdom({skipWindowCheck: true});
    
    // mocking the onAddItem function
    var onAddItem = function(item) {
        if (item === 'Testing!') return true;
        else return false;
    };
    
    var AddItemDiv = require('./compiledjs/AddItem.jsx');
    var myDiv = TestUtils.renderIntoDocument(
        <AddItemDiv
            onAddItem={onAddItem}
            itemBoxValue=''
        />
    );
    
    it('should accept text: Testing!', function() {
        var divForm = TestUtils.scryRenderedDOMComponentsWithTag(myDiv, 'input');
        divForm[0].value = 'Testing!'
        // we're testing to see if it accepts text
        assert.equal(onAddItem(divForm[0].value), true);
    });
        
});