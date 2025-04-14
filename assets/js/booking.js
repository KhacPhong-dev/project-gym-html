let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
let editIndex = null;
let currentPage = 1;
const itemsPerPage = 5; // Số lượng mục hiển thị mỗi trang
let users =JSON.parse(localStorage.getItem("users")) || [];
let index = 0;
for(let i = 0;users.length > i; i++){
  if(users[i].status==true){
    index = i;
  }
}
// đặt lịch cho người dùng
document.addEventListener("DOMContentLoaded", () => {
  let today = new Date();
  today.setDate(today.getDate() + 1);
  let tomorrow = today.toISOString().split("T")[0];
  document.getElementById("date").setAttribute("min", tomorrow);
  renderSchedules();
});

function openModal(index = null) {
  editIndex = index;
  document.getElementById("scheduleModal").style.display = "flex";

  if (index !== null) {
    // Lấy dữ liệu lịch trình đang chỉnh sửa
    let schedule = schedules[index];
    document.getElementById("class").value = schedule.class;
    document.getElementById("date").value = schedule.

    document.getElementById("time").value = schedule.time;
    // document.getElementById("name").value = schedule.name;
    // document.getElementById("email").value = schedule.email;
    
  } else {
    // Nếu thêm mới, làm trống các input
    document.getElementById("class").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    // document.getElementById("name").value = "";
    // document.getElementById("email").value = "";
    
  }
}


function closeModal() {
  document.getElementById("scheduleModal").style.display = "none";
  document.getElementById("class").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";
  // document.getElementById("name").value = "";
  // document.getElementById("email").value = "";
}

function saveSchedule() {
  let schedule = {
    class: document.getElementById("class").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    name: users[index].name,
    email: users[index].email,
  };

  if (
    !schedule.class ||
    !schedule.date ||
    !schedule.time ||
    !schedule.name ||
    !schedule.email
  ) {
    // alert("Vui lòng nhập đầy đủ thông tin!");
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Vui lòng nhập đầy đủ thông tin!",
    });
    return;
  }
  //  else if (
  //   schedule.email.indexOf("@") == -1 ||
  //   schedule.email.indexOf(".") == -1
  // ) {
  //   // alert("Email không hợp lệ");
  //   Swal.fire({
  //     icon: "error",
  //     title: "Oops...",
  //     text: "Email không hợp lệ",
  //   });
  //   return;
  // }

  if (editIndex === null) {
    schedules.push(schedule);
    Swal.fire({
      title: "Okay!MF",
      icon: "success",
      draggable: true,
    });
  } else {
    schedules[editIndex] = schedule;
    Swal.fire({
      title: "Okay!MF",
      icon: "success",
      draggable: true,
    });
  }

  localStorage.setItem("schedules", JSON.stringify(schedules));
  renderSchedules();
  closeModal();
}

// Hàm này được gọi khi người dùng nhập từ khóa tìm kiếm
function searchSchedule() {
  currentPage = 1; // Reset về trang đầu khi có tìm kiếm mới
  renderSchedules();
}
function renderSchedules() {
  let list = document.getElementById("schedule-list");
  list.innerHTML = "";

  let currentUser = users[index];
  let filteredSchedules;

  if (currentUser.role === "admin") {
    filteredSchedules = schedules;
  } else {
    filteredSchedules = schedules.filter(
      (schedule) => schedule.email === currentUser.email
    );
  }

  // ===> Lọc theo lớp học <===
  const selectedClass = document.getElementById("classFilter").value;
  if (selectedClass !== "Tất cả") {
    filteredSchedules = filteredSchedules.filter(
      (schedule) => schedule.class === selectedClass
    );
  }
  // ===> Lọc theo ngày <===
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const dateFilter = document.getElementById("dateFilter").value;

  let resultSchedules = filteredSchedules.filter((schedule) => {
    const matchesNameOrEmail =
      schedule.name.toLowerCase().includes(searchTerm) ||
      schedule.email.toLowerCase().includes(searchTerm);

    const matchesDate = !dateFilter || schedule.date === dateFilter;

    return matchesNameOrEmail && matchesDate;
  });

  // Phân trang như trước
  let start = (currentPage - 1) * itemsPerPage;
  let end = currentPage * itemsPerPage;
  // Sắp xếp lịch theo ngày tăng dần
  // resultSchedules.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Phân trang
  let schedulesToShow = resultSchedules.slice(start, end);

  schedulesToShow.forEach((schedule, i) => {
    // <td>${formatDate(schedule.date)}</td>
    let row = `<tr>
      <td>${schedule.class}</td>
      
      <td>${schedule.date}</td>
      <td>${schedule.time}</td>
      <td>${schedule.name}</td>
      <td>${schedule.email}</td>`;

    if (currentUser.role === "admin") {
      row += `
        <td>
          <button class='btn btn-warning btn-sm' onclick='openModal(${
            start + i
          })'>Sửa</button>
          <button class='btn btn-danger btn-sm' onclick='deleteSchedule(${
            start + i
          })'>Xóa</button>
        </td>`;
    }

    row += `</tr>`;
    list.innerHTML += row;
  });

  renderPagination(resultSchedules.length);
}

// Hàm cập nhật phân trang với nút số trang
function renderPagination(totalItems) {
  let pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  let totalPages = Math.ceil(totalItems / itemsPerPage);

  // Nút "Trang trước"
  if (currentPage > 1) {
    pagination.innerHTML += `<button class="btn btn-secondary me-1" onclick="changePage(${
      currentPage - 1
    })">Trang trước</button>`;
  }

  // Hiển thị nút số trang
  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `<button class="btn ${
      i === currentPage ? "btn-primary" : "btn-secondary"
    } me-1" onclick="changePage(${i})">${i}</button>`;
  }

  // Nút "Trang sau"
  if (currentPage < totalPages) {
    pagination.innerHTML += `<button class="btn btn-secondary" onclick="changePage(${
      currentPage + 1
    })">Trang sau</button>`;
  }
}

function changePage(page) {
  currentPage = page;
  renderSchedules();
}

function deleteSchedule(index) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Bruh!!I think you don't want to delete it.",
          icon: "success",
        });
        schedules.splice(index, 1);
        localStorage.setItem("schedules", JSON.stringify(schedules));
        renderSchedules();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Ohh! Okay :).",
          icon: "error",
        });
      }
    });
  // schedules.splice(index, 1);
  // localStorage.setItem("schedules", JSON.stringify(schedules));
  // renderSchedules();
}
// function formatDate(dateString) {
//   const date = new Date(dateString);
//   const day = date.getDate().toString().padStart(2, "0");
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   const year = date.getFullYear()
//   return `${day}/${month}/${year}`;
// }

