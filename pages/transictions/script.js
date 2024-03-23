import { side_nav, transactions } from "../../modules/ui"
import { getData } from "../../modules/http"
let user = JSON.parse(localStorage.getItem('user'))

let wrap = document.querySelector('.wrap')
let main = document.querySelector('.main')

let centre_3 = document.querySelector('.centre_3')

getData('/transictions?user_id=' + user.id)
    .then(res => {
        transactions(res.data, centre_3, 'small')
    })


side_nav(wrap, main)