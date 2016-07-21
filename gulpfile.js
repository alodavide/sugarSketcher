var gulp = require('gulp');
var webpack = require('webpack-stream');

gulp.task('webpack', function() {
    return gulp.src('src/index.js')
        .pipe(webpack(require('./webpack.config.js') ))
        .pipe(gulp.dest('dest'));
});