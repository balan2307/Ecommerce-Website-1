// Image Preview
const imageDiv = document.querySelector("#productImage");
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
