import _ from "lodash";
import classNames from "classnames/bind";
import { throwTypeError } from "./error";

const functionConstructor = (Component, styles, options) => {
  // todo use config for actual methodName
  Component.prototype.cssModulesStyles = function (styleNames) {
    let sNames;
    if (typeof styleNames === "string") {
      sNames = styleNames.split(" ");
    }
    else if (typeof styleNames === "boolean") {
      throwTypeError("boolean");
    }
    else if (!styleNames) {
      return null;
    }
    else {
      sNames = styleNames;
    }

    const cx = classNames.bind(styles);
    const cNames = cx(sNames);

    //const cNames = classNames(sNames.map( (styleName) => styles[styleName] ));
    return cNames ? cNames : null;
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
