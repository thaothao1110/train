var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');

meta = {
  views: 'app/views/',
  styles: 'app/styles/',
  scripts: 'app/scripts/',
  assets: 'app/assets/',
  build: 'static/',
  doc: 'doc/'
};

gulp.task('iconfont', function(){
  return gulp.src([meta.assets + 'iconfonts/*.svg'])
    .pipe(iconfont({
      fontName: 'icons-demo',
      formats: ['ttf', 'woff2', 'woff'],
      centerHorizontally: true,
      normalize: true
    }))
    .on('glyphs', function(glyphs) {
      gulp.src('tmp/iconfonts.less')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: 'icons-demo',
          className: 'icon'
        }))
        .pipe(gulp.dest(meta.styles));
    })
    .pipe(gulp.dest(meta.build + 'fonts/'));
});
