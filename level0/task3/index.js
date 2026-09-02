
// the code for onlt the emmiter not http 


import EventEmitter from 'events';

class MyEmitter extends EventEmitter {}

//  a simple logger system 
// event: 'request'  → log karo "New request received"
// event: 'error'    → log karo "Error occurred: <message>"
// event: 'shutdown' → log karo "Server shutting down..." then process.exit(0)

const myEmitter = new MyEmitter();

myEmitter.on('request', () => {
  console.log('New request received');
});

myEmitter.on('error', (message) => {
  console.log(`Error occurred: ${message}`);
});

myEmitter.on('shutdown', () => {
  console.log('Server shutting down...');
  process.exit(0);
});

myEmitter.emit('request');
myEmitter.emit('error', 'Something went wrong');
myEmitter.emit('shutdown');
