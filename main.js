import { reload, side_nav } from "./modules/ui"
import { getData } from "./modules/http"
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
let user_loc = JSON.parse(localStorage.getItem('user'))

let wrap = document.querySelector('.wrap')
let main = document.querySelector('.main')
let third = document.querySelector('.third')
let total_spend = document.querySelector('.total_spend')
let chart_simp = document.querySelector('#chart_simp')

side_nav(wrap, main)

getData('/wallets?user_id=' + user_loc.id)
    .then(res => {
        if (res.status === 201 || res.status === 200) {
            reload(res.data.slice(0, 4), third)
        }
    })

let names = []
let totals = []


await getData('/transictions?user_id=' + user_loc.id)
    .then(res => {
        let aa = 0
        res.data.forEach(item => {
            let bal = item.total - item.wallet.balance
            aa += bal
        })

        total_spend.innerHTML = "$" + aa

        getData('/wallets?user_id=' + user_loc.id)
            .then(res => {
                let total = 0
                res.data.forEach(item => {
                    total += item.balance


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
                })
            })
    })

let total = 0

getData('/wallets?user_id=' + user_loc.id)
    .then(res => {
        res.data.forEach(item => {
            total += +item.balance
        })
        createChart(total)
    })

const ctx = document.getElementById('myChart');

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

new Chart(chart_simp, {
    type: 'line',
    data: {
        labels: [2,4,6,8,10,12],
        datasets: [{
            label: "Cart",
            data: [34,56,38456,2232,6000,22000],
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