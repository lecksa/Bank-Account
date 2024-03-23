import { reload, side_nav } from "./modules/ui"
import { getData } from "./modules/http"
let user = JSON.parse(localStorage.getItem('user'))
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

let wrap = document.querySelector('.wrap')
let main = document.querySelector('.main')
let third = document.querySelector('.third')

side_nav(wrap, main)

getData('/wallets?user_id=' + "7a6e")
    .then(res => {
        if (res.status === 201 || res.status === 200) {
            reload(res.data.slice(0, 4), third)
        }
    })

let first = []
let second = []

getData('/wallets?user_id=' + "7a6e")
    .then(res => {
        if (res.status === 200 || res.status === 201) {
            res.data.forEach(item => {
                let total = item.balance
                let per = (100 * item.balance) / total
                first.push(item.name)
                second.push(per)
            });

            // createChart()
        }
    })

// const ctx = document.getElementById('myChart');

// function createChart() {
//     new Chart(ctx, {
//         type: 'Doughnut',
//         data: {
//             labels: first,
//             datasets: [{
//                 label: 'Total',
//                 data: [300, 50, 100],
//                 backgroundColor: [
//                     'rgb(255, 99, 132)',
//                     'rgb(54, 162, 235)',
//                     'rgb(255, 205, 86)'
//                 ],
//                 hoverOffset: 4
//             }]
//         }
//     });
// }

let ctx = document.getElementById('myDoughnutChart').getContext('2d');

    let data = {
       datasets: [{
           data: [30, 20, 50], 
           backgroundColor: ['yellow', 'white', '#018FFF']
       }],

       type: 'doughnut'
   };

   let options = {
   };

   let myDoughnutChart = new Chart(ctx, {
       type: 'doughnut',
       data: data,
       options: options
   });