"use strict";

var AddItem = React.createClass({
    displayName: "AddItem",


    addItem: function addItem(e) {
        e.preventDefault();
        this.props.onAddItem(this.refs.itemBoxValue.value);
        this.refs.itemBoxValue.value = '';
    },

    render: function render() {
        return React.createElement(
            "form",
            { onSubmit: this.addItem },
            React.createElement("input", { type: "text",
                placeholder: "What do you need to do?",
                ref: "itemBoxValue",
                className: "input-box"
            }),
            React.createElement("input", { type: "submit", value: "add" })
        );
    }
});
