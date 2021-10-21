function getCustomerdetails(ind){
    idx=parseInt(ind)
    axios.get(`/admin/showCustomer/${idx}`)
      .then(function (response) {
        let valve=response.data.Products[0]["price_data"].product_data
        let amt=response.data.Products[0]["price_data"].unit_amount
      document.querySelector('#products-table').innerHTML=""
      document.querySelector('#address-table').innerHTML=""
      const products=response.data.Products;
      products.forEach(product=>{
      createProductrow(valve.name,parseInt(amt)/100,valve.images[0]);
      createAddressrow(response.data.address.state,response.data.address.city ,response.data.address.country)
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


function createAddressrow(state,city ,country){
  let product_row=document.createElement("tr");
  let product_data=document.createElement("td");
  let product_price=document.createElement("td");
  
  product_data.innerHTML=`
  <a href="#">
  <div class="d-flex align-items-center">
  
  
    <div class="" >
      <p
        class="font-weight-bold mb-0 pl-2"
        style="border-bottom: none"
     
        >
        ${city}, ${country}
    
      </p>
    </div>
  </div>
  </a>`
  
  product_price.innerText=`${state}`
  
  product_row.appendChild(product_data)
  product_row.appendChild(product_price)
  
  document.querySelector('#address-table').appendChild(product_row)
  
  
  }