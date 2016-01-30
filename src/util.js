const getTypeErrorMessage = (type) => `Attribute styleName cannot be of type [${type}]`;
const getUnknownStyleNameMessage = (styleName) => `The provided style name [${styleName}] does not occur as class name in your css file!`;

exports.DEFAULT_STYLENAME_TRANSLATE_METHOD = "translateCssModulesStyles";

exports.throwTypeError = (type) => {
  throw new TypeError(getTypeErrorMessage(type));
};

exports.warnClassNameNotFound = (styleName) => {
  console.error(getUnknownStyleNameMessage(styleName));
};
