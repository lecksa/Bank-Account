import { getSymbols, postData } from "../../modules/http.js"
const user_loc = JSON.parse(localStorage.getItem('user'))

const form = document.forms.add_card
const select = form.querySelector('select')

await getSymbols()
    .then((symbols) => {
        for(let key in symbols) {
            let opt = new Option(`${key} - ${symbols[key]}`, key)

            select.append(opt)
        }
    })

form.onsubmit = (e) => {
    e.preventDefault()

    let fm = new FormData(e.target)
    
    let wallet = {
        id: String(Math.random()),
        created_at: new Date().toLocaleDateString(),
        updated_at: new Date().toLocaleDateString(),
        user_id: user_loc?.id
    }

    fm.forEach((value, key) => {
        wallet[key] = value
    })

    const {name, currency, balance} = wallet

    if(name && currency && balance) {
        postData('/wallets', wallet)
            .then(res => {
                if(res.status === 200 || res.status === 201) {
                    alert('Success')
                    location.assign('/pages/wallets/')
                }
            })
    }
}
