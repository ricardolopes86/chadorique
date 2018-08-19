const mongoose = require('mongoose');
const { Schema } = mongoose;

const fraldasSchema = new Schema({
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

mongoose.model('fraldas', fraldasSchema);