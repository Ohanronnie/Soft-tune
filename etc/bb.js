let express = require('express');
let app = express();
app.set('view engine','ejs');
let user = {name: 'Helo world'};
let url = require('url');
app.get('/:id/:bb',function(req,res){
  console.log(req.params.id + ' ' + req.params.bb)
})
app.listen(8080)
