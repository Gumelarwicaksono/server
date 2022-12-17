const Categoryes = require('./model');

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let category = new Categoryes(payload);
    await category.save();
    return res.json(category);
  } catch (error) {
    if (error && error.name === 'validationError') {
      return res.json({
        error: 1,
        message: error.message,
        fileds: error.errors,
      });
    }
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    let payload = req.body;
    let category = await Categoryes.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    return res.json(category);
  } catch (error) {
    if (error && error.name === 'validationError') {
      return res.json({
        error: 1,
        message: error.message,
        fileds: error.errors,
      });
    }
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    let category = await Categoryes.find();
    return res.json(category);
  } catch (error) {
    if (error && error.name === 'validationError') {
      return res.json({
        error: 1,
        message: error.message,
        fileds: error.errors,
      });
    }
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    let category = await Categoryes.findByIdAndDelete(req.params.id);
    return res.json(category);
  } catch (error) {
    if (error && error.name === 'validationError') {
      return res.json({
        error: 1,
        message: error.message,
        fileds: error.errors,
      });
    }
    next(error);
  }
};

module.exports = {
  store,
  index,
  update,
  destroy,
};
