const { src, dest, parallel } = require("gulp");
const concat = require("gulp-concat");

const js = (cb) => {
  src("src/**/*.js").pipe(concat("result.js")).pipe(dest("output/"));
  cb();
};

const css = (cb) => {
  src("src/**/*.css").pipe(concat("result.css")).pipe(dest("output/"));
  cb();
};

exports.js = js;
exports.css = css;
exports.default = parallel(js, css);
