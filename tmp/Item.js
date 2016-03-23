"use strict";

var Item = React.createClass({
    displayName: "Item",

    handleFinish: function handleFinish(e) {
        if (e) {
            this.props.item.isfinished = !this.props.item.isfinished;
            this.props.finishItem(this.props.item);
        }
    },

    render: function render() {
        if (this.props.item.isfinished == false) {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "li",
                    null,
                    React.createElement("input", { type: "checkbox", checked: this.props.item.isfinished, onChange: this.handleFinish }),
                    this.props.item.item
                )
            );
        }

        return React.createElement(
            "div",
            null,
            React.createElement(
                "s",
                null,
                React.createElement(
                    "li",
                    null,
                    React.createElement("input", { type: "checkbox", checked: this.props.item.isfinished, onChange: this.handleFinish }),
                    this.props.item.item
                )
            )
        );
    }
});
