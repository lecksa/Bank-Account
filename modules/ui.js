import moment from "moment/moment"

function getRGB() {
    function randomize() {
        return Math.floor(Math.random() * 255)
    }

    let r = randomize()
    let g = randomize()
    let b = randomize()

    return `rgb(${r}, ${g}, ${b})`
}

export function side_nav(place, place_2) {
    let side_bar = document.createElement('div')
    let h1 = document.createElement('h1')
    let img = document.createElement('img')
    let overview = document.createElement('div')
    let img_ov = document.createElement('img')
    let a_ov = document.createElement('a')
    let wallets = document.createElement('div')
    let img_wal = document.createElement('img')
    let a_wal = document.createElement('a')
    let transictions = document.createElement('div')
    let img_tran = document.createElement('img')
    let a_tran = document.createElement('a')
    let exchange = document.createElement('div')
    let img_ex = document.createElement('img')
    let a_ex = document.createElement('a')
    let end = document.createElement('section')
    let img_sec = document.createElement('img')
    let user = document.createElement('div')
    let circle = document.createElement('div')
    let img_circ = document.createElement('img')
    let name = document.createElement('p')
    let out = document.createElement('div')
    let img_out = document.createElement('img')
    let a_out = document.createElement('a')  

    let pages = {
        "/": overview,
        "wallets": wallets,
        "transictions": transictions,
        "exchange": exchange
    }

    let page = location.pathname.split('/')[2]
    page = page ? page : "/"

    if (pages[page]) {
        pages[page].classList.add('active')
    } else {
        pages.wallets.classList.remove('active')
    }

    side_bar.classList.add('side_bar')
    h1.innerHTML = 'valuet'
    img.style.width = "120px"
    img.style.paddingBottom = "44px"
    img.src = "../../public/img/Line 3.svg"
    img_ov.src = "../../public/icons/over.svg"
    a_ov.innerHTML = "Overview"
    a_ov.href = "/"
    img_wal.src = "../../public/icons/wal.svg"
    a_wal.innerHTML = "Wallets"
    a_wal.href = "../../pages/wallets/index.html"
    img_tran.src = "../../public/icons/tran.svg"
    a_tran.innerHTML = "Transictions"
    a_tran.href = "../../pages/transictions/index.html"
    img_ex.src = "../../public/icons/ex.svg"
    a_ex.innerHTML = "Exchange"
    a_ex.href = "../../pages/exchange/index.html"
    // overview.classList.add("active")
    end.classList.add('end')
    img_sec.src = "../../public/img/Line 3.svg"
    user.classList.add('user')
    circle.classList.add('circle')
    img_circ.src = "../../public/img/Group 2.svg"
    name.innerHTML = user.name
    img_out.style.paddingRight = "8px"
    img_out.src = "../../public/icons/out.svg"
    a_out.innerHTML = "Выйти"
    a_out.href = "../../pages/signup/index.html"

    place.append(side_bar)
    side_bar.append(h1, img, overview, wallets, transictions, exchange, end)
    overview.append(img_ov, a_ov)
    wallets.append(img_wal, a_wal)
    transictions.append(img_tran, a_tran)
    exchange.append(img_ex, a_ex)
    end.append(img_sec, user, out)
    user.append(circle, name)
    circle.append(img_circ)
    out.append(img_out, a_out)


    let header = document.createElement('div')
    let search = document.createElement('div')
    let form = document.createElement('form')
    let input = document.createElement('input')
    let icons = document.createElement('div')
    let img_1 = document.createElement('img')
    let img_2 = document.createElement('img')

    header.classList.add('header')
    search.classList.add('search')
    // form.setAttribute.name = "poisk"
    input.setAttribute.id = "search"
    icons.classList.add('icons')
    img_1.src = "../../public/icons/message.svg"
    img_2.src = "../../public/icons/bell.svg"

    place_2.prepend(header)
    header.append(search, icons)
    search.append(form)
    form.append(input)
    icons.append(img_1, img_2)
}

export function reload(arr, place) {
    place.innerHTML = ''

    for (const item of arr) {
        let card = document.createElement('div')
        let h1 = document.createElement('h1')
        let balance = document.createElement('p')
        let currency = document.createElement('p')

        card.classList.add('card')
        card.style.background = `linear-gradient(90deg, #604392, ${getRGB()})`
        balance.classList.add('balance')
        currency.classList.add('curr')
        h1.innerHTML = item.name
        balance.innerHTML = "Баланс" + ":" + " " + item.balance
        currency.innerHTML = item.currency

        place.append(card)
        card.append(h1, balance, currency)

        div_1.onclick = () => {
            location.assign("../../pages/exchange/?id=" + item.id)
        }
    }
}

export function toaster(text, type) {
    const custom_alert = document.createElement('div')
    const time_bar = document.createElement('div')

        custom_alert.classList.add('toaster', `toaster_${type}`)
        custom_alert.classList.add('toaster-anim')
        time_bar.classList.add('time_bar')
        custom_alert.innerHTML = text

        custom_alert.append(time_bar)

        document.body.append(custom_alert)

        setTimeout(() => {
            custom_alert.remove()
        }, 5000)
}

export function transactions(arr, place, size) {
    place.innerHTML = ''

    let tempArr = []
    if (size === 'small') tempArr = arr.slice(0, 5)
    else if (size === 'full') tempArr = arr

    for (let item of tempArr.reverse()) {
        let tran = document.createElement('div')
        let text = document.createElement('div')
        let timeView = document.createElement('p')
        let dayView = document.createElement('h1')
        let walletView = document.createElement('p')
        let categoryView = document.createElement('h1')
        let sumView = document.createElement('p')

        tran.classList.add('first_tran')

        place.append(tran)
        tran.append(text, categoryView, sumView)
        text.append(timeView, dayView, walletView)

        timeView.innerHTML = moment(item.time, "h:mm").format("LT")
        dayView.innerHTML = moment(item.created_at).format("Do MMM YY")
        walletView.innerHTML = item.wallet.name
        categoryView.innerHTML = item.category
        sumView.innerHTML = item.total
    }
}