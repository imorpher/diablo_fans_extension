var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');

// Linting
gulp.task('lint', function(){
    return gulp.src('src/scripts/**/*.js')
                .pipe(jshint())
                .pipe(jshint.reporter('default'));
});

// Clean
gulp.task('clean', function(){
   return del('build/*'); 
});

// Copy things
gulp.task('copy', function(){
    return gulp.src([
        'src/fonts/**/*',
        'src/icons/**/*',
        'src/html/**/*',
        'src/manifest.json'], {base: 'src'})
        .pipe(gulp.dest('build'));
})

// Move libs
gulp.task('libs', function() {
	return gulp.src('src/lib/**/*.js')
		.pipe(gulp.dest('build/lib'));
});

// Sass
gulp.task('sass', function(){
   return gulp.src('src/styles/**/*.scss')
                .pipe(sass())
                .pipe(gulp.dest('build/css'));
});

// Concat & Minify
gulp.task('scripts', function(){
   return gulp.src('src/scripts/**/*.js')
                .pipe(concat('all.js'))
                .pipe(gulp.dest('build/scripts/'))
                .pipe(rename('all.min.js'))
                .pipe(uglify())
                .pipe(gulp.dest('dist')); 
});

// Default task
gulp.task('default', ['lint', 'sass', 'scripts', 'libs', 'copy']);

// Dev
gulp.task('dev', ['default'], function() {
    gulp.watch('./src/lib/**/*.js', ['libs']);
    gulp.watch('./src/scripts/**/*.js', ['lint', 'scripts']);
    gulp.watch('./src/styles/**/*.scss', ['sass']);
    gulp.watch([
        'src/fonts/**/*',
        'src/icons/**/*',
        'src/html/**/*',
        'src/manifest.json'
    ], ['copy']);
});
