let express = require('express');
let app = express();
app.post('/xyz/abc',(req,res) => {
   console.log(req);
   console.log(777)
});
app.listen(8080)
