var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var logger = require('./logger')
const session = require('express-session')
// var cors = require('cors');
const jwt = require('./routes/check')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 验证token
app.use(jwt)
app.use((req,res,next)=>{
  next()
})

app.use(session({
  secret: 'express practice',
  resave: false,
  saveUninitialized: true
}))


// 设置跨域
// app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

/**
 * error handler
 */

const _errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl}` + err.mesage)
  const errorMsg = err.message
  if (err.name === 'UnauthorizedError') {
    res.status(401).send("干嘛呢？你想硬闯？！")
  } else {
    res.status(err.status || 500).json({
      code: -1,
      success: false,
      message: errorMsg,
      data: {}
    })
  }
}

app.use(_errorHandler)

module.exports = app;
