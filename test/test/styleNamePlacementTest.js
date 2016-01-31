import React from "react";
import { renderToString } from "react-dom/server";
import { expect } from "chai";

import {
  WithinFunctionES5,
  WithinFunctionES6,
  WithinSubComponent,
  WithinExternalSubComponent,
  WithinBoundArrowFunction,
  WithinPassedArrowFunction
} from "../fixture/stylename-placement";


describe("Support all possible placements of styleName", function() {
  const result = "class=\"test-1234#\"";

  it("Should transform styleName within any function (ES5)", function() {
    const rendered = renderToString(<WithinFunctionES5 />);
    expect(rendered).to.contain(result);
  });

  it("Should transform styleName within any function (ES6)", function() {
    const rendered = renderToString(<WithinFunctionES6 />);
    expect(rendered).to.contain(result);
  });

  it("Should transform styleName when function is rendered in sub component", function() {
    const rendered = renderToString(<WithinSubComponent />);
    expect(rendered).to.contain(result);
  });

  it("Should transform styleName when function is rendered in external sub component", function() {
    const rendered = renderToString(<WithinExternalSubComponent />);
    expect(rendered).to.contain(result);
  });

  it("Should transform styleName within bound arrow function", function() {
    const rendered = renderToString(<WithinBoundArrowFunction />);
    expect(rendered).to.contain(result);
  });

  it("Should transform styleName within passed arrow function", function() {
    const rendered = renderToString(<WithinPassedArrowFunction />);
    expect(rendered).to.contain(result);
  });

});
