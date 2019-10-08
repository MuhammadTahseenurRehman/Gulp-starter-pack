const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// compile Sass and Inject into Browser
gulp.task('sass', function () {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'app/scss/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());

});

// move JS files into src/js
gulp.task('js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.stream());
});

// Watch Sass and Server
gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: './app',
        port: 8080,
        notify: false
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'app/scss/*.scss'], ['sass']);
    gulp.watch('app/*.html').on('change', browserSync.reload);
});

// Move fonts folder to app/fonts
gulp.task('fonts', function () {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('app/fonts'));
});

// Move font-awesome CSS to app/css
gulp.task('fa', function () {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('app/css'));
});

gulp.task('default', ['js', 'fa', 'fonts', 'serve']);