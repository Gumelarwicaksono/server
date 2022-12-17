const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const Tag = Schema({
  name: {
    type: String,
    minlength: [3, 'nama tag harus lebih dari 3 karakter'],
    maxlength: [20, 'panjang tag max 20 karakter'],
    required: [true, 'nama tag  harus ada !'],
  },
});

module.exports = model('Tag', Tag);
