const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: String,
    userId: mongoose.Types.ObjectId,
    text: String,
    completed: Boolean
});

module.exports = mongoose.model('Todo', schema);