const path = require('path');
const fs = require('fs');
const Product = require('./model');
const config = require('../config');
const Category = require('../category/model');
const Tag = require('../tag/model');
const { match } = require('assert');

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    // category check
    if (payload.category) {
      let category = await Category.findOne({ name: { $regex: payload.category, $options: 'i' } });
      if (category) {
        payload = { ...payload, category: category._id };
      } else {
        delete payload.category;
      }
    }
    // tag check
    if (payload.tags && payload.tags.length > 0) {
      let tags = await Tag.find({ name: { $in: payload.tags } });
      if (tags.length) {
        payload = { ...payload, tags: tags.map((tag) => tag._id) };
      } else {
        delete payload.tags;
      }
    }

    if (req.file) {
      let temp_path = req.file.path;
      let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
      let filename = req.file.filename + '.' + originalExt;
      let target_path = path.resolve(config.rootPath, `public/images/products/${filename}`);
      // membaca file di temp os nya
      const src = fs.createReadStream(temp_path);
      // setelah baca lalu pindahkan ke faile images
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);
      src.on('end', async () => {
        try {
          let product = new Product({ ...payload, image_url: `http://localhost:3000/images/${filename}` });
          await product.save();
          return res.json(product);
        } catch (error) {
          fs.unlinkSync(target_path);
          if (error && error.name === 'validationError') {
            return res.json({
              error: 1,
              message: error.message,
              fileds: error.errors,
            });
          }
          next(error);
        }
      });
      src.on('error', () => {
        next(error);
      });
    } else {
      let product = new Product(payload);
      await product.save();
      return res.json(product);
    }
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
    if (payload.category) {
      let category = await Category.findOne({ name: { $regex: payload.category, $options: 'i' } });
      if (category) {
        payload = { ...payload, category: category._id };
      } else {
        delete payload.category;
      }
    }
    // tag check
    if (payload.tags && payload.tags.length > 0) {
      let tags = await Tag.find({ name: { $in: payload.tags } });
      if (tags.length) {
        payload = { ...payload, tags: tags.map((tag) => tag._id) };
      } else {
        delete payload.tags;
      }
    }
    if (req.file) {
      let temp_path = req.file.path;
      let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
      let filename = req.file.filename + '.' + originalExt;
      let target_path = path.resolve(config.rootPath, `public/images/products/${filename}`);
      // membaca file di temp os nya
      const src = fs.createReadStream(temp_path);
      // setelah baca lalu pindahkan ke faile images
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);
      src.on('end', async () => {
        try {
          //
          let product = await Product.findById(id);
          let curenImage = `${config.rootPath}/public/images/products/${product.image_url}`;
          if (fs.existsSync(curenImage)) {
            fs.unlinkSync(curenImage);
          }

          //
          product = await Product.findByIdAndUpdate(
            id,
            { ...payload, image_url: `http://localhost:3000/images/${filename}` },
            {
              new: true,
              runValidators: true,
            }
          );

          return res.json(product);
        } catch (error) {
          fs.unlinkSync(target_path);
          if (error && error.name === 'validationError') {
            return res.json({
              error: 1,
              message: error.message,
              fileds: error.errors,
            });
          }
          next(error);
        }
      });
      src.on('error', () => {
        next(error);
      });
    } else {
      let product = await Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
      });
      return res.json(product);
    }
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
    let { skip = 0, limit = 4, q = '', category = '', tags = [] } = req.query;
    let criteria = {};
    if (q.length) {
      criteria = {
        ...criteria,
        name: {
          $regex: `${q}`,
          $options: 'i',
        },
      };
    }

    if (category.length) {
      let categoryResult = await Category.findOne({ name: { $regex: `${category}`, $options: 'i' } });
      if (categoryResult) {
        criteria = { ...criteria, category: categoryResult._id };
      }
    }
    if (tags.length) {
      let tagsResult = await Tag.find({ name: { $in: tags } });
      if (tagsResult.length) {
        criteria = { ...criteria, tags: tagsResult.map((tag) => tag._id) };
      }
    }

    //
    let count = await Product.find().countDocuments();

    //
    let product = await Product.find(criteria).skip(parseInt(skip)).limit(parseInt(limit)).populate('category').populate('tags');
    return res.json({
      data: product,
      count,
      skip,
      limit,
      tags,
      category,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id);
    let curenImage = `${config.rootPath}/public/images/products/${product.image_url}`;
    if (fs.existsSync(curenImage)) {
      fs.unlinkSync(curenImage);
    }
    return res.json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  store,
  index,
  update,
  destroy,
};
