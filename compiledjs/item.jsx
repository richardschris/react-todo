var React = require("react");
var Item = React.createClass({
    render: function() {
        return (
                <li>{this.props.text}</li>
        );
    }
});
module.exports = Item;