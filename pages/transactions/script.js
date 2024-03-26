import { side_nav, transactions } from "../../modules/ui"
import { getData } from "../../modules/http"
let user_loc = JSON.parse(localStorage.getItem('user'))

let wrap = document.querySelector('.wrap')
let main = document.querySelector('.main')

let centre_3 = document.querySelector('.centre_3')

await getData('/transictions?user_id=' + user_loc.id)
    .then(res => {
        transactions(res.data, centre_3)
    })

side_nav(wrap, main)