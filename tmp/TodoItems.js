"use strict";

var TodoItems = React.createClass({
    displayName: "TodoItems",


    render: function render() {
        var rows = [];

        // the 'this' shifts so we need the finish variable to carry the right ref down
        var finish = this.props.finishItem;
        this.props.list.forEach(function (item) {
            rows.push(React.createElement(Item, { key: item.item, item: item, finishItem: finish }));
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
