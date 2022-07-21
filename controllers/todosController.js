const Todo = require('../models/todoModel');
const asyncHandler = require('express-async-handler');
const { json } = require('express');


// @desc        Get todos
// @route       GET /api/todos
// @acess       Public
const getTodos = asyncHandler(async(req, res) => {
    const todos = await Todo.find();
    if(Object.keys(todos).length === 0){
        res.status(200).json({
            message: "No Todos"
        })
    }else{
        res.status(200).json(todos);
    }
})

// @desc        SET todo
// @route       POST /api/todos
// @acess       Public
const createTodo = asyncHandler(async(req, res) => {
    // check body text
    if(!req.body.text){
    res.status(400);
    throw new Error("No Text");}

    // check only 1 filed
    if(Object.keys(req.body).length > 1){
        res.status(400); 
        throw new Error("Only Text Fields");
    }

    // create document
    const todo = await Todo.create({text: req.body.text});

    res.status(201).json(todo);
})

// @desc        update todos
// @route       PUT /api/todos
// @acess       Public
const updateTodo = asyncHandler(async(req, res, next) => {
    // check todo
    try {
        await Todo.findById(req.params.id);
    } catch (error) {
        throw new Error(`Todo Not Found`)
    }

    if(!req.body.text){
        res.status(400);
        throw new Error("No Text");}
    
    // check only 1 filed
    if(Object.keys(req.body).length > 1){
        res.status(400); 
        throw new Error("Only Text Fields");
    }
    // res.status(200).json(foundTodo);
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedTodo);
})

// @desc        Delete todos
// @route       Delete /api/todos
// @acess       Public
const deleteTodo = asyncHandler(async(req, res) => {
    try {
        await Todo.findByIdAndRemove(req.params.id)
        res.status(200).json(req.params.id)
    } catch (error) {
        res.status(400)
        throw new Error("Todo Not Found");
    }
})


module.exports = {
    getTodos,
    updateTodo,
    createTodo,
    deleteTodo
}