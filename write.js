'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , fs = require('fs')
    , path = require('path')
    
    /* NPM */
    
    /* in-package */

    /* in-file */
    , mkdirp = (pathname) => {
        // 如果目录已经存在，则什么都不需要做。
        if (!fs.existsSync(pathname)) {    
            // 如果上一级目录不存在，则递归创建之。
            var parent = path.resolve(pathname, '..');
            if (!fs.existsSync(pathname)) mkdirp(parent);    
            // 创建目录。
            fs.mkdirSync(pathname);
        }
    } 
    ;

function write(pathname, content, options) {
    let dirname = path.dirname(pathname);
    mkdirp(dirname);
    fs.writeFileSync(pathname, content);
}

module.exports = write;