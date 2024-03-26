import moment from "moment";
import { getData, postData, patch } from "../../modules/http.js";

let user_loc = JSON.parse(localStorage.getItem('user'))

document.addEventListener("DOMContentLoaded", function () {

    const form = document.forms.transactionAdd;
    const select = document.querySelector('#wallet')
    const total_inp = document.querySelector('#total')
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

                select.append(opt)
            }

            wallets = res.data
        })

    select.onchange = (e) => {
        const id = e.target.value
        selected_wallet = wallets.find(el => el.id === id)
    }

    total_inp.onkeyup = (e) => {
        const val = e.target.value
        if (+val > +selected_wallet.balance) {
            e.target.classList.add('error_input')
        } else {
            e.target.classList.remove('error_input')
        }

    }


    form.onsubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(form);

        const transaction = {
            created_at: new Date().toLocaleDateString(),
            updated_at: new Date().toLocaleTimeString(),
            time: new Date().toLocaleTimeString(),
            user_id: user_loc.id,
        };

        formData.forEach((val, key) => transaction[key] = val)

        if (total_inp.value > 0 && !total_inp.classList.contains('error_input') && +transaction.total <= +selected_wallet.balance) {
            selected_wallet.balance = +selected_wallet.balance - +total_inp.value

            transaction.wallet_id = selected_wallet.id
            delete selected_wallet.id
            delete selected_wallet.user_id
            transaction.wallet = selected_wallet



            await patch(`/wallets/${transaction.wallet_id}`, { balance: selected_wallet.balance })
                .then(res => {
                    if (res.status === 200 || res.status === 201) {

                        postData('/transictions', transaction)
                            .then(res => {
                                if (res.status === 200 || res.status === 201) {
                                    e.target.reset()
                                    location.assign('/pages/transactions/')
                                }
                            })
                    }
                })
        } else {
            console.log(e);
        }
    }
})