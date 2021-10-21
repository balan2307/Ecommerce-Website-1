var express = require("express");
var router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const server_url = process.env.SERVER_URL;
const ordersController = require("../controllers/ordersController")
const firebase = require("../config/firebaseInit");
const { log } = require("debug");
const db = firebase.db;

/* GET home page. */
router.get("/success/:orderId/:storeId", async function (req, res) {
  const storeId = req.params.storeId;
  const homeUrl = `/store/shop/${storeId}`
  res.render("success", { homeUrl });
});
router.get("/failure/:orderId/:storeId", function (req, res) {
  const storeId = req.params.storeId;
  const homeUrl = `/store/shop/${storeId}`;
  res.render("failure", { homeUrl });
});

router.post("/checkout/:storeId/:productId", ordersController.CreateCheckout);
router.post("/paymentDone", ordersController.OrderWebhook);
// testing failure and success pages
router.get("/failure", function (req, res) {
  console.log("failure");
  res.render("failure.ejs");
});

router.get("/success", function (req, res) {
  console.log("success");
  res.render("success.ejs");
});

module.exports = router;
