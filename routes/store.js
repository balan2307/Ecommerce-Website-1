const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const firebase = require("../config/firebaseInit");
const db = firebase.db;
/* GET users listing. */
router.get("/", userController.Index);
const util = require('util')

/* Adding a collection for testing purpose */
router.get("/addstore", userController.AddCollection);



// Global store of wholeseller's products
router.get("/sell/wholesellproducts",userController.wholeProd)
// router.get("/shop/allproducts", (req, res) => {
//   res.render("store/allproducts.ejs");
// });

// router.get("/shop/:sid/getprod/:pid",userController.ProductDet)


// Storefront of Drop-shipper
router.get("/shop/:id", userController.StoreFront);

//Individual product page
router.get("/shop/:sid/product/:pid",userController.ProductPage)

// Get all products of a Drop-shipper
router.get("/shop/:sid/allproducts",userController.renderAllproducts)

// router.get("/shop/:id/addViews",()=>
// {
//     console.log("Adding views");
// })





module.exports = router;
