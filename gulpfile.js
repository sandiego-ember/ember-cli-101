var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var rename = require('gulp-rename');
var path = require('path');

var distDir = path.join(__dirname, 'dist');
var workshopFile = path.join(__dirname, 'workshop.md');

gulp.task('build', function(cb) {
  return gulp
  .src([workshopFile])
  .pipe(rename('index.md'))
  .pipe(gulp.dest(distDir));
});

gulp.task('deploy', ['build'], function () {
  return gulp
    .src(path.join(distDir, '/**/*'))
    .pipe(ghPages());
});

gulp.task('default', ['deploy']);
