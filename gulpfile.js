const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const del = require('del');
const gutil = require('gulp-util');
const gulpif = require('gulp-if');
const batch = require('gulp-batch');
const runSequence = require('run-sequence');
const plumber = require('gulp-plumber');
const webpack = require('gulp-webpack');
const less = require('gulp-less');
const imagemin = require('gulp-imagemin');
const imageminOptipng = require('imagemin-optipng');
const svgSprite = require('gulp-svg-sprite');
const sourcemaps = require('gulp-sourcemaps');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');

const cleancss = new LessPluginCleanCSS({ advanced: true });
const autoprefix = new LessPluginAutoPrefix({ browsers: ['last 2 versions'] });

const PATHS = {
    JS: './dist/js',
    CSS: './dist/css',
    IMG: './dist/img',
    SVG: './dist/svg'
};

try {
    const paths = JSON.parse(fs.readFileSync(path.join(__dirname, 'gulpfile.paths.json')));
    PATHS.JS = paths.js;
    PATHS.CSS = paths.css;
    PATHS.IMG = paths.img;
    PATHS.SVG = paths.svg;
} catch (e) {
    console.log('No "gulpfile.paths.json" found, using default paths');
}

function isDev() {
    return process.env.NODE_ENV !== 'production';
}

function logChange(event) {
    const relativePath = path.relative(__dirname, event.path);
    gutil.log(gutil.colors.yellow(event.type), relativePath);
}

function logWebpackBuild(err, stats) {
    if (err) { throw new gutil.PluginError('webpack:dev', err); }
    if (stats.compilation.errors.length) {
        stats.compilation.errors.forEach((error) => {
            gutil.log(gutil.colors.yellow('webpack'), gutil.colors.red(error.message));
        });
    }
    const timediff = (stats.endTime - stats.startTime) / 1000;
    gutil.log(`webpack build took ${timediff} s`);
}

gulp.task('webpack:dev', () => {
    const webpackConfigDev = require('./webpack.config.development');

    return gulp.src('./app.jsx')
        .pipe(webpack(webpackConfigDev, null, logWebpackBuild))
        .pipe(gulp.dest(PATHS.JS));
});

gulp.task('webpack:prod', () => {
    const webpackConfigProd = require('./webpack.config.production');

    return gulp.src('./app.jsx')
        .pipe(webpack(webpackConfigProd, null, logWebpackBuild))
        .pipe(gulp.dest(PATHS.JS));
});

gulp.task('less', () => {
    const lessPlugings = isDev() ? [autoprefix] : [autoprefix, cleancss];

    return gulp.src('./less/app.less')
        .pipe(plumber())
        .pipe(gulpif(isDev, sourcemaps.init()))
        .pipe(less({
            paths: [path.join(__dirname, 'less')],
            plugins: lessPlugings
        }))
        .pipe(plumber.stop())
        .pipe(gulpif(isDev, sourcemaps.write()))
        .pipe(gulp.dest(PATHS.CSS));
});

gulp.task('images', () => {
    return gulp.src('./img/*')
        .pipe(imagemin({
            progressive: true,
            use: [
                imageminOptipng({optimizationLevel: 3})
            ]
        }))
        .pipe(gulp.dest(PATHS.IMG));
});

gulp.task('svg', () => {
    return gulp.src('./svg/*.svg')
        .pipe(svgSprite({
            mode: {
                symbol: {
                    bust: false,
                    dest: '',
                    sprite: 'icons.svg',
                    render: false,
                    inline: true
                }
            }
        }))
        .pipe(gulp.dest(PATHS.SVG));
});

gulp.task('clean', () => {
    return del([`${PATHS.JS}/*`, `${PATHS.CSS}/*`, `${PATHS.IMG}/*`, `${PATHS.SVG}/*`], {
        force: true
    });
});

gulp.task('watch', (done) => {
    gulp.watch('./less/**/*.less', batch((events, complete) => {
        events.on('data', logChange).on('end', () => {
            gulp.start('less');
            complete();
        });
    }));

    gulp.watch(['./app/**/*.js', './app/**/*.jsx'], batch((events, complete) => {
        events.on('data', logChange).on('end', complete);
    }));

    gulp.watch('./img/*', batch((events, complete) => {
        events.on('data', logChange).on('end', () => {
            gulp.start('images');
            complete();
        });
    }));

    gulp.watch('./svg/*', batch((events, complete) => {
        events.on('data', logChange).on('end', () => {
            gulp.start('svg');
            complete();
        });
    }));

    done();
});

gulp.task('build', (done) => {
    runSequence(
        'clean',
        'less',
        'svg',
        'images',
        'webpack:prod',
        done
    );
});

gulp.task('default', (done) => {
    runSequence(
        'less',
        'svg',
        'images',
        'watch',
        'webpack:dev',
        done
    );
});
