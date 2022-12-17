const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const productSchema = Schema(
  {
    name: {
      type: String,
      minlength: [3, 'nama makanan harus lebih dari 3 karakter'],
      required: [true, 'nama makanan harus ada !'],
    },
    description: {
      type: String,
      maxlength: [1000, 'panjang deskripsion maximal 1000 karakter'],
    },
    price: {
      type: Number,
      default: 0,
    },
    image_url: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    tags: {
      type: Schema.Types.ObjectId,
      ref: 'Tag',
    },
  },
  { timestamps: true }
);

module.exports = model('Products', productSchema);
