var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var expressJwt = require('express-jwt');
var methodOverride = require('method-override');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var directorsRouter = require('./routes/directors');
var actorsRouter = require('./routes/actors');
var genresRouter = require('./routes/genres');
var membersRouter = require('./routes/members');

const jwtKey = '3c6e0b8a9c15224a8228b9a98ca1531d';

// mongodb://[user]:[password]@<host>/<db>
const uri = 'mongodb://localhost:27017/video_club';
mongoose.connect(uri);
const db = mongoose.connection;

var app = express();

db.on('error', () => {
  console.log('Can not connect to DB');
});
db.on('open', () => {
  console.log('Connected to DB!');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
// app.use(expressJwt({
//   secret: jwtKey,
//   algorithms: ['HS256']
// }).unless({
//   path: ['/login']
// }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/directors', directorsRouter);
app.use('/actors', actorsRouter);
app.use('/genres', genresRouter);
app.use('/members', membersRouter);

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
