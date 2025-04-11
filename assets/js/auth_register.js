let users = JSON.parse(localStorage.getItem("users")) || [];
let name = document.getElementById("name");
let form = document.getElementById("form");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    email.value == "" ||
    password.value == "" ||
    confirmPassword.value == "" ||
    name.value == ""
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Nhập đầy đủ thông tin",
    });
  } else if (password.value.length < 8) {

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "password phải có ít nhất 8 ký tự",
    });
  } else if (email.value.indexOf("@") == -1 && email.value.indexOf(".") == -1) {
    alert("");
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "email không hợp lệ",
    });
  } else if (password.value != confirmPassword.value) {
      Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Mật khẩu không khớp",
    });
  } else {
    let user = {
      name: name.value,
      email: email.value,
      password: password.value,
      role: "user",
      status: true,
    };

    // Lưu vào localStorage
    function checkEmail(email) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
          return false;
        }
      }
      return true;
    }
    if (checkEmail(email.value)) {
      console.log(user);
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      Swal.fire({
        title: "Drag me!",
        icon: "Đăng ký thành công",
        draggable: true,
      });
      window.location.href = "../../index.html";
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email đã tồn tại",
      });
    }
  }
});
