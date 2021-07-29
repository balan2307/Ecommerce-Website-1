const firebase=require('../config/firebaseInit');
const db=firebase.db;

module.exports.Index = (req, res) => {
  res.send("respond with a resource"); //test response  
}


//testing -function which adds a collection on db
module.exports.AddCollection=(req,res)=>
{
  
  console.log("adding collection");
  db.collection("shop").doc("shop1_furniture").set({
      store_name: "Vintage Room",
      store_owner:'Vighnesh Kadam',
      store_url:'',
      products:[],
      customer:[],
      orders:[]

     
  })

  res.send("Added collection")

}