let db = require("./test.js");
// let sql = 'CREATE TABLE data(number VARCHAR(255), password VARCHAR(255), mail VARCHAR(255))'
 //let sql = 'create database mydb'
let sql = 'SELECT * FROM data';
let x = async () => {
  let result = await db.pool.query(sql)
  console.log(result)
}
x()
