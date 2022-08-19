'use strict';

const lockfile = require('proper-lockfile');
const lockingUtility = require('../utility');

(async () => {
    let checkFile = false;

    // sleep to create condition where file is locked by first program
    await lockingUtility.sleep(5000);

    // attempt to do this 10 times
    for (let i = 0; i < 9; i++) {
        console.log(`SECOND PROGRAM: attempt ${i} at file lock`);
        const checkFile = await lockfile.check(lockingUtility.exampleFile);
        try {
            if (checkFile) {
                console.log('SECOND PROGRAM: file is locked so wait a second');
                await lockingUtility.sleep(1000);
            } else {
                console.log('SECOND PROGRAM: file is free now');

                // aquire lock
                console.log('SECOND PROGRAM: locking file');
                await lockfile.lock(lockingUtility.exampleFile);

                // do work
                console.log('SECOND PROGRAM: writing to the file');
                lockingUtility.writeFile(lockingUtility.exampleFile, 'SECOND');

                // release lock
                console.log('SECOND PROGRAM: release lock');
                await lockfile.unlock(lockingUtility.exampleFile);

                // break out of loop
                break;
            }
        } catch (error) {
            console.log(error);
        }
    }

    // write out file contents to screen
    lockingUtility.outputFile(lockingUtility.exampleFile);
})();
