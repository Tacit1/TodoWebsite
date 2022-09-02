const mongoose = require('mongoose');
const crypto = require('crypto');
const uuid = require('uuid');
const {v5} = require("uuid");

const memberschema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        maxLength: 32,
        trim: true
    },
    username: {
        type: String,
        required: true,
        maxLength: 32,
        trim: true,
        unique: true
    },
    encry_password: {
        type:String,
        required:true
    },
    salt: String,
}, {timestamps:true});

memberschema.virtual("password")
        .set(function(password) {
            this._password = password
            this.salt = uuid.v1()
            this.encry_password = this.securePassword(password)
         })
        .get(function() {
            return this._password
        })
memberschema.methods = {
    authenticate: function(plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password
    },
    securePassword: function(plainpassword) {
        if(!plainpassword) return ""

        try {
            return crypto.createHmac("sha256", this.salt).update(plainpassword).digest("hex")
        } catch (err) {
            return""
        }
    }
}



module.exports = mongoose.model('Member', memberschema);