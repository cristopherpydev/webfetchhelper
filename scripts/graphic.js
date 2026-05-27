/* Author: Cristopher Mendez Cervantes | cristopherpydev (R3D)
   GitHub: https://github.com/cristopherpydev
   Portfolio: https://cristopherpydev.github.io/
*/

/* === DEV MAINTENANCE ===

    1. I get the array from the calculation in stress_test.js
    2. Afther this I display a line graph with the y-latency and x-iterations with the said dataset

    The graph or chart must be looking like this:

    120ms |                         /\     
    100ms |          /\            /  \    
    80ms  |   /\    /  \    /\    /    \   
    60ms  |__/  \__/    \__/  \__/      \__
            1   10  20  30  40  50
*/

//fallback to destroy previous charts
let chartInstance;

export function displayGraphic(dataset) {
  const ctx = document.getElementById('myChart');

  //fallback to destroy previous charts
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: dataset.map((_, i) => i + 1),
      datasets: [{
        label: "Latency (ms)",
        data: dataset,
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13, 110, 253, 0.2)",
        tension: 0.3,
        pointRadius: 3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      },
      scales: {
        x: {
          title: { display: true, text: "Iteration" }
        },
        y: {
          title: { display: true, text: "Delay (ms)" },
          beginAtZero: true
        }
      }
    }
  });
}