import "array.prototype.findindex";
import { DEFAULT_STYLENAME_TRANSLATE_METHOD } from "./util";


function getAttributeMap(t, node) {
  return node.openingElement.attributes.reduce(function (result, attr) {
    if (t.isJSXAttribute(attr)) {
      result[attr.name.name] = attr;
    }
    return result;
  }, {});
}

function getAttributeValue(t, attribute) {
  return t.isJSXExpressionContainer(attribute.value) ? attribute.value.expression: attribute.value;
}

function createValueExpression(t, objectKeyValue) {
  const callExpression = t.memberExpression(t.thisExpression(), t.identifier(DEFAULT_STYLENAME_TRANSLATE_METHOD), false);
  return t.callExpression(callExpression, [objectKeyValue]);
}

function createClassNameAttribute(t, value) {
  return t.jSXAttribute(t.jSXIdentifier("className"), t.jSXExpressionContainer(value));
}

function concat(t, left, right) {
  return t.binaryExpression("+", left, right);
}

function modifyClassAttribute(t, node, attributes, classExpression) {
  const value = createValueExpression(t, classExpression);
  let className = attributes.className;

  //add className
  if (!className) {
    className = createClassNameAttribute(t, value) ;
    node.openingElement.attributes.push(className);
  }
  // modify existing className
  else {
    const oldValue = getAttributeValue(t, className);
    const newValue = concat(t, oldValue, concat(t, t.stringLiteral(" "), value));
    attributes.className = createClassNameAttribute(t, newValue);

    const index = node.openingElement.attributes.findIndex((attrib) => t.isJSXAttribute(attrib) && attrib.name.name == "className" );
    node.openingElement.attributes[index] = attributes.className;
  }
}

function transformStyleName(t, path) {
  const node = path.node;
  const attributes = getAttributeMap(t, node);
  const styleName = attributes.styleName;

  if (styleName) {
    //const arrowFunctionPath = path.findParent( (p) => t.isArrowFunctionExpression(p) );
    const value = getAttributeValue(t, styleName);
    modifyClassAttribute(t, node, attributes, value);
  }
}

module.exports = function (babel) {
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

