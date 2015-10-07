var gulp       = require('gulp');
var babelify   = require("babelify");
var browserify = require('browserify');
var source     = require('vinyl-source-stream')
var uglify     = require('gulp-uglify');
var buffer     = require('vinyl-buffer')
var less       = require('gulp-less')
var minifyCSS  = require('gulp-minify-css')

gulp.task('default', ['babel', 'less'])

gulp.task('watch', function () {
  gulp.watch('./public/js/**/*.*', ['babel']);
  gulp.watch('./public/less/**/*.less', ['less']);
});

gulp.task('babel', function () {
  // TODO: browserify multiple files
   return browserify('./public/js/pages/main.js')
      .transform(babelify)
      .bundle()
      .pipe(source('bundle.min.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('dist'))
});

gulp.task('less', function () {
  return gulp.src('./public/less/style.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/dist'))
});
