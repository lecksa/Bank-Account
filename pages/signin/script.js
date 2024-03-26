import { getData } from '../../modules/http.js'

const form = document.forms.namedItem('signin')

form.onsubmit = (e) => {
    e.preventDefault()

    const user = {}

    const fm = new FormData(e.target)

    fm.forEach((val, key) => user[key] = val)

    const {email, password} = user

    if(email && password) {
        getData('/users?email=' + email)
            .then((res) => {
                const [res_user] = res.data

                if(!res_user) {
                    console.log(e);    
                    return
                }
                if(res_user.password !== password) {
                    console.log(e);    
                    return
                }
                
                delete res_user.password

                localStorage.setItem("user", JSON.stringify(res_user))
                location.assign('/')
            })
        }
    }