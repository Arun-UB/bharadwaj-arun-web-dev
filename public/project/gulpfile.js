var gulp = require('gulp');
var inject = require('gulp-inject');

gulp.task('index', function () {
    var target = gulp.src('index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['!./gulpfile.js', '**/*.js', '**/*.css'], {read: false}, {relative: true});

    return target.pipe(inject(sources, {addRootSlash: false}))
        .pipe(gulp.dest('.'));
});

gulp.watch('**/*', ['index']);