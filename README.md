#	jinang
__Collection of Node.js / ECMAScript Mini Modules__

[![coverage status of github.com/YounGoat/jinang](https://img.shields.io/coveralls/YounGoat/jinang/master.svg)](https://coveralls.io/github/YounGoat/jinang2?branch=master)
[![build status of github.com/YounGoat/jinang](https://travis-ci.org/YounGoat/jinang.svg?branch=master)](https://travis-ci.org/YounGoat/jinang)
[![total downloads of jinang](https://img.shields.io/npm/dt/jinang.svg)](https://www.npmjs.com/package/jinang)
[![jinang's License](https://img.shields.io/npm/l/jinang.svg)](https://www.npmjs.com/package/jinang)
[![latest version of jinang](https://img.shields.io/npm/v/jinang.svg)](https://www.npmjs.com/package/jinang)


>	Other Languages / 敬请等待 / 敬請等待
>	If links in this document not avaiable, please access [README on GitHub](https://github.com/YounGoat/jinang/blob/master/README.md) directly.

The name *jinang* is abbreviation of "Jin-Nang", which in chinese means a magic box. The modules in *jinang* are independent for each other, and are for different usage.

__jinang__ is an incubator. Successful sub modules may be encouraged to be published as independent NPM packages.

##	Table of contents

*	[Get Started](#get-started)
*	[API](#api)
*	[Why jinang](#why-jinang)
*	[References](#references)

##	Links

*	[CHANGE LOG](./CHANGELOG.md)
*	[Homepage](https://github.com/YounGoat/jinang)

##	Get Started

```javascript
// Modules are independent for each other and are suggested to be required independently.
const defineError = require('jinang/defineError');

const MyError = defineError('MyError', Error, function(message) {
    this.code = 'SOMETHING_IS_WRONG';
    this.message = message;
});

// ...
throw new MyError('Helo word!');
```

##	API

All sub-modules in __jinang__ are independent from each other. Use `require('jinang/<subModuleName>')` to require the sub-modules.

For your convenience, avaiable modules included in *jinang* are listed here,

*   [absorb](./docs/absorb.md)
*   [cloneObject](./docs/cloneObject.md)
*   [co](./docs/co.md)
*   [currying](./docs/currying.md)
*   [defineError](./docs/defineError.md)
*   [Directory](./docs/Directory.md)
*   [forInObject](./docs/forInObject.md)
*   [isGeneratorFunction](./docs/isGeneratorFunction.md)
*   [jointString](./docs/jointString.md)
*   [JsonFile](./docs/JsonFile.md)
*   [modifyUrl](./docs/modifyUrl.md)
*   [open](./docs/open.md)
*   [ordinal](./docs/ordinal.md)
*   [ott](./docs/ott.md)
*   [papply](./docs/papply.md)
*   [parseOptions](./docs/parseOptions.md)
*   [PoC](./docs/PoC.md)
*   [Progress](./docs/Progress.md)
*   [promiseRejectionAutoHandle](./docs/promiseRejectionAutoHandle.md)
*   [safeClone](./docs/safeClone.md)
*   [sleep](./docs/sleep.md)
*   [split](./docs/split.md)

##  Why *jinang*

__jinang__ is an incubator for creatives which will make programming with Node.js much easier. 

Only mini modules without any dependencies may be put into __jinang__.
