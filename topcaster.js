const express = require('express');
const router = express.Router();
router.post('/',function(req,res){
	let [insert,select,setdata] = [req.opt.insert,req.opt.select,req.opt.setdata];
	const mostStreamedUser = [];
	let topStreamed = [];
    select('music','many',{},function(err,result){
		result = result.sort((a,b) => b.musicDetails.streams - a.musicDetails.streams);
		for(let i of result){
			select('user','one',{mail: i.user},function(err,resp){
				mostStreamedUser.push(resp)
				if(result.indexOf(i) === result.length - 1){
					//topStreamed = [...new Set(mostStreamedUser)];
					for(let j of mostStreamedUser){
						if(topStreamed.indexOf(topStreamed.find((value) => value.mail === j.mail)) == -1) {
						      topStreamed.push(j);
						    }
					}
					res.json(topStreamed)					
				}
			})
		}
   	/*if(err) console.log(err);
   	console.log(result)*/
   });
   //res.json([])
});
module.exports = router;
