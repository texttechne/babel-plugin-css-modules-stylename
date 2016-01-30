import _ from "lodash";
import classNames from "classnames/bind";
import { throwTypeError, warnClassNameNotFound } from "./error";

const mixinCssModulesStyles = (Component, styles, options) => {
  // todo use config for actual methodName
  Component.prototype.cssModulesStyles = function (styleNames) {
    let sNames;
    if (typeof styleNames === "string") {
      sNames = styleNames.trim();
      if (!sNames) {
        return null;
      }
      sNames = sNames.split(" ");
    }
    else if (typeof styleNames === "boolean") {
      throwTypeError("boolean");
    }
    else if (!styleNames) {
      return null;
    }
    else if (Array.isArray(styleNames)) {
      sNames = styleNames;
    }
    else {
      throwTypeError(typeof styleNames);
    }

    const cNames = classNames(sNames.map((styleName) => {
      const className = styles[styleName];
      if (!className) {
        warnClassNameNotFound(styleName);
      }
      return className;
    }));
    return cNames || null;
  };

  return Component;
};

function decoratorConstructor(styles, options) {
  return function (Component) {
    return mixinCssModulesStyles(Component, styles, options);
  };
}

export default (...args) => {
  if (_.isFunction(args[0])) {
    return mixinCssModulesStyles(args[0], args[1], args[2]);
  }
  else {
    return decoratorConstructor(args[0], args[1]);
  }
};
