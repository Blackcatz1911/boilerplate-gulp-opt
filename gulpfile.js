var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];
var siteUrl = "http://www.example.com";
var optimizeDimensions = [{
    height: 600,
    width: 500
}, {
    height: 900,
    width: 1200
}]

//load all of our dependencies
//add more here if you want to include more libraries
var gulp        = require('gulp');
var gutil       = require('gulp-util');
var path        = require('path');
var critical    = require('critical');
var mergeStream    = require('merge-stream');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});


// ----------------------   DEV BUILDS -----------------------------

// public tasks
gulp.task('default', function() {
  return gulp.start('build-dev');
});

gulp.task('watch', ['build-dev'], function() {
    //a list of watchers, so it will watch all of the following files waiting for changes
    $.livereload.listen();
    gulp.start('html-dev-embedlr-watch');
    gulp.watch('src/scripts/**', ['copy-scripts-dev-watch']);
    gulp.watch('bower_components/**/*.js', ['copy-scripts-bower-dev-watch']);
    gulp.watch('bower_components/**/*.css', ['copy-styles-bower-dev-watch']);
    gulp.watch('src/styles/**', ['copy-styles-dev-watch','scss-dev-watch']);
    gulp.watch('src/images/**', ['copy-images-dev-watch']);
    gulp.watch('src/sprites/**', ['copy-sprites-dev-watch']);
    gulp.watch('src/**/*.html', ['html-dev-embedlr-watch']);
    gulp.watch('src/**/*.php', ['copy-php-dev-watch']);
});

gulp.task('build-dev', ['clean-dev', 'copy-images-dev', 'copy-sprites-dev', 'copy-fonts-dev', 'copy-misc-dev', 'copy-scripts-dev', 'copy-scripts-bower-dev', 'copy-styles-dev', 'scss-dev', 'copy-styles-bower-dev', 'copy-php-dev', 'html-dev']);

// clean

gulp.task('clean-dev', function (done) {
  return $.del(['dev/'], done);
});

