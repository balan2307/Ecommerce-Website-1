

$(document).ready(function () {
  $("#example").DataTable({
    aaSorting: [],
    responsive: true,

    columnDefs: [
      {
        responsivePriority: 1,
        targets: 0,
      },
      {
        responsivePriority: 2,
        targets: -1,
      },
    ],
  });

  $(".dataTables_filter input").attr("placeholder", "Search here...").css({
    width: "300px",
    display: "inline-block",
  });
});

function changeStatus(index,productId) {
  console.log("prod:",productId)
	let status = document.querySelector(`#status-button-${index}`);
 
  console.log([status]);
  if (status.innerText == "Active") {
    status.innerText = "Draft";
    status.classList.remove("bg-success");

    status.classList.add("bg-danger");
  } else if (status.innerText == "Draft") {
    status.innerText = "Active";

    status.classList.add("bg-success");

    status.classList.remove("bg-danger");
  }


  axios.post('/admin/changeStatus', {
    status: status.innerText,
   productId:productId,
   
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

}

