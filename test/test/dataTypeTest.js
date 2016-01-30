import React from "react";
import { renderToString } from "react-dom/server";
import { expect } from "chai";
import sinon from "sinon";

import {
  NullValue,
  UndefinedValue,
  EmptyString,
  FalsyValue,
  TruthyValue,
  NumberValue,
  MultipleStrings,
  ArrayOfString,
  ObjectWithTruth
} from "../fixture/data-type";


describe("Handle different data types for styleName property", function() {
  const resultClassName = "class";
  const result = "class=\"foo1 foo2 foo3\"";

  before(function() {
     sinon.spy(console, "error");
  });

  after(function() {
    console.error.restore();
  });

  it("Should not add className attribute when styleName is null", function() {
    const rendered = renderToString(<NullValue />);
    expect(rendered).not.to.contain(resultClassName);
    expect(console.error.called).to.be.false;
  });

  it("Should not add className attribute when styleName is undefined", function() {
    const rendered = renderToString(<NullValue />);
    expect(rendered).not.to.contain(resultClassName);
    expect(console.error.called).to.be.false;
  });

  it("Should not add className attribute when styleName is empty string", function() {
    const rendered = renderToString(<EmptyString />);
    expect(rendered).not.to.contain(resultClassName);
    expect(console.error.called).to.be.false;
  });

  it("Should not add className attribute when styleName is false", function() {
    const rendered = renderToString(<FalsyValue />);
    expect(rendered).not.to.contain(resultClassName);
    expect(console.error.called).to.be.false;
  });

  it("Should throw error when styleName is true", function() {
    expect(() => {
      renderToString(<TruthyValue />);
    }).to.throw(TypeError, /boolean/);
  });

  it("Should throw error for arrays", function() {
    expect( () => {
      renderToString(<ArrayOfString />)
    }).to.throw(TypeError, /object/);
  });

  it("Should throw error for objects", function() {
    expect( () => {
      renderToString(<ObjectWithTruth />)
    }).to.throw(TypeError, /object/);
  });

});
