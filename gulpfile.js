// Learn More : https://stackoverflow.com/a/67901071/4853427
// import imagemin from "gulp-imagemin";
const { src,dest , watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Gulp sass Plugin
const browserSync = require('browser-sync').create();
const nunjucksRender = require('gulp-nunjucks-render'); 
// const include = require('gulp-file-include');
// const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const data = require('gulp-data');

function browsersyncServe(cb){
    browserSync.init({
      server: {
        baseDir: 'app'
        // baseDir: 'src'
      }    
    });
    cb();
}
function browsersyncReload(cb){
    browserSync.reload();
    cb();
} 

//  Define Paths
const incConfig = {
    srcHTML : './src/',
    srcJS : './src/public/js/**/*.js',
    srcCSS : './src/public/css/**/*.css',
    srcDocs : './src/public/docs/**/*.*',
    srcScss : 'src/public/scss/**/*.scss',
    appHTML : './app/',
    appJS : './app/public/js/',
    appCSS : './app/public/css/',
    appDocs : './app/public/docs',
    ScssToCss : './src/public/css'
}
const imgConfig = {
    src           : './src/public/images/**/*.{gif,jpg,png,svg,ico,webp}',
    build         : './app/public/images/',
    minOpts: {
        optimizationLevel: 5
    },
    videoSrc    : './src/public/videos/**/*.{mp4,mpv,mp3}',
    videoApp    : './app/public/videos/'
};
function clean(){
    return del(['app/**','!app']);
}
function inlcudeImages(){
    return src(imgConfig.src)
    .pipe(dest(imgConfig.build))
}
function includeVideos(){
    return src(imgConfig.videoSrc)
    .pipe(dest(imgConfig.videoApp))
}
function includeDocs(){
    return src(incConfig.srcDocs)
    .pipe(dest(incConfig.appDocs))
}
function scssTask()
{
    return src(incConfig.srcScss , { sourcemaps:true })
    .pipe(sass()) // Converts sass to css  with gulp-sass
    .pipe(dest(incConfig.ScssToCss))
    .pipe(dest(incConfig.ScssToCss,{ sourcemaps: '.' }))
    .pipe(browserSync.stream())
}
function inlcudeCSS(){
    return src(incConfig.srcCSS)
    .pipe(cleanCSS({debug: true}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(dest(incConfig.appCSS))
    .pipe(browserSync.stream())
}
function inlcudeJS(){
    return src(incConfig.srcJS, { sourcemaps: true })
    .pipe(dest(incConfig.appJS, { sourcemaps: '.' }))
}
// nunjucks Task
function nunjucksTask()
{
    // Gets .html and .nunjucks files in pages
    return src('src/pages/**/*.+(html|njk)')
    // Adding data to Nunjucks
    .pipe(data(function() {
        return require('./src/loaders/data.json')
    }))
    // Renders template with nunjucks
    .pipe(nunjucksRender({
        path: ['src/templates']
    }))
    // output files in app folder
    .pipe(dest('app'))
}

// watch task
function watchTask()
{
    watch(['src/public/scss/**/*.scss'],series(scssTask,browsersyncReload));
    watch('src/**/*.njk',series(nunjucksTask, browsersyncReload));
    watch('src/**/*.html',browsersyncReload);
    watch('src/**/*.json',browsersyncReload);
    watch('src/public/css/**/*.css',series(inlcudeCSS,browsersyncReload));
    watch('src/public/js/**/*.js',browsersyncReload);
}

exports.default = series(
    clean,
    scssTask,
    nunjucksTask,
    inlcudeImages,
    includeVideos,
    inlcudeJS,
    inlcudeCSS,
    includeDocs,
    browsersyncServe,
    watchTask
);