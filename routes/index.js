const express = require('express');
const usersRouter = require("./users");
const adminRouter = require('./admin');
const storeRouter = require('./store');
const landingRouter = require("./landingPage");

// const firebase = require('../config/firebaseInit');
// const db = firebase.firestore();/
const db = require('../config/firebaseInit');

const InitRoutes = (app) => {
  /* GET home page. */
  app.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
  });
  app.get("/home",(req, res) =>
  {
    res.render("landingPage.ejs");
  });
  app.get("/test", function (req, res, next) {
    res.render("test");
  });



  app.use("/users", usersRouter);
  app.use("/admin", adminRouter);
  app.use("/store",storeRouter);
  app.use("/",landingRouter);

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
