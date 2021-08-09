// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";
  console.log("Checking");

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".validated-form");

  // Loop over them and prevent submission
  Array.from(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function passCheck(data) {

  var passClass = document.getElementsByClassName("password-check");

  const lowercase = new RegExp("(?=.*[a-z])");
  const uppercase = new RegExp("(?=.*[A-Z])");
  const number = new RegExp("(?=.*[0-9])");
  const specialChar = new RegExp("(?=.*[!@#$%^&*])");
  const eightChar = new RegExp("(?=.{8,})");

  if (eightChar.test(data))  passClass[0].style.color = "green" ;
  else passClass[0].style.color = "grey";

  if (lowercase.test(data)) passClass[1].style.color = "green";
  else passClass[1].style.color = "grey";

  if (uppercase.test(data)) passClass[2].style.color = "green";
  else passClass[2].style.color = "grey";

  if (number.test(data)) passClass[3].style.color = "green";
  else passClass[3].style.color = "grey";

  if (specialChar.test(data)) passClass[4].style.color = "green";
  else passClass[4].style.color = "grey";
  if(passClass[0].style
    .color==passClass[1].style
      .color==passClass[2].style
        .color==passClass[3].style=="green")
        {
          console.log("All good");
        }



}

let email = document.getElementsByTagName("input[type=email]");
let span = document.getElementsByClassName("email-check");

function emailCheck(data) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(data)) {
    span[0].innerText = "Your email is valid";
    span[0].style.color = "green";
  } else {
    if (regex.test(data) == "") {
      span[0].innerText = "empty";
      console.log("empty");
    }

    span[0].innerText = "Your email is not valid";
    span[0].style.color = "red";
  }
}
