const mongoose = require('mongoose');
const { Schema } = mongoose;

const Images = new Schema({
    primaryImagePath: {
        type: String,
        require: true
    },
    secondaryImagePath: {
        type: String,
        require: true
    },
    images: {
        type: Array,
        require: false
    }
});

module.exports = mongoose.model("images", Images);