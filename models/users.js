const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    facebookId: String,
    displayName: String,
    rn_mais: {
        type: Number,
        default: 0
    },
    fraldas_p: {
        type: Number,
        default: 0
    },
    fraldas_m: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;