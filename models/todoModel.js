const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Please Fill a text"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model('todo', todoSchema);