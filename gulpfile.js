var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var inlineCss = require('gulp-inline-css');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var pug = require('gulp-pug');

// compile pug to html
gulp.task('pug', function buildHTML() {
  return gulp.src('src/*.pug')
  .pipe(pug({
    // Your options in here.
  }))
  .pipe(gulp.dest('build/html'))
});

//compile scss to css
gulp.task('build', function(){
	return gulp.src('src/scss/*.scss')
		.pipe(sass({
			style: 'compressed',
			errLogToConsole: false,
			onError: function(err){
				return notify().write(err);
			}
		}))
		.pipe(gulp.dest('build/css'));
})

//move css inline
gulp.task('inline', ['build'], function(){
	return gulp.src('build/*.html')
		.pipe(inlineCss())
		.pipe(gulp.dest("public"))
		.pipe(reload({stream: true}));
})

//compile on change
gulp.task('watch', function(){
	gulp.watch(['src/scss/*.scss', 'src/*.pug'], ['inline']);
})

//serve to the browser
gulp.task('serve', function(){
	browserSync({
		server: {
			baseDir: "public"
		},
		open: false
	})
})

gulp.task('default', ['watch', 'serve']);