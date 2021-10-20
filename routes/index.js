const express = require('express');
const usersRouter = require("./users");
const adminRouter = require('./admin');
const storeRouter = require('./store');
const isLoggedIn = require("../middlewares/user_auth");
const landingRouter = require("./landingPage");
const ordersRouter = require('./orders');
// const firebase = require('../config/firebaseInit');
// const db = firebase.firestore();/
const db = require('../config/firebaseInit');

const InitRoutes = (app) => {
  /* GET home page. */
  app.get("/",isLoggedIn, function (req, res, next) {
 
    
    
 
    res.render("index", { title: "Express" });
  });
  
  app.get("/test", function (req, res, next) {
    res.render("test");
  });




  app.use("/",landingRouter);
  app.use("/users", usersRouter);
  app.use("/admin", adminRouter);
  app.use("/store", storeRouter);
  app.use("/orders",ordersRouter)

  console.log("Routes Initialized")

  //Testing firebase
  
  // db.collection("cities")
  //   .doc("Mumbai")
  //   .set({
  //     name: "Mumbai",
  //     state: "Maharashtra",
  //     country: "India",
  //   })
  //   .then(() => {
  //     console.log("Document successfully written!");
  //   })
  //   .catch((error) => {
  //     console.error("Error writing document: ", error);
  //   });
  // db.collection("cities")
  //   .where("name","==","Mumbai")
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.id);
  //       console.log(doc.data());
  //       // console.log(`${doc.id} => ${doc.data()}`);
  //     });
  //   });
  // db.collection("cities")
  //   .doc("LA")
  //   .onSnapshot((doc) => {
  //     console.log("Current data: ", doc.data());
  //   });
}


module.exports = InitRoutes;
