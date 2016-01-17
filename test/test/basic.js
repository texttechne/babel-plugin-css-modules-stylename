import React from "react";
import ReactDOMServer from "react-dom/server";
import {expect} from "chai";

import NoTransform from "../fixture/no-transform";


describe("Basic tests", function() {

  it("Should return class without styleName attribute as is", function() {
    var rendered = ReactDOMServer.renderToString(<NoTransform />);

    expect(rendered).to.match(/^<div class="test"[^>]*>No transform.<\/div>$/);
  });

});
