import React, {Component} from "react";

const styles = {
  test: 'test-1234#'
};

class NoTransform extends Component {

  render() {
    return (
      <div styleName="test" />
    )
  }
}

export default NoTransform;
