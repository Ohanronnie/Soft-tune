let express = require('express');
let app = express();
let bodyparser = require('body-parser');
let parser = bodyparser.urlencoded({extended: false});
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: false}));
let formidable = require('formidable');
//show the file
app.get('/upload.html',function(req,res){
  res.sendFile(__dirname + '/upload.html')
});
//control the form
app.post('/upload',function(req,res){
  let form = new formidable.IncomingForm();
  form.parse(req,function(err,fields,files){
   let music = files.music;
   let cover = files.cover;
   let name = fields.name;
   let lyrics = fields.lyrics;
   let artist = fields.artist;
   let description = fields.description;
   let array = [music,cover,name,lyrics,artist,description];
   console.log(array)
 });
});
app.listen(8080)
