import _ from "lodash";

const functionConstructor = (Component, styles, options) => {
  // todo use config for actual methodName
  Component.prototype.cssModulesStyles = function (styleName) {
    return styles[styleName];
  };

  return Component;
};

const decoratorConstructor = (styles, options) => {
  return (Component) => {
    return functionConstructor(Component, styles, options);
  };
};

export default (...args) => {
  if (_.isFunction(args[0])) {
    return functionConstructor(args[0], args[1], args[2]);
  } else {
    return decoratorConstructor(args[0], args[1]);
  }
};
