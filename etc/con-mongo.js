let url = "mongodb+srv://ohanronnieserver:2RNqRolJvJeaREiq@cluster0.3t6f6ty.mongodb.net/?retryWrites=true&w=majority";
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  let dbo = db.db('mydb');
  dbo.collection('customers').find({}).toArray(function(err,res){
    if(err) throw err;
    console.log('Inserted');
    console.log(res)
    db.close()
  })
});
