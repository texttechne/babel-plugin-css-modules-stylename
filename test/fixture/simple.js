import React, {Component} from "react";


const styles = {
  test: "test-1234#"
};

exports.SimpleES5 = React.createClass({
   render: function() {
     return <div styleName="test" />
   }
});

exports.SimpleES6 = class SimpleStringES6 extends Component {
  render() {
    return <div styleName="test" />
  }
};

exports.SimpleSF = () => {
  return <div styleName="test" />
};

