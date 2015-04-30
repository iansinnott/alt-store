'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),

    // Nodemon
    nodemon = require('nodemon'),

    fs = require('fs'),
    exec = require('child_process').exec,

    // Webpack
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config');

gulp.task('nodemon', function() {
  nodemon({
    script: 'bin/www',
    watch: 'server/',
    ext: 'js',
    env: { NODE_ENV: process.env.NODE_ENV },
    ignore: [ 'node_modules/', '.git/' ]
  });
});

gulp.task('mongod', function() {

  // Make sure the db directory exists. If not then create it.
  try {
    fs.readdirSync('./db');
  } catch (e) {
    fs.mkdir('./db');
  }

  // Run mongod
  exec('mongod --dbpath ./db', function(err) {
    if (err) throw err;
    console.log('MongoDB started');
  });

  console.log(
    gutil.colors.green('MongoDB server'),
    'listening on port',
    gutil.colors.magenta(27017)
  );
});

gulp.task('webpack', function() {
  var DEV_PORT = process.env.DEV_PORT || 8080;

  var server = new WebpackDevServer(webpack(config), {
    contentBase: './public/',
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    stats: {
      colors: true,
      chunks: false
    }
  });

  server.listen(DEV_PORT, function(err, result) {
    if (err) console.error(err);
    console.log(
      gutil.colors.green('Webpack server'),
      'listening on port',
      gutil.colors.magenta(DEV_PORT)
    );
  });
});

gulp.task('default', ['mongod', 'nodemon', 'webpack']);
