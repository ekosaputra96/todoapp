const express = require('express');
const colors = require('colors');
require('dotenv').config()
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

// initial expree
const app = express();

// connect db
connectDB();

// middleware for parsing incoming payload
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/api/todos/', require('./routes/todosRoute'));
app.use('/api/users', require('./routes/userRoute'));

// middleware error handling
app.use(errorHandler);

// make it running
app.listen(process.env.PORT, () => {
    console.log(`Running on ${process.env.PORT}`.underline.cyan);
})