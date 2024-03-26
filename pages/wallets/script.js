import { reload, side_nav, rec_transac } from "../../modules/ui"
import { getData } from "../../modules/http"
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
let user_loc = JSON.parse(localStorage.getItem('user'))

console.log(user_loc.id);

let wrap = document.querySelector('.wrap')
let main = document.querySelector('.main')

let second_2 = document.querySelector('.second_2')
let trans = document.querySelector('.trans')

getData('/wallets')
  .then(res => {
    if (res.status === 201 || res.status === 200) {
      let id = res.data.filter(wall => wall.user_id === user_loc.id)
      reload(id, second_2)
    }
  })

side_nav(wrap, main)

const names = []
const totals = []
let dates = []
let total_2 = []

await getData('/transictions?user_id=' + user_loc.id)
  .then(res => {
    rec_transac(res.data, trans)

    for (let item of res.data) {

      let dateMin = item.created_at.split(',').at(0)
      const date = `${dateMin.slice(0, 4)}-${dateMin.slice(4, 6)}-${dateMin.slice(6)}`

      if (dates.length < 7) {
        dates.push(date)
      } else {
        dates.shift()
        dates.push(date)
      }

      if (totals.length < 7) {
        total_2.push(item.total)
      } else {
        total_2.shift()
        total_2.push(item.total)
      }
    }
  })

const ctx = document.getElementById('myChart');



getData('/wallets?user_id=' + user_loc.id)
  .then(res => {
    let total = 0
    res.data.forEach(item => {

      if (totals.length < 7) {
        totals.push(item.balance)
      } else {
        totals.shift()
        totals.push(item.balance)
      }

      if (names.length < 7) {
        names.push(item.name)
      } else {
        names.shift()
        names.push(item.name)
      }
      total += +item.balance
    })
    createChart(total)
  })


function createChart(summ) {
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: names,
      datasets: [{
        label: "$" + summ,
        data: totals,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


const ctx_2 = document.getElementById('Chart');

new Chart(ctx_2, {
  type: 'line',
  data: {
    labels: dates,
    datasets: [{
      label: 'Total',
      data: total_2,
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});