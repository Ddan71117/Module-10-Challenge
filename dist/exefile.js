"use strict";
// import fs from 'fs';
// import pg from 'pg';
// import dotenv from 'dotenv';
// dotenv.config();
// const client = new pg.Client({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: 'localhost',
//   database: 'employee_db',
//   port: 5432,
// });
// const executeSQLFile = async (filePath: string): Promise<void> => {
//   try {
//     const sql = fs.readFileSync(filePath, 'utf8');
//     await pool.connect();
//     await client.query(sql);
//     console.log('SQL file executed successfully');
//   } catch (err) {
//     console.error('Error executing SQL file:', err);
//   } finally {
//     await client.end();
//   }
// };
// export default executeSQLFile;
