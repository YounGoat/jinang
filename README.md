#	jinang
__Collection of Node.js / ECMAScript Mini Modules__

[![coverage status of github.com/YounGoat/jinang](https://img.shields.io/coveralls/YounGoat/jinang/master.svg)](https://coveralls.io/github/YounGoat/jinang2?branch=master)
[![build status of github.com/YounGoat/jinang](https://travis-ci.org/YounGoat/jinang.svg?branch=master)](https://travis-ci.org/YounGoat/jinang)
[![total downloads of jinang](https://img.shields.io/npm/dt/jinang.svg)](https://www.npmjs.com/package/jinang)
[![jinang's License](https://img.shields.io/npm/l/jinang.svg)](https://www.npmjs.com/package/jinang)
[![latest version of jinang](https://img.shields.io/npm/v/jinang.svg)](https://www.npmjs.com/package/jinang)

The name *jinang* is abbreviation of "Jin-Nang", which in chinese means a magic box. The modules in *jinang* are independent for each other, and are for different usage.

__jinang__ is an incubator. Successful sub modules may be encouraged to be published as independent NPM packages.

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

All sub-modules in __jinang__ are independent from each other. Use `require('jinang/<subModuleName>')` to require the sub-modules.

For your convenience, avaiable modules included in *jinang* are listed here,

*   [absorb](#absorb)
*   [cloneObject](#cloneobject)
*   [currying](#currying)
*   [defineError](#defineerror)
*   [Directory](#directory)
*   [forInObject](#forinobject)
*   [jointString](#jointstring)
*   [JsonFile](#jsonfile)
*   [modifyUrl](#modifyurl)
*   [papply](#papply)
*   [parseOptions](#parseoptions)
*   [PoC](#poc)
*   [Progress](#progress)
*   [safeClone](#safeclone)
*   [sleep](#sleep)
*   [split](#split)

### absorb

*   number __absorb__( Array foo, Array bar )

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

ATTENTION: __Although *Currying* and *Partial Application* are mutually related, they are DIFFERENT.__ If you wanna create a new function which is based on an existing function and with some arguments predefined, use __[papply](#papply)__.

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

### Directory

*   class       __Directory__( string *homepath* )
*   void        __\<instance\>.append__ ( string *filename*, string | Buffer *data* )
*   ReadStream  __\<instance\>.createReadStream__  ( string *filename* [, object *options* ] )
*   WriteStream __\<instance\>.createWriteStream__ ( string *filename* [, object *options* ] )
*   boolean     __\<instance\>.exists__ ( string *filename* )
*   void        __\<instance\>.mkdir__  ( string *pathname* )
*   number      __\<instance\>.open__   ( string *pathname*, string *flags* )
*   void        __\<instance\>.read__   ( string *filename*, string | Buffer *encoding* )
*   string      __\<instance\>.resolve__( string *filename* )
*   void        __\<instance\>.rmfr__   ( string *filename* )
*   void        __\<instance\>.write__  ( string *filename*, string | Buffer *data* )

### forInObject

*   void __forInObject__( object *foo*, Function *iterator* )  
    Function *iterator* SHOULD accept two arguments. 
    
E.g. 
```javascript
const forInObject = require('jinang/forInObject');
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

### JsonFile

*   class __JsonFile__( string *pathname* )
*   object __\<instance\>.json__  
    Handle to read/write JSON data.
*   void __\<instance\>.save__()
*   void __\<instance\>.remove__()

### modifyUrl

*   string __modifyUrl__( string *urlname*, Object *options* )
*   string __modifyUrl.pathname__( string *urlname*, string *pathname*, char *flag* )
*   string __modifyUrl.protocol__( string *urlname*, string *protocol* )
*   string __modifyUrl.query__( string *urlname*, string|Object *query*, char *flag* )

### papply

Word "papply" is abbreviation of *Partial Application*, which means to apply a function to some of its arguments and return a new function with fewer parameters.

__papply__ offers three styles:
*   Function __papply__(Function *fn*, any *leading_argument*, ...)  
    Create a new function based on *fn* with leading arguments predefined by any number of *leading_argument*.
    
*   Function __papply.tail__(Function *fn*, any *tailing_argument*, ...)  
    Create a new function based on *fn* with tailing arguments predefined by any number of *tailing_argument*. The last *tailing_argument* will also be the last argument finally passed into *fn*.

*   Function __papply.position__(Function *fn*, [ number *position*, any *value* ] *positioned_argument*, ...)  
    Create a new function based on *fn* with some position(s) of argument list predefined by any number of *positioned_argument*.   
    The final arguments passed into *fn* will be the shortest list which contains all positioned arguments and real arguments. Sometimes the final arguments will be tailed with one or more `undefined`.  
    If *position* is 0 or positive integer, it indicates the position from left (starts with 0). Otherwise, if *position* is negative integer, it indicates the position from right (starts with -1).

```javascript
const papply = require('jinang/papply');

// -- papply --

// Suppose a function with three parameters.
function add(a, b, c) {
    return a + b + c;
}

// Run partial application and return a new function.
const add2 = papply(add, 2);
add2(3, 4); // RETURN 2 + 3 + 4

const add2_3 = papply(add, 2, 3);
add2_3(4); // RETURN 2 + 3 + 4

// -- papply.tail --

function minus(a, b, c) {
    return a - b*1 - c*2;
}

const minus2 = papply.tail(minus, 2);
minus2(9, 3); // RETURN 9 - 3 - 2*2 = 2

const minus2_3 = papply.tail(minus, 2, 3);
minus2_3(9); // RETURN 9 - 2 - 3*2 = 1

// -- papply.position --

function join() {
    let args = Array.from(arguments);
    let chars = args.map(n => typeof n == 'undefined' ? '-' : n);
    return chars.join('');
}

const join_z = papply.position(join, [ -1, 'z' ]);
join_z('a');
```

Read more about *partial application*:
*   WIKIPEDIA.org, [Partial application](https://en.wikipedia.org/wiki/Partial_application)
*   [Curry or Partial Application? The Difference Between Partial Application and Curry](https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8)
*   StackOverflow.com, [What is the difference between currying and partial application?](https://stackoverflow.com/questions/218025/what-is-the-difference-between-currying-and-partial-application)
*   2ality.com, [Currying versus partial application (with JavaScript code)](http://2ality.com/2011/09/currying-vs-part-eval.html)

### parseOptions

To normalise options argument.

```javascript
const parseOptions = requrie('jinang/parseOptions');

const options = {
    Domain: 'www.example.com',
    port: 8080,
    path: '/index.html',
};

const def = {
    // Whether the property names of *options* are case sensitive.
    // DEFAULT false
    caseSensitive: false,

    // If set true, properties not explicitly declared will be ignored.
    // DEFAULT false
    explicit: true,

    // Declare properties in *options*.
    columns: [ 
        'port', 
        { name: 'hostname', alias: 'domain' } 
    ],
};

const po = parseOptions(options, def);
// RETURN {
//     hostname: 'www.example.com',
//     port: 8080
// }
```

__parseOptions__ is an easy way to make your function paramemters more friendly. 

```javascript
function formatUrl(options) {
    
    const optionsDef = {
        caseSensitive: false, 
        explicit: true,

        // Property *columns* of definition may be an array or object.
        columns: [
            // Use object to define/declare a column.
            { name: 'protocol', default: 'http' },
            { name: 'query', alias: [ 'querystring', 'queries' ] },

            // Use description string to define/declare a column.
            'hostname required alias(domain, domainName)',

            // Only column name is also OK.
            'port',
            'path',
            'search',
            'hash'
        ]
    };

    options = parseOptions(options, optionsDef);

    // ...
}
```

### PoC

__PoC__ means *Promise or Callback*. It may be invoked in an asychronuous function to create an return an instance of `Promise` or to invoke the `callback` function if passed.

```javascript
const PoC = require('jinang/PoC');

function asyncDemo(params, callback) {
    return PoC((done) => {
        // ...
        done(error, data);
    }, callback);
};

asyncDemo(params)
    .then((data) => { /* ... */ })
    .catch((error) => { /* ... */ })
    ;

// When callback passed, PoC will return void.
asyncDemo(params, (error, data) => { /* ... */ });
```

### Progress

```javascript
const Progress = require('jinang/Progress');

const progress = new Progress();

// Progress inherits class events.EventEmitter.
progress.on('error', function(ex) {
    // ...
});
progress.emit('error', ex);

// Progress may send/change its signal via homonymous methods.
progress.on('signal', function(signal) {
    // ...
});
progress.abort();
```

*   class __Progress__
*   number __Progress.SIGABRT__
*   number __Progress.SIGHUP__
*   number __Progress.SIGINT__
*   number __Progress.SIGKILL__
*   number __Progress.SIGQUIT__
*   number __Progress.SIGTERM__

*   void __\<instance\>.raise__(number *signal* )
*   void __\<instance\>.signal__(number *signal*, Function *catcher*)

*   void __\<instance\>.abort__()  
    Send signal SIGABRT to progress and emit a *signal* event.
*   void __\<instance\>.hangup__()  
    Send signal SIGHUP to progress and emit a *signal* event.
*   void __\<instance\>.interrupt__()  
    Send signal SIGINT to progress and emit a *signal* event.
*   void __\<instance\>.kill__()  
    Send signal SIGKILL to progress and emit a *signal* event.
*   void __\<instance\>.quit__()  
    Send signal SIGQUIT to progress and emit a *signal* event.
*   void __\<instance\>.terminate__()  
    Send signal SIGTERM to progress and emit a *signal* event.

### safeClone

__safeClone__ is deep and partial clone method. The skeleton of the original argument will be kept and the primitive items or properties will be copied, while the complex values will be ignored. Whatever you do with the returned value, the original will not be affected.

```javascript
const safeClone = require('jinang/safeClone');

const foo = {
    a: undefined,
    b: null,
    c: 1,              // number
    d: 'foobar',       // string
    e: true,           // boolean
    f: function() {},  // function
    g: [ , , 2, ],     // Array
}

let bar = safeClone(foo);
bar.a === undefined;
bar.b === null;
bar.c === 1;
bar.d === 'foobar';
bar.e === true;
bar.hasOwnProperty('f') === false;
bar.g.length === 3;

// The original will not change when the cloned changed.
bar.g.pop();
foo.g.length === 3;
```

Read [unit test code](./test/safeClone.js) for more examples.

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

### split

Split string in different ways.

*   Array __split__(string *s*, string | RegExp *seperator*)  
    The first parameter is the string to be split.  
    *seperator* may be a string or a regular expression object.

*   Array __split__(string *s*, string | RegExp *seperator*, string | Array *delimiter*)  
    Substring enbraced by SAME *delimiter* will not be split. Each *delimiter* SHOULD be a character (1-length string).

*   Array __split__(string *s*, string | RegExp *seperator*, string | Array *delimiter*, string *escaper*)  
    

```javascript
const split = require('jinang/split');

split('foo bar baz', ' ');
// RETURN: [ "foo", "bar", "baz" ]

split('foo==bar==baz', '==');
// RETURN: [ "foo", "bar", "baz" ]

split('foo "bar baz"', ' ', '"');
// RETURN: [ "foo", "bar baz" ]

split('foo "bar\\"baz"', ' ', '"');
// RETURN: [ "foo", "bar\\"baz" ]
```

Read [unit test code](./test/split.js) for more examples.

##  Why *jinang*

__jinang__ is an incubator for creatives which will make programming with Node.js much easier. 

##  Honorable Dependents

##  About

##  References