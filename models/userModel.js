const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Kid = require('./kidModel');

const user = new mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    pin: {
        required: true,
        type: Number
    },
    name: {
        required: true,
        type: String
    },
    lastname: {
        required: true,
        type: String
    },
    cellphone: {
        required: true,
        type: Number
    },
    birthdate: {
        required: true,
        type: Date
    },
    kids: [{ type: Schema.Types.ObjectId, ref: 'Kid' }],
    state:{
        required: true,
        type: String
    },
    salt: String
})

module.exports = mongoose.model('User', user);