var React = require("react");
var List = [];

ReactDOM.render(
    <TodoList list={List} />,
    document.getElementById('react-mount')
);
module.exports = Main;