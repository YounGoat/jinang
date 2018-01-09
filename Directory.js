'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , fs = require('fs')
    , path = require('path')
    
    /* NPM */
    
    /* in-package */

    /* in-file */
    , trim = (name) => {
        // The homepath is the root of Directory.
        // Trim the leading seperator.
        if (name[0] == '/' || name[0] == '\\') {
            name = name.slice(1);
        }
        return name;
    }

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

    , rmfr = (pathname) => {
        if (fs.existsSync(pathname)) {
            if (fs.statSync(pathname).isDirectory()) {
                // 删除目录内容。
                fs.readdirSync(pathname).forEach(function(filename) {
                    rmfr(path.join(pathname, filename));
                })
    
                // 删除目录。
                fs.rmdirSync(pathname);
            }
            else {
                // 删除文件。
                fs.unlinkSync(pathname);
            }
        }
    }    
    ;

function Directory(pathname) {
    this.homepath = pathname;
}

Directory.prototype.append = function(name, data) {
    fs.appendFileSync(this.resolve(name), data);
    return;
};

Directory.prototype.createReadStream = function(name, options) {
    let realpath = this.resolve(name);
    mkdirp(path.dirname(realpath));
    return fs.createReadStream(realpath, options);
};

Directory.prototype.createWriteStream = function(name, options) {
    let realpath = this.resolve(name);
    mkdirp(path.dirname(realpath));
    return fs.createWriteStream(realpath, options);
};

Directory.prototype.exists = function(name) {
    return fs.existsSync(this.resolve(name));
};

Directory.prototype.mkdir = function(name) {
    let realpath = this.resolve(name);
    mkdirp(realpath);
    return;
};

Directory.prototype.open = function(name, flag) {
    let realpath = this.resolve(name);
    mkdirp(path.dirname(realpath));
    return fs.openSync(realpath, flag);
};

Directory.prototype.read = function(name, encoding) {
    return fs.readFileSync(this.resolve(name), encoding);
};

Directory.prototype.resolve = function(name) {
    name = name.toString();
    return path.resolve(this.homepath, trim(name));
};

Directory.prototype.rmfr = function(name) {
    rmfr(this.resolve(name));
    return;
};

Directory.prototype.write = function(name, data) {
    fs.writeFileSync(this.resolve(name), data);
    return;
};

module.exports = Directory;