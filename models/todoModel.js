const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, "Please Fill a text"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model('todo', todoSchema);