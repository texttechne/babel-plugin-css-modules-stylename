import React from "react";
import ReactDOMServer from "react-dom/server";
import {expect} from "chai";

import NoTransform from "../fixture/no-transform";
import SingleTransform from "../fixture/single-transform";


describe("Basic tests", function() {

  it("Should return class without styleName attribute as is", function() {
    var rendered = ReactDOMServer.renderToString(<NoTransform />);

    expect(rendered).to.match(/^<div class="test"[^>]*>No transform.<\/div>$/);
  });

  it("Should change styleName to className", function() {
    const rendered = ReactDOMServer.renderToString(<SingleTransform />)

    console.log("---------", rendered)
    expect(rendered).not.to.contain("styleName"); //todo: doesn't work with divs
    expect(rendered).to.contain('class="test-1234#"');
  });

});
