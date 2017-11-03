'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , querystring = require('querystring')
    , url = require('url')

    /* NPM */

    /* in-package */
    ;

/**
 * @param  {string}  urlname
 * @param  {string}  pathname
 * @param  {char}   [flag='w']   'a' means append, 'w' means write (wholly replace)
 */
function pathname(urlname, pathname, flag) {
    let info = url.parse(urlname);
    if (flag == 'a') {
        if (pathname) {
            info.pathname = `${info.pathname.replace(/\/$/, '')}/${pathname.replace(/^\//, '')}`;
        }
    }
    else {
        info.pathname = pathname;
    }
    return url.format(info);
}

/**
 * @param  {string} urlname
 * @param  {string} protocol
 */
function protocol(urlname, protocol) {
    let info = url.parse(urlname);
    if (!protocol.endsWith(':')) protocol = `${protocol}:`;
    info.protocol = protocol;
    return url.format(info);
}

/**
 * @param  {string}  urlname
 * @param  {string}  query       stringified querys
 * @param  {object}  query       parsed querys
 * @param  {char}   [flag='a']   'a' means append, 'w' means overwrite (wholly replace)
 */
function query(urlname, query, flag) {
    let info = url.parse(urlname);
    if (typeof query == 'string') query = querystring.parse(query);

    if (flag == 'w') {
        // DO NOTHING.
    }
    else {
        let oldQuery = querystring.parse(info.query);
        query = Object.assign(oldQuery, query);
    }

    delete info.search;
    info.query = query;
    return url.format(info);
}

/**
 * @param  {string}   urlname
 * @param  {object}   options
 * @param  {boolean} [ignoreUnidentifiableOptions]
 */
function modifyUrl(urlname, options, ignoreUnidentifiableOptions) {
    for (let key in options) {
        let fn = modifyUrl[key];
        let value = options[key];
        if (typeof fn == 'function') {
            let args = [ urlname ].concat(value instanceof Array ? value : [ value ]);
            urlname = fn.apply(null, args);
        }
        else if (!ignoreUnidentifiableOptions) {
            throw new Error(`unrecogonized option for modifyUrl: ${key}`);
        }
    }
    return urlname;
}

module.exports = Object.assign(modifyUrl, { pathname, protocol, query });
