var React = require("react");
var AddItem = React.createClass({
    addItem: function(e) {
        e.preventDefault();
        this.props.onAddItem(this.refs.textBoxValue.value);
    },
    render: function() {
        return ( 
        <form onSubmit={this.addItem}>
            <input type="text" placeholder="What do you need to do?" 
                 ref="textBoxValue" />
            <input type="submit" value="add" />
        </form>
        );
    }
});
module.export = AddItem