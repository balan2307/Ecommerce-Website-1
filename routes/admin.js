const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

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
.post(adminController.register)

router.route('/login')
.get((req,res)=>res.render('admin/login'))
.post(adminController.login)

router.get('/logout',adminController.logout)
router.get('/test',(req,res)=>
{
    res.send(req.session);
})

module.exports = router;
