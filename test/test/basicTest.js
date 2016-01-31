import React from "react";
import { renderToString } from "react-dom/server";
import { expect } from "chai";
import sinon from "sinon";

import {
  StyleNameBasic,
  StyleNameBasic2,
  StyleNameBasicES5,
  StyleNameBasicSF,
  StyleNameBasicSFArrow
}  from "../fixture/basic";

describe("Map styleNames which are given to class annotation", function() {

  it("Should change string styleName to className", function() {
    const result = "class=\"test-1234#\"";
    const rendered = renderToString(<StyleNameBasic passedStyleName="test" />);
    expect(rendered).to.contain(result);
  });

  it("Should work for multiple instances with different style definitions", function() {
    const result = "class=\"test-class\"";
    const rendered = renderToString(<StyleNameBasic2 passedStyleName="test2" />);
    expect(rendered).to.contain(result);
  });

});

describe("Map styleNames which are given to function wrapper", function() {
  const result = "class=\"test-1234#\"";

  it("Should change string styleName to className (ES5)", function() {
    const rendered = renderToString(<StyleNameBasicES5 passedStyleName="test" />);
    expect(rendered).to.contain(result);
  });

  it("Should change string styleName to className (stateless function)", function() {
    const rendered = renderToString(<StyleNameBasicSF passedStyleName="test" />);
    expect(rendered).to.contain(result);
  });

  it("[NOT SUPPORTED] Should change string styleName to className (stateless arrow function)", function() {
    expect(function() {
      renderToString(<StyleNameBasicSFArrow passedStyleName="test"/>)
    }).to.throw(TypeError);
  });

});

describe("Handle unknown styleNames", function() {
  beforeEach(function() {
    // use a stub instead of a spy, so that console errors won't ge printed
    sinon.stub(console, "error");
  });

  afterEach(function() {
    console.error.restore();
  });

  it("Should not use styleName and warn if given name is unknown", function() {
    const rendered = renderToString(<StyleNameBasic passedStyleName="test-random" />);

    expect(rendered).to.not.contain("class");
    expect(console.error.calledOnce).to.be.true;
    expect(console.error.getCall(0).args[0]).to.equal("The provided style name [test-random] does not occur as class name in your css file!")
  });

  it("Should isolate styles only to those classes where they are defined", function() {
    const rendered = renderToString(<StyleNameBasic2 passedStyleName="test" />);

    expect(rendered).to.not.contain("class");
    expect(console.error.calledOnce).to.be.true;
    expect(console.error.getCall(0).args[0]).to.equal("The provided style name [test] does not occur as class name in your css file!")
  });
});
