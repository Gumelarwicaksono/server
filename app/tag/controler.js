const Tag = require('./model');

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let tag = new Tag(payload);
    await tag.save();
    return res.json(tag);
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
    let { id } = req.params;
    let tag = await Tag.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    return res.json(tag);
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
    let tag = await Tag.find();
    return res.json(tag);
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
    let tag = await Tag.findByIdAndDelete(req.params.id);
    return res.json(tag);
  } catch (error) {
    if (error && error.name === 'validationError') {
      return res.json({
        error: 1,
        message: error.message,
        fileds: error.errors,
      });
    }
    s;
    next(error);
  }
};

module.exports = {
  store,
  index,
  update,
  destroy,
};
