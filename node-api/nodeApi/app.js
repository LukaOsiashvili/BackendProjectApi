var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Routes Lists

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const workersRouter = require('./routes/workers');
const productRouter = require('./routes/products');
const rolesRouter = require('./routes/roles');
const orderRouter = require('./routes/orders');
const citiesRouter = require('./routes/cities');
const branchesRouter = require('./routes/branches');
const addressesRouter = require('./routes/addresses');
const permissionsRouter = require('./routes/permissions')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/workers', workersRouter);
app.use('/products', productRouter);
app.use('/roles', rolesRouter);
app.use('/orders', orderRouter);
app.use('/cities', citiesRouter);
app.use('/branches', branchesRouter);
app.use('/addresses', addressesRouter);
app.use('/permissions', permissionsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
