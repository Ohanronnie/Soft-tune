  /*const { MongoClient, ServerApiVersion } = require('mongodb');*/
const url = "mongodb+srv://ohanronnieserver:2RNqRolJvJeaREiq@cluster0.3t6f6ty.mongodb.net/?retryWrites=true&w=majority";
//const url = "mongodb://localhost:27017"
/*const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  if(err) throw err;
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/

var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  let dbo = db.db('mydb');
  let query = {}
/*  user: {
   hello: 'woeld',
   haffa: 'yes',
   go: {
   hi: 'go'
   }
   }
  }*/
 console.log(77)
  dbo.collection('userdata')/*.insertOne(query,*/.find({}/*{$addToSet: {"lastPlayed":""}}*/).toArray(function(err,res){
    if(err) throw err;
    console.log('Inserted');
    console.log(res)
    db.close()
  });
});
