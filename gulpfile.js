const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const sass = require("gulp-sass")(require('sass'));
const cleanCSS = require("gulp-clean-css");
const browserSync = require('browser-sync').create();

const { parallel, series, src, dest, watch } = gulp;

const outputPath = "./dist";

const paths = {
  js: "./src/scripts/**/*.js",
  scss: "./src/assets/scss/**/*.scss",
  html: "./index.html"
};

const browserSyncOptions = {
    server: {
      baseDir: './'
    },
    port: 3000,
    open: true,
    notify: false
};

function js() {
    return src(paths.js)
        .pipe(concat("main.js"))
        .pipe(
            babel({
            presets: ["@babel/preset-env"],
            })
        )
        .pipe(uglify())
        .pipe(dest(outputPath))
        .pipe(browserSync.stream())
}

function html() {
    return src(paths.html)
        .pipe(browserSync.stream())
}

function css() {
    return src(paths.scss)
        .pipe(sass().on("error", sass.logError))
        .pipe(cleanCSS())
        .pipe(dest(outputPath))
        .pipe(browserSync.stream())
}


function browserSyncInit(done) {
    browserSync.init(browserSyncOptions);
    done();
}

function watchFiles() {
    watch(paths.js, js);
    watch(paths.scss, css);
    watch(paths.html, html);
}

exports.default = series(
    parallel(js, css),
    browserSyncInit,
    watchFiles
);