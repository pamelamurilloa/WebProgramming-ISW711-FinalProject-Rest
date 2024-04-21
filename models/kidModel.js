const mongoose = require('mongoose');

const kid = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    pin: {
        required: true,
        type: Number
    },
    avatar: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Kid', kid);