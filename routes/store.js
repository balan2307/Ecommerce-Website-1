const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get("/", userController.Index);

/* Adding a collection for testing purpose */
router.get("/addstore",userController.AddCollection);

module.exports = router;
