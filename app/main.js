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

'use strict';

var List = [];

ReactDOM.render(React.createElement(TodoList, { list: List }), document.getElementById('react-mount'));
