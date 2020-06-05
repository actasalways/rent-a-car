const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        maxlength: 7,
        required: true
    }
}, { collection: 'users' });

module.exports = mongoose.model('users', usersSchema);