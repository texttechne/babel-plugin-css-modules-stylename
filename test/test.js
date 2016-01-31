require("babel-polyfill");
var plugin = require("../lib/transform");

require("babel-core/register")({
  plugins: ["babel-plugin-transform-decorators-legacy", plugin],
  cache: false
});

require("./tests");
