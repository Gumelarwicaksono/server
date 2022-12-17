const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');
const userSchema = Schema(
  {
    full_name: {
      type: String,
      required: [true, 'Nama harus diisi'],
      maxlength: [255, 'Panjang nama harus antara 3 - 255 karakter'],
      minlength: [3, 'Panjang nama harus antara 3 - 255 karakter'],
    },
    customer_id: {
      type: Number,
    },
    email: {
      type: String,
      maxlength: [255, 'panjang email maxsimal 255 karakter'],
      required: [true, 'email harus  diisi'],
    },
    password: {
      type: String,
      maxlength: [255, 'panjang password maxsimal 255 karakter'],
      required: [true, 'password harus  diisi'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    token: [String],
  },
  { timestamps: true }
);

userSchema.path('email').validate(
  function (value) {
    const EMAIL_RE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return EMAIL_RE.test(value);
  },
  (attr) => `${attr.value} Harus merupakan email yang valid`
);
//
userSchema.path('email').validate(
  async function (value) {
    try {
      // melakukan pencarian ke collections user berdasarkan email
      const count = await this.model('User').count({ email: value });
      return !count;
    } catch (error) {
      throw error;
    }
  },
  (attr) => `${attr.value} email anda sudah terdaftar!`
);
//hashing password
const HASH_ROUND = 10;
userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});
// auto increment
userSchema.plugin(AutoIncrement, { inc_field: 'customer_id' });

module.exports = model('User', userSchema);
