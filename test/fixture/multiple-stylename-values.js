import React from "react";
import CSSModules from "../../src/decorator";
import classNamesLib from "classnames";

const styles = {
  "ci-test1": "added-1",
  "ci-test2": "added-2",
  "ci-test3": "added-3",
  "from-object": "added-from-object"
};
const styleNames = "ci-test1 ci-test2 ci-test3";
const classNames = "exists-1 exists-2 exists-3";

exports.Multiple = CSSModules(function() {
  return <div styleName={styleNames} />
}, styles);

exports.MultipleWithExistingClassName = CSSModules(function() {
  return <div styleName={styleNames} className="exists-1" />;
}, styles);

exports.MultipleWithMultipleExistingClassNames = CSSModules(function() {
  return <div styleName={styleNames} className={classNames} />;
}, styles);

exports.MultipleWithOneUnknownStyleName = CSSModules(function() {
  return <div styleName="ci-test1 does-not-exist ci-test3" />;
}, styles);

exports.MultipleWithMultipleUnknownStyleNames = CSSModules(function() {
  return <div styleName="ci-test1 does-not-exist does-not-exist-2 ci-test3" />;
}, styles);

exports.WithClassNamesLibrary = CSSModules(function() {
  const styleNames = classNamesLib(
    "ci-test1",
    ["ci-test2", "ci-test3"],
    {"from-object": true, "nope": false},
    false
  );
  return <div styleName={styleNames} />;
}, styles);
