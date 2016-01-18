import React from "react";
import {renderToString} from "react-dom/server";
import {expect} from "chai";

import {String, Variable, FunctionCall, Template, Concat, Complex} from "../fixture/expression-type";


describe("Handle different expression types", function() {
  const result = "class=\"test-1234#\"";

  it("Should handle strings as styleName", function() {
    const rendered = renderToString(<String />);
    expect(rendered).to.contain(result);
  });

  it("Should handle variables as styleName", function() {
    const rendered = renderToString(<Variable />);
    expect(rendered).to.contain(result);
  });

  it("Should handle function calls as styleName", function() {
    const rendered = renderToString(<FunctionCall />);
    expect(rendered).to.contain(result);
  });

  it("Should handle concatenated string as styleName", function() {
    const rendered = renderToString(<Concat />);
    expect(rendered).to.contain(result);
  });

  it("Should handle templates as styleName", function() {
    const rendered = renderToString(<Template />);
    expect(rendered).to.contain(result);
  });

  it("Should handle complex operations resulting in styleName", function() {
    const rendered = renderToString(<Complex />);
    expect(rendered).to.contain(result);
  });
});
