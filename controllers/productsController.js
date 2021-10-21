const fs = require("fs");
const { format } = require("util");
const sharp = require("sharp");
const bcrypt = require("bcrypt");
const isEqual = require("lodash.isequal");
const { v4: uuidv4 } = require("uuid");
const firebase = require("../config/firebaseInit");
const storage = firebase.storage;
const bucket = storage.bucket(process.env.FB_STORAGE_BUCKET);
const db = firebase.db;
const multer = require("multer");
const { name } = require("ejs");

//Multer Storage
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  // console.log(file.mimetype);
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb("Please upload only jpg/png images.", false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadFiles = upload.single("product-image");

module.exports.ViewProducts = async (req, res) => {
  // console.log(req.session);
  // const docID = "HwvSNn14iO9nmgD8KYNK";
  // const docID="RhFCCBIUACGgKWafIeJE";
  const docID = req.session.store.id;
  // const docID="y9BmOPQtcrhdb9mfkZHa";

  const store = await getStore(docID);
  const testProd=Array.from({length:25},()=>store.products).flat();

  

  res.render("admin/products-page", {
    message: req.flash("ProductsMessage"),
    products: store.products,
    docID:docID,
  });
};


module.exports.SingleProduct = async (req, res) => {
  // const docID = "HwvSNn14iO9nmgD8KYNK";
  const docID = req.session.store.id;
  const { productId } = req.params;
  const store = await getStore(docID);
  const { products } = store;
  const product = products.find((product) => product.productId == productId);
  // console.log(product);
  res.status(200).json({
    success: true,
    product: product,
  });
};

module.exports.AddToMulter = (req, res, next) => {
  uploadFiles(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err) {
        return res.send(err);
      }
    }
    next();
  });
};

module.exports.AddProducts = async (req, res) => {
  // console.log(req.body);
  // const docID = "HwvSNn14iO9nmgD8KYNK";
  const docID = req.session.store.id;
  addProducts(req, res, docID, "Product added successfully!",uuidv4());
  
};

module.exports.EditProducts = async (req, res) => {
  const { productId } = req.params;
  // const docID = "HwvSNn14iO9nmgD8KYNK";
  const docID = req.session.store.id;


  const store = await getStore(docID);
  const { products } = store;
  console.log(products);
  let productImageUrl, oldProduct;
  const product = products.filter((product) => {
    if (product.productId === productId) {
      productImageUrl = product.productImage;
      oldProduct = product;
    }
    return product.productId !== productId;
  });

  // console.log(product);
  console.log("productImageUrl", productImageUrl);
  // res.send(product)

  //checking if old and new data same
  let newProduct = req.body;
  newProduct.productPrice = newProduct.productPrice * 1;
  newProduct.productInventory = newProduct.productInventory * 1;
  newProduct.productImage = productImageUrl;
  newProduct.productId = productId;

  console.log(oldProduct);
  console.log(newProduct);
  console.log("oldProduct === newProduct", isEqual(oldProduct, newProduct));
  if (isEqual(oldProduct, newProduct)) {
    req.flash("ProductsMessage", "Product unchanged");
    res.redirect("/admin/products");
  } else {
    //deleting previous product
    db.collection("users").doc(docID).update({
      products: product,
    });
    console.log("Previous product deletion successfull");
    //checking if image is same
    if (!req.file) {
      const { productName, productStatus, productDescription } = req.body;
      const productPrice = req.body.productPrice * 1; //fastest way to convert to int
      const productInventory = req.body.productInventory * 1;
      const productObj = {
        productName,
        productPrice,
        productInventory,
        productStatus,
        productDescription,
        productId: productId,
        productImage: productImageUrl,
      };
      db.collection("users")
        .doc(docID)
        .update({
          products:
            firebase.firebase.firestore.FieldValue.arrayUnion(productObj),
        })
        .then(async (response) => {
          console.log("done");
          const store = await getStore(docID);

          // res.send("Product Update Successfull");
          // req.flash("ProductsMessage", "Product Update Successfull");
          // res.redirect("/admin/products");

          res.render("admin/products-page", {
            message: "Product Update Successfull",
            products: store.products,
          });
        });
    } else {
      const isImageDeletedFromCloud = deleteImageFromCloud(
        productImageUrl.split("/").slice(4).join("/")
      );
      console.log("isImageDeletedFromCloud", isImageDeletedFromCloud);
      if (isImageDeletedFromCloud) {
        addProducts(
          req,
          res,
          docID,
          "Product updated successfully!",
          productId
        );
      } else {
        console.log("Unable to delete image from cloud");
        res.send("Product update failed!");
        // req.flash("ProductsMessage", "Product update failed!");
        // res.redirect("/admin/products");
      }
    }
  }
};

