var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var plumber = require("gulp-plumber");
var ghPages = require('gulp-gh-pages');
var svgSprite = require('gulp-svg-sprite');
var svgmin = require('gulp-svgmin');

//Пути
const paths = {
    styles: {
      src: "src/styles/main.scss",
      watch: "src/styles/**/*.scss",
      dest: "dist/styles/"
    },
    stylesNlz: {
      src: "src/styles/layout/normalize.css",
      dest: "dist/styles/layout/"
    },
    stylesBoot: {
        src: "src/styles/layout/bootstrap-grid.min.css",
        dest: "dist/styles/layout/"
    },
    scripts: {
      src: "src/scripts/main.js",
      watch: "src/scripts/*.js",
      dest: "dist/scripts/"
    },
    html: {
      src: "src/*.html",
      watch: "src/*.html",
      dest: "dist/"
    },
    images: {
      src: "src/images/**/*.*",
      dest: "dist/images/"
    },
    fonts: {
      src: "src/fonts/*.*",
      dest: "dist/fonts/"
    }
};


//Удаление папки dist
gulp.task("clean", () => {
    return del("dist");
});

//Создание ветки gh-pages и загрузка туда содержимого папки dist
gulp.task("deploy", () => {
    return gulp.src("./dist/**/*").pipe(ghPages());
});

//Перенос файлов 
gulp.task('html', function() {
    return gulp
      .src(paths.html.src)
      .pipe(plumber())
      .pipe(gulp.dest(paths.html.dest));
});

gulp.task('stylesNlz', function() {
    return gulp.src(paths.stylesNlz.src).pipe(gulp.dest(paths.stylesNlz.dest));
});

gulp.task('stylesBoot', function() {
    return gulp.src(paths.stylesBoot.src).pipe(gulp.dest(paths.stylesBoot.dest));
});
  
gulp.task('images', function() {
    return gulp.src(paths.images.src).pipe(gulp.dest(paths.images.dest));
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts.src).pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('fonts', function() {
    return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest));
});

gulp.task('serve', ['sass'], function() {
browserSync.init({
server: "src/"
});
//Слежение
gulp.watch(paths.styles.watch, ['sass']);
gulp.watch(paths.html.watch).on('change', browserSync.reload);
gulp.watch(paths.images.src).on('change', browserSync.reload);
});
//Компилируем scss в css + автопрефиксер
gulp.task('sass', function() {
return gulp
    .src(paths.styles.src)
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(concatCss("main.css"))
    .pipe(gulp.dest('src/'))
    .pipe(browserSync.stream());
});
//Минимизируем css
gulp.task('mincss', function() {
    return gulp
        .src('src/main.css')
        .pipe(plumber())
        .pipe(rename({suffix: ".min"}))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.styles.dest));
})
//Минимизируем js
gulp.task('minjs', function() {
    return gulp
        .src('src/scripts/main.js')
        .pipe(plumber())
        .pipe(rename({suffix: ".min"}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
})
//Минимизируем svg
gulp.task('minsvg', function() {
    return gulp
        .src('src/images/icons/check.svg')
        .pipe(plumber())
        .pipe(rename({suffix: ".min"}))
        .pipe(svgmin())
        .pipe(gulp.dest('dist/images/icons/'));
})
gulp.task('min',['mincss', 'minjs']);

//Запуск сборки
gulp.task('build', ['clean', 'serve','html', 'stylesNlz', 'stylesBoot', 'minsvg', 'fonts', 'scripts', 'images', 'min']);
//Запуск default
gulp.task('default', ['build']);