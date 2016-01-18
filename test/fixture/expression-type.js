import React, {Component} from "react";


const styles = {
  test: "test-1234#"
};

exports.String = () => {
  return <div styleName={"test"} />
};

exports.Variable = () => {
  const x = "test";
  return <div styleName={x} />;
};

exports.FunctionCall = () => {
  const x = () => ("test");
  return <div styleName={x()} />;
};

exports.Concat = () => {
  return <div styleName={"te" + "st"} />;
};

exports.Template = () => {
  return <div styleName={`te${'st'}`} />;
};

exports.Complex = () => {
  const e = () => "e";
  const t = "t";
  return <div styleName={"t" + e() + `s` + t } />;
};
