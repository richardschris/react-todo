var React = require("react");
var TodoItems = React.createClass({
            
   render: function() {
       var rows = [];
       this.props.list.forEach(function(item) {
          rows.push(<Item key={item.item} text={item.item} /> ) 
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
module.export = TodoItems