const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const Category = Schema({
  name: {
    type: String,
    minlength: [3, 'nama category harus lebih dari 3 karakter'],
    maxlength: [20, 'panjang category max 20 karakter'],
    required: [true, 'nama category  harus ada !'],
  },
});

module.exports = model('Category', Category);
