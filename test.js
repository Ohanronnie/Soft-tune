let express = require('express');
let app = express();
app.get('/',(req,res) => {
  res.redirect('/g');
  return;
  console.log(888)
})
app.get('/g',(req,res)=>{
  res.send('68744')
})
app.listen(3000)
