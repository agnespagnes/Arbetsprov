var gulp = require('gulp'),
	compass = require('gulp-compass'),
	minifyCSS = require('gulp-minify-css');
	livereload = require('gulp-livereload'),
	uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
	concat = require('gulp-concat');
 
gulp.task('styles', function () {
  return gulp.src('src/sass/style.sass')
  	.pipe(compass({
      css: 'dist/css',
      sass: 'src/sass'
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css/'))
    .pipe(livereload());
}); 

gulp.task('scripts', function() {
  return gulp.src(['src/js/app/search.js', 'src/js/app/main.js'])
    .pipe(jshint())
  	.pipe(uglify())
    .pipe(concat('compressed.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/sass/**/*.sass', ['styles']);
  gulp.watch('src/js/**/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts', 'watch']);