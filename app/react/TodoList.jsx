var TodoList = React.createClass({
   //keep state here
   getInitialState: function() {
       var items = this.props.list;
       return ({
           itemBoxValue: '',
           items: items
       });    
   },
   
   componentDidMount: function() {
       
        fetch('/api').then(function(response) {
            return response.json();
        }).then((r) => {
            return this.setState({items:r});
        });
        
   },
   
   handleAddItem: function(item) {
       if (item === '') return;
       var newItems = this.state.items;
       var newItem = {index: this.state.items.length, item: item, isfinished: false}
       
       var post = {
          method: 'POST',
          body: JSON.stringify(newItem),
          headers: new Headers({'Content-Type':'application/json'})
       };

       fetch('/api', post);
       
       newItems.push(newItem);
       this.setState({
           itemBoxValue: '',
           items: newItems
       });
   },
   
   handleFinishItem: function(item) {
       var index = this.state.items.indexOf(item);
       this.setState({itemBoxValue: this.state.itemBoxValue, items: this.state.items});
       
       var post = {
           method: 'POST',
           body: JSON.stringify(item),
           headers: new Headers({'Content-Type':'application/json'})    
       };
       
       fetch('/api/' + index, post);
   },
   
   // all new components go here, eventually.
   render: function() {       
       return (
           <div>
                <AddItem  
                    onAddItem={this.handleAddItem}
                    itemBoxValue={this.state.itemBoxValue}
                 />
                <TodoItems 
                    list={this.state.items}
                    finishItem={this.handleFinishItem}
                />  
           </div>
       );
   } 
});