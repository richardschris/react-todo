'use strict';

var TodoList = React.createClass({
    displayName: 'TodoList',

    //keep state here
    getInitialState: function getInitialState() {
        var items = this.props.list;
        return {
            textBoxValue: '',
            items: items
        };
    },

    handleAddItem: function handleAddItem(item) {
        var newItems = this.state.items;
        newItems.push({ item: item, status: "unfinished" });
        this.setState({
            textBoxValue: '',
            items: newItems
        });
    },

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(AddItem, {
                onAddItem: this.handleAddItem,
                textBoxValue: this.state.textBoxValue
            }),
            React.createElement(TodoItems, { list: this.state.items })
        );
    }
});
