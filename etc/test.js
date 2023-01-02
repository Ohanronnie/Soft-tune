let mariadb = require('mariadb');
let pool = mariadb.createPool({
  host: '0.0.0.0',
  port: 3306,
  user: 'root',
  password: '',
  database: 'mydb'
});
module.exports = Object.freeze({
  pool: pool
});
