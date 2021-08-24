const firebase = require("../config/firebaseInit");
const db=firebase.db;
const bcrypt = require("bcrypt");




module.exports.register = async (req, res) => {
    const { email, password, name, store_name } = req.body;
    const previousUser = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    console.log(previousUser.docs.length);
    try {
      if (previousUser.docs.length > 0) {
        req.flash("ferror", "User with this email already exists");
        res.redirect("/admin/register");
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const store = {
          email: email,
          password: hashedPassword,
          name: name,
          store_name: store_name,
          customer: [],
          orders: [],
          products: [],
          store_url: "",
        };
  
        const user = await db.collection("users").add(store);
  
        store.id = user.id;
        req.session.store = store;
        req.flash("success", "You have succesfully Registered!");
        res.redirect("/admin/dashboard");
      }
    } catch (error) {
      console.log(`Error while registering user: ${error}`);
      req.flash("ferror", "Some error occured");
      res.redirect("/admin/register");
    }
  };
  
  module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await db.collection("users").where("email", "==", email).get();
    try {
      const dbuser = user.docs[0];
      const store = dbuser.data();
  
      if (await bcrypt.compare(password, dbuser.data().password)) {
        store.id = dbuser.id;
        req.session.store = store;
        req.flash("success", "Welcome Back!");
        res.redirect("/admin/dashboard");
      } else {
        req.flash("ferror", "Entered Username or Password is Incorrect");
        res.redirect("/admin/login");
      }
    } catch {
      req.flash("ferror", "Entered Username or Password is Incorrect");
      res.redirect("/admin/login");
    }
  };
  
  module.exports.logout = (req, res) => {
    req.flash("success", "You are logged out!");
    req.session.destroy();
    res.redirect("/admin/login");
  };