module.exports.DeleteProduct = async (req, res) => {
  const { productId } = req.params;
  // const docID = "HwvSNn14iO9nmgD8KYNK";
  const docID = req.session.store.id;
  const store = await getStore(docID);
  const { products } = store;
  // console.log(products);
  // console.log(productId);
  let deletingProduct;
  deletingProduct = products.find((product) => product.productId === productId);
  console.log(deletingProduct);

  await db
    .collection("users")
    .doc(docID)
    .update({
      products:
        firebase.firebase.firestore.FieldValue.arrayRemove(deletingProduct),
    })
    .then((result) => {
      console.log("Product deleted successfully");
      console.log("Deleting product image");
      const isImageDeletedFromCloud = deleteImageFromCloud(
        deletingProduct.productImage.split("/").slice(4).join("/")
      );
      console.log("isImageDeletedFromCloud", isImageDeletedFromCloud);
      if (isImageDeletedFromCloud) {
        req.flash("ProductsMessage", "Product deleted successfully!");
        res.redirect("/admin/products");
      } else {
        console.log("Unable to delete image from cloud, trying again!");
        const isImageDeletedFromCloud = deleteImageFromCloud(
          deletingProduct.productImage.split("/").slice(4).join("/")
        );
      }
    })
    .catch((err) => {
      req.flash("ProductsMessage", "Product deletion failed");
      res.redirect("/admin/products");
    });
};;


const addProducts = async (req, res, docID, toastMessage,productId) => {
  const { productName, productStatus, productDescription } = req.body;
  const productPrice = req.body.productPrice * 1; //fastest way to convert to int
  const productInventory = req.body.productInventory * 1;
  const productObj = {
    productName,
    productPrice,
    productInventory,
    productStatus,
    productDescription,
    productId: productId,
  };

  // console.log(productObj);
  // console.log(req.file);
  let { buffer, originalname } = req.file;
  const timestamp = Math.floor(new Date().getTime() / 1000);
  originalname = originalname.trim().split(" ").join("-").split(".");
  originalname.pop();
  originalname = originalname[0]
  const ref = `./public/images/product-images/${timestamp}-${originalname}.jpeg`;
  // console.log(ref);
  //create file in folder
  fs.writeFileSync(ref, buffer);
  //compress file
  await sharp(ref)
    .jpeg({ quality: 60 })
    .toBuffer()
    .then(async (data) => {
      // console.log(data)
      // console.log(ref);
      const imageName = ref.slice(2); //since the original path contains a './' at the start
      const imageUrl = await uploadImage({
        originalname: imageName,
        buffer: data,
      });
      // console.log(imageUrl);
      productObj.productImage = imageUrl;
      db.collection("users")
        .doc(docID)
        .update({
          products:
            firebase.firebase.firestore.FieldValue.arrayUnion(productObj),
        });
      // res.send(toastMessage);
      req.flash("ProductsMessage", toastMessage);
      res.redirect("/admin/products");
    });
  //delete the file since it is stored in google cloud
  fs.unlink(ref, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    //file removed
    console.log(`${ref} file removed successfully`);
  });
};

const deleteImageFromCloud = (ref) => {
  try {
    bucket.file(ref).delete();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports.changeStatus=async (req,res)=>{
let docID = req.session.store.id;
const store = await getStore(docID);
 let {products}=store;
  products.forEach(product=>{
    if(product.productId==req.body.productId){
      product.productStatus=(req.body.status==="Active"?"Active":"Draft");
      return;
    }
  })

   store.products=products;
  db.collection("users").doc(docID).set(store)
  .then(() => {
  console.log("Document successfully written!");
  res.send("update successful");
  })
  .catch((error) => {
  console.error("Error writing document: ", error);
  });


 }
 module.exports.showCustomer=async (req,res)=>{
  const docID = req.session.store.id;
  const store = await getStore(docID);
  res.render("admin/customer",{
    customer:store.customer,
  })
  
  }
  module.exports.showCustomerDetails=async (req,res)=>{
    const docID = req.session.store.id;
    let index=parseInt(req.params.ind);
    const store = await getStore(docID);
    res.send(store.customer[index]);
    }
    module.exports.showOrderDetails=async (req,res)=>{
      const docID = req.session.store.id;
      let index=parseInt(req.params.ind);
      const orders = await db.collection("orders").where("storeId","==",docID).get()
      let storeOrders = [];
      orders.forEach(order=>storeOrders.push(order.data()));
      
      res.send(storeOrders[index].line_items);
      }

    module.exports.ViewOrders = async (req, res) => {
      const docID = req.session.store.id;
      const orders = await db.collection("orders").where("storeId","==",docID).get()
      let storeOrders = [];
      orders.forEach(order=>storeOrders.push(order.data()));

      res.render("admin/orders-page", {
        message: req.flash("ProductsMessage"),
        orders: storeOrders,
        docID:docID,
      });
    };
      


const getStore = async (docID) => {
  // const docID = "HwvSNn14iO9nmgD8KYNK";
  // const docID = req.session.store.id;
  return new Promise((resolve, reject) => {
    db.collection("users")
      .doc(docID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          const store = doc.data();
          resolve(store);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          reject(new Error("No such document!"));
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
        reject(new Error(error));

      });
  })
  
};

const uploadImage = async (file) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;

    const blob = bucket.file(originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream
      .on("finish", () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      })
      .on("error", () => {
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });

//Direct Buffer Upload to Cloud
// const uploadDiskImage = async (file) => {
//   const { ref, buffer } = file;
//   const fileHandle = Bucket.file(ref);
//   const [fileExists] = await fileHandle.exists();
//   if (fileExists === false) {
//     return fileHandle.save(buffer);
//   }
//   return new Promise((resolve, reject) => resolve(ref));
// };

console.log(uuidv4());

