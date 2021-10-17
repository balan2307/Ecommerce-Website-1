const firebase=require('../config/firebaseInit');
const db=firebase.db;
const fetch = require('node-fetch');

module.exports.Index = (req, res) => {
  res.send("respond with a resource"); //test response  
}

console.log("check");
//testing -function which adds a collection on db
module.exports.AddCollection=async(req,res)=>
{
  
  console.log("adding collection");
  db.collection("shop").add({
      store_name: "Test Store_2",
      store_owner:'Test2',
      store_url:'testStore',
      products:[],
      customer:[],
      orders:[]

     
  })
  // const del =await db.collection('shop').doc('aRbYm09LhjT8JqpT1BMO').delete();

  res.send("Added collection")

}

//Store front for Drop-shipper
module.exports.StoreFront=async (req, res) => {
  const { id } = req.params;
  console.log("now " + id);
  console.log("print data");
  let user={};
  let st_name;
  let data;
  role="drop-shipper"

  const store = await db
    .collection("users")
    .doc(id)
    .get()
    .then((docRef) => {
      data=docRef.data();
      user=data;
      st_name=data.store_name;
      
    })
    .catch((error) => {});


    const testProd=Array.from({length:25},()=>user.products).flat();
    // console.log("checking if",testProd);
    if(role=="drop-shipper" && testProd.length==0)
    {
      req.flash("ferror", "Your store doesn't have any products!");
      res.redirect('/');
    }
    
    

  res.render("store/dropshipper/storefront.ejs", {
    user,
    products: testProd,
    id,
    st_name,
    role,
  });
}

//Gloabal store for wholeseller's product
module.exports.wholeProd=async(req,res)=>
{
  // console.log("fetchiung wholesellers")


  let products;
  let st_name="Shoppers-Unite";
  let data;
  let testprod;
  let allproducts=[];
  let sid="HaZYZQ9fittGwKsZpoOR";
  let role="whole-seller";
  let id="";

  const store =await  db
  .collection("users")
  .where('role','==','whole-seller')
  .get()
  .then((docRef) => {
    docRef.docs.forEach(doc=>{
      data=doc.data()
      console.log("docu id",doc.id)
      products=data.products;
      products.forEach((prod)=>
      {
        prod.sid=doc.id;
      })
      // console.log(products);

      allproducts.push(...products)

    })

    }
    
  )
  testProd=Array.from({length:4},()=>allproducts).flat();
  res.render("store/dropshipper/allproducts.ejs",{products:testProd,st_name,role,id});

}

//Individual product page
module.exports.ProductPage=async(req,res)=>
{
  const {sid,pid}=req.params;
  let productFound;
  let st_name;
  let data;
  let role;
  return new Promise((resolve, reject) => {

  const store =  db
  .collection("users")
  .doc(sid)
  .get()
  .then((docRef) => {
    if(docRef.exists)
    {
    data=docRef.data()
    user=data.products;
    st_name=data.store_name;
    settings=data.settings;
    role=data.role;
    // console.log("setting check",settings);



    productFound=user.find((product) => product.productId === pid);

    if(productFound)
    {
      res.render("store/dropshipper/product.ejs",{product:productFound,st_name,id:sid,settings,role});
  
    }
    else
    {
      // reject(new Error("No such document!"));
      console.log("Product not found")
      req.flash("ferror", "No such product exists");
      res.redirect("/store/shop/dropshipper/" + sid);
    }
  
   
    }
    else
    {
      console.log("No such document!");
      // reject(new Error("No such document!"));
      let message="No";
      // res.render('error.ejs',{message})
      req.flash("ferror", "No such page exists");
      res.redirect("/store/shop/dropshipper/sid");
    }
    
   

    
    
  })
  .catch((error) => {});
})


 
 

}





// module.exports.ProductDet=async(req,res)=>
// {
//   const {sid,pid}=req.params;
//   let productFound;
//   let st_name;
//   let data;
//   return new Promise((resolve, reject) => {

//   const store =  db
//   .collection("users")
//   .doc(sid)
//   .get()
//   .then((docRef) => {
//     if(docRef.exists)
//     {
//     data=docRef.data()
//     user=data.products;
//     st_name=data.store_name;



//     productFound=user.find((product) => product.productId === pid);

//     if(productFound)
//     {
//       console.log("product found")
//       res.send(productFound);
  
//     }
//     else
//     {
//       // reject(new Error("No such document!"));
//       console.log("Product not found")
//       req.flash("ferror", "No such product exists");
//       res.redirect('/store/shop/'+sid)
//     }
  
   
//     }
//     else
//     {
//       console.log("No such document!");
//       // reject(new Error("No such document!"));
//       let message="No";
//       // res.render('error.ejs',{message})
//       req.flash("ferror", "No such page exists");
//       res.redirect('/store/shop/sid')
//     }
    
   

    
    
//   })
//   .catch((error) => {});
// })


 
 

// }







let testProd=[];
//All products of a Drop shipper
module.exports.renderAllproducts=async(req,res)=>
{
  // console.log("Route hit");
  const {sid}=req.params;
  let productFound;
  let user={};
  let products;
  let role="drop-shipper";

  // console.log("check views");
  // async function addViews()
  // {
  //   let store_url='shop/'+`${sid}`+'/addViews';
  //   let base_url='http://localhost:3000'
  //   let addView=await fetch(new URL(store_url,base_url));
    
  // }
  // await addViews();


  const store = await db
    .collection("users")
    .doc(sid)
    .get()
    .then((docRef) => {
      data=docRef.data()
      user=data;
      products=user.products;
     
      
      st_name=data.store_name;
   
      
    })
    .catch((error) => {});
    products.forEach((prod)=>
    {
      prod.sid=sid;
    })

     testProd=Array.from({length:4},()=>products).flat();

  res.render("store/dropshipper/allproducts.ejs", {
    user,
    products: testProd,
    id: sid,
    st_name,
    role,
  });
 

}