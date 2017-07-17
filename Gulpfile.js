const gulp = require('gulp')
const rename = require('gulp-rename')
const babel = require('babelify')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const watchify = require('watchify')

function compile (watch) {
  let bundle = watchify(browserify('./src/index.js', { debug: true }))

  function rebundle () {
    bundle
      .transform(babel)
      .bundle()
      .pipe(source('index.js'))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('public'))
  }

  if (watch) {
    bundle.on('update', () => {
      console.log('--> Bundling...')
      rebundle()
    })
  }
  rebundle()
}

gulp.task('build', () => {
  return compile()
})

gulp.task('styles', () => {
  gulp
    .src('styles/*')
    .pipe(gulp.dest('public'))
})

// gulp.task('default', ['styles', 'build'])

gulp.task('watch', () => {
  gulp.watch('styles/*.css', ['styles'])
  compile(true)
})
