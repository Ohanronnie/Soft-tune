'use strict';
require('dotenv').config();
let express = require('express');
let app = express();
let bodyparser = require('body-parser');
let parser = bodyparser.urlencoded({extended: false});
let cookieparser = require('cookie-parser');
let multer = require("multer");
let authenticate = require('./authenticate.js');
let changeprofile = require('./uploadCover');
let error_ = require('./notFound.js');
let cast = require('./topcaster.js');
app.use(cookieparser());
app.use('/public',express.static('public'));
app.use(bodyparser.urlencoded({extended: false}));
app.set('view engine','ejs');
app.use('/music',express.static('my-uploads'));
app.use('/cover',express.static('profile-pics'));
app.use('/images',express.static('my-uploads'));
let formidable = require('formidable');
//let url = "mongodb://localhost:27017"
let url = process.env.MONGO;
let mongo = require('mongodb').MongoClient;
let decrypt = text => {
   return Buffer.from(Buffer.from(Buffer.from(text,'base64').toString('utf-8'),'base64').toString('utf-8'),'base64').toString('utf-8')
}
let fs = require('fs');
function select(which,type,value,callback){
	mongo.connect(url,function(err,db){
        if(err) callback(err,false);
		let dbo = db.db('mydb');
		if(/user/i.test(which) == true){
			if(/many/i.test(type) == true){
		    	dbo.collection('userdata').find(value).toArray(function(err,result){
			    	callback(err,result)
		    	});
		    
			}
			else if(/one/i.test(type) == true){
				dbo.collection('userdata').findOne(value,function(err,result){
					callback(err,result)
				})
				
			}
			else{
				callback('No type specified or unknown type',null);
				
			}
		}
		else if(/music/i.test(which) == true){
			if(/many/i.test(type) == true){
		    	dbo.collection('musicList').find(value).toArray(function(err,result){
			    	 callback(err,result)
			    })
			    
			} 
	        else if(/one/i.test(type) == true){
			    dbo.collection('musicList').findOne(value,function(err,result){
			         callback(err,result)
	            })
	           
	        }
		    else{
		        callback('No type specified or unknown type',null)
		        
			}
		}
		else{
			callback('You didnt specify the type of database to select from',null);
			db.close()
		}
	})
};
function insert(which,type,value,callback){
        mongo.connect(url,function(err,db){
        if(err) callback(err,false);
                let dbo = db.db('mydb');
                if(/user/i.test(which) == true){
                        if(/many/i.test(type) == true){
                        dbo.collection('userdata').insertMany(value,function(err,result){
                                callback(err,result)
                        });

                        }
                        else if(/one/i.test(type) == true){
                                dbo.collection('userdata').insertOne(value,function(err,result){
                                        callback(err,result)
                                })

                        }
                        else{
                                callback('No type specified or unknown type',null);

                        }
                }
                else if(/music/i.test(which) == true){
                        if(/many/i.test(type) == true){
                        dbo.collection('musicList').insertMany(value,function(err,result){
                                 callback(err,result)
                            })

                        }
                else if(/one/i.test(type) == true){
                            dbo.collection('musicList').insertOne(value,function(err,result){
                                 callback(err,result)
                    })

                }
                    else{
                        callback('No type specified or unknown type',null)

                        }
                }
                else{
                        callback('You didnt specify the type of database to insert to',null);
                        db.close()
                }
        })
 };
 function setData(which,type,query){
 	select(type,'one',query,function(err,result){
 	    console.log(result)
        eval(`result.${which}`);
        result = {$set: result };
        console.log(result)
        select(type,'one',query,function(err,results){
        	 mongo.connect(url,function(err,db){
                 if(err) throw err;
                 let dbo = db.db('mydb');
		 console.log(result)
                 console.log(results)
                 dbo.collection('musicList').updateOne(results,result,function(err,result){
                 	if(err) throw err;
                     console.log('done');
                     db.close();
                 });
            });
        })
 	})
 };