// copy assets
var copyImagesDev = function(tmp) {
    return gulp.src(['src/images/**/*.jpg', 'src/images/**/*.png'])
        .pipe($.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .on('error', gutil.log)
        .pipe(gulp.dest('dev/images'))
        .pipe($.livereload());
}
gulp.task('copy-images-dev', ['clean-dev'], copyImagesDev);
gulp.task('copy-images-dev-watch', copyImagesDev);

var copySpritesDev = function(tmp) {
    return gulp.src(['src/sprites/**/*.jpg', 'src/sprites/**/*.png'])
        .pipe($.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .on('error', gutil.log)
        .pipe(gulp.dest('dev/sprites'))
        .pipe($.livereload());
}
gulp.task('copy-sprites-dev', ['clean-dev'], copySpritesDev);
gulp.task('copy-sprites-dev-watch', copySpritesDev);

var copyFontsDev = function(tmp) {
    return gulp.src(['src/**/*.{eot,svg,ttf,woff}'])
        .pipe(gulp.dest('dev/fonts'))
        .pipe($.flatten())
        .pipe($.livereload());
}
gulp.task('copy-fonts-dev', ['clean-dev'], copyFontsDev);
gulp.task('copy-fonts-dev-watch', ['clean-dev'], copyFontsDev);

var copyMiscDev = function () {
    return gulp.src(['src/**/*.ico', 'src/*.txt', 'src/.htaccess'])
        .pipe(gulp.dest('dev/'))
        .pipe($.livereload());
}
gulp.task('copy-misc-dev', ['clean-dev'], copyMiscDev);
gulp.task('copy-misc-dev-watch', copyMiscDev);

var CopyScriptsDev = function() {
    return gulp.src(['src/scripts/**/*.js'])
        .pipe(gulp.dest('dev/scripts'))
        .pipe($.livereload());
}
gulp.task('copy-scripts-dev', ['clean-dev'], CopyScriptsDev);
gulp.task('copy-scripts-dev-watch', CopyScriptsDev);

var copyScriptsBowerDev = function() {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/*.js'))
        .pipe($.flatten())
        .pipe(gulp.dest('dev/vendor/'))
        .pipe($.livereload());
        
}
gulp.task('copy-scripts-bower-dev', ['clean-dev'], copyScriptsBowerDev);
gulp.task('copy-scripts-bower-dev-watch', copyScriptsBowerDev);

var copyStylesDev = function() {
    return gulp.src(['src/styles/**/*.css']) 
        .pipe(gulp.dest('dev/styles/'))
        .pipe($.livereload());
}
gulp.task('copy-styles-dev', ['clean-dev'], copyStylesDev);
gulp.task('copy-styles-dev-watch', copyStylesDev);

var scssDev = function() {
    return gulp.src('src/styles/**/*.scss')
        .pipe($.sass().on('error', gutil.log))
        .on('error', gutil.log)
        .pipe($.autoprefixer({
           browsers: autoPrefixBrowserList,
           cascade:  true
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('dev/styles/'))
        .pipe($.livereload());
}
gulp.task('scss-dev', ['clean-dev'], scssDev);
gulp.task('scss-dev-watch', scssDev);

var copyStylesBower = function() {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/*.css'))
        .pipe($.flatten())
        .pipe(gulp.dest('dev/vendor/'))
        .pipe($.livereload());
}
gulp.task('copy-styles-bower-dev', ['clean-dev'], copyStylesBower);
gulp.task('copy-styles-bower-dev-watch', copyStylesBower);

var CopyPhpDev = function() {
    return gulp.src(['src/**/*.php'])
        .pipe(gulp.dest('dev/'))
        .pipe($.livereload());
}
gulp.task('copy-php-dev', ['clean-dev'], CopyScriptsDev);
gulp.task('copy-php-dev-watch', CopyScriptsDev);

var twigDev = function () {
    return gulp.src('src/*.twig')
        .pipe($.data(function(file) {
            return require('./src/data/' + path.basename(file.path, '.twig') + '.json');
        }))
        .on('error', gutil.log)
        .pipe($.twig())
        .on('error', gutil.log)
        .pipe(gulp.dest('.tmp/'))
        .pipe($.livereload());
}
gulp.task('twig-dev', ['clean-dev'], twigDev);
gulp.task('twig-dev-watch', twigDev);

var htmlDev = function () {
    return gulp.src(['src/*.html', '.tmp/*.html'])
        .pipe($.fileInclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('./dev'));
        
}
gulp.task('html-dev', ['clean-dev', 'twig-dev'], htmlDev);
gulp.task('html-dev-watch', ['twig-dev-watch'], htmlDev);
gulp.task('html-dev-embedlr-watch', ['html-dev-watch'], function () {
  return gulp.src(['dev/*.html'])     
        .pipe($.embedlr())
        .pipe(gulp.dest('./dev'))
        .pipe($.livereload());
});


// ----------------------   DEPLOY BUILDS -----------------------------


// public tasks
gulp.task('build', ['build-dist']);

gulp.task('build-dist', ['copy-images-dist', 'copy-misc-dist', 'copy-fonts-dist', 'html-critical-dist','html-sitemap-dist', 'sprites-dist']);

// clean

gulp.task('clean-dist', function (done) {
  $.del(['dist/'], done);
});

// copy assets

gulp.task('copy-images-dist', ['clean-dist', 'sprites-dist'], function(tmp) {
    return gulp.src(['dev/images/**/*.jpg', 'dev/images/**/*.png'])
        .pipe($.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('copy-misc-dist', ['clean-dist'],function () {
    return gulp.src(['src/**/*.ico', 'src/*.txt', 'src/.htaccess'])
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-fonts-dist', ['clean-dist'], function(tmp) {
    return gulp.src(['src/**/*.{eot,svg,ttf,woff}'])
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.flatten());
});

gulp.task('php-dist', ['clean-dist'], function(tmp) {
    var phpFilter = $.filter('*.php');
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets;

    return gulp.src('dev/*.php')
        .pipe(assets = $.useref.assets())
        .pipe($.rev())
        .pipe(jsFilter)
          .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
          //.pipe($.replace('../bootstrap/fonts', 'fonts'))
          .pipe($.minifyCss())
        .pipe(cssFilter.restore())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(gulp.dest('dist/'))
        .pipe($.size({ title: 'dist/', showFiles: true }));
});

gulp.task('html-dist', ['build-dev', 'clean-dist', 'sprites-dist'], function () {

    var htmlFilter = $.filter('*.html');
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets;

    return gulp.src('dev/*.html')
        .pipe(assets = $.useref.assets())
        .pipe($.rev())
        .pipe(jsFilter)
          .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
          //.pipe($.replace('../bootstrap/fonts', 'fonts'))
          .pipe($.minifyCss())
        .pipe(cssFilter.restore())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(htmlFilter)
        .pipe(htmlFilter.restore())
        .pipe(gulp.dest('dist/'))
        .pipe($.size({ title: 'dist/', showFiles: true }));
});



// ------------------  HARDCORE OPTIMISATIONS ---------------------


gulp.task('html-critical-dist', ['html-dist', 'sprites-dist'], function () {
    return gulp.src('dist/*.html')
        .pipe(critical.stream({
            base: 'dist/', 
            inline: true,
            minify: true,
            dimensions: optimizeDimensions}))          
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
          }))
        .pipe(gulp.dest('dist'));
});

gulp.task('html-sitemap-dist', ['html-dist', 'clean-dist'], function () {
    return gulp.src('dist/*.html')
        .pipe($.sitemap({
                siteUrl: siteUrl
        })) // Returns sitemap.xml 
        .pipe(gulp.dest('./dist'));
});

gulp.task('sprites-dist', ['build-dev', 'clean-dist'], function() {
    var spriteOutput;

    spriteOutput = gulp.src("dev/styles/*.css")
        .pipe($.spriteGenerator({
            baseUrl:         "./dev/",
            spriteSheetName: "sprite.png",
            spriteSheetPath: "../images",
            verbose:true,
            filter: [
                function(image) {
                    return !image.meta.skip;
                }
            ],
        }));
    return mergeStream(
      spriteOutput.css.pipe(gulp.dest("dev/styles")), 
      spriteOutput.img.pipe(gulp.dest("dev/images"))
    );
});
