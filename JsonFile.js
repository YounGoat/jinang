'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , fs = require('fs')
    , path = require('path')
    
    /* NPM */
    
    /* in-package */

    /* in-file */
    , mkdirp = (pathname) => {
        if (!fs.existsSync(pathname)) {
            mkdirp(path.dirname(pathname));
            fs.mkdirSync(pathname);
        }
    }
    ;

function JsonFile(pathname, options) {
    this.pathname = pathname;
    this.options = Object.assign({}, options);

    if (fs.existsSync(pathname)) {
        let json = fs.readFileSync(pathname);
        this.json = json.length > 0 ? JSON.parse(json) : {};
    }
    else {
        this.json = {};
    }
}

JsonFile.prototype.save = function() {
    // Stringify.
    let jsonText = JSON.stringify(this.json, null, 4);
   
    // Make sure the parent directory has already existed.
    mkdirp(path.dirname(this.pathname));

    // Save strinfied text.
    fs.writeFileSync(this.pathname, jsonText);
};

JsonFile.prototype.remove = function() {
    if (fs.existsSync(this.pathname)) {
        fs.unlinkSync(this.pathname);
    }
};

module.exports = JsonFile;