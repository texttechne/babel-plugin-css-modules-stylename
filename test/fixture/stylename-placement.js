import React, {Component} from "react";
import CSSModules from "../../src/decorator";


const styles = {
  test: "test-1234#"
};

const SubComponent = ({content}) => {
  return <div>{content()}</div>
};

const SubComponent2 = function({content}) {
  return <div>{content()}</div>
};

CSSModules(SubComponent2, styles);

exports.WithinFunctionES5 = CSSModules(React.createClass({
  getContent: function() {
    return <div styleName="test" />;
  },
  render: function() {
    return <div>{this.getContent()}</div>;
  }
}), styles);


exports.WithinFunctionES6 = CSSModules(class extends Component {
  getContent() {
    return <div styleName="test" />;
  }
  render() {
    return <div>${this.getContent()}</div>
  }
}, styles);


exports.WithinSubComponent = CSSModules(class extends Component {
  getContent() {
    return <div styleName="test" />;
  }
  render() {
    return <SubComponent content={this.getContent.bind(this)} />;
  }
}, styles);


import ExternalSubComponent from "./external-subcomponent";
exports.WithinExternalSubComponent = CSSModules(class extends Component {
  getContent() {
    return <div styleName="test" />;
  }
  render() {
    return <ExternalSubComponent content={this.getContent.bind(this)} />;
  }
}, styles);


exports.WithinBoundArrowFunction = CSSModules(class extends Component {
  render() {
    const tester = () => <div styleName="test" />;
    return <SubComponent2 content={tester} />
  }
}, styles);


exports.WithinPassedArrowFunction = CSSModules(class extends Component {
  render() {
    return <SubComponent content={() => <div styleName="test" />} />
  }
}, styles);
