const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    forename: String,
    surname: String,
    email: String
});

module.exports = mongoose.model('Member', schema);