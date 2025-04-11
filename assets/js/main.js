let users = JSON.parse(localStorage.getItem("users")) || [];
let email = document.getElementById("email");
let password = document.getElementById("password");
let name = document.getElementById("name");

// xây dựng khi nút đăng nhập đăng kí được nhấn TA gọi ra tên người dùng ở trên thanh đầu trang
for (let i = 0; i < users.length; i++) {
  if (users[i].status == true&&users[i].role=="user") {
    document.getElementById("name").innerHTML = users[i].name;
    document.getElementById("name").style.color = "yellow";
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "block";
    
  }else if(users[i].status == true&&users[i].role=="admin"){
    document.getElementById("name").innerHTML = users[i].name;
    document.getElementById("name").style.color = "yellow";
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "block";
    document.getElementById("admin").style.display = "block"
  }

}
logout.addEventListener("click", function () {
  for (let i = 0; i < users.length; i++) {
    if (users[i].status == true) {
      users[i].status = false;
      localStorage.setItem("users", JSON.stringify(users));
      Swal.fire({
        title: "Drag me!",
        icon: "success",
        draggable: true,
      });
      setTimeout(function () {
        window.location.href = "../../index.html";
      }, 2000);

    }
  }
});
function checklogin () {
    for (let i = 0; i < users.length; i++) {
      if (users[i].status == true) {
        return true;
      }
    }
    return false;
  
}
function checkacc(e){
    e.preventDefault();
    if (checklogin()) {
      window.location.href = "../../pages/booking/schedule.html";
    } else {
      window.location.href = "../../pages/auth/login.html";
    }

}
  
