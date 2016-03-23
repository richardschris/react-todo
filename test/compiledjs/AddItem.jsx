var React = require("react");
var AddItem = React.createClass({
    
    addItem: function(e) {
        e.preventDefault();
        this.props.onAddItem(this.refs.itemBoxValue.value);
        this.refs.itemBoxValue.value = '';
    },
            
    render: function() {
        return ( 
        <form onSubmit={this.addItem}>
            <input type="text" 
                 placeholder="What do you need to do?" 
                 ref="itemBoxValue"
                 className="input-box"
             />
            <input type="submit" value="add" />
        </form>
        );
    }
}); 
module.exports = AddItem;