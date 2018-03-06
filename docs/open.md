##	jinang/open

To open a URL in browser. 

```javascript
const open = require('jinang/open');

// Open directly.
open('https://github.com/YounGoat/jinang');

// Transform and open.
open('git+https://github.com/YounGoat/jinang.git');
// open "https://github.com/YounGoat/jinang"
```

When repository url passed in, the homepage of the repository will be opened. For GitHub, GitHub gist, Bitbucket, or GitLab repositories, the same shortcut syntax which NPM supported (except the abbreviation without prefixed protocol name, which is regarded as a GitHub repository, e.g. "npm/npm") is also accepted here. E.g. (adapted from [docs.npmjs.com](https://docs.npmjs.com/files/package.json#repository)),
```javascript
open("github:user/repo");
// Open the homepage of GitHub repository "user/repo".

open("gist:11081aaa281");
// Open the page of a GitHubGist.

open("bitbucket:user/repo");
// Open the homepage of BitBucket repository "user/repo".

open("gitlab:user/repo");
// Open the homepage of GitLab repository "user/repo".
```

Finally, following protocols will be accepted and translated:
*   __bitbucket:__
*   __git+https:__
*   __git+http:__
*   __github:__
*   __gist:__
*   __gitlab:__

ATTHENTION：The protocol names are case insensitive.