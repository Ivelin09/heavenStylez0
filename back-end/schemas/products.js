const mongoose = require('mongoose');
const { Schema } = mongoose;

const products = new Schema({
  title: String,
  description: String,
  image: {
    type: Schema.Types.ObjectId,
    ref: 'images'
  },
  price: Number,
  top: {
    type: Boolean,
    required: false
  }
});

module.exports = mongoose.model("products", products);