/*insert('music','one',{hello: 'hi'},function(err,result){
	if(err) console.log(err);
	console.log(result)
})*/
/*select('music','many',{},function(err,result){
    if(err) console.log(err);
	console.log(result);
})*/
//show the file
let location = '';
let profilelocation = '';
let staticUser = (req,res) => {
  if(req.cookies.Login_data == undefined || req.cookies.Login_data == "undefined"){
    res.render('project/home/index',{
    message: 'You must login to continue'
 });
 }
 else{
   let mail = decrypt(req.cookies.Login_data.user);
   let pass = decrypt(req.cookies.Login_data.pass);
     let query = {mail: mail, password: pass}
     console.log(query)
     select('user','one',query,function(err,result){
     if(result.length != 0){
/*       console.log(result[0].username)
       return result[0].username;*/
       return;
       }
       else{
       	res.redirect('/login');
       	return;
       }
  })
}
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'my-uploads/')
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let y = 'OH' + '-' + file.fieldname.toUpperCase() + '-' + uniqueSuffix + '.' + ext;
   //y.push({location: uniqueSuffix});
   // console.log(y);
    location = y;
    cb(null, 'OH' + '-' + file.fieldname.toUpperCase() + '-' + uniqueSuffix + '.' + ext);
//    let buf = fs.readFileSync(`my-uploads/${file.fieldname}-${y}.${ext}`);
  }
})

