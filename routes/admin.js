const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

/* GET users listing. */
router.get("/products", adminController.ViewProducts);

module.exports = router;
