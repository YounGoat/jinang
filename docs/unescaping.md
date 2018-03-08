##    jinang/unescaping

A tiny template render.

```javascript
unescaping(
    /* template/mask */
    'This is $name, $age years old.',

    /* escape character */
    '$', 

    /* fields */
    { name: 'YounGoat', age: 17 }
);
// RETURN "This is YounGoat, 17 years old."
```

Nothing to it. __jinang/unescaping__ accepts a consumer function for more flexible implemenations. The following is a simple example to display how it works:

```javascript
/**
 * @param {string} mask   - just raw template 
 * @param {number} cursor - position next to where escape char found
 * @return {string | Object | Array}
 */
function consumer(mask, cursor) {
    // Either the number in the 2-length returned array (at first or second),
    // or the "offset" property of the returned object,
    // means how many characters in the template should be replaced since 
    // position which argument `curosr` indicates.

    // The string in the 2-length returned array (at first or second),
    // or the "output" property of the returned object,
    // is what should be taken to replace the escaped characters.

    if (mask.startsWith('name', cursor)) {
        return [ 'YounGoat', 4 ];
    }

    if (mask.startsWith('age', cursor)) {
        return { output: '17', offset: 3 };
    }

    // Sometimes a string returned directly, 
    // indicating that only ONE character consumed.
    if (mask[cursor] == 'P') {
        return '.';
    }
}

unescaping('This is $name, $age years old$P', '$', consumer);
// RETURN "This is YounGoat, 17 years old."
```