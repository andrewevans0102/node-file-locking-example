'use strict';

const lockfile = require('proper-lockfile');
const lockingUtility = require('../utility');

(async () => {
    try {
        // apply lock
        console.log('FIRST PROGRAM: locking file');
        await lockfile.lock(lockingUtility.exampleFile);

        // sleep to create condition where file is locked while second program running
        await lockingUtility.sleep(5000);

        // do work
        console.log('FIRST PROGRAM: writing to file');
        lockingUtility.writeFile(lockingUtility.exampleFile, 'FIRST');

        // release lock
        console.log('FIRST PROGRAM: release lock');
        await lockfile.unlock(lockingUtility.exampleFile);
    } catch (error) {
        console.log(error);
    }
})();
