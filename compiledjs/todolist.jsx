var React = require("react");
var TodoList = React.createClass({
   //keep state here
   getInitialState: function() {
       var items = this.props.list;
       return {
           textBoxValue: '',
           items: items
        };
   },
   
   handleAddItem: function(item) {
       var newItems = this.state.items;
       newItems.push({item: item, status: "unfinished"});
       this.setState({
           textBoxValue: '',
           items: newItems
       })
   },
      
   render: function() {       
       return (
           <div>
                <AddItem  
                    onAddItem={this.handleAddItem}
                    textBoxValue={this.state.textBoxValue}
                 />
                <TodoItems list={this.state.items}/>  
           </div>
       );
   } 
});
module.export = TodoList