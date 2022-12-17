const { getToken } = require('../utils');
const jwt = require('jsonwebtoken');
const User = require('../app/user/model');
const { secretKey } = require('../app/config');

function decodeToken() {
  return async function (req, res, next) {
    try {
      let token = getToken(req);
      // console.log('dari decode :', token);
      if (!token) return next();
      console.log('dari decode :', token);
      req.user = jwt.verify(token, secretKey);
      console.log('dari decode :', req.user);

      let user = await User.findOne({ token: { $in: [token] } });
      if (!user) {
        res.json({
          error: 1,
          message: 'token expired',
        });
      }
      // console.log('dari user decode :', user);
      // console.log('dari decode :', token);
      // console.log('dari decode req :', req);
    } catch (err) {
      console.log(err);
      if (err && err.name === 'JsonWebTokenError') {
        return res.json({
          error: 1,
          message: err.message,
        });
      }

      next(err);
    }
    return next();
  };
}

module.exports = {
  decodeToken,
};
