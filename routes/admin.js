const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authController=require("../controllers/authController")

/* GET users listing. */
router.get("/products", adminController.ViewProducts);
router.get("/product/:productId",adminController.SingleProduct)
router.post(
  "/addProduct",
  adminController.AddToMulter,
  adminController.AddProducts
);

router.post("/editProducts/:productId", adminController.AddToMulter, adminController.EditProducts);

router.post("/deleteProducts/:productId", adminController.DeleteProduct);

router.route('/register')
.get((req,res)=>res.render('admin/register'))
.post(authController.register)

router.route('/login')
.get((req,res)=>res.render('admin/login'))
.post(authController.login)

router.get('/logout',authController.logout)
router.get('/test',(req,res)=>
{
    res.send(req.session);
})

module.exports = router;
