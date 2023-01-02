exports.authenticate = () => {
  console.log('xy')
  let fs = require('fs');
//show the file
let location = '';
let staticUser = (req,res) => {
  if(req.cookies.Login_data == undefined || req.cookies.Login_data == "undefined"){
    res.render('project/home/index',{
    message: 'You must login to continue'
 });
 }
 else{
   let mail = decrypt(req.cookies.Login_data.user);
   let pass = decrypt(req.cookies.Login_data.pass);
   mongo.connect(url,function(err,db){
     if(err) throw err;
     let dbo = db.db('mydb');
     let query = {mail: mail, password: pass}
     console.log(query)
     dbo.collection('userdata').find(query).toArray(function(err,result){
       console.log(result[0])
       location = result[0];
    db.close();
  });
  });
 }
}
}
