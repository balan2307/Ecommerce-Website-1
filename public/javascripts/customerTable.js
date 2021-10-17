function getCustomerdetails(ind){
    idx=parseInt(ind)
    axios.get(`/admin/showCustomer/${idx}`)
      .then(function (response) {
      document.querySelector('#products-table').innerHTML=""

      const products=response.data.Products;
      products.forEach(product=>{
      createProductrow(product.productName,product.productPrice,product.productImg);
      })
      })
      .catch(function (error) {
        console.log(error);
      });
  
    
}
function createProductrow(pname,pprice,pimg){
let product_row=document.createElement("tr");
let product_data=document.createElement("td");
let product_price=document.createElement("td");

product_data.innerHTML=`
<a href="#">
<div class="d-flex align-items-center">
  <div class="avatar avatar-blue mr-3">
    <img
      src="${pimg}"
      alt="productImage"
      style="width: 100%; height: 100%"
      class="table-img"
    />
  </div>

  <div class="" >
    <p
      class="font-weight-bold mb-0 pl-2"
      style="border-bottom: none"
   
      >
      ${pname}
  
    </p>
  </div>
</div>
</a>`

product_price.innerText=`${pprice}`

product_row.appendChild(product_data)
product_row.appendChild(product_price)

document.querySelector('#products-table').appendChild(product_row)


}