# React StyleName
[![Build Status](https://travis-ci.org/texttechne/react-stylename.svg?branch=master)](https://travis-ci.org/texttechne/react-stylename) [![Coverage Status](https://coveralls.io/repos/github/texttechne/react-stylename/badge.svg?branch=master)](https://coveralls.io/github/texttechne/react-stylename?branch=master)

__BETA VERSION: Not released yet! See [issue #1](#1)__

This module allows for a seamless integration of [CSS-Modules](https://github.com/css-modules/css-modules)
(also known as local CSS) with React components. It provides a `styleName` attribute for any JSX element,
which automatically maps styles from a CSS-Modules object to the `className` attribute.

It is an improved version of [React CSS Modules](https://github.com/gajus/react-css-modules).
Please compare [alternatives](#user-content-alternatives).


## Setup
As a prerequisite you need to have the following things installed and configured in your project:
* [Babel](https://github.com/babel/babel) in version 6 and above
* A CSS-Module aware bundler:
  * [Webpack's css-loader](https://github.com/webpack/css-loader) or
  * [Browserify's css-modulesify](https://github.com/css-modules/css-modulesify)

Install via npm:
```
  npm install --save react-stylename
```

Configure `React StyleName` as Babel plugin, which you would typically do in your `.babelrc`:
```
{
  "presets": ["react", "es2015"],
  "plugins": [
    "babel-plugin-transform-decorators-legacy",
    "react-stylename/lib/transform"
  ]
}
```


## Usage

### ES6 Classes
_React StyleName_ can be used as decorator for your ES6 classes.
Full example:
```
import React, {Component} from "react";
import StyleName from "react-stylename";

import styles from "./myComponent.scss";
// example for styles content:
//  styles = {
//    "ci-heading": "ci-heading_32osj",
//    "ci-bold": "ci-bold_2w27N"
//  }

@StyleName(styles)
class MyComponent extends Component {
  render() {
    return <div styleName="ci-heading ci-bold" />
    // this will transform to:
    // return <div className="ci-heading_32osj ci-bold_2w27n" />
  }
}
export default MyComponent;
```

### Stateless Functions or React.createClass
_React StyleName_ can also be called programmatically, e.g. for stateless functions:
```
import React from "react";
import StyleName from "react-stylename";

import styles from "./myComponent.less";

const MyComponent = function(
  return <div styleName="" />
);
exports.MyComponent = StyleName(MyComponent, styles);
```
__NOTE__: This technique won't work for arrow functions: See [Caveats](#user-content-caveats).

### Conditional Logic
Under the hoods, _React StyleName_ is using [classnames](https://github.com/JedWatson/classnames) to
concatenate multiple styleNames. So it is readily available and should be used for conditional logic
regarding styleNames:
```
import StyleName, {joinNames} from "react-stylename";

const x = "2";
const styleNames = joinNames(
    "ci-test-1",
    `ci-test$-{x}`,
    ["ci-test-3", "ci-test-4"],
    {"ci-test-5": true, "ci-test-6": false},
    false
  );
// result:
// styleNames = "ci-test-1 ci-test-2 ci-test-3 ci-test-4 ci-test-5"
```

## Behavior
* Falsy values (null, undefined, empty string, ...) supplied to the `styleName` attribute will not
get rendered as `className` value
* Style names which don't have any mapping in the provided CSS module style object will not get rendered
as `className` value; additionally `React StyleName` will warn about those unknown style names
* Values of an existing `className` attribute are respected and always come first
* If no `className` attribute exists, it won't be generated if only falsy or unknown styleNames are provided


## Caveats
Stateless functions which are defined as arrow functions cannot be decorated at the moment.

I don't have a strong opinion about this, but at least using arrow functions for stateless functions
has the drawback that you cannot identify your components in React Dev Tools: Arrow functions are
anonymous by definition.

If you're lacking this feature, please open an issue.


## Alternatives

### React CSS Modules
The core idea of using `styleName` as mapping source for CSS-Modules styles stems from
[React CSS Modules](https://github.com/gajus/react-css-modules).

In contrast to _React CSS Modules_ _React StyleName_ transforms the `styleName` attribute via Babel
to the `className` attribute. This approach results in
* better runtime performance, since decorated classes and functions don't need to be wrapped
* is not restricted to the `render` function
(see [this section of the documentation](https://github.com/gajus/react-css-modules#loops-and-child-components))

### Classnames
The [classnames library](https://github.com/JedWatson/classnames) is a super useful tool to concatenate
class names and it allows for conditional logic. It also has a [binding feature for CSS-Modules
styles](https://github.com/JedWatson/classnames#alternate-bind-version-for-css-modules).

_React StyleName_ uses _classnames_ internally and also exposes it. Actually this tiny library could serve
all your needs. It falls short, however, for my needs, i.e. in regards to the following two points:
* convenience: the main use case is simply to use one simple string; additionally `styleName` vs. `className`
really highlights the distinction between local and global css class names.
* behavior: _classnames_ returns style names which don't have any mapping in the provided CSS module style
object. _React StyleName_ drops those unknown style names and warns about them
(see [Behavior](#user-content-behavior))
