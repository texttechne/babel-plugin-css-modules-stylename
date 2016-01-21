import transformStyleName from "./transformStyleName";


export default function (babel) {
  const types = babel.types;

  const visitor = {
    JSXElement: function (path) {
      transformStyleName(types, path);
    }
  };

  return {
    inherits: require("babel-plugin-syntax-jsx"),
    visitor: visitor
  };
};

