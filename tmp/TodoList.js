'use strict';

var TodoList = React.createClass({
    displayName: 'TodoList',

    //keep state here
    getInitialState: function getInitialState() {
        var items = this.props.list;
        return {
            itemBoxValue: '',
            items: items
        };
    },

    componentDidMount: function componentDidMount() {
        var _this = this;

        fetch('/api').then(function (response) {
            return response.json();
        }).then(function (r) {
            return _this.setState({ items: r });
        });
    },

    handleAddItem: function handleAddItem(item) {
        if (item === '') return;
        var newItems = this.state.items;
        var newItem = { index: this.state.items.length, item: item, isfinished: false };

        var post = {
            method: 'POST',
            body: JSON.stringify(newItem),
            headers: new Headers({ 'Content-Type': 'application/json' })
        };

        fetch('/api', post);

        newItems.push(newItem);
        this.setState({
            itemBoxValue: '',
            items: newItems
        });
    },

    handleFinishItem: function handleFinishItem(item) {
        var index = this.state.items.indexOf(item);
        this.setState({ itemBoxValue: this.state.itemBoxValue, items: this.state.items });

        var post = {
            method: 'POST',
            body: JSON.stringify(item),
            headers: new Headers({ 'Content-Type': 'application/json' })
        };

        fetch('/api/' + index, post);
    },

    // all new components go here, eventually.
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(AddItem, {
                onAddItem: this.handleAddItem,
                itemBoxValue: this.state.itemBoxValue
            }),
            React.createElement(TodoItems, {
                list: this.state.items,
                finishItem: this.handleFinishItem
            })
        );
    }
});
