const mongoose = require('mongoose');
const User = require('./users');

const { Schema } = mongoose;

const fraldasSchema = new Schema({
    rn_mais: {
        type: Number,
        default: 0
    },
    fraldas_P: {
        type: Number,
        default: 0
    },
    fraldas_M: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'}
});

const Fraldas = mongoose.model('fraldas', fraldasSchema);

module.exports = Fraldas;