 let sql = require('./test.js');
//sql.pool.query('select * from data',function(err,result){
 //if(err) throw err;
 // console.log('connected',result)
//});
async function myf() {
try{
result = await sql.pool.query('SELECT * FROM data');
console.log(result)
}
catch(err){
console.log(err)
}
}
myf()
