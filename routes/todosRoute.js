const express = require('express');
const router = express.Router();
const {getTodos, createTodo, updateTodo, deleteTodo} = require('../controllers/todosController');

// get todods
router.get('/', getTodos);

// update todo
router.put('/:id', updateTodo);

// create todo
router.post('/', createTodo);

// delete todo
router.delete('/:id', deleteTodo);

module.exports = router;