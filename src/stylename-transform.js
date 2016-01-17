import transformStyleName from "./transformStyleName";


module.exports = function (babel) {
  const types = babel.types;

  const visitor = {
    JSXElement: function (path) {
      transformStyleName(types, path.node);
    }
  };

  return {
    inherits: require("babel-plugin-syntax-jsx"),
    visitor: visitor
  };
};

