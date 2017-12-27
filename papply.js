'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    
    /* in-package */

    /* in-file */

    // Get the last item of the array.
    , last = (arr) => arr[arr.length - 1]

    ;

function papply(fn /* , predefined_argument, ... */) {
    let predetermined = Array.from(arguments).slice(1);
    return function() {
        let remainders = Array.from(arguments);
        let args = predetermined.concat(remainders);
        return fn.apply(this, args);
    };
}
papply.tail = function(fn /*, predefined_tail_argument, ... */ ) {
    let predetermined = Array.from(arguments).slice(1);
    return function() {
        let remainder = Array.from(arguments);
        let args = remainder.concat(predetermined);
        return fn.apply(this, args);
    };
};

papply.position = function(fn /* , [ index, value ], ... */ /*|*/ /*, index, value */ ) {
    // ---------------------------
    // 规范化预定位置参数。
    // predetermined := [ [index, value], ... ]
    
    let parsePositioned = (positioned) => {
        let parsed = null;
        if (positioned instanceof Array) {
            if (positioned.length == 2 && typeof positioned[0] == 'number') {
                parsed = positioned;
            }
        }
        else if (positioned && typeof positioned.index == 'number') {
            parsed = [ positioned.index, positioned.value ];
        }
        return parsed;
    };

    let predetermined = null;;
    if (!predetermined && arguments.length == 3) {
        let parsed = parsePositioned([arguments[1], arguments[2]]);
        if (parsed) {
            predetermined = [ parsed ];
        }
    }
    
    if (!predetermined && arguments.length == 2 && arguments[1] instanceof Array) {
        let positioneds = arguments[1];
        let parsedPositioneds = [];
        for (let i = 0, parsed; i < positioneds.length; i++) {
            parsed = parsePositioned(positioneds[i]);
            if (!parsed) {
                parsedPositioneds = null;
                break;
            }
            else {
                parsedPositioneds.push(parsed);
            }
        }
        if (parsedPositioneds) {
            predetermined = parsedPositioneds;
        }
    }

    if (!predetermined) {
        predetermined = [];
        for (let i = 1, parsed; i < arguments.length; i++) {
            parsed = parsePositioned(arguments[i]);
            if (!parsed) {
                throw new Error(`Invalid positioned arguments: ${arguments[i]}`);
            }
            predetermined.push(parsed);
        }
    }

    // ---------------------------
    // 预处理。

    // 正序参数。
    let stagedArgs = [], stagedAssigned = [], stagedSpaceCount = 0;

    // 排列正序参数的同时，提取逆序参数对，及获取最大逆序长度。
    let tailers = [], reverseLength = 0;
    predetermined.forEach((pair) => {
        let index = pair[0];
        let value = pair[1];
        // 将非负序号的预定义参数填入指定位置。
        if (index >= 0) {
            stagedArgs[index] = value;
            stagedAssigned[index] = true;
        }
        // 提取尾随参数。
        else {
            reverseLength = Math.max(reverseLength, -index);
            tailers.push(pair);
        }
    });
    for (let i = 0; i < stagedAssigned.length; i++) {
        stagedSpaceCount += stagedAssigned[i] ? 0 : 1;
    }

    // 逆序参数。
    let stagedArgsReverse = new Array(reverseLength);
    let tailerCount = tailers.length;
    tailers.forEach((pair) => {
        let index = reverseLength + pair[0];
        let value = pair[1];
        stagedArgsReverse[index] = value;
    });

    return function() {
        let combinedArgs = null;
        let passedArgs = Array.from(arguments);

        for (let offset = 0; !combinedArgs; offset++) {
            let l = stagedArgs.length + Math.max(0, tailerCount + passedArgs.length - stagedSpaceCount) + offset;
            if (stagedArgsReverse.length > l) continue;

            // 重新生成尾随参数组。
            let argsReverse = new Array(l - stagedArgsReverse.length).concat(stagedArgsReverse);
            
            let putin = true;
            argsReverse.forEach((value, index) => {
                putin = putin && !stagedAssigned[index];
            });

            if (putin) {
                let assigned = [].concat(stagedAssigned);
                argsReverse.forEach((value, index) => {
                    assigned[index] = true;
                });

                let realArgs = [];
                for (let i = 0; i < l; i++) {
                    if (!assigned[i]) realArgs[i] = passedArgs.shift();
                }
                combinedArgs = Object.assign([], stagedArgs, argsReverse, realArgs);
            }
        }

        return fn.apply(this, combinedArgs);
    };
};

module.exports = papply;