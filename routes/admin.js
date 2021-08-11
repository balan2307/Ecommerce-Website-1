const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

/* GET users listing. */
router.get("/products", adminController.ViewProducts);
router.post(
  "/addProduct",
  adminController.AddToMulter,
  adminController.AddProducts
);
module.exports = router;
