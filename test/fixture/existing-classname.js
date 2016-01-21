import React, {Component} from "react";


const styles = {
  test: "added",
  test2: "added2",
  test3: "added3"
};

exports.StringCN = () => {
  return <div styleName="test" className="existing" />;
};

exports.ExpressionCN = () => {
  return <div styleName="test" className={'existing'} />;
};

exports.ExpressionSN = () => {
  const x = 'test';
  return <div styleName={x} className="existing" />;
};

exports.ExpressionComplex = () => {
  const x = "test";
  const y = "exist";
  const y2 = () => "ing";
  return <div styleName={x} className={y + y2()} />;
};

exports.Multiple = () => {
  const x = "test test2 test3";
  const y = "exists exists2 exists3";
  return <div styleName={x} className={y} />;
};
