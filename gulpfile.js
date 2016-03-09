var gulp = require('gulp'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');
 
gulp.task('sass', function () {
  return gulp.src('src/sass/style.sass')
    .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/css/'))
    .pipe(livereload());
}); 

gulp.task('scripts', function() {
  return gulp.src(['src/js/main.js'])
  	.pipe(uglify())
    .pipe(concat('compressed.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/sass/**/*.sass', ['sass']);
  gulp.watch('src/js/**/*.js', ['scripts']);
});

gulp.task('default', ['sass', 'scripts', 'watch']);