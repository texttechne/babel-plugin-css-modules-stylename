import _ from "lodash";


function getAttributeMap(node) {
  return _.reduce(node.openingElement.attributes, function (result, attr) {
    result[attr.name.name] = attr;
    return result;
  }, {});
}

function createValueExpression(t, variableName, objectKeyValue) {
  const isString = t.isStringLiteral(objectKeyValue);
  const computed = !isString;
  const objectKey = !isString ? objectKeyValue : t.identifier(objectKeyValue.value);

  const value = t.memberExpression(t.identifier(variableName), objectKey, computed);
  return t.jSXExpressionContainer(value);
}

function modifyClassAttribute(t, node, attributes, classExpression) {
  let className = attributes.className;
  let value = createValueExpression(t, "styles", classExpression);
  if (!className) {
    className = t.jSXAttribute(t.jSXIdentifier("className"), value);
    node.openingElement.attributes.push(className);
  }
}

module.exports = function(t, node) {
  const attributes = getAttributeMap(node);
  const styleName = attributes.styleName;

  if (styleName) {
    // decompose ExpressionContainer
    const value = t.isJSXExpressionContainer(styleName.value) ? styleName.value.expression: styleName.value;

    modifyClassAttribute(t, node, attributes, value);
  }
};
