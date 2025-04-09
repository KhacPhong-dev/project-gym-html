let admin = {
  name: "ADMIN",
  email: "admin@gmail.com",
  password: "123456",
  role: "admin",
  status: false,
};

let users = JSON.parse(localStorage.getItem("users")) || [];
console.log(users);

let checkAdmin = false;
for (let i = 0; i < users.length; i++) {
  if (users[i].email == admin.email) {
    checkAdmin = true;
    break;
  }
}
if (!checkAdmin) {
  users.push(admin);
  localStorage.setItem("users", JSON.stringify(users));
}
let btn = document.getElementById("btn");
let email = document.getElementById("email");
let password = document.getElementById("password");
btn.addEventListener("click", function (e) {
  e.preventDefault();
  if (email.value == "" || password.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Nhập đầy đủ thông tin",
    });
  } else {
    let user = {
      email: email.value,
      password: password.value,
    };
    function checkAdmin(email, password) {
      if (email == admin.email && password == admin.password) {
        
        return true;
      }
      return false;
    }
    function checkEmail(email, password) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {
          // alert("Đăng nhập thành công");
          return true;
        }
      }
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email hoặc mật khẩu không đúng",
      });
      return false;
    }
    function runWeb() {
      if (checkAdmin(email.value, password.value)) {
        users[0].status = true;
        localStorage.setItem("users", JSON.stringify(users));
        Swal.fire({
          title: "Drag me!",
          icon: "success",
          draggable: true,
        });
        setTimeout(() => {
          window.location.href = "/pages/admin/dashboard.html";
        }, 2000);
        // window.location.href = "/pages/admin/dashboard.html";

        return;
      }
      if (checkEmail(email.value, password.value)) {
        for (let i = 0; i < users.length; i++) {
          if (users[i].email == email.value) {
            users[i].status = true;
            localStorage.setItem("users", JSON.stringify(users));
            break;
          }
        }
        Swal.fire({
          title: "Drag me!",
          icon: "success",
          draggable: true,
        });
        setTimeout(() => {
          window.location.href = "/index.html";
        }, 2000);
        // window.location.href = "/index.html";

        return;
      }
    }
    runWeb();
  }
});
