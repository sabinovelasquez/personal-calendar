var gulp = require('gulp');

gulp.task('ngdocs', [], function () {
  var gulpDocs = require('gulp-ngdocs');

  return gulp.src('app/core/**/*.js')
    .pipe(gulpDocs.process())
    .pipe(gulp.dest('./docs'));
});