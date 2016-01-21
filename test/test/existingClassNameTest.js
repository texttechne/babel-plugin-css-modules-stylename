import React from "react";
import {renderToString} from "react-dom/server";
import {expect} from "chai";


import {StringCN, ExpressionCN, ExpressionSN, ExpressionComplex, Multiple} from "../fixture/existing-classname";


describe("Modify existing className", function() {
  const result = "class=\"existing added\"";

  it("Should modify an existing className string", function() {
    const rendered = renderToString(<StringCN />);
    expect(rendered).to.contain(result);
  });

  it("Should modify an existing className expression", function() {
    const rendered = renderToString(<ExpressionCN />);
    expect(rendered).to.contain(result);
  });

  it("Should modify an existing className string with styleName expression", function() {
    const rendered = renderToString(<ExpressionSN />);
    expect(rendered).to.contain(result);
  });

  it("Should modify an existing complex className expression with styleName expression", function() {
    const rendered = renderToString(<ExpressionComplex />);
    expect(rendered).to.contain(result);
  });

  //it("Should modify multiple existing classNames with multiple styleNames", function() {
  //  const rendered = renderToString(<Multiple />);
  //  expect(rendered).to.contain("class=\"exists exists2 exists3 added added2 added3\"");
  //});

});
