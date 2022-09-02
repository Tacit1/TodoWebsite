const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: String,
    text: String,
    completed: Boolean
});

module.exports = mongoose.model('todo', schema);