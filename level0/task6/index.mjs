//  importing the log function from logger.mjs
import { log } from './logger.cjs';

// import math from 'mathjs';
import { add, subtract, multiply, divide } from './math.mjs'; // ✅



//  let use all of then




let result1=add(10,5);
let result2=subtract(10,5);
let result3=multiply(10,5);
let result4=divide(10,5);
const logs=log(`Addition: ${result1}, Subtraction: ${result2}, Multiplication: ${result3}, Division: ${result4}`);

