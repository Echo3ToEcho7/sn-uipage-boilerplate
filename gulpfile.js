var gulp = require('gulp');
var babel = require('gulp-babel');
var through = require('through2');
var merge = require('merge-stream');
var es = require('event-stream');

var ServiceNow = require('node-servicenow');
var Builder = require('./helpers/builder');
var props = require('./build_props.json');

var builder = new Builder('ui_page.xml');

var sninstance = new ServiceNow(props.instance, props.username, props.password);
var record = sninstance.record('sys_ui_page', props.sys_id);

gulp.task('clientscript', () => {
  return gulp.src('src/client_script.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('data', () => {
  return gulp.src('src/data.js')
    .pipe(babel())
    .pipe(builder.data());
});

gulp.task('default', ['data', 'clientscript'], () => {
  return gulp.src('src/html.html')
    .pipe(builder.html())
    .pipe(builder.build())
    .pipe(gulp.dest('dist'));
});

gulp.task('deploy', ['default'], (done) => {
  var
    html,
    client_script;

  var ht = gulp.src('dist/ui_page.xml')
    .pipe(through.obj(function (file, enc, cb) {
      html = file.contents.toString();
      this.push(file);
      cb();
    }));

  var ct = gulp.src('dist/client_script.js')
    .pipe(through.obj(function (file, enc, cb) {
      client_script = file.contents.toString();
      this.push(file);
      cb();
    }));

  return es.merge(ht, ct).pipe(through.obj(function (file, enc, cb) {
    if (!html || !client_script) { cb(); return }

    record.set('html', html).set('client_script', client_script)
      .update({ params: {sysparm_scope: props.scope}})
      .then(() => cb());
  }));
});
