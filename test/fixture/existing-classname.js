import React from "react";
import CSSModules from "../../src";


const styles = {
  test: "added",
  test2: "added2",
  test3: "added3"
};

exports.StringCN = CSSModules(function() {
  return <div styleName="test" className="existing" />;
}, styles);

exports.ExpressionCN = CSSModules(function() {
  return <div styleName="test" className={'existing'} />;
}, styles);

exports.ExpressionSN = CSSModules(function() {
  const x = 'test';
  return <div styleName={x} className="existing" />;
}, styles);

exports.ExpressionComplex = CSSModules(function() {
  const x = "test";
  const y = "exist";
  const y2 = () => "ing";
  return <div styleName={x} className={y + y2()} />;
}, styles);
