'use strict';

var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    autoprefixer = require('gulp-autoprefixer'),
    // sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('connect', function() {
    connect.server({
        root: 'build',
        livereload: true
    })
});

gulp.task('html', function() {
    gulp.src(['template/head.html','template/header.html', 'template/content.html', 'template/footer.html'])
        .pipe(concat('index.html'))
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
});

gulp.task('css', function() {
    gulp.src(['css/normalize.css','css/colors.css','css/*.css'])
        .pipe(sourcemaps.init())
        // .pipe(sass({
        //     errLogToConsole: true
        // }))
        .pipe(concat('style.html'))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('build/css/'))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('build/js/'))
        .pipe(connect.reload());
})

gulp.task('images', function() {
    gulp.src('img/*.*')
        .pipe(gulp.dest('build/img/'))
        .pipe(connect.reload());
});


gulp.task('fonts', function() {
    gulp.src('fonts/**')
        .pipe(gulp.dest('build/fonts/'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('template/**/*.html', ['html'])
    gulp.watch('css/**/*.css', ['css'])
    gulp.watch('js/**/*.js', ['js'])
    gulp.watch('img/**', ['images'])
    gulp.watch('fonts/**', ['fonts'])
})

gulp.task('default', ['connect', 'html', 'css', 'js', 'images', 'fonts', 'watch']);
