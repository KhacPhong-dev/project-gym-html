let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
let editIndex = null;
let currentPage = 1;
const itemsPerPage = 5; // Số lượng mục hiển thị mỗi trang
let users =JSON.parse(localStorage.getItem("users")) || [];

document.addEventListener("DOMContentLoaded", () => {
  // Chỉ cho phép đặt lịch từ ngày hôm sau trở đi
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
    document.getElementById("date").value = schedule.date;
    document.getElementById("time").value = schedule.time;
    document.getElementById("name").value = schedule.name;
    document.getElementById("email").value = schedule.email;
  } else {
    // Nếu thêm mới, làm trống các input
    document.getElementById("class").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
  }
}


function closeModal() {
  document.getElementById("scheduleModal").style.display = "none";
  document.getElementById("class").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
}

function saveSchedule() {
  let schedule = {
    class: document.getElementById("class").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
  };

  if (
    !schedule.class ||
    !schedule.date ||
    !schedule.time ||
    !schedule.name ||
    !schedule.email
  ) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  } else if (
    schedule.email.indexOf("@") == -1 ||
    schedule.email.indexOf(".") == -1
  ) {
    alert("Email không hợp lệ");
    return;
  }

  if (editIndex === null) {
    schedules.push(schedule);
    Swal.fire({
      title: "Okay!MF",
      icon: "success",
      draggable: true,
    });
  } else {
    schedules[editIndex] = schedule;
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

  // Lấy từ khóa tìm kiếm và lọc các lịch có tên hoặc email chứa từ khóa đó
  let searchTerm = document.getElementById("search").value.toLowerCase();
  let filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.name.toLowerCase().includes(searchTerm) ||
      schedule.email.toLowerCase().includes(searchTerm)
  );

  // Tính toán bắt đầu và kết thúc của trang hiện tại trên mảng đã lọc
  let start = (currentPage - 1) * itemsPerPage;
  let end = currentPage * itemsPerPage;
  let schedulesToShow = filteredSchedules.slice(start, end);

  // Hiển thị lịch trình cho trang hiện tại
  schedulesToShow.forEach((schedule, index) => {
    for(let i = 0;users.length > i; i++){
      if(users[i].role=="admin"&&users[i].status==true){
        let row = `<tr>
          <td>${schedule.class}</td>
          <td>${schedule.date}</td>
          <td>${schedule.time}</td>
          <td>${schedule.name}</td>
          <td>${schedule.email}</td>
          <td>
            <button class='btn btn-warning btn-sm' onclick='openModal(${
              start + index
            })'>Sửa</button>
            <button class='btn btn-danger btn-sm' onclick='deleteSchedule(${
              start + index
            })'>Xóa</button>
          </td>
        </tr>`;
        list.innerHTML += row;
      }else if(users[i].role&&users[i].status==true){
        let row = `<tr>
          <td>${schedule.class}</td>
          <td>${schedule.date}</td>
          <td>${schedule.time}</td>
          <td>${schedule.name}</td>
          <td>${schedule.email}</td>
        </tr>`;
        list.innerHTML += row;
      }
    }
  });

  renderPagination(filteredSchedules.length);
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
