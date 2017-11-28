#	jinang
__Collection of Node.js / ECMAScript Mini Modules__

[![total downloads of jinang](https://img.shields.io/npm/dt/jinang.svg)](https://www.npmjs.com/package/jinang)
[![jinang's License](https://img.shields.io/npm/l/jinang.svg)](https://www.npmjs.com/package/jinang)
[![latest version of jinang](https://img.shields.io/npm/v/jinang.svg)](https://www.npmjs.com/package/jinang)

The name *jinang* is abbreviation of "Jin-Nang", which in chinese means a magic box. The modules in *jinang* are independent for each other, and are for different usage.

##	Table of contents

*	[Get Started](#get-started)
*	[API](#api)
*	[Why jinang](#why-jinang)
*	[Honorable Dependents](#honorable-dependents)
*	[About](#about)
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

For your convenience, avaiable modules included in *jinang* are listed here,

*   [cloneObject](#cloneobject)
*   [currying](#currying)
*   [defineError](#defineerror)
*   [forInObject](#forinobject)
*   [jointString](#jointstring)
*   [modifyUrl](#modifyurl)
*   [papply](#papply)
*   [sleep](#sleep)

### cloneObject

*   Object __cloneObject__( object *source* )

*   Object __cloneObject__( object *source*, Array *keynames* )  
    Item of *keynames* may be string or RegExp instance. If item is a string, key in *source* which strictly equals to the keyname will be cloned. However, if it is a RegExp instance, all keys in *source* will be iterated and those matched will be cloned.

*   Object __cloneObject__( object *source*, Function *mapper* )  
    The *mapper* SHOULD be a function who accepts two arguments `(key, value)` and return an array `[ newKey, newValue ]`.

### currying

Transform a normal function to a curried one.

*   curried Function __currying__( Function *fn*, number *paramsLength* )

```javascript
const currying = require('jinang/currying');

function plus(a, b, c) {
    return a + b + c;
}

// Create a curried function.
// 3 means that the original function plus() should be invoked with 3 arguments.
var curriedPlus = currying(plus, 3);

// Curried function accepts one and only one argument.
// It may return a new curried function, or the result returned by the original function.
curriedPlus(1);       // RETURN a new function.
curriedPlus(1)(2);    // RETURN a new function.
curriedPlus(1)(2)(3); // RETURN 6.
```

ATTENTION: __Although *Currying* and *Partial Application* are mutually related, they are DIFFERENT.__ If you wanna create a new function which is based on an existing function and with some arguments predefined, use __[papply](#papply).

Read more about *currying*:
*   WIKIPEDIA.org, [Currying](https://en.wikipedia.org/wiki/Currying)
*   WIKIPEDIA.org, [Lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus)

### defineError

*   Function __defineError__( string *ErrorName*, Function *ParentErrorClass*, Function *constructor* )

E.g.
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

### forInObject

*   void __forInObject__( object *foo*, Function *iterator* )  
    Function *iterator* SHOULD accept two arguments. 
    
E.g. 
```javascript
const forInObject - require('jinang/forInObject');
forInObject({ name: 'YounGoat' }, (name, value) {
    console.log(name);
    console.log(value);
});
```

### jointString

*   string __jointString__( string *joint*, string *str_1*, string *str_2*, ...)  
    Concatenate strings with *joint*. If the end of the front string or the beginning of the rear one equals to *joint*, it will be trimmed before being concatenated.

E.g.
```javascript
const jointString = require('jinang/jointString');
jointString('/', 'a/', '/b');
jointString('/', 'a' , '/b');
jointString('/', 'a/',  'b');
jointString('/', 'a' ,  'b');
// All return 'a/b'.
```

### modifyUrl

*   string __modifyUrl__( string *urlname*, Object *options* )
*   string __modifyUrl.pathname__( string *urlname*, string *pathname*, char *flag* )
*   string __modifyUrl.protocol__( string *urlname*, string *protocol* )
*   string __modifyUrl.query__( string *urlname*, string|Object *query*, char *flag* )

### papply

Word "papply" is abbreviation of *Partial Application*, which means to apply a function to some of its arguments and return a new function with fewer parameters.

```javascript
const papply = require('jinang/papply');

// Suppose a function with three parameters.
function add(a, b, c) {
    return a + b + c;
}

// Run partial application and return a new function.
const add2 = papply(add, 2);
add2(3, 4); // RETURN 2 + 3 + 4

const add2_3 = papply(add, 2, 3);
add2_3(4); // RETURN 2 + 3 + 4
```

Read more about *partial application*:
*   WIKIPEDIA.org, [Partial application](https://en.wikipedia.org/wiki/Partial_application)
*   [Curry or Partial Application? The Difference Between Partial Application and Curry](https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8)
*   StackOverflow.com, [What is the difference between currying and partial application?](https://stackoverflow.com/questions/218025/what-is-the-difference-between-currying-and-partial-application)
*   2ality.com, [Currying versus partial application (with JavaScript code)](http://2ality.com/2011/09/currying-vs-part-eval.html)

### sleep

Make current process to "sleep" for a while.

```javascript
const sleep = require('jinang/sleep');

// Block the current process for 2000 milliseconds (2 seconds).
sleep(2000);
```

In `co(function*() { /* ... */ })` code block, `sleep.promise()` is recommended because it is more precise.
```javascript
const sleep = require('jinang/sleep');
const co = require('co');

co(function*() {
    yield sleep.promise(2000);
});
```

##  Why *jinang*

__jinang__ is an incubator for creatives which will make programming with Node.js much easier. 

##  Honorable Dependents

##  About

##  References