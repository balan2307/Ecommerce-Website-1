// Example starter JavaScript for disabling form submissions if there are invalid fields
var password = document.getElementById("Password");
(function () {
  "use strict";

  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  var password = document.getElementById("Password");

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".validated-form");

  // Loop over them and prevent submission
  Array.from(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        const pass = password.value;

        if (!form.checkValidity() || !strongRegex.test(pass)) {
          event.preventDefault();
          event.stopPropagation();
          // if (!strongRegex.test(pass)) {
          //   password.classList.add("is-invalid");

          // } else {
          //   password.classList.remove("is-invalid");

          // }
        }
        // const validateGroup=document.getElementsByClassName('validate-me');

        //     for (var i = 0; i < validateGroup.length; i++)
        //     {
        //       // validateGroup[i].classList.add('is-invalid');
        //       var validateGroup = validateGroup[i].querySelectorAll(":invalid");
        // for (var j = 0; j < invalidGroup.length; j++) {
        //     invalidGroup[j].classList.add('is-invalid');
        // }
        //     }
        //     if(!strongRegex.test(pass))
        //     {
        //      password.classList.add('is-invalid');

        //     }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function passCheck(data) {
  var form = document.getElementsByClassName("password-strength");
  const password_param = document.getElementsByClassName("password-param");

  var passClass = document.getElementsByClassName("password-check");
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const lowercase = new RegExp("(?=.*[a-z])");
  const uppercase = new RegExp("(?=.*[A-Z])");
  const number = new RegExp("(?=.*[0-9])");
  const specialChar = new RegExp("(?=.*[!@#$%^&*])");
  const eightChar = new RegExp("(?=.{8,})");

  if (eightChar.test(data)) passClass[0].style.color = "green";
  else passClass[0].style.color = "#f54275";

  if (lowercase.test(data)) passClass[1].style.color = "green";
  else passClass[1].style.color = "#f54275";

  if (uppercase.test(data)) passClass[2].style.color = "green";
  else passClass[2].style.color = "#f54275";

  if (number.test(data)) passClass[3].style.color = "green";
  else passClass[3].style.color = "#f54275";

  if (specialChar.test(data)) passClass[4].style.color = "green";
  else passClass[4].style.color = "#f54275";

  // form[0].addEventListener('submit',function(e)
  // {
  //   console.log("Trying to submit")
  if (!strongRegex.test(data)) {
    password_param[0].style.display = "block";
    password.classList.add("is-invalid");
  } else if (strongRegex.test(data)) {
    password_param[0].style.display = "none";
    // password.classList.remove("is-invalid");
    password.classList.add("is-valid");
    password.classList.remove("is-invalid");
    // password.classList.remove("is-invalid");
  }

  // },false)
}

let email = document.getElementById("email");
let span = document.getElementsByClassName("email-check");

function emailCheck(data) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(data)) {
    span[0].innerText = "Your email is valid";
    span[0].style.color = "green";
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
  } else {
    if (regex.test(data) == "") {
      span[0].innerText = "empty";
    }

    span[0].innerText = "Your email is not valid";
    span[0].style.color = "#f54275";

    email.classList.add("is-invalid");
  }
}

function inputCheck(data) {
  console.log("checking");
  const store = document.getElementById("Store_name");
  const feedback = document.getElementById("store-name-feedback");

  if (data == "") {
    store.classList.add("is-invalid");
    feedback.innerText = "";
  } else {
    store.classList.remove("is-invalid");
    store.classList.add("is-valid");
    console.log(data.length);
    if (data.length >= 4) {
      feedback.innerText = "Looking good";
    }
  }
}
