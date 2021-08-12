const firebase=require('../config/firebaseInit');
const db=firebase.db;

module.exports.Index = (req, res) => {
  res.send("respond with a resource"); //test response  
}


//testing -function which adds a collection on db
module.exports.AddCollection=async(req,res)=>
{
  
  console.log("adding collection");
  db.collection("shop").add({
      store_name: "Test Store_2",
      store_owner:'Test2',
      store_url:'testStore',
      products:[],
      customer:[],
      orders:[]

     
  })
  // const del =await db.collection('shop').doc('aRbYm09LhjT8JqpT1BMO').delete();

  res.send("Added collection")

}