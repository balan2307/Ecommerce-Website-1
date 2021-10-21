// console.log("Check")

// const prod=document.getElementsByClassName('product')

// const newprod=document.getElementsByClassName('carousel-item');
// newprod[0].classList.add('active')

$("#menu-toggle").click(function (e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});

const search = document.getElementById("searchQueryInput");

const searchProd = () => {
  let searchedProd = search.value.toUpperCase();

  const allprod = document.getElementsByClassName("product");

  for (let i = 0; i < allprod.length; i++) {
    let prodName = allprod[i]
      .getElementsByClassName("product-show")[0]
      .getElementsByTagName("p")[0].textContent;
    if (prodName.toUpperCase().indexOf(searchedProd) > -1) {
      allprod[i].style.display = "";
    } else {
      allprod[i].style.display = "none";
    }
  }
};

// function contact()
// {
// document.querySelector('#contact').scrollIntoView({ 
//   behavior: 'smooth' 
// });
// }