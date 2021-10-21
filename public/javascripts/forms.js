// Image Preview
const imageDiv = document.querySelector("#product-image");
const previewDiv = document.querySelector("#imagePreviewDiv");
imageDiv.onchange = e => {
    const [file] = imageDiv.files;
    if (file) {
      previewDiv.src = URL.createObjectURL(file);
    }
}

// Toast
var toastElList = [].slice.call(document.querySelectorAll(".toast"));
var toastList = toastElList.map(function (toastEl) {
  return new bootstrap.Toast(toastEl);
});
toastList.forEach((toast) => toast.show());

//Edit Product Modal
const editProductModal = async (productID) => {
  // console.log(productID);
  await axios.get(`/admin/product/${productID}`).then((result) => {
    const { data } = result;
    let productData = {};
    data.success ? (productData = data.product) : null;
    console.log(productData);
    const { productName, productStatus, productDescription,productImage,productInventory,productPrice } = productData;
    document.querySelector("#productName-edit").value = productName;
    // document.querySelector("#product-image-edit").value = productImage;
    document.querySelector("#imagePreviewDiv-edit").src = productImage;
    document.querySelector("#productPrice-edit").value = productPrice;
    document.querySelector("#productInventory-edit").value = productInventory;
    document.querySelector("#productStatus-edit").value = productStatus;
    document.querySelector("#productDescription-edit").value = productDescription;

    var editProductModal = new bootstrap.Modal(
      document.getElementById("EditProductsModal")
    );

    editProductModal.show();
    document.querySelector(
      "#editModalForm"
    ).action = `/admin/editProducts/${productID}`;

  }).catch((err) => {
    console.log(err);
  });
}

//Delete Product Modal
const deleteProductModal = async (productID,productName) => {

  document.querySelector(
    "#warningMessage"
  ).innerText = `Do you really want to delete ${productName}?`;

  var deleteProductModal = new bootstrap.Modal(
    document.getElementById("DeleteProductsModal")
  );

  deleteProductModal.show();
  document.querySelector(
    "#deleteModalForm"
  ).action = `/admin/deleteProducts/${productID}`;
}