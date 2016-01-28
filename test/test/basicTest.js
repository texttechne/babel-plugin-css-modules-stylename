import React from "react";
import { renderToString } from "react-dom/server";
import { expect } from "chai";

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

  it("Should not use styleName if given name is unknown", function() {
    const rendered = renderToString(<StyleNameBasic passedStyleName="test-random" />);
    expect(rendered).to.not.contain("class");
  });

  it("Should work for multiple instances with different style definitions", function() {
    const result = "class=\"test-class\"";
    const rendered = renderToString(<StyleNameBasic2 passedStyleName="test2" />);
    expect(rendered).to.contain(result);
  });

  it("Should isolate styles only to those classes where they are defined", function() {
    const rendered = renderToString(<StyleNameBasic2 passedStyleName="test" />);
    expect(rendered).to.not.contain("class");
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

