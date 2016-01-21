import _ from "lodash";


function getAttributeMap(node) {
  return _.reduce(node.openingElement.attributes, function (result, attr) {
    result[attr.name.name] = attr;
    return result;
  }, {});
}

function getAttributeValue(t, attribute) {
  return t.isJSXExpressionContainer(attribute.value) ? attribute.value.expression: attribute.value;
}

function createValueExpression(t, variableName, objectKeyValue) {
  const isString = t.isStringLiteral(objectKeyValue);
  const computed = !isString;
  const objectKey = !isString ? objectKeyValue : t.identifier(objectKeyValue.value);

  return t.memberExpression(t.identifier(variableName), objectKey, computed);
}

function createClassNameAttribute(t, value) {
  return t.jSXAttribute(t.jSXIdentifier("className"), t.jSXExpressionContainer(value));
}

function concat(t, left, right) {
  return t.binaryExpression("+", left, right);
}

function modifyClassAttribute(t, node, attributes, classExpression) {
  // todo check for style variable
  const value = createValueExpression(t, "styles", classExpression);
  let className = attributes.className;

  if (!className) {
    className = createClassNameAttribute(t, value) ;
    node.openingElement.attributes.push(className);
  }
  else {
    const oldValue = getAttributeValue(t, className);
    const newValue = concat(t, oldValue, concat(t, t.stringLiteral(" "), value));
    attributes.className = createClassNameAttribute(t, newValue);

    const index = _.findIndex(node.openingElement.attributes, (attrib) => attrib.name.name == "className" );
    node.openingElement.attributes[index] = attributes.className;
  }
}

module.exports = function(t, path) {
  const node = path.node;
  const attributes = getAttributeMap(node);
  const styleName = attributes.styleName;

  if (styleName) {
    const value = getAttributeValue(t, styleName);
    modifyClassAttribute(t, node, attributes, value);
  }
};
