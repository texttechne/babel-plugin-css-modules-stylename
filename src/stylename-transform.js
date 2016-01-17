

module.exports = function (babel) {
  const types = babel.types;

  const visitor = {
    JSXElement: function (path) {
    }
  };

  return {
    inherits: require("babel-plugin-syntax-jsx"),
    visitor: visitor
  };
};

