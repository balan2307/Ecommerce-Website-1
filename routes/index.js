const express = require('express');
const usersRouter = require("./users");
// const firebase = require('../config/firebaseInit');
// const db = firebase.firestore();/
const db = require('../config/firebaseInit');

const InitRoutes = (app) => {
  /* GET home page. */
  app.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
  });

  app.use("/users", usersRouter);

  console.log("Routes Initialized")
}


module.exports = InitRoutes;
