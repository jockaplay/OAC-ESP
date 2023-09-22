let temperature = 0
let add = 0
let span = document.getElementById("temperatura")
let span2 = document.getElementById("umidade")
let infos = [0]
let infos2 = [0]
const change = (i) => {
  switch (i) {
    case 0: add = 0; break;
    case 1: add = 32; break;
    case 2: add = 273.15; break;
  }
}
function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}
async function run() {
    const response = await fetch('https://espnode.jockaplay.repl.co/data')
    .then((e) => {
      e = e.json();
      return e;
    })
    addData(chart, `${infos[0]}`, infos[0]);
    console.log(infos)
    addData(chart2, `${infos2[0]}`, infos2[0]);
    over(response)
    await sleep(1000);
    run()
}
function over(response){
  let temperatura = response.temp
  let umidade = response.umid
  span.innerText = (parseFloat(temperatura) + add).toFixed(1);
  span2.innerText = umidade;
  infos.push(temperatura);
  infos = infos.slice(1);
  infos2.push(umidade);
  infos2 = infos2.slice(1);
}

run();

const ctx = document.getElementById('myChart');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Graus Célsius',
      borderColor: '#36a2eb',
      backgroundColor: '#36a2eb',
      data: [],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
});

const ctx2 = document.getElementById('myChart2');
const chart2 = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Umidade',
      borderColor: '#FF6384',
      backgroundColor: '#FF6384',
      data: [],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
});

function addData(chart, label, newData) {
  if (chart.data.labels.length < 10) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(newData);
    });
  }
  if (chart.data.labels.length > 9) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift()
  }
  chart.update();
}