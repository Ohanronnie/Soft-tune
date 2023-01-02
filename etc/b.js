let con = require('./test.js');
async function myf(){
 try{
 let x = await con.pool.query('select * from data')
 console.log('Connected',x)
 }
 catch(err){
 throw err;
 }
}
myf()
