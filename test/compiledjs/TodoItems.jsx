var React = require("react");
var TodoItems = React.createClass({
            
   render: function() {
       var rows = [];
       
       // the 'this' shifts so we need the finish variable to carry the right ref down
       var finish = this.props.finishItem;
       this.props.list.forEach(function(item) {
          rows.push(<Item key={item.item} item={item} finishItem={finish}/> ) 
       });
       
       return (
           <div>
                <ul>
                {rows}
                </ul>
           </div>
       ); 
   } 
});
module.exports = TodoItems;