function getOrderdetails(ind){
    idx=parseInt(ind)
    axios.get(`/admin/orders/${idx}`)
      .then(function (response) {

        let name=response.data[0].price_data.product_data.name;
        let image=response.data[0].price_data.product_data.images[0];
        let amt=parseInt(response.data[0].price_data.unit_amount) / 100;
        let qty=response.data[0].quantity;
      document.querySelector('#products-table').innerHTML=""
      createProductrow(name,amt,image,qty);
        
      })
      .catch(function (error) {
        console.log(error);
      });
  
    
}
function createProductrow(pname,pprice,pimg,pqty){
let product_row=document.createElement("tr");
let product_data=document.createElement("td");
let product_price=document.createElement("td");
let product_qty=document.createElement("td");

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
product_qty.innerText=`${pqty}`

product_row.appendChild(product_data)
product_row.appendChild(product_price)
product_row.appendChild(product_qty)

document.querySelector('#products-table').appendChild(product_row)


}