const upload = multer({limits: {fieldSize: 10000 * 1024 * 1024 }, storage: storage })
app.get('/upload.html',function(req,res){
  res.render('project/home/upload',{
  message: '/music/music-1667320517465-27894618.mpeg'
  });
}); 
//control the form
app.post('/upload',upload.fields([{name: 'music',maxCount: 1},{name: 'cover', maxCount: 1}]),function(req,res){
   let static_user = "";
   let name = req.body.name;
   let lyrics = req.body.lyrics;
   let artist = req.body.artist;
   let description = req.body.description;
   console.log(req.body.metadata);
   let [cover,title,album,singer] = req.body.metadata[req.body.metadata.length - 1].split('[');
   try{
     title = title.split("|")[0];
   }
   catch(err){
     title = title
   }
   /* let array = [name,lyrics,artist,description,title,singer,album];
   console.log(array,location);
   */ if(title == null || title == "" || title == " "){
     title = name
   }
   else{
     title = title
   }
   if(album == null || album == "" || album == " "){
     artist = artist
   }
   else{
     artist = album
   }
   if(singer == null || singer == "" || singer == " "){
     singer = ''
   }
   else{
     singer = singer
   }
 if(req.cookies.Login_data == undefined || req.cookies.Login_data == "undefined"){
    res.render('project/home/index',{
    message: 'You must login to continue'
 });
 }
 else{
   let mail = decrypt(req.cookies.Login_data.user);
   let pass = decrypt(req.cookies.Login_data.pass);
   let query = {mail: mail, password: pass}
     console.log(query)
     select('user','many',query,function(err,result){
       console.log(result)
       if(result.length != 0){
       static_user += result[0].username
       }
       else{
       	res.redirect('/login');
       	return;
       }
     });
     static_user = mail;
 }
   let img = Date.now()
   if(cover.length < 10){
    cover = fs.readFileSync('callbackimg');
   }
   if(artist == "" || artist == " "){
   	 artist = "Unknown"
   }
   if(title == "" || title == " "){
   	title = "Unknown"
   }
   if(album == "" || album == " "){
   	album = "Unknown"
   }
   let data = {user: static_user,
    location: location,
    artist: artist,
    title: title,
    album: singer,
    description: description,
    lyrics: lyrics,
    cover: img,
    musicDetails: {
     streams: 0,
     popularity: 0,
     rating: 0
     }
   }
   console.log(data)
   fs.writeFile(`my-uploads/${img}`, cover, function(err){
     if(err) throw err;
   });
   insert('music','one',data,function(err,result){
        if(err) throw err;
        console.log('Done',result);
   });
res.redirect('/home');
});
app.get('/login',function(req,res){
res.render('project/home/index',{
  message: ''
}) 
});
app.post('/index',function(req,res){
  let form = new formidable.IncomingForm();
  form.parse(req,function(err,fields,files){
   let email = fields.mail;
   let password = fields.password;
     mongo.connect(url,function(err,db){
        if(err) throw err;
        let dbo = db.db('mydb');
        let query = {mail: email, password: password} 
        select('user','many',query,function(err,result){
        if(err) throw err;
        console.log(result);
        if(result.length == 0){
        res.render('project/home/index',{
          message: 'Incorrect Password' 
       });	
      }
      else{
        let data = {
        user: Buffer.from(Buffer.from(Buffer.from(email,'utf-8').toString('base64'),'utf-8').toString('base64'),'utf-8').toString('base64'),
        pass: Buffer.from(Buffer.from(Buffer.from(password,'utf-8').toString('base64'),'utf-8').toString('base64'),'utf-8').toString('base64')
//        pass: Buffer.from(Buffer.from(Buffer.from(password,'utf-8'),'utf-8'),'utf-8').toString('base64')
        };
        let info = {
        maxAge: 1000 * 60 * 60 * 24 * 7
        }
        try{
        res.cookie('Login_data',data,info);
        }
        catch(err){
         throw err; 
        }/*,{
        maxAge: 1000 * 60 * 60 * 24 * 3,
        // expires works the same as the maxAge
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
        });*/
        //let logindata = btoa('Login-data');
       // console.log(req.cookies,logindata);
        console.log(req.cookies.Login_data)
        db.close(); 
        res.redirect('/home');
  };
   });
 });
  });
});
app.get('/home',function(req,res){
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
       console.log(result);
       if(result.length != 0){
       res.render('project/files/index',{
       user: result[0].username
    });
    }
    else{
    	res.redirect('/login');
    	return;
    }
    db.close();
  });
  });
 }
});
app.get('/signup',function(req,res){
  res.render('project/home/signup',{
  message: ''
});
});
app.post('/signin',function(req,res){
  let form = new formidable.IncomingForm();
  form.parse(req,function(err,fields,files){
    let username = fields.name;
    let password = fields.pass;
    let mail = fields.mail;
   mongo.connect(url,function(err,db){
    let dbo = db.db('mydb');
    dbo.collection('userdata').find({username: username}).toArray(function(err,result){
      console.log(result)
   });
   let data = {
     username: username,
     password: password,
     mail: mail,
     userdata: {
      subscribing: 0,
      subscriber: 0,
      description: '',
      musicAdded: 0,
      coverPath: '/cover/image.jpg',
      name: username,
      verified: false,
      golden: false
    },
    lastPlayed: []
   }
   dbo.collection('userdata').insertOne(data,function(err,result){
     if(err) throw err;
     console.log(data);
     console.log('ADDED TO DATABASE');
     res.render('project/home/index',{
     message: ''
     })
     db.close()
  });
 });
 });
});
app.get('/check',function(req,res){
    let data;
    if(req.query.data == undefined){
       data = ''
    }
    else{
       data = req.query.data
    }
    mongo.connect(url,function(err,db){
      if(err) throw err;
      console.log('Step 1');
      let dbo = db.db('mydb');
      dbo.collection('userdata').find({username: data}).toArray(function(err,result){
      if(err) throw err;
      if(data.length < 4){
      res.send(' ');
      db.close()
    }
    else{
      res.send(result);
      console.log(result)
      db.close()
    };
  });
});
});
app.get('/mail',function(req,res){
    let dat;
    if(req.query.mail == undefined){
       dat = ''
    }
    else{
       dat = req.query.mail
    }
      mongo.connect(url,function(err,db){
      if(err) throw err;
      console.log('Step 1');
      let dbo = db.db('mydb');
      dbo.collection('userdata').find({mail: dat}).toArray(function(err,result){
      if(err) throw err;
    if(dat.indexOf('@') == -1 || dat.indexOf('.') == -1){ 
     res.send(' ');
     db.close()
    }
    else{
     res.send(result);
     console.log(result)
     db.close()
    }
  });
});
});
app.get('/musicList',function(req,res){
   mongo.connect(url,function(err,db){
      if(err) throw err;
      console.log('Step 1');
      let dbo = db.db('mydb');
      dbo.collection('musicList').find({}).toArray(function(err,result){
      if(err) throw err;
      res.json(result)
  });
 });
});
app.get('/profile',function(req,res){
  let fs = require('fs');
//show the file
let location = '';
let staticUser = () => {
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
       console.log(result[0].username)
       return result[0].username;
    db.close();
  });
  });
  res.render('project/files/profile',{
  user: 'xyz'
 });
 }
}
staticUser()
})
app.get('/profileDetails',function(req,res){
   let mail = decrypt(req.cookies.Login_data.user);
   let pass = decrypt(req.cookies.Login_data.pass);
   mongo.connect(url,function(err,db){
     if(err) throw err;
     let dbo = db.db('mydb');
     let query = {mail: mail, password: pass}
     console.log(query)
     dbo.collection('userdata').find(query).toArray(function(err,result){
       console.log(result);
       res.json(result);
    db.close();
  });
  });
});
app.get('/update',function(req,res){
  res.render('project/files/update')
  authenticate.authenticate();
  staticUser(req,res);
});
app.get('/checkPass',function(req,res){
   let mail = decrypt(req.cookies.Login_data.user);
   let pass = req.query.pass;
   mongo.connect(url,function(err,db){
     if(err) throw err;
     let dbo = db.db('mydb');
     let query = {mail: mail, password: pass}
     console.log(query)
     dbo.collection('userdata').find(query).toArray(function(err,result){
       console.log(result);
       res.json(result);
    db.close();
  });
  });
});
app.post('/updateprofile',function(req,res){
   let form = new formidable.IncomingForm();
   form.parse(req,function(err,fields,files){
     let [name,bio,pass] = [fields.name,fields.bio,fields.password];
     console.log(name,bio,pass);
     let [originalpass,originalname,mail,originalDescrip] = ["","","",""];
     (() => {
     let mail = decrypt(req.cookies.Login_data.user);
     let pass = decrypt(req.cookies.Login_data.pass);
      mongo.connect(url,function(err,db){
     if(err) throw err;
     let dbo = db.db('mydb');
     let query = {mail: mail, password: pass}
     console.log(query)
     dbo.collection('userdata').find(query).toArray(function(err,result){
       console.log(result);
       resp = result;
     mail = resp[0].mail; originalname = resp[0].userdata.name; originalpassword = resp[0].password;
       db.close();
     console.log([originalname,originalpassword,mail,originalDescrip]);
     let oldvalue = {mail: mail,'userdata.description':originalDescrip, 'userdata.name':originalname,password: originalpassword}
     let query = {$set: {'userdata.name':name, 'userdata.description':bio,password: pass,mail: mail,}};
     mongo.connect(url,function(err,db){
      if(err) throw err;
      let dbo = db.db('mydb');
      dbo.collection('userdata').updateOne(oldvalue,query,function(err,result){
       if(err) throw err;
       console.log('done');
      });
    });
  });
 });
 })();
   });
});
let profileLocation = "";
const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'profile-pics/')
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let y = 'OH-IMG' + '-' + uniqueSuffix + '.' + ext;
   //y.push({location: uniqueSuffix});
   // console.log(y);
    profileLocation = y;
    cb(null, 'OH-IMG' + '-' + uniqueSuffix + '.' + ext);
