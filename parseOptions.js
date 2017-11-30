'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    
    /* in-package */
    ;

function parseColumn(desc) {
    let column = null;
    if (typeof desc == 'string') {
        let inParentheses = [];
        desc = desc.replace(/\([^)]+\)/g, (content) => {
            let index = inParentheses.length;
            inParentheses.push(content.substring(1, content.length - 1));
            return `#${index}`;
        });

        let parts = desc.split(/\s+/g);
        column = { name: parts[0] };
        
        let decos = parts.slice(1).map(deco => deco.toLowerCase());
        let notdeco = false;
        decos.forEach((deco) => {
            // NOT is keyword to decorate the following decorator.
            if (deco == 'not') {
                notdeco = true;
                return;
            }

            let argsText = null;
            if (/^(.+)#(\d)+$/.test(deco)) {
                deco = RegExp.$1;
                argsText = inParentheses[parseInt(RegExp.$2)];
            }

            if ([ 'required' /*, ... */ ].includes(deco)) {
                column[deco] = !notdeco;
            }
            else if ('alias' == deco) {
                column.alias = argsText.split(',').map(name => name.trim());
            }

            // Reset the NOT decorator.
            notdeco = false;
        });
    }
    else if (typeof desc == 'object') {
        column = desc;
    }
    return column;
}

/**
 * @param  {object}  options
 * @param  {object} [def]                      Definition of options
 * @param  {object} [def.caseSensitive=false]  If properties of *options* is case-sensitive.
 * @param  {object} [def.explicit=false]       If true, only properties defined in *def.columns* will be accepted.
 * @param  {object} [def.columns]
 * @param  {[]}     [def.columns]
 * 
 * ATTENTION: 
 * . Argument *def* itself is Case-Sensitive.
 */
function parseOptions(options, def) {
    // ---------------------------
    // Uniform arguments.

    def = Object.assign({
        caseSensitive : false,
        explicit      : false,
        columns       : [],
    }, def);

    if (!(def.columns instanceof Array)) {
        let columns = [];
        for (let name in def.columns) {
            let column = def.columns[name];
            column.name = name;
            columns.push(column);
        }
        def.columns = columns;
    }
    def.columns = def.columns.map(parseColumn);
        
    // ---------------------------
    // Main process.

    let outputOptions = null;

    if (!def.caseSensitive) {
        // Transform option names to lowercase if they are case-insensitive.
        let lowercaseOptions = {};
        for (const name in options) {
            lowercaseOptions[ name.toLowerCase() ] = options[name];
        }
        outputOptions = lowercaseOptions;
    } 
    else {
        // Clone the primitive options object.
        outputOptions = Object.assign({}, options);
    }

    if (1) {
        let definedOptions = {};
        
        // Extract property.
        let extractProperty = (name, definedName) => {
            if (!definedName) definedName = name;
            if (outputOptions.hasOwnProperty(name)) {
                definedOptions[definedName] = outputOptions[name];
                delete outputOptions[name];
                return true;
            }
            else {
                return false;
            }
        };

        for (let I = 0; I < def.columns.length; I++) {
            const column = def.columns[I];
            let propertyName = def.caseSensitive ? column.name : column.name.toLowerCase();
    
            let found = extractProperty(propertyName);
            if (!found && column.alias) {
                // If property not found, try alias if defined.
                let alias = column.alias instanceof Array ? column.alias : [ column.alias ];
                for (let i = 0; i < alias.length && !found; i++) {
                    // If there are more than one alias, the former in definition is prior.
                    found = extractProperty(alias[i], propertyName);
                }
            }

            if (!found && column.required) {
                throw new Error(`option required: ${column.name}`);
            }

            if (!found && column.default) {
                definedOptions[propertyName] = column.default;
            }

            if (found && column.parser) {
                definedOptions[propertyName] = column.parser(definedOptions[propertyName]);
            }
        }

        outputOptions = def.explicit ? definedOptions : Object.assign(definedOptions, outputOptions);
    }

    return outputOptions;
}

module.exports = parseOptions;