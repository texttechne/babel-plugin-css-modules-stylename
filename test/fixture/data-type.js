import React from "react";
import CSSModules from "../../src/decorator";

const styles = {
  "ci-test": "foo1",
  "ci-test2": "foo2",
  "ci-test3": "foo3"
};


exports.NullValue = CSSModules(function() {
  return <div styleName={null} />
}, styles);

exports.UndefinedValue = CSSModules(function() {
  return <div styleName={undefined} />
}, styles);

exports.EmptyString = CSSModules(function() {
  return <div styleName="" />
}, styles);

exports.FalsyValue = CSSModules(function() {
  return <div styleName={false} />
}, styles);

exports.TruthyValue = CSSModules(function() {
  return <div styleName={true} />
}, styles);

exports.NumberValue = CSSModules(function() {
  return <div styleName={1} />
}, styles);

exports.MultipleStrings = CSSModules(function() {
  return <div styleName="ci-test ci-test2 ci-test3" />
}, styles);

exports.ArrayOfStrings = CSSModules(function() {
  return <div styleName={ ["ci-test", "ci-test2", "ci-test3"] } />
}, styles);

exports.ObjectWithTruth = CSSModules(function() {
  return <div styleName={ { "ci-test": true, "ci-test2": false, "ci-test3": true } } />
}, styles);
