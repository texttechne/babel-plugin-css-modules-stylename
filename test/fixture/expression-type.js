import React from "react";
import CSSModules from "../../src";


const styles = {
  test: "test-1234#"
};

exports.String = CSSModules(function() {
  return <div styleName={"test"} />
}, styles);

exports.Variable = CSSModules(function() {
  const x = "test";
  return <div styleName={x} />;
}, styles);

exports.FunctionCall = CSSModules(function() {
  const x = () => ("test");
  return <div styleName={x()} />;
}, styles);

exports.Concat = CSSModules(function() {
  return <div styleName={"te" + "st"} />;
}, styles);

exports.Template = CSSModules(function() {
  return <div styleName={`te${'st'}`} />;
}, styles);

exports.Complex = CSSModules(function() {
  const e = () => "e";
  const t = "t";
  return <div styleName={"t" + e() + `s` + t } />;
}, styles);