//    let buf = fs.readFileSync(`my-uploads/${file.fieldname}-${y}.${ext}`);
  }
});

const profileStore = multer({ storage: profileStorage });
console.log('xx');
//change the cover/profile picture of the
app.post('/changeCover',profileStore.fields([{name: 'image-upload'}]),function(req,res){
  console.log('xyz');
   let static_user;
   let username;
   let coverpath;

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
       console.log(result)
       username = result[0].username;
       coverpath = result[0].userdata.coverPath;
       db.close();
   static_user = mail;
   let data = {$set: {mail: static_user,
    username: username,
    "userdata.coverPath":`/cover/${profileLocation}`
   }};
   let olddata = {mail: static_user,
   username: username,
   "userdata.coverPath":coverpath
   };
   console.log(data,olddata)
/*   fs.writeFile(`my-uploads/${img}`, cover, function(err){
     if(err) throw err;
   });*/
   mongo.connect(url,function(err,db){
      if(err) throw err;
      let dbo = db.db('mydb');
      dbo.collection('userdata').updateOne(olddata,data,function(err,result){
        if(err) throw err;
        console.log('Done',result);
        res.redirect('/profile');
        db.close();
      });
    });
});
});
}
  });
//increase the stream of the music
app.get('/stream',function(req,res){
	let position = req.query.position;
	console.log(position)
	let user = req.query.user;
	setData('musicDetails.streams += 1','music',{cover: Number(position)});
	select('music','one',{cover: Number(position)},function(err,result){
		console.log(result)
	})
});
//check the trending music
app.get('/trending',function(req,res){
	select('music','many',{},function(err,result){
		result.sort((a,b) => b.musicDetails.streams - a.musicDetails.streams);
		res.json(result)
	});
});
//check how popular the music's streams is greater than 10
app.get('/popular',function(req,res){
	select('music','many',{},function(err,result){
	    console.log(result);
		result.sort((a,b) => b.musicDetails.popularity - a.musicDetails.popularity)
                res.json(result)
	});
});
//increase the popularity
app.get('/incrPopular',function(req,res){
	let music = req.query.location;
	select('music','one',{location: music},function(err,result){
		if(result.musicDetails.streams >= 10){
	    	setData('musicDetails.popularity += 1','music',{location: music});			
		}
	})
});
app.get('/lastPlayed',function(req,res){
	let user = decrypt(req.cookies.Login_data.user);
	let pass = decrypt(req.cookies.Login_data.pass);
	let query = {mail: user,password: pass};
	let music = req.query.location;
    console.log(query);
	mongo.connect(url,function(err,db){
		let dbo = db.db('mydb');
		dbo.collection('userdata').updateOne(query,{$push: {"lastPlayed": music}},function(err,result){
			if(err) throw err;
			console.log(result)
		});
	});
});
app.get('/lastPlayedList',function(req,res){
		let user = decrypt(req.cookies.Login_data.user);
        let pass = decrypt(req.cookies.Login_data.pass);
        let query = {mail: user,password: pass};
        let music = req.query.location;
		let arr = [];
		select('user','many',query,function(err,result){
			for(let cover of result){
				for(let music of cover.lastPlayed){
				   select('music','one',{cover: Number(music)},function(err,resp){
				   	 arr.push(resp);
				   	 if(arr.length == cover.lastPlayed.length){
				   	 	res.json(arr)
				   	 console.log('Nwxtgjg %s',resp);
				   	 }
				   	 console.log(arr);
					 //if(.indexOf(res) == result.length - 1 && )
				   })
				}			
			}
			
		})
});
app.use('/topcaster',(req,res,next) => {
	req.opt = {
	select: select,
	insert: insert,
	setdata: setData
	 };
	next()
},cast);
//app.all('*',error_)
let PORT = process.env.PORT || 8080;
app.listen(PORT,() => {	
console.log(`Server is active at port ${PORT}`);
})

