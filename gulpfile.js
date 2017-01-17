
/* ---------------------------------------------------------------- */
/* Libs                                                             */
/* ---------------------------------------------------------------- */

var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var pkg = require('./package.json');

var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license %>\n',
    ' */\n',
    ''
].join('');



/* ---------------------------------------------------------------- */
/* Constants                                                        */
/* ---------------------------------------------------------------- */

var PATHS = {
    SOURCES: {
        HTML: [
            './src/*.html'
        ],
        JQUERY: [
            './node_modules/jquery/dist/jquery.min.js'
        ],
        SASS: [
            './src/sass/**/*.scss'
        ],
        CSS: [
            './src/css/boilerplate.css'
        ],
        JS: [
            './src/js/boilerplate.js'
        ],
        BOOTSTRAP: {
            JS: [
                './node_modules/bootstrap/dist/js/bootstrap.min.js'
            ],
            CSS: [
                './node_modules/bootstrap/dist/css/bootstrap.min.css'
            ],
            FONTS: [
                './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
                './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
                './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
                './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
                './node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2'
            ]
        }
    }
};

var DIST = {
    DEV: {
        ROOT: './src',
        JS: './src/js',
        CSS: './src/css',
        FONTS: './src/fonts'
    }
};



/* ---------------------------------------------------------------- */
/* Dev tasks                                                        */
/* ---------------------------------------------------------------- */

gulp.task('dev-bootstrap-css', function() {
    return gulp.src(PATHS.SOURCES.BOOTSTRAP.CSS)
        .pipe(gulp.dest(DIST.DEV.CSS));
});



gulp.task('dev-bootstrap-fonts', function() {
    return gulp.src(PATHS.SOURCES.BOOTSTRAP.FONTS)
        .pipe(gulp.dest(DIST.DEV.FONTS));
});



gulp.task('dev-bootstrap-js', function() {
    return gulp.src(PATHS.SOURCES.BOOTSTRAP.JS)
        .pipe(gulp.dest(DIST.DEV.JS));
});



gulp.task('dev-browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: DIST.DEV.ROOT
        }
    })
});



gulp.task('dev-jquery', function() {
    return gulp.src(PATHS.SOURCES.JQUERY)
        .pipe(gulp.dest(DIST.DEV.JS));
});



gulp.task('dev-sass', function () {
    return gulp.src(PATHS.SOURCES.SASS)
        .pipe(sass().on('error', sass.logError))
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest(DIST.DEV.CSS));
});



gulp.task('dev-minify-css', function() {
    return gulp.src(PATHS.SOURCES.CSS)
        .pipe(cleanCSS({compatibility: '*', debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(DIST.DEV.CSS));
});



gulp.task('dev-minify-js', function() {
    return gulp.src(PATHS.SOURCES.JS)
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(DIST.DEV.JS))
        .pipe(browserSync.reload({
            stream: true
        }))
});



gulp.task('dev-watch', function() {
    gulp.watch(PATHS.SOURCES.HTML, browserSync.reload);
    gulp.watch(PATHS.SOURCES.JS, ['dev-minify-js', browserSync.reload]);
    gulp.watch(PATHS.SOURCES.CSS, ['dev-minify-css', browserSync.reload]);
    gulp.watch(PATHS.SOURCES.SASS, ['dev-sass', browserSync.reload]);
    gulp.watch(PATHS.SOURCES.JQUERY, ['dev-jquery', browserSync.reload]);
    gulp.watch(PATHS.SOURCES.BOOTSTRAP.JS, ['dev-bootstrap-js', browserSync.reload]);
    gulp.watch(PATHS.SOURCES.BOOTSTRAP.CSS, ['bootstrapCss', browserSync.reload]);
    gulp.watch(PATHS.SOURCES.BOOTSTRAP.FONTS, ['dev-bootstrap-fonts', browserSync.reload]);
});



gulp.task('default', ['dev-browser-sync', 'dev-jquery', 'dev-bootstrap-js', 'dev-bootstrap-css', 'dev-bootstrap-fonts', 'dev-watch']);
