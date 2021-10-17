const getData = () => {
 


 };
  

function buyProd(sid,pid)
{
    console.log("Buy Prod");
    console.log("Shop id",sid);
    console.log("ProdId",pid);
    let qty=document.getElementById('qty').value;
    

    
    axios.post('/store/dropshipper/add-product', {
        sid:sid,
        pid:pid,
        qty:qty
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });





  
}