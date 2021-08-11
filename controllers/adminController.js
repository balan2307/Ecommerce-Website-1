const fs = require('fs');
const { format } = require("util");
const sharp = require('sharp');
const firebase = require('../config/firebaseInit');
const storage = firebase.storage;
const bucket = storage.bucket(process.env.FB_STORAGE_BUCKET);
const db = firebase.db;
const multer = require("multer");
const { name } = require('ejs');
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

module.exports.ViewProducts = (req, res) => {
  const docID = "L8OaH4J54q8rL7p5rxGo";
  db.collection("shop")
    .doc(docID)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        const { products } = doc.data();
        res.render("admin/products-page", {
          products: Array(100)
            .fill("")
            .map((_, i) => i % 2 === 0 ? products[0] : products[1]),
          // message: req.flash("ProductsMessage"),
          message:"Welcome to the Products Page"
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        res.status(500).send("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
      res.status(500).send("Error getting document! " + error);
    });
  // res.render("admin/products-page");
};

module.exports.AddToMulter = (req, res, next) => {
  uploadFiles(req, res, async(err) => {
    if (err instanceof multer.MulterError) {
      if (err) {
        return res.send(err);
      }
    } 
    next();
  }); 
};

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

module.exports.AddProducts = async (req, res) => {
  // console.log(req.body);
  const docID = "L8OaH4J54q8rL7p5rxGo";
  const { productName, productStatus, productDescription } = req.body;
  const productPrice = req.body.productPrice * 1;
  const productInventory = req.body.productInventory * 1;
  const productObj = {
    productName,
    productPrice,
    productInventory,
    productStatus,
    productDescription,
  };
  // console.log(productObj);
  
    let { buffer, originalname } = req.file;
    const timestamp = Math.floor(new Date().getTime() / 1000);
    originalname = originalname.trim().split(" ").join("-").slice(0,-4);
    const ref = `./public/images/product-images/${timestamp}-${originalname}.jpeg`;
    // console.log(ref);
    //create file in folder
    fs.writeFileSync(ref, buffer);
    //compress file
    await sharp(ref)
        .jpeg({ quality: 60 })
        .toBuffer()
        .then(async data => {
            // console.log(data)
            // console.log(ref);
            const imageName = ref.slice(2) //since the original path contains a './' at the start
            const imageUrl = await uploadImage({
              originalname: imageName,
              buffer: data,
            });
          // console.log(imageUrl);
          productObj.productImage = imageUrl;
          db.collection("shop")
            .doc(docID)
            .update({
              products:
                firebase.firebase.firestore.FieldValue.arrayUnion(productObj),
            });
          req.flash("ProductsMessage", "Product added successfully!");
          res.redirect("/admin/products");
        })
    //delete the file since it is stored in google cloud
    fs.unlink(ref, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      //file removed
        console.log(`${ref} file removed successfully`);
    });
}