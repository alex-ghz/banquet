var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

if ( process.env.NODE_ENV !== 'production' ) require('dotenv').config();

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var server = express();

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());

if ( process.env.NODE_ENV === 'production' ) {
  server.use(express.static(path.join(__dirname, 'client/build')));
  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  });
}

// server.use('/', indexRouter);
// server.use('/users', usersRouter);

module.exports = server;
