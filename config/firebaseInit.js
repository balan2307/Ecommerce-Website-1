var admin = require("firebase-admin");

var serviceAccount = require("./serviceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let db = admin.firestore(); //firestore connected
console.log("Connected to firebase Successfully");

let storage = admin.storage();
module.exports = {
  firebase:admin,
  db: db,
  storage:storage,
};

