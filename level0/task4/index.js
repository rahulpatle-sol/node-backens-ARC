// Buffers & Binary 
// Ek script jo Buffer use karke text ko binary mein convert kare aur wapas laaye.
// Ek script jo Buffer use karke text ko binary mein convert kare aur wapas laaye.
// 1. String → Buffer banao
// 2. Buffer ka hex aur base64 print karo
// 3. Buffer → wapas String mein convert karo
// 4. Do Buffers ko concat karo → ek naya Buffer
// 5. Final Buffer ka size (bytes) print karo

// let text = 'Hello, World!';
// let buffer=Buffer.from(text, 'utf-8');
// console.log('Buffer (hex):', buffer.toString('hex'));
// console.log('Buffer (base64):', buffer.toString('base64'));
// let baxckToString = buffer.toString('utf-8');
// console.log('Back to String:', baxckToString);
// let buffer2 = Buffer.from(' This is a test.');
//


// Buffers & Binary 
// Ek script jo Buffer use karke text ko binary mein convert kare aur wapas laaye.
// Ek script jo Buffer use karke text ko binary mein convert kare aur wapas laaye.
// 1. String → Buffer banao
// 2. Buffer ka hex aur base64 print karo
// 3. Buffer → wapas String mein convert karo
// 4. Do Buffers ko concat karo → ek naya Buffer
// 5. Final Buffer ka size (bytes) print karo
import { Buffer } from 'buffer';
// let text = 'Hello, World!';
// let buffer=Buffer.from(text, 'utf-8');
// console.log('Buffer (hex):', buffer.toString('hex'));
// console.log('Buffer (base64):', buffer.toString('base64'));
// let baxckToString = buffer.toString('utf-8');
// console.log('Back to String:', baxckToString);
// let buffer2 = Buffer.from(' This is a test.');
//  simply  make it dynamic using a function 







const convertBufferToString = (buffer) => {
    let backToString = buffer.toString('utf-8');
    console.log('Back to String:', backToString);
}

const convertTextToBuffer = (text1, text2) => {
  let buffer1 = Buffer.from(text1, 'utf-8');
  let buffer2 = Buffer.from(text2, 'utf-8');

  console.log('Buffer 1 (hex):', buffer1.toString('hex'));
  console.log('Buffer 1 (base64):', buffer1.toString('base64'));
  console.log('Buffer 2 (hex):', buffer2.toString('hex'));

  // concat karo
  let combined = Buffer.concat([buffer1, buffer2]);

  // wapas string
  convertBufferToString(combined);

  // size
  console.log('Final Buffer size (bytes):', combined.length);
}

convertTextToBuffer('Hello, World!', ' This is a test.');

