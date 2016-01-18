import React from "react";
import {renderToString} from "react-dom/server";
import {expect} from "chai";

import {SimpleES5, SimpleES6, SimpleSF} from "../fixture/simple";

describe("Map styleName by convention to 'style[xxx]'", function() {
  const result = "class=\"test-1234#\"";

  it("Should change string styleName to className (ES5)", function() {
    const rendered = renderToString(<SimpleES5 />);
    expect(rendered).to.contain(result);
  });

  it("Should change string styleName to className (ES6)", function() {
    const rendered = renderToString(<SimpleES6 />);
    expect(rendered).to.contain(result);
  });

  it("Should change string styleName to className (stateless function)", function() {
    const rendered = renderToString(<SimpleSF />);
    expect(rendered).to.contain(result);
  });

});
