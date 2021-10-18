var express = require("express");
var router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const server_url = process.env.SERVER_URL;
const ordersController = require("../controllers/ordersController")
const firebase = require("../config/firebaseInit");
const { log } = require("debug");
const db = firebase.db;

/* GET home page. */
router.get("/success/:orderId", async function (req, res) {
    // db.collection("users")
    //   .doc("HLONOIS7dgj7s6Cqfdwn")
    //   .get()
    //   .then((result) => {
    //     //   console.log(JSON.stringify(result.data(), null, 2));
    //     const store = result.data();
    //     const { products } = store;
    //     products.find((prod) => {
    //       if (prod.productId === "37c2f043-1a2c-4c62-b1ce-99cbc8dadb8f") {
    //         prod.productInventory -= 1;
    //         return true;
    //       }
    //     });
    //     console.log(products);
    //     db.collection("users")
    //       .doc("HLONOIS7dgj7s6Cqfdwn")
    //       .set(
    //         {
    //           products: products,
    //         },
    //         { merge: true }
    //       )
    //       .then((result) => {
    //         console.log("product inventory updated in store orders");
    //       })
    //       .catch((err) => {
    //         console.log("Error in product inventory updation:", err);
    //       });
    //   });

    
  res.send("success");
});
router.get("/failure/:orderId", function (req, res) {
  res.send("failure");
});

router.post("/checkout/:storeId/:productId", ordersController.CreateCheckout);
router.post("/paymentDone", ordersController.OrderWebhook);

module.exports = router;
