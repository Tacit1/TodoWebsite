const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: String,
    name: String,
    StartTime: String,
    EndTime: String,
});

module.exports = mongoose.model('Calendar', schema);