const { Schema, model } = require('mongoose');

const deliveryAddressScema = Schema(
  {
    nama: {
      type: String,
      required: [true, ' nama alamat harus di isi'],
      maxlength: [255, 'panjang maksimal nama alamat adalah 255 karakter'],
    },
    kelurahan: {
      type: String,
      required: [true, 'kelurahan harus di isi'],
      maxlength: [255, 'panjang maksimal kelurahan adalah 255 karakter'],
    },
    kecamatan: {
      type: String,
      required: [true, 'kecamatan harus di isi'],
      maxlength: [255, 'panjang maksimal kecamatan adalah 255 karakter'],
    },
    kabupaten: {
      type: String,
      required: [true, 'kabupaten harus di isi'],
      maxlength: [255, 'panjang maksimal kabupaten adalah 255 karakter'],
    },
    perovinsi: {
      type: String,
      required: [true, 'perovinsi harus di isi'],
      maxlength: [255, 'panjang maksimal perovinsi adalah 255 karakter'],
    },
    detail: {
      type: String,
      required: [true, 'detail alamat harus di isi'],
      maxlength: [1000, 'panjang maksimal detail alamat adalah 1000 karakter'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = model('DeliveryAddress', deliveryAddressScema);
