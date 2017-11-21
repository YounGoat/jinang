'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , child_process = require('child_process')
    , os = require('os')
    
    /* NPM */
    
    /* in-package */
    ;

function sleep(milliseconds) {
    const platform = os.platform();
    
    if (platform == 'win32') {
        let ret = child_process.spawnSync('powershell', [ '-command', `start-sleep -milliseconds ${milliseconds}` ]);
        if (ret.error) {
            throw new Error('Command powershell is not ready.');
        }
        return true;
    }

    if (platform == 'linux' || platform == 'darwin') {
        let seconds = milliseconds / 1000;
        child_process.execSync(`sleep ${seconds}`);
        return true;
    }

}

sleep.promise = function(milliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(true), milliseconds);
    });
};

module.exports = sleep;