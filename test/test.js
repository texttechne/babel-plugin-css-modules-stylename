require("babel-polyfill");
var plugin = require("../lib/stylename-transform");

require("babel-core/register")({
  presets: ["babel-preset-react", "es2015"],
  plugins: ["babel-plugin-transform-decorators-legacy", plugin],
  cache: false
});

require("./tests");
