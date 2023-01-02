const express = require('express');
const router = express.Router();
router.all('*',function(req,res){
    console.log('not %s','found')
//	res.redirect('/home')
});
module.exports = router;
