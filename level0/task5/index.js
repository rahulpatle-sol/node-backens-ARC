// 1. `ls` (Mac/Linux) ya `dir` (Windows) run karo → output print karo
// 2. `node --version` run karo → version print karo
// 3. Ek alag file `worker.js` banao → usme sirf `console.log('Worker running!')` likho
// 4. Main file se `worker.js` ko child process ke roop mein spawn karo

// exec() use karo commands ke liye
// spawn() use karo worker.js ke liye
// No npm, sirf child_process module

// simply  make it dynamic using a function

import { exec, spawn } from 'child_process';

const  runCommand=(command)=>{
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        console.log(`Output: ${stdout}`);
        console.error(`Error: ${stderr}`);
    });
}


//  connect the worker.js file using spawn

let worker=spawn('node', ['worker.js']);
worker.stdout.on('data', (data) => {
    console.log(`Worker output: ${data}`);
});
worker.stderr.on('data', (data) => {
    console.error(`Worker error: ${data}`);
});

// let run is commnd
runCommand('npm --version'); // For Mac/Linux
// runCommand('dir'); // For Windows
runCommand('node --version');