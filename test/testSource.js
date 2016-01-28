import babelRegister from "babel-core/register";
import plugin from "../src/stylename-transform";

babelRegister({
  plugins: ["babel-plugin-transform-decorators-legacy", plugin],
  cache: false
});

require("./tests");
