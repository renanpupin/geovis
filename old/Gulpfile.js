var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var paths = {
    css: 'assets/css',
    scss: 'assets/scss/*.scss',
    js: 'assets/**/*.js'
};
gulp.task('sass-min', function () {
    return gulp.src(paths.scss,
            {style: 'compressed'}
        )
        .pipe(sass())
        .pipe(gulp.dest(paths.css))// write to css dir
        .pipe(rename({suffix: '.min'}))
});
gulp.task('sass', function () {
    return gulp.src(paths.scss)
        .pipe(sass())
        .pipe(gulp.dest(paths.css))// write to css dir
        // .pipe(browserSync.stream())
        //.pipe(filter('**/*.css')) // filter the stream to ensure only CSS files passed.
        //.pipe(reload({stream:true})); // inject into browsers
});
gulp.task('sass', function () {
    return gulp.src(paths.scss)
        .pipe(sass())
        .pipe(gulp.dest(paths.css))
});
gulp.task('browser-sync', function() {  
    browserSync.init([paths.css, paths.js], {
        server: {   
            baseDir: "./"
        }
    });
});
gulp.task('watch', ['sass', 'browser-sync'], function () {  
    gulp.watch([paths.scss], ['sass']);
    gulp.watch("*.html").on('change', reload);
});

//===========================================================
//INSTALAR
//npm install -g gulp
//npm install gulp gulp-sass browser-sync -save-dev

//EXECUTAR
//TERMINAL: gulp watch