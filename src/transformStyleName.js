import _ from "lodash";


function getAttributeMap(node) {
  return _.reduce(node.openingElement.attributes, function (result, attr) {
    result[attr.name.name] = attr;
    return result;
  }, {});
}

function createValueExpression(typesUtil, objectName, objectKey) {
  const value = typesUtil.memberExpression(typesUtil.identifier(objectName), typesUtil.identifier(objectKey));
  return typesUtil.jSXExpressionContainer(value);
}

function addClassAttribute(typesUtil, node, attributes, classValue) {
  let className = attributes.className;
  let value = createValueExpression(typesUtil, "styles", classValue);
  if (!className) {
    className = typesUtil.jSXAttribute(typesUtil.jSXIdentifier("className"), value);
    node.openingElement.attributes.push(className);
  }
}

module.exports = function(typesUtil, node) {
  const attributes = getAttributeMap(node);
  const styleName = attributes.styleName;

  if (styleName) {
    console.log("nodeName: ", node.openingElement.name.name);
    addClassAttribute(typesUtil, node, attributes, styleName.value.value);
  }
};
