import React from "react";
import { renderToString } from "react-dom/server";
import { expect } from "chai";

import { getTypeErrorMessage } from "../../src/error";
import {
  NullValue,
  UndefinedValue,
  EmptyString,
  FalsyValue,
  TruthyValue,
  NumberValue,
  MultipleStrings,
  ArrayOfStrings,
  ObjectWithTruth
} from "../fixture/data-type";


describe("Handle different data types for styleName property", function() {
  const resultClassName = "class";
  const result = "class=\"foo1 foo2 foo3\"";

  it("Should not add className attribute when styleName is null", function() {
    const rendered = renderToString(<NullValue />);
    expect(rendered).not.to.contain(resultClassName);
  });

  it("Should not add className attribute when styleName is undefined", function() {
    const rendered = renderToString(<NullValue />);
    expect(rendered).not.to.contain(resultClassName);
  });

  it("Should not add className attribute when styleName is empty string", function() {
    const rendered = renderToString(<EmptyString />);
    expect(rendered).not.to.contain(resultClassName);
  });

  it("Should throw error when styleName is true", function() {
    expect(() => {
      renderToString(<TruthyValue />);
    }).to.throw(TypeError, /boolean/);
  });

  it("Should throw error when styleName is false", function() {
    expect(() => {
      renderToString(<FalsyValue />);
    }).to.throw(TypeError, /boolean/);
  });

  it("Should handle multiple string values", function() {
    const rendered = renderToString(<MultipleStrings />);
    expect(rendered).to.contain(result);
  });

  it("Should handle array of strings", function() {
    const rendered = renderToString(<ArrayOfStrings />);
    expect(rendered).to.contain(result);
  });

  it("Should throw error for objects", function() {
    expect( () => {
      renderToString(<ObjectWithTruth />)
    }).to.throw(TypeError, /object/);
  });

});
