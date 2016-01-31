import React, {Component} from "react";
import CSSModules from "../../src";


const styleNames = {
  test: "test-1234#"
};

@CSSModules(styleNames)
class StyleNameBasic extends Component {
  render() {
    return <div styleName={this.props.passedStyleName} />
  }
}
exports.StyleNameBasic = StyleNameBasic;


@CSSModules({ test2: "test-class" })
class StyleNameBasic2 extends Component {
  render() {
    return <div styleName={this.props.passedStyleName} />
  }
}
exports.StyleNameBasic2 = StyleNameBasic2;


const StyleNameBasicES5 = React.createClass({
  render: function() {
    return <div styleName={this.props.passedStyleName} />
  }
});
exports.StyleNameBasicES5 = CSSModules(StyleNameBasicES5, styleNames);


const StyleNameBasicSF = function({passedStyleName}) {
  return <div styleName={passedStyleName} />
};
exports.StyleNameBasicSF = CSSModules(StyleNameBasicSF, styleNames);


const StyleNameBasicSFArrow = ({passedStyleName}) => {
  return <div styleName={passedStyleName} />
};
exports.StyleNameBasicSFArrow = CSSModules(StyleNameBasicSFArrow, styleNames);
