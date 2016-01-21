import babelRegister from "babel-core/register";
import plugin from "../src/stylename-transform";

babelRegister({
  plugins: [plugin],
  cache: false
});

require("./tests");
