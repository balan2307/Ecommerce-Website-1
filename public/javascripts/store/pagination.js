// const express = require("express");
// const userController = require("../../../controllers/userController");
// import { testProd } from '../../../controllers/userController'
console.log("Check");
const prev=document.getElementById('btn-prev');
const next=document.getElementById('btn-next');
let allproducts=document.getElementsByClassName('product-pagin')[0];



const testProd=0;

async function getProd(req,res)
{
    const { id } = req.params;
    console.log("now " + id);
    console.log("print data");
    let user={};
  
    const store = await db
      .collection("users")
      .doc(id)
      .get()
      .then((docRef) => {
        user=docRef.data();
        
      })
      .catch((error) => {});
  
       testProd=Array.from({length:25},()=>user.products).flat();
 

}

let first_page=0;
let last_page=7;
prev.addEventListener('click',async()=>
{
    // await getProd()
    // console.log(testProd);

    
    if(first_page-8>=0)
    {
    first_page-=8;
    allproducts.innerHTML=first_page;
    }
})

next.addEventListener('click',async()=>
{
    // await getProd()
    // console.log(testProd);
    first_page+=8;
    
    let pro=
    `   <% for(let i=0;i<=7;i++) { %>
      <!-- <% let rand=Math.floor(Math.random() * (products.length)) %> -->
      <div class="col-lg-3 col-md-6 col-sm-6 mb-0 product d-flex justify-content-center">
        <div class="card product-show mb-5" style="width: 18rem">
          <a href="/store/shop/<%=id%>/product/<%=products[i].productId%>">
          <img
            src="<%=products[i].productImage %>"
            class="card-img-top"
            alt="..."
          /></a>
       
          <div class="card-body d-flex justify-content-center prod-details " >
            <h5 class="card-title"></h5>
            <p class="card-text prod-name">
             <%= i %> <%=products[i].productName%>
            </p>

          </div>
          <div class="content">
            <div class="content-item " style="text-align: center;"> 
             <span class="prod-price mx-1">&#8377  <%=products[i].productPrice%></span> 
            <br>
           
            <span class="buttons allbtn d-flex justify-content-center"> 
              <button class="btn btn-buy mr-1"> <i class="fas fa-shopping-bag"></i></button>
               <button class="btn btn-cart"><i class="fas fa-shopping-cart"></i></button>
               <button class="btn btn-more"><i class="fas fa-info-circle"></i></button></span>
          </div>
         
        </div>
        </div>
        
      </div>

    <% }%> `
    allproducts.innerHTML=pro;



    
   
})

// function test()
// {
//   console.log("testt");
// }