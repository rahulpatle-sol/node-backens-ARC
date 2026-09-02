import pool from "./db/index.js";

const result=await pool.query('SELECT * FROM users');
console.log(result.rows);
