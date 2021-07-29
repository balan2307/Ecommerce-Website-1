const firebase=require('../config/firebaseInit');
const db=firebase.db;

module.exports.Index = (req, res) => {
  res.send("respond with a resource"); //test response  
}