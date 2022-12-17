const User = require('../user/model');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');
const { getToken } = require('../../utils');

const register = async (req, res, next) => {
  try {
    let payload = req.body;
    let user = new User(payload);
    await user.save();
    return res.json(user);
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next();
  }
};

const localStrategy = async (email, password, done) => {
  try {
    let user = await User.findOne({ email }).select('-__v -createdAt -updatedAt -cart_items -token');
    if (!user) return done();
    if (bcrypt.compareSync(password, user.password)) {
      ({ password, ...userWithoutPassword } = user.toJSON());
      return done(null, userWithoutPassword);
    }
  } catch (err) {
    done(err, null);
  }
  done();
};
const login = async (req, res, next) => {
  passport.authenticate('local', async function (err, user) {
    console.log(user);
    if (err) return next(err);

    if (!user) return res.json({ error: 1, message: 'Email or password incorect!' });

    let signed = jwt.sign(user, secretKey);
    await User.findByIdAndUpdate(user._id, { $push: { token: signed } });
    res.json({
      message: 'login sucsessfuly',
      user,
      token: signed,
    });
  })(req, res, next);
  console.log('dari login :', req);
};

const logout = async (req, res, next) => {
  let token = getToken(req);
  console.log('dari log out :', token);
  let user = await User.findOneAndUpdate({ token: { $in: [token] } }, { $pull: { token: token } }, { useFindAndModify: false });
  if (!token || !user) {
    res.json({
      error: 1,
      message: 'No user found!!',
    });
    return res.json({
      error: 0,
      message: 'Logout sucsess',
    });
  }
};

const me = (req, res, next) => {
  let token = getToken(req);
  if (!token.user) {
    res.json({
      err: 1,
      message: `you're not login or token expired`,
    });
  }

  res.json(token.user);
  console.log('dari me :', token);
};
module.exports = {
  register,
  localStrategy,
  login,
  logout,
  me,
};
