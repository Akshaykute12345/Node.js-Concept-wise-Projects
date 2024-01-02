"use strict";
exports.__esModule = true;
var express_1 = require("express");
var todos = [];
var router = (0, express_1.Router)();
router.get('/', function (req, res, next) {
    res.status(200).json({ todos: todos });
});
router.post('/todo', function (req, res, next) {
    var body = req.body;
    var newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Added Todo', todo: newTodo, todos: todos });
});
router.put('/todo/:todoId', function (req, res, next) {
    var params = req.params;
    var tid = params.todoId;
    var body = req.body;
    var todoIndex = todos.findIndex(function (todoItem) { return todoItem.id === tid; });
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res.status(200).json({ message: 'Updated todo', todos: todos });
    }
    res.status(404).json({ message: 'Could not find todo for this id.' });
});
router["delete"]('/todo/:todoId', function (req, res, next) {
    var params = req.params;
    todos = todos.filter(function (todoItem) { return todoItem.id !== params.todoId; });
    res.status(200).json({ message: 'Deleted todo', todos: todos });
});
exports["default"] = router;
