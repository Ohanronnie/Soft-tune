exports.mysql = function(){
  mysql = require('mysql');
  con = mysql.createConnection({
  host: 'mysql-90999-0.cloudclusters.net',
  user: 'admin',
  port: 13294,
  password: 'RDorj1Xm',
  database: 'mydb'
 });
};
