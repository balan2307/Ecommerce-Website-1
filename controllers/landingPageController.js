const firebase = require("../config/firebaseInit");
const db = firebase.db;

module.exports.ContactUs = async (req, res) => {
    console.log(req.body);
    const { name, email, phone, message } = req.body;
    await db.collection("ContactUs").add({
        name,
        email,
        phone,
        message
    }).then((result) => {
        req.flash("LandingPageMessages","Contact Us form successfully submitted");
        res.redirect("/");
    }).catch((err) => {
        console.log(err);
        req.flash(
          "LandingPageMessages",
          "Some error occured"
        );
        res.redirect("/");
    });
};
