import React from "react";
import { renderToString } from "react-dom/server";
import { expect } from "chai";
import sinon from "sinon";

import {
  Multiple,
  MultipleWithExistingClassName,
  MultipleWithMultipleExistingClassNames,
  MultipleWithOneUnknownStyleName,
  MultipleWithMultipleUnknownStyleNames,
  WithClassNamesLibrary
} from "../fixture/multiple-stylename-values";


describe("Support multiple values for styleName", function() {

  it("Should handle multiple string values", function() {
    const rendered = renderToString(<Multiple />);
    expect(rendered).to.contain(`class="added-1 added-2 added-3"`);
  });

  it("Should modify existing className with multiple styleNames", function() {
    const rendered = renderToString(<MultipleWithExistingClassName />);
    expect(rendered).to.contain(`class="exists-1 added-1 added-2 added-3"`);
  });

  it("Should modify multiple existing classNames with multiple styleNames", function() {
    const rendered = renderToString(<MultipleWithMultipleExistingClassNames />);
    expect(rendered).to.contain(`class="exists-1 exists-2 exists-3 added-1 added-2 added-3"`);
  });

  it("Should modify multiple existing classNames with multiple styleNames", function() {
    const rendered = renderToString(<MultipleWithMultipleExistingClassNames />);
    expect(rendered).to.contain(`class="exists-1 exists-2 exists-3 added-1 added-2 added-3"`);
  });

  it("Should integrate with classnames library for complex cases", function() {
    const rendered = renderToString(<WithClassNamesLibrary />);
    expect(rendered).to.contain(`class="added-1 added-2 added-3 added-from-object"`)
  });

  context("Handle unknown styleNames", function() {
    const result = `class="added-1 added-3"`;

    beforeEach(function() {
      sinon.stub(console, "error");
    });

    afterEach(function() {
      console.error.restore();
    });

    it("Should leave them out and warn about them (single)", function() {
      const rendered = renderToString(<MultipleWithOneUnknownStyleName />);

      expect(rendered).to.contain(result);
      expect(console.error.calledOnce).to.be.true;
      expect(console.error.getCall(0).args[0]).to.contain("[does-not-exist]");
    });

    it("Should leave them out and warn about them (multiple)", function() {
      const rendered = renderToString(<MultipleWithMultipleUnknownStyleNames />);

      expect(rendered).to.contain(result);
      expect(console.error.callCount).to.be.equal(2);
      expect(console.error.getCall(0).args[0]).to.contain("[does-not-exist]");
      expect(console.error.getCall(1).args[0]).to.contain("[does-not-exist-2]");
    });

  });

});
