
const ctx = document.getElementById("bookingChart").getContext("2d");


new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Gym", "Yoga", "Zumba"],
    datasets: [
      {
        label: "Số lượng lịch đặt",
        data: [1, 3,7],
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
