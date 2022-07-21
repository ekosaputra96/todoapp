const express = require('express');
const router = express.Router();
const {getTodos, createTodo, updateTodo, deleteTodo} = require('../controllers/todosController');
const {protect} = require('../middleware/authMiddleware');

// get todods
router.get('/', protect, getTodos);

// update todo
router.put('/:id', protect, updateTodo);

// create todo
router.post('/', protect, createTodo);

// delete todo
router.delete('/:id', protect, deleteTodo);

module.exports = router;