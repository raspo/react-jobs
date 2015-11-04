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
const sourcemaps = require('gulp-sourcemaps');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');

const cleancss = new LessPluginCleanCSS({ advanced: true });
const autoprefix = new LessPluginAutoPrefix({ browsers: ['last 2 versions'] });

function isDev() {
    return false;
}

function logChange(event) {
    const relativePath = path.relative(__dirname, event.path);
    gutil.log(gutil.colors.yellow(event.type), relativePath);
}

gulp.task('webpack:dev', () => {
    const webpackConfigDev = require('./webpack.config.development');

    return gulp.src('./app.jsx')
        .pipe(webpack(webpackConfigDev, null, function(err, stats) {
            if (err) { throw new gutil.PluginError('webpack:dev', err) };
            const timediff = (stats.endTime - stats.startTime) / 1000;
            gutil.log(`webpack build took ${timediff} s`);
        }))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('webpack:prod', () => {
    const webpackConfigProd = require('./webpack.config.production');

    return gulp.src('./app.jsx')
        .pipe(webpack(webpackConfigProd, null, function(err, stats) {
            if (err) { throw new gutil.PluginError('webpack:prod', err) };
            const timediff = (stats.endTime - stats.startTime) / 1000;
            gutil.log(`webpack build took ${timediff} s`);
        }))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('less', () => {
    return gulp.src('./less/app.less')
        .pipe(plumber())
        .pipe(gulpif(isDev, sourcemaps.init()))
        .pipe(less({
            paths: [path.join(__dirname, 'less')],
            plugins: [autoprefix, cleancss]
        }))
        .pipe(plumber.stop())
        .pipe(gulpif(isDev, sourcemaps.write()))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('clean', () => {
    return del(['public/js/*', 'public/css/*']);
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

    done();
});

gulp.task('build', (done) => {
    runSequence(
        'clean',
        'less',
        'webpack:prod',
        done
    );
});

gulp.task('default', (done) => {
    runSequence(
        'less',
        'watch',
        'webpack:dev',
        done
    );
});
