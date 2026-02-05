const API_URL = "http://localhost:3000";

Submit = async () => {
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var number = document.getElementById("number").value;
  var email = document.getElementById("email").value;
  var dob = document.getElementById("dob").value;
  var pass = document.getElementById("pass").value;

  //  start of name validation
  if (fname == "" || lname == "") {
    alert("Please provide your full name!");
    return false;
  } else {
    var nameErr = true;
  }
  //   end of name validation

  // start of email validation
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    var emailErr = true;
  } else {
    alert("Enter valid email");
    return false;
  }
  //   end of email validation

  // start of number validation
  if (/^[6-9]\d{9}$/.test(number)) {
    var numErr = true;
  } else {
    alert("Enter valid number");
    return false;
  }
  // end of number validation

  // start of dob validation
  var year = Number(dob.substr(0, 4));
  var month = Number(dob.substr(5, 2));
  var day = Number(dob.substr(8, 2));
  var today = new Date();
  var age = today.getFullYear() - year;
  if (
    today.getMonth() < month ||
    (today.getMonth() == month && today.getDate() < day)
  ) {
    age--;
  }
  if (age >= 18) {
    var ageErr = true;
  } else {
    alert("You must be at least 18 years old");
    return false;
  }
  // end of dob validation

  // start of gender validation
  var gen22 = "";
  if (document.getElementById("genMale").checked) {
    gen22 = document.getElementById("genMale").value;
  } else if (document.getElementById("genFemale").checked) {
    gen22 = document.getElementById("genFemale").value;
  } else if (document.getElementById("genOther").checked) {
    gen22 = document.getElementById("genOther").value;
  } else {
    alert("Please select a gender");
    return false;
  }
  // end of gender validation

  // start of password validation
  if (pass.length < 8) {
    alert("Password must be at least 8 characters");
    return false;
  }
  if (pass.toLowerCase().includes("password")) {
    alert('Password cannot contain the word "password"');
    return false;
  }
  var passErr = true;
  // end of password validation

  // Submit to backend API
  if (nameErr && emailErr && numErr && ageErr && passErr) {
    try {
      const response = await fetch(API_URL + "/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Fname: fname,
          Lname: lname,
          email: email,
          Phone: Number(number),
          Dob: dob,
          Gender: gen22,
          password: pass,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Signup successful! Welcome, " + fname + "!");
        document.location.href = "./fakebook.html";
      } else {
        alert("Signup failed: " + (data.error || "Unknown error"));
      }
    } catch (e) {
      alert("Could not connect to server. Please try again later.");
      console.error(e);
    }
  }
};
