##	jinang/parseOptions

To normalise options argument.

```javascript
const parseOptions = requrie('jinang/parseOptions');

const options = {
    Domain: 'www.example.com',
    Port: 8080,
    path: '/index.html',
};

const def = {
    // Whether the property names of *options* are case sensitive.
    // DEFAULT false
    caseSensitive: false,

    // Whether the property names of returned (parsed) object may keep the case 
    // as what column names look like, even *def.caseSensitive* is false.
    // DEFAULT false
    keepNameCase: false,

    // If set true, properties not explicitly declared will be ignored.
    // DEFAULT false
    explicit: true,

    // Declare properties in *options*.
    columns: [ 
        'port', 
        { name: 'Hostname', alias: 'domain' } 
    ],
};

const po = parseOptions(options, def);
// RETURN {
//     Hostname: 'www.example.com',
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

A column definition may be an object with following properties:
*   __name__ *string* 
*   __alias__ *string* | *string[]*
*   __default__ *any* OPTIONAL
*   __parser__ *Function* OPTIONAL
*   __required__ *boolean* DEFAULT `false` 
