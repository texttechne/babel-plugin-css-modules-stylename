import isFunction from "lodash.isfunction";
import classNames from "classnames";

import {
  throwTypeError,
  warnClassNameNotFound,
  DEFAULT_STYLENAME_TRANSLATE_METHOD
} from "./util";


const mixinCssModulesStyles = (Component, styles, options) => {
  Component.prototype[DEFAULT_STYLENAME_TRANSLATE_METHOD] = function(styleNames) {
    return exports.toClassName(styles, styleNames);
  };

  return Component;
};

function decoratorConstructor(styles, options) {
  return function (Component) {
    return mixinCssModulesStyles(Component, styles, options);
  };
}

/**
 * Add method to given component (function or ES6 class), which translates style names
 * to class names. This function can either be used as decorator or programmatically.
 */
export default (...args) => {
  if (isFunction(args[0])) {
    return mixinCssModulesStyles(args[0], args[1], args[2]);
  }
  else {
    return decoratorConstructor(args[0], args[1]);
  }
};


/**
 * Expose classnames library for two reasons:
 * 1) convenience: no need to import classnames lib explicitly and additionally
 * 2) semantic: classnames is used to join & concatenate style names instead of class names
 *
 * @see https://github.com/JedWatson/classnames
 */
exports.joinNames = classNames;

/**
 * Translates an input string of space separated style names into a space separated string
 * of class names. Drops and warns about style names which are not mapped.
 *
 * @param {object} styles - styles object from CSSModules
 * @param {string} styleNames - space separated string of style names
 * @returns {string} translated classNames
 */
exports.toClassName = function (styles, styleNames) {
  let sNames;
  if (typeof styleNames === "string") {
    sNames = styleNames.trim();
    if (!sNames) {
      return null;
    }
    sNames = sNames.split(" ");
  }
  else if (!styleNames) {
    return null;
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
