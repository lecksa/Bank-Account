import moment from "moment/moment"
let user_loc = JSON.parse(localStorage.getItem('user'))

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
    let transactions = document.createElement('div')
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
        "transactions": transactions,
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
    a_tran.innerHTML = "Transactions"
    a_tran.href = "../../pages/transactions/index.html"
    img_ex.src = "../../public/icons/ex.svg"
    a_ex.innerHTML = "Exchange"
    a_ex.href = "../../pages/exchange/index.html"
    end.classList.add('end')
    img_sec.src = "../../public/img/Line 3.svg"
    user.classList.add('user')
    circle.classList.add('circle')
    img_circ.src = "../../public/img/Group 2.svg"
    name.innerHTML = user_loc.name + " " + user_loc.surname
    img_out.style.paddingRight = "8px"
    img_out.src = "../../public/icons/out.svg"
    a_out.innerHTML = "Выйти"
    a_out.href = "../../pages/signup/index.html"

    place.append(side_bar)
    side_bar.append(h1, img, overview, wallets, transactions, exchange, end)
    overview.append(img_ov, a_ov)
    wallets.append(img_wal, a_wal)
    transactions.append(img_tran, a_tran)
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
    input.setAttribute.id = "search"
    icons.classList.add('icons')
    img_1.src = "../../public/icons/mes.svg"
    img_1.classList.add('img_1')
    img_2.src = "../../public/icons/bel.svg"
    img_2.classList.add('img_2')

    place_2.prepend(header)
    header.append(search, icons)
    search.append(form)
    form.append(input)
    icons.append(img_1, img_2)
}

export function reload(arr, place) {
    place.innerHTML = ''

    for (const item of arr.reverse()) {
        let card = document.createElement('div')
        let h1 = document.createElement('h1')
        let balance = document.createElement('p')
        let currency = document.createElement('p')

        card.classList.add('card')
        card.style.background = `linear-gradient(90deg, #0F0B38,  #604392 80%, ${getRGB()})`
        balance.classList.add('balance')
        currency.classList.add('curr')
        h1.innerHTML = item.name
        balance.innerHTML = "Баланс" + ":" + " " + item.balance
        currency.innerHTML = item.currency

        place.append(card)
        card.append(h1, balance, currency)
    }
}

export function transactions(arr, place) {
    place.innerHTML = ''

    let tempArr = []
    tempArr = arr

    for (let item of tempArr) {

        let tran = document.createElement('div')
        let dayView = document.createElement('h1')
        let img = document.createElement('img')
        let walletView = document.createElement('h1')
        let categoryView = document.createElement('p')
        let sumView = document.createElement('h1')

        tran.classList.add('second_tran')

        place.append(tran)
        tran.append(dayView, walletView, img, categoryView, sumView)

        img.src = "../../public/icons/arrow.svg"
        dayView.innerHTML = moment().format(item.created_at, item.time)
        walletView.innerHTML = item.wallet.name
        categoryView.innerHTML = item.category
        sumView.innerHTML = (item.wallet.balance - item.total)
    }
}

export function rec_transac(arr, place) {
    place.innerHTML = ''

    let tempArr = []
    tempArr = arr.slice(0, 8)

    for (let item of tempArr.reverse()) {
        let tran = document.createElement('div')
        let timeView = document.createElement('p')
        let img = document.createElement('img')
        let walletView = document.createElement('h1')
        let sumView = document.createElement('h1')

        tran.classList.add('first_tran')

        place.append(tran)
        tran.append(timeView, img, walletView, sumView)

        timeView.innerHTML = moment().format(item.created_at, item.time)
        img.src = "../../public/icons/down.svg"
        walletView.innerHTML = item.wallet.name
        sumView.innerHTML = (item.wallet.balance - item.total)
    }
}