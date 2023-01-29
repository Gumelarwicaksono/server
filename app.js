var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const { decodeToken } = require('./midellwers/index');
const productRute = require('./app/product/routes');
const categoryRute = require('./app/category/routes');
const tagRute = require('./app/tag/routes');
const authRute = require('./app/auth/routes');
const deliveryAddressRute = require('./app/deliveryAddress/routes');
const cartRute = require('./app/cart/routes');
const orderRute = require('./app/order/routes');
const invoiceRute = require('./app/invoice/routes');
const http = require('http');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3001/',
  })
);

http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write('<html><body>');
  res.write('<h1>Hello World</h1>');
  res.end();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/images', express.static(path.join(__dirname, 'public/images/products')));

app.use(decodeToken());
app.use('/auth', authRute);
app.use('/api', productRute);
app.use('/api', categoryRute);
app.use('/api', tagRute);
app.use('/api', deliveryAddressRute);
app.use('/api', cartRute);
app.use('/api', orderRute);
app.use('/api', invoiceRute);

app.use('/', function (req, res) {
  res.render('index', {
    title: 'server api sucses crated',
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
