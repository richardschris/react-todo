"use strict";

var List = [{ item: "eat food", status: "unfinished" }, { item: "write tests", status: "unfinished" }];

ReactDOM.render(React.createElement(TodoList, { list: List }), document.getElementById('react-mount'));
