var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

if ( process.env.NODE_ENV !== 'production' ) require('dotenv').config();

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();
const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

if ( process.env.NODE_ENV === 'production' ) {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  });
}

app.get('*', (res, req) => {
  res.status(200).json({port: process.env.PORT});
});

app.listen(port, error => {
  if ( error ) throw error;
  console.log('Server running on port ' + port);
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);