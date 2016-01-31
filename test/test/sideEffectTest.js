import React from "react";
import { renderToString } from "react-dom/server";
import { expect } from "chai";
import sinon from "sinon";

import {
  AdditionalAttributes,
  AdditionalAttributesWithExistingClassName
}  from "../fixture/side-effect";


describe("Side effects", function() {
  const result = "class=\"test-1234#\"";

  it("Should not interfere with other attributes", function() {
    const rendered = renderToString(<AdditionalAttributes />);
    expect(rendered).to.contain(`class="test-html-hash"`);
    expect(rendered).to.contain(`class="test-custom-hash"`);
  });

  it("Should not interfere with other attributes and existing className", function() {
    const rendered = renderToString(<AdditionalAttributesWithExistingClassName />);
    expect(rendered).to.contain(`class="existing1 test-html-hash"`);
    expect(rendered).to.contain(`class="existing2 test-custom-hash"`);
  });
});
