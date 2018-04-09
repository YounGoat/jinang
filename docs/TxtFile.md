##	jinang/TxtFile

```javascript
const TxtFile = require('jinang/TxtFile');

let tf = new TxtFile('/path/to/foobar.txt');

tf.getLineCount();

do {
    let line = tf.nextLine();
    if (line != null) {
        // ...
    }
    else {
        break;
    }
} while(true)
```

### API

*   class __TxtFile__( String *pathname* )
*   number __\<tf\>.getLineCount__()
*   string | null __\<tf\>.nextLine__()