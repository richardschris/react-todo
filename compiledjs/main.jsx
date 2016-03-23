var React = require("react");
var List = [{item: "eat food", status: "unfinished"}, 
    {item: "write tests", status: "unfinished"}];

ReactDOM.render(
    <TodoList list={List} />,
    document.getElementById('react-mount')
);
module.export = Main