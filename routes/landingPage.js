const express = require("express");
const router = express.Router();
const landingPageController = require("../controllers/landingPageController");

router.get("/", (req, res) =>
{
    res.render("landingPage", {
        message: req.flash("LandingPageMessages")
    });
})

router.post("/contactUs", landingPageController.ContactUs);

module.exports = router;