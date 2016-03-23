var React = require("react");
var Item = React.createClass({
    handleFinish: function(e) {
        if (e) {
            this.props.item.isfinished = !this.props.item.isfinished;
            this.props.finishItem(this.props.item);  
        }  
    },
    
    render: function() { 
            if (this.props.item.isfinished == false) { return(
            <div>
                <li><input type="checkbox" checked={this.props.item.isfinished} onChange={this.handleFinish}></input>{this.props.item.item}</li>
            </div> 
            );}
            
            return(           
            <div>
                <s><li><input type="checkbox" checked={this.props.item.isfinished} onChange={this.handleFinish}></input>{this.props.item.item}</li></s>
            </div>);
    }
}); 
module.exports = Item;