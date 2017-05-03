var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    eslint = require('gulp-eslint'),
    prettyError = require('gulp-prettyerror'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename');

gulp.task('default', ['watch', 'browser-sync']);

gulp.task('watch', function() {
   gulp.watch('jscript/*.js', ['scripts']);
   gulp.watch('scss/*.scss', ['scss']);
});

gulp.task('scss', function() {
   gulp.src('./scss/style.scss')
      .pipe(prettyError())
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'))
});


gulp.task('scripts', ['lint'], function(){
  gulp.src('./jscript/*.js') // What files do we want gulp to consume?
    .pipe(uglify()) // Call the uglify function on these files
    .pipe(rename({ extname: '.min.js' })) // Rename the uglified file
    .pipe(gulp.dest('./build/js')) // Where do we put the result?
});


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(['./build/*.js', './build/*.css', './index.html']).on('change', browserSync.reload);
});


gulp.task('lint', function(){
  return gulp.src(['./jscript/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
})