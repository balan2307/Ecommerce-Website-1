var admin = require("firebase-admin");

var serviceAccount = require("./serviceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let db = admin.firestore(); //firestore connected
console.log("Connected to firebase Successfully");
module.exports = db;

