import { side_nav } from "../../modules/ui.js"
import { getData, getSymbols, patch } from "../../modules/http"
import axios from "axios";
let user_loc = JSON.parse(localStorage.getItem('user'))

let wrap = document.querySelector('.wrap')
let main = document.querySelector('.main')

side_nav(wrap, main)

let form = document.forms.convert
let names = document.querySelector('.top select')

let curr = document.querySelector('.change select')
let balance_1 = document.querySelector('.balance_1')
let currency_1 = document.querySelector('.currency_1')

let balance_2 = document.querySelector('.balance_2')

let balance_3 = document.querySelector('.balance_3')
let currency_3 = document.querySelector('.currency_3')

let balance_4 = document.querySelector('.balance_4')

await getSymbols()
    .then((symbols) => {
        for (let key in symbols) {
            let opt = new Option(`${key} - ${symbols[key]}`, key)

            curr.append(opt)

            curr.onchange = () => {
                balance_2.innerHTML = opt
                balance_4.innerHTML = opt
            }
        }
    })

let wallets = []
let selected_wallet = null

getData('/wallets?user_id=' + user_loc.id)
    .then(res => {
        for (let item of res.data) {
            let opt = new Option(`${item.name}`, item.id)

            if (res.data.indexOf(item) === 0) {
                opt.selected = true
                selected_wallet = item
            }

            names.append(opt)
        }

        wallets = res.data
    })

names.onchange = (e) => {
    const id = e.target.value
    selected_wallet = wallets.find(el => el.id === id)
    balance_1.innerHTML = "$" + selected_wallet.balance
    currency_1.innerHTML = selected_wallet.currency

    balance_3.innerHTML = selected_wallet.balance
    currency_3.innerHTML = selected_wallet.currency
    form.onsubmit = (e) => {
        e.preventDefault()

        let convert_to = new FormData(e.target).get('currency')

        axios.get(`https://api.apilayer.com/fixer/convert?to=${convert_to}&from=${selected_wallet.currency}&amount=${selected_wallet.balance}`, {
            redirect: 'follow',
            headers: {
                "apikey": import.meta.env.VITE_API_KEY
            }
        })
            // .then(res => {
            //     patch('/wallets/' + selected_wallet.id, { balance: res.data.result, currency: res.data.query.to })
            //         .then(res => {
            //             balance_1.innerHTML = `${res.data.balance}`
            //             currency_1.innerHTML = res.data.currency

            //             balance_3.innerHTML = `${res.data.balance}`
            //             currency_3.innerHTML = res.data.currency

            //         })
            // })
        location.assign('/')
    }
}
