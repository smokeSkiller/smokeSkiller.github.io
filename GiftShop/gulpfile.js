const gulp = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

function style() {
    // where my scss file
    return gulp.src("./scss/style.scss")
    // Sass
    .pipe(sass({
        outputStyle: "compressed" 
    })) 
    // Renaming
    .pipe( rename({suffix: ".min"}) ) 
    // Auto prefixier
    .pipe(autoprefixer({
        grid: true,
        browsers: ['last 2 versions', 'ie 6-8', 'Firefox > 20'],
        cascade: false
    })) 
    // destination
    .pipe( gulp.dest('./css/') )
    // stream changes to all browsers
    .pipe(browserSync.stream());
}

// Auto update
function autoUpdate(files){
    files.forEach(file => {
        gulp.watch(file).on("change", browserSync.reload);
    });
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./scss/style.scss", style);

    autoUpdate(["./index.html", "./js/main.js", 
    "./scss/component.scss", "./scss/fonts.scss", "./scss/mixins.scss"]);
}

exports.style = style;
exports.watch = watch;