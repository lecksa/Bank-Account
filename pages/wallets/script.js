import { reload, side_nav } from "../../modules/ui"
import { getData } from "../../modules/http"
let user = JSON.parse(localStorage.getItem('user'))
import { Chart, registerables} from 'chart.js';
Chart.register(...registerables);

let wrap = document.querySelector('.wrap')
let main = document.querySelector('.main')

let first_2 = document.querySelector('.first_2')
let pie = document.querySelector('.pie_chart')

getData('/wallets')
    .then(res => {
        if (res.status === 201 || res.status === 200) {
            let id = res.data.filter(wall => wall.user_id === user.id)
            reload(id, first_2)
            first_2.append(pie)
        }
    })

side_nav(wrap, main)