const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    facebookId: String,
    name: String,
    rn: {
        type: Number,
        default: 0
    },
    ate6: {
        type: Number,
        default: 0
    },
    depois6: {
        type: Number,
        default: 0
    }
});

mongoose.model('users', userSchema);