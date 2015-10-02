var gutil = require('gulp-util');
var through = require('through2');
var File = gutil.File;

var build = function (data, html) {
  return `<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
<<<<<<< HEAD
  <g:evaluate var="jvar_data" jelly="true" object="true"><[CDATA[
    ${data}
  ]]></g:evaluate>
=======
  <g:evaluate var="jvar_data" jelly="true" object="true">
    <![CDATA[
      ${data}
    ]]>
  </g:evaluate>
>>>>>>> a2364d7e497121d66d90b4c5ec190175f6db45cf

  ${html}
</j:jelly>
`;
};

var Builder = function (name) {
  this._state = '';
  this._data = '';
  this._html = '';
  this.name = name;
};

Builder.prototype.data = function () {
  var that = this;
  return through.obj(function(file, enc, cb) {
    that._data = file.contents.toString();
    this.push(file);
    cb();
  });
};
Builder.prototype.html = function () {
  var that = this;
  return through.obj(function(file, enc, cb) {
    that._html = file.contents.toString();
    this.push(file);
    cb();
  });
};
Builder.prototype.build = function () {
  var that = this;
  return through.obj(function (file, enc, cb) {
    var rf = new File({
      cwd: '/',
      base: '/',
      path: '/' + that.name,
      contents: new Buffer(build(that._data, that._html))
    });

    this.push(rf);
    cb();
  });
};

module.exports = Builder;
