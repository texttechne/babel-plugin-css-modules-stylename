import React, {Component} from "react";
import CSSModules from "../../src";


const styleNames = {
  "test-html": "test-html-hash",
  "test-custom": "test-custom-hash"
};


const PlainComponent = function({className}) {
  return <div className={className} />
};
@CSSModules(styleNames)
class AdditionalAttributes extends Component {
  render() {
    return (
      <div title="test" styleName="test-html" {...this.props}>
        <PlainComponent irrelevant={true} passedStyleName="test" styleName="test-custom" {...this.props}  />
      </div>
    )
  }
}
exports.AdditionalAttributes = AdditionalAttributes;

@CSSModules(styleNames)
class AdditionalAttributesWithExistingClassName extends Component {
  render() {
    return (
      <div title="test" styleName="test-html" className="existing1" {...this.props}>
        <PlainComponent irrelevant={true} styleName="test-custom" className="existing2" {...this.props}  />
      </div>
    )
  }
}
exports.AdditionalAttributesWithExistingClassName = AdditionalAttributesWithExistingClassName;
