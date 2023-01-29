const Product = require('../product/model');
const CartItem = require('../cart-item/model');

const update = async (req, res, next) => {
  try {
    const { items } = req.body;

    const productIds = items.map((item) => item.product._id);

    const products = await Product.find({ _id: { $in: productIds } });
    console.log(products);
    let cartItem = items.map((item) => {
      let relateProduct = products.find((product) => product._id.toString() === item.product._id);
      return {
        product: relateProduct._id,
        price: relateProduct.price,
        image_url: relateProduct.image_url,
        user: req.user.id,
        qty: item.qty,
      };
    });
    await CartItem.deleteMany({ user: req.user._id });
    await CartItem.bulkWrite(
      cartItem.map((item) => {
        return {
          updateOne: {
            filter: {
              user: req.user._id,
              product: item.product,
            },
            update: item,
            upsert: true,
          },
        };
      })
    );
    return res.json(cartItem);
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
    let items = await CartItem.find({ user: req.user._id }).populate('product');
    return res.json(items);
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
  update,
  index,
};
