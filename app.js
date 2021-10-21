require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const InitRoutes = require("./routes/index");
const connectToFirebase = require("./config/firebaseInit");
const mongoDB_init = require("./config/mongoDB_init");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(require("flash")());

//Initializing MongoDB for session management
mongoDB_init();

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

//session
app.use(
  session({
    secret: "topSecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 2628000000,
    },
    store: store,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.ferror = req.flash("ferror");
  res.locals.user = req.session.store;
  // console.log("Current user ",res.locals.user)
  next();
});

//Initialize routes
InitRoutes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
