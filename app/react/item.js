"use strict";

var Item = React.createClass({
    displayName: "Item",

    render: function render() {
        return React.createElement(
            "li",
            null,
            this.props.text
        );
    }
});
