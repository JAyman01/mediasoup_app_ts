"use strict";
/**
 * Tasks:
 *
 * gulp dist
 *   Generates the browser app in development mode (unless NODE_ENV is set
 *   to 'production').
 *
 * gulp live
 *   Generates the browser app in development mode (unless NODE_ENV is set
 *   to 'production'), opens it and watches for changes in the source code.
 *
 * gulp devel
 *   Generates the browser app in development mode (unless NODE_ENV is set
 *   to 'production'), opens two browsers and watches for changes in the source
 *   code.
 *
 * gulp devel:tcp
 *   Same as gulp devel, but forcing media over TCP.
 *
 * gulp devel:vp9
 *   Generates the browser app in development mode (unless NODE_ENV is set
 *   to 'production'), opens two browsers forcing VP9 and watches for changes in
 *   the source code.
 *
 * gulp devel:h264
 *   Generates the browser app in development mode (unless NODE_ENV is set
 *   to 'production'), opens two browsers forcing H264 and watches for changes in
 *   the source code.

 * gulp
 *   Alias for `gulp dist`.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var header = require('gulp-header');
var touch = require('gulp-touch-cmd');
var browserify = require('browserify');
var watchify = require('watchify');
var envify = require('envify/custom');
var uglify = require('gulp-uglify-es').default;
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var del = require('del');
var mkdirp = require('mkdirp');
var ncp = require('ncp');
var eslint = require('gulp-eslint');
var stylus = require('gulp-stylus');
var cssBase64 = require('gulp-css-base64');
var nib = require('nib');
var browserSync = require('browser-sync');
var PKG = require('./package.json');
var BANNER = fs.readFileSync('banner.txt').toString();
var BANNER_OPTIONS = {
    pkg: PKG,
    currentYear: (new Date()).getFullYear()
};
var OUTPUT_DIR = '../server/public';
// Set Node 'development' environment (unless externally set).
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
gutil.log("NODE_ENV: " + process.env.NODE_ENV);
function logError(error) {
    gutil.log(gutil.colors.red(error.stack));
}
function bundle(options) {
    options = options || {};
    var watch = Boolean(options.watch);
    var bundler = browserify({
        entries: PKG.main,
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        // required for sourcemaps (must be false otherwise).
        debug: process.env.NODE_ENV === 'development',
        // required for watchify.
        cache: {},
        // required for watchify.
        packageCache: {},
        // required to be true only for watchify.
        fullPaths: watch
    })
        .transform('babelify')
        .transform(envify({
        NODE_ENV: process.env.NODE_ENV,
        _: 'purge'
    }));
    if (watch) {
        bundler = watchify(bundler);
        bundler.on('update', function () {
            var start = Date.now();
            gutil.log('bundling...');
            rebundle();
            gutil.log('bundle took %sms', (Date.now() - start));
        });
    }
    function rebundle() {
        return bundler.bundle()
            .on('error', logError)
            .pipe(plumber())
            .pipe(source(PKG.name + ".js"))
            .pipe(buffer())
            .pipe(rename(PKG.name + ".js"))
            .pipe(gulpif(process.env.NODE_ENV === 'production', uglify()))
            .pipe(header(BANNER, BANNER_OPTIONS))
            .pipe(gulp.dest(OUTPUT_DIR));
    }
    return rebundle();
}
gulp.task('clean', function () { return del(OUTPUT_DIR, { force: true }); });
// gulp.task('lint', () => {
//     const src = [
//         'gulpfile.ts',
//         'lib/**/*.ts',
//         'lib/**/*.tsx'
//     ];
//     return gulp.src(src)
//         .pipe(plumber())
//         .pipe(eslint())
//         .pipe(eslint.format());
// });
gulp.task('css', function () {
    return gulp.src('stylus/index.styl')
        .pipe(plumber())
        .pipe(stylus({
        use: nib(),
        compress: process.env.NODE_ENV === 'production'
    }))
        .on('error', logError)
        .pipe(cssBase64({
        baseDir: '.',
        maxWeightResource: 50000 // So big ttf fonts are not included, nice.
    }))
        .pipe(rename(PKG.name + ".css"))
        .pipe(gulp.dest(OUTPUT_DIR))
        .pipe(touch());
});
gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(gulp.dest(OUTPUT_DIR));
});
gulp.task('resources', function (done) {
    var dst = path.join(OUTPUT_DIR, 'resources');
    mkdirp.sync(dst);
    ncp('resources', dst, { stopOnErr: true }, function (error) {
        if (error && error[0].code !== 'ENOENT')
            throw new Error("resources copy failed: " + error);
        done();
    });
});
gulp.task('bundle', function () {
    return bundle({ watch: false });
});
gulp.task('bundle:watch', function () {
    return bundle({ watch: true });
});
gulp.task('dist', gulp.series('clean', 'bundle', 'html', 'css', 'resources'));
gulp.task('watch', function (done) {
    // Watch changes in HTML.
    gulp.watch(['index.html'], gulp.series('html'));
    // Watch changes in Stylus files.
    gulp.watch(['stylus/**/*.styl'], gulp.series('css'));
    // Watch changes in resources.
    gulp.watch(['resources/**/*'], gulp.series('resources', 'css'));
    // Watch changes in JS files.
    // gulp.watch(['gulpfile.ts', 'lib/**/*.ts', 'lib/**/*.tsx'], gulp.series(
    //     'lint'
    // ));
    done();
});
gulp.task('browser:base', gulp.series('clean', 'bundle:watch', 'html', 'css', 'resources', 'watch'));
gulp.task('live', gulp.series('browser:base', function (done) {
    var config = require('../server/config');
    browserSync({
        open: 'false',
        host: config.domain,
        startPath: '/?info=true',
        server: {
            baseDir: OUTPUT_DIR
        },
        https: config.https.tls,
        ghostMode: false,
        files: path.join(OUTPUT_DIR, '**', '*')
    });
    done();
}));
gulp.task('devel', gulp.series('browser:base', function (done) { return __awaiter(void 0, void 0, void 0, function () {
    var config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                config = require('../server/config');
                return [4 /*yield*/, new Promise(function (resolve) {
                        browserSync.create('producer1').init({
                            open: 'external',
                            host: config.domain,
                            startPath: '/?roomId=devel&info=true&_throttleSecret=foo&consume=false',
                            server: {
                                baseDir: OUTPUT_DIR
                            },
                            https: config.https.tls,
                            ghostMode: false,
                            files: path.join(OUTPUT_DIR, '**', '*')
                        }, resolve);
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, new Promise(function (resolve) {
                        browserSync.create('consumer1').init({
                            open: 'external',
                            host: config.domain,
                            startPath: '/?roomId=devel&info=true&_throttleSecret=foo&produce=false',
                            server: {
                                baseDir: OUTPUT_DIR
                            },
                            https: config.https.tls,
                            ghostMode: false,
                            files: path.join(OUTPUT_DIR, '**', '*')
                        }, resolve);
                    })];
            case 2:
                _a.sent();
                done();
                return [2 /*return*/];
        }
    });
}); }));
gulp.task('devel:tcp', gulp.series('browser:base', function (done) { return __awaiter(void 0, void 0, void 0, function () {
    var config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                config = require('../server/config');
                return [4 /*yield*/, new Promise(function (resolve) {
                        browserSync.create('producer1').init({
                            open: 'external',
                            host: config.domain,
                            startPath: '/?roomId=devel:tcp&info=true&_throttleSecret=foo&forceTcp=true&consume=false',
                            server: {
                                baseDir: OUTPUT_DIR
                            },
                            https: config.https.tls,
                            ghostMode: false,
                            files: path.join(OUTPUT_DIR, '**', '*')
                        }, resolve);
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, new Promise(function (resolve) {
                        browserSync.create('consumer1').init({
                            open: 'external',
                            host: config.domain,
                            startPath: '/?roomId=devel:tcp&info=true&_throttleSecret=foo&forceTcp=true&produce=false',
                            server: {
                                baseDir: OUTPUT_DIR
                            },
                            https: config.https.tls,
                            ghostMode: false,
                            files: path.join(OUTPUT_DIR, '**', '*')
                        }, resolve);
                    })];
            case 2:
                _a.sent();
                done();
                return [2 /*return*/];
        }
    });
}); }));
gulp.task('devel:vp9', gulp.series('browser:base', function (done) { return __awaiter(void 0, void 0, void 0, function () {
    var config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                config = require('../server/config');
                return [4 /*yield*/, new Promise(function (resolve) {
                        browserSync.create('producer1').init({
                            open: 'external',
                            host: config.domain,
                            startPath: '/?roomId=devel:vp9&info=true&_throttleSecret=foo&forceVP9=true&svc=L3T3&consume=false',
                            server: {
                                baseDir: OUTPUT_DIR
                            },
                            https: config.https.tls,
                            ghostMode: false,
                            files: path.join(OUTPUT_DIR, '**', '*')
                        }, resolve);
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, new Promise(function (resolve) {
                        browserSync.create('consumer1').init({
                            open: 'external',
                            host: config.domain,
                            startPath: '/?roomId=devel:vp9&info=true&_throttleSecret=foo&forceVP9=true&svc=L3T3&produce=false',
                            server: {
                                baseDir: OUTPUT_DIR
                            },
                            https: config.https.tls,
                            ghostMode: false,
                            files: path.join(OUTPUT_DIR, '**', '*')
                        }, resolve);
                    })];
            case 2:
                _a.sent();
                done();
                return [2 /*return*/];
        }
    });
}); }));
gulp.task('devel:h264', gulp.series('browser:base', function (done) { return __awaiter(void 0, void 0, void 0, function () {
    var config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                config = require('../server/config');
                return [4 /*yield*/, new Promise(function (resolve) {
                        browserSync.create('producer1').init({
                            open: 'external',
                            host: config.domain,
                            startPath: '/?roomId=devel:h264&info=true&_throttleSecret=foo&forceH264=true&consume=false',
                            server: {
                                baseDir: OUTPUT_DIR
                            },
                            https: config.https.tls,
                            ghostMode: false,
                            files: path.join(OUTPUT_DIR, '**', '*')
                        }, resolve);
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, new Promise(function (resolve) {
                        browserSync.create('consumer1').init({
                            open: 'external',
                            host: config.domain,
                            startPath: '/?roomId=devel:h264&info=true&_throttleSecret=foo&forceH264=true&produce=false',
                            server: {
                                baseDir: OUTPUT_DIR
                            },
                            https: config.https.tls,
                            ghostMode: false,
                            files: path.join(OUTPUT_DIR, '**', '*')
                        }, resolve);
                    })];
            case 2:
                _a.sent();
                done();
                return [2 /*return*/];
        }
    });
}); }));
gulp.task('default', gulp.series('dist'));
