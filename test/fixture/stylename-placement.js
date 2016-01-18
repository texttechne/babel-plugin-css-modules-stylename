import React, {Component} from "react";


const styles = {
  test: "test-1234#"
};

exports.WithinFunctionES5 = React.createClass({
  getContent: function() {
    return <div styleName="test" />;
  },
  render: function() {
    return <div>{this.getContent()}</div>;
  }
});

exports.WithinFunctionES6 = class extends Component {
  getContent() {
    return <div styleName="test" />;
  }
  render() {
    return <div>${this.getContent()}</div>
  }
};

const SubComponent = ({content}) => {
  return <div>{content()}</div>
};
exports.WithinSubComponent = class extends Component {
  getContent() {
    return <div styleName="test" />;
  }
  render() {
    return <SubComponent content={this.getContent.bind(this)} />;
  }
};

import ExternalSubComponent from "./external-subcomponent";
exports.WithinExternalSubComponent = class extends Component {
  getContent() {
    return <div styleName="test" />;
  }
  render() {
    return <ExternalSubComponent content={this.getContent.bind(this)} />;
  }
};
