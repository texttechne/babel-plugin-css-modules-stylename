exports.getTypeErrorMessage = (type) => `Attribute styleName cannot be of type [${type}]`;

exports.throwTypeError = (type) => {
  throw new TypeError(exports.getTypeErrorMessage(type));
};
