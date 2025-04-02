const uid_key = "uid"
const count_key = "count"
const cookie_expire = new Date("2025-05-01").toUTCString();

function getCookieObject() {
    let cookie = document.cookie
    if (cookie == "") {
        return {}
    }
    cookie = cookie.split("; ")
    let obj = {}
    for (let record in cookie) {
        let pair = cookie[record].split("=")
        console.log(pair[0])
        let newObj = {[pair[0]]:pair[1]}
        Object.assign(obj,newObj)
    }
    return obj
}

function getUID() {
    let cookieObj = getCookieObject()
    if (!(uid_key in cookieObj)) {
        return ""
    }
    return cookieObj[uid_key]
}

function saveUID(uid) {
    document.cookie = `${uid_key}=${uid};expires=${cookie_expire}`
}

function getCount() {
    let cookieObj = getCookieObject()
    let res = 0
    if (!(count_key in cookieObj)) {
        return 0
    }
    try {
        res = parseInt(cookieObj[count_key])
    } catch (e) {
        return 0
    }
    return res
}

function saveCount(count) {
    document.cookie = `${count_key}=${count};expires=${cookie_expire}`
}