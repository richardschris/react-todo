"use strict";

var TodoItems = React.createClass({
    displayName: "TodoItems",


    render: function render() {
        var rows = [];
        this.props.list.forEach(function (item) {
            rows.push(React.createElement(Item, { key: item.item, text: item.item }));
        });

        return React.createElement(
            "div",
            null,
            React.createElement(
                "ul",
                null,
                rows
            )
        );
    }
});
