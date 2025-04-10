function clearModalFields() {
  document.getElementById("tenDichVu").value = "";
  document.getElementById("moTaDichVu").value = "";
  document.getElementById("hinhAnhDichVu").value = "";
}
let dichVuList = JSON.parse(localStorage.getItem("dichVuList")) || [];

// const dichVuList = [
//   {
//     ten: "Gym",
//     moTa: "Tập luyện với các thiết bị hiện đại",
//     hinhAnh: "/img/gym.png",
//   },
//   {
//     ten: "Yoga",
//     moTa: "Thư giãn và cân bằng tâm trí",
//     hinhAnh: "/img/yoga.png",
//   },
//   {
//     ten: "Zumba",
//     moTa: "Đốt cháy calories với những điệu nhảy sôi động",
//     hinhAnh: "/img/zumba.png",
//   },
// ];

function renderDichVu() {
  const tbody = document.getElementById("serviceTableBody");
  tbody.innerHTML = "";

  dichVuList.forEach((dv, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${dv.ten}</td>
      <td>${dv.moTa}</td>
      <td><img src="${dv.hinhAnh}" alt="${dv.ten}" width="80"/></td>
      <td class="actions">
        <button onclick="suaDichVu(${index})">Sửa</button>
        <button class="delete" onclick="xoaDichVu(${index})">Xóa</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function themDichVu() {
  document.getElementById("modalThemDichVu").style.display = "flex";
}

function dongModal() {
  document.getElementById("modalThemDichVu").style.display = "none";
  clearModalFields();
}

function clearModalFields() {
  document.getElementById("tenDichVu").value = "";
  document.getElementById("moTaDichVu").value = "";
  document.getElementById("hinhAnhDichVu").value = null;
}

function luuDichVu() {
  const ten = document.getElementById("tenDichVu").value.trim();
  const moTa = document.getElementById("moTaDichVu").value.trim();
  const hinhAnh = document.getElementById("hinhAnhDichVu").value.trim();

  if (ten && moTa && hinhAnh) {
    dichVuList.push({ ten, moTa, hinhAnh });
    renderDichVu();
    dongModal();
    localStorage.setItem("dichVuList", JSON.stringify(dichVuList));
  } else {
    alert("Vui lòng nhập đầy đủ thông tin.");
    
  }
}

function suaDichVu(index) {
  const dv = dichVuList[index];
  const ten = prompt("Sửa tên dịch vụ:", dv.ten);
  const moTa = prompt("Sửa mô tả:", dv.moTa);
  const hinhAnh = prompt("Sửa URL hình ảnh (hoặc dán base64):", dv.hinhAnh);

  if (ten && moTa && hinhAnh) {
    dichVuList[index] = { ten, moTa, hinhAnh };
    renderDichVu();
    localStorage.setItem("dichVuList", JSON.stringify(dichVuList));
  }
}

function xoaDichVu(index) {
  if (confirm("Bạn có chắc muốn xóa dịch vụ này?")) {
    dichVuList.splice(index, 1);
    renderDichVu();
    localStorage.setItem("dichVuList", JSON.stringify(dichVuList));
  }
}

document.addEventListener("DOMContentLoaded", renderDichVu);



