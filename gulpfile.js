/**
 * 构建任务
 */
var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less:main', function () {
    return gulp.src('assets/less/*.less')
        .pipe(less({compress: true}))
        .pipe(gulp.dest('assets/style'));
});

gulp.task('less:jquery', function () {
    return gulp.src('assets/less/themes/default/jquery.mobile.less')
        .pipe(less({compress: true}))
        .pipe(gulp.dest('assets/style/themes/default'));
});

gulp.task('less:all',['less:main', 'less:jquery'], function () {
});

gulp.task("serve:app", ['less:all'], function(){
    gulp.watch("assets/less/**/*.less", ['less:all']);
});


gulp.task('default', function() {
    // 将你的默认的任务代码放在这
});