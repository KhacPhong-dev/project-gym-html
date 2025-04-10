let gym=0;
let yoga=0;
let zumba=0;

const ctx = document.getElementById("bookingChart").getContext("2d");
let schedule = JSON.parse(localStorage.getItem("schedules")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];
for(let i =0;users.length > i; i++){
  if(users[i].status==true &&users[i].role=="user"){
    window.location.href = "/index.html";}
}

console.log(schedule);

for(let i =0;schedule.length >i;i++){
  if(schedule[i].class=="Gym"){
    gym+=1;
  }else if(schedule[i].class=="Yoga"){
    yoga+=1;
  }else if(schedule[i].class=="Zumba"){
    zumba+=1;
  }
}
document.getElementById("gym").innerHTML = gym;
document.getElementById("yoga").innerHTML = yoga;
document.getElementById("zumba").innerHTML = zumba;

new Chart(ctx,{
  type: "bar",
  data: {
    labels: ["Gym", "Yoga", "Zumba"],
    datasets: [
      {
        label: "Số lượng lịch đặt",
        data: [gym, yoga,zumba],
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1,
      },
    },
  },
});

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
        window.location.href = "/index.html";
      }, 2000);
    }
  }
});