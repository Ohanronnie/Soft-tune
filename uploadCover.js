let express = require('express');
let app = express();
let bodyparser = require('body-parser');                   let parser = bodyparser.urlencoded({extended: false});
let cookieparser = require('cookie-parser');
let multer = require("multer");
let authenticate = require('./authenticate.js');
let changeprofile = require('./uploadCover');              app.use(cookieparser());
app.use('/public',express.static('public'));
app.use(bodyparser.urlencoded({extended: false}));
app.set('view engine','ejs');
app.use('/music',express.static('my-uploads'));
app.use('/cover',express.static('profile-pics'));
app.use('/images',express.static('my-uploads'));
let formidable = require('formidable');
exports.load = () => {
let profileLocation = "";
const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'cover/')
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];                                             
    let y = 'OH-IMG' + '-' + uniqueSuffix + '.' + ext;
   //y.push({location: uniqueSuffix});
   // console.log(y);
    profileLocation = y;
    cb(null, 'OH' + '-' + uniqueSuffix + '.' + ext);
//    let buf = fs.readFileSync(`my-uploads/${file.fieldname}-${y}.${ext}`);
  }
});

const profileStore = multer({ storage: profileStorage });
console.log('xx');
app.post('/changeCover',profileStore.fields([{name: 'image-upload'}]),function(req,res){
  console.log('xyz');
  if(req.cookies.Login_data == undefined || req.cookies.Login_data == "undefined"){
    res.render('project/home/index',{
    message: 'You must login to continue'
 });
 }
 else{
   let username;
   let coverpath;
   let mail = decrypt(req.cookies.Login_data.user);
   let pass = decrypt(req.cookies.Login_data.pass);
   mongo.connect(url,function(err,db){
     if(err) throw err;
     let dbo = db.db('mydb');
     let query = {mail: mail, password: pass}
     console.log(query)
     dbo.collection('userdata').find(query).toArray(function(err,result){
       console.log(result)
       username = result[0].username;
       coverpath = result[0].userdata.coverPath;
       db.close();
  });
  });
   static = mail;
 }
   let data = {$set: {mail: static,
    username: username,
    "userdata.coverPath":`/cover/${profileLocation}`
   }};
   let olddata = {$set :{mail: static,
   username: username,
   "userdata.coverPath":coverpath
   }};
   console.log(data,olddata)
/*   fs.writeFile(`my-uploads/${img}`, cover, function(err){
     if(err) throw err;
   });*/
   mongo.connect(url,function(err,db){
      if(err) throw err;
      let dbo = db.db('mydb');
      dbo.collection('userdata').update(olddata,data,function(err,result){
        if(err) throw err;
        console.log('Done',result);
      });
    });
  });
  }

