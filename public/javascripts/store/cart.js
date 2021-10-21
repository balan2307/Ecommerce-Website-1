let cart_items = document.getElementsByClassName("add-to-cart");
let nav = document.getElementById("shop-id");
let sid = nav.getAttribute("sid");

let n = cart_items.length;
let items = new Array();

for (let i = 0; i < n; i++) {
  cart_items[i].addEventListener("click", function () {
    item = JSON.parse(localStorage.getItem("Cart"));
    if (!item) {
      console.log("1st element");
      let newProd = cart_items[i].getAttribute("id");

      items.push(newProd);
      localStorage.setItem("Cart", JSON.stringify(items));
    } else {
      console.log("Added new prod");
      for (let i = 0; i < item.length; i++) {
        items.push(item[i]);
      }
      let newProd = cart_items[i].getAttribute("id");
      console.log(newProd);
      items.push(newProd);
      localStorage.setItem("Cart", JSON.stringify(items));
    }
    getData();
  });
}

const getData = () => {
  axios
    .get(`http://localhost:3000/store/shop/${sid}/getprod/${items[0]}`)
    .then((response) => console.log(response.data));
};
