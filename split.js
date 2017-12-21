'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    
    /* in-package */

    /* in-file */
    , extend_regexp = (re, options) => {
		options = Object.assign({
			global     : re.global,
			ignoreCase : re.ignoreCase,
			multiline  : re.multiline,
			source     : re.source
		}, options);

		var flags = '';
		if (options.ignoreCase) flags += 'i';
		if (options.multiline ) flags += 'm';
		if (options.global    ) flags += 'g';

        return new RegExp(options.source, flags);
    }
    ;
/**
 * @param  {string} s
 * @param  {string|string[]} seperator
 * @param  {string|RegExp} delimiter
 * @param  {string} escaper
 */
function split(
	/*String*/ s,
	/*String|RegExp*/ seperator,
	/*String*/ delimiter,
	/*String*/ escaper)
{
	let
		  parts = []
		, seperatorLength = seperator.length
        , reSeparator
        , delimiters = null
		, pre = ''
		, remainder = s
        , cc /* Current Character */
        , cd /* Current Delimiter */
		, holden = false
		, offset
        ;
        
    // ---------------------------
    // Arguments Validation

	if (seperator instanceof RegExp) {
		reSeparator = seperator.source.charAt(0) != '^'
			? extend_regexp(seperator, { source : '^(' + seperator.source + ')' })
			: seperator
			;
    }

    if (delimiter) {
        delimiters = (delimiter instanceof Array) ? delimiter : [ delimiter ];
        delimiters.forEach(d => {
            if (d.length > 1) throw new Error(`1-length delimiter expected, actual: ${d}`);
        });
    }
    
    // ---------------------------
    // Main Process

	do {
		// 处理定界符外的字符串。
		if (!holden) {
			var onSeperator = false;
			if (reSeparator) {
				if (onSeperator = reSeparator.test(remainder)) seperatorLength = RegExp.lastMatch.length;
			}
			else {
				onSeperator = remainder.substr(0, seperatorLength) == seperator;
			}

			if (onSeperator) {
				parts.push(pre);
				pre = '';
				offset = seperatorLength;
			}
			else {
                cc = remainder.charAt(0);
                
                holden = delimiters && delimiters.includes(cc);
                if (holden) cd = cc;
                
                // 定界符本身将被抛弃。
                if (!holden) pre += cc;

				offset = 1;
			}
		}

		// 处理定界符内的字符串。
		else {
			cc = remainder.charAt(0);
			if (cc == escaper) {
                // 逃逸字符本身将被抛弃。
				pre += remainder.charAt(1);
				offset = 2;
			}
			else {
				holden = (cc != cd);
                offset = 1;

                // 定界字符本身将被抛弃。
                if (holden) pre += cc;
			}
		}

		remainder = remainder.substr(offset);

	} while (remainder);

	parts.push(pre);
	return parts;
}

module.exports = split;