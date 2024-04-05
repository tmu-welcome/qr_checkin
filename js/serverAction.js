const serverPath = {
    "root": "https://sdxhc.cloudfree.jp/CircleIntro_QR/",
    "act": {
        "postCheckin": {
            "path": "PostCheckin.php",
            "method": "POST"
        },
        "getUserInfo": {
            "path": "getUserInfo.php",
            "method":"GET"
        },
        "postSurvey": {
            "path": "postSurvey.php",
            "method":"POST"
        }
    }
}

const serverResponse = {
    "postCheckin": {
        "uid": "uid",
        "place": "placeName",
        "group": "groupName"
    }
}

const serverError = {
    "C_000": "AIDがありません",
    "C_001": "無効なAIDが送信されました",
    "S_001": "不正なUIDが送信されました",
    "S_002": "不正な値が送信されました",
}

function createRequestURL(act, params) {
    let request = serverPath.root;
    request += serverPath.act[act].path + "?"
    for (let key in params) {
        request += `${key}=${params[key]}&`
    }
    request = request.slice(0, -1);
    return request
}

async function doServerAction(act, params) {
    let request = new Request(createRequestURL(act, params), {
        method: serverPath.act[act].method
    })
    let response = {
        "status": 0,
        "body":""
    }

    try {
        const res = await fetch(request)
        if (!res.ok) {
            switch (res.status) {
                case 400:
                    response.status = 1
            }
        }
        response.body = await res.json();

    }catch(e){
        response.status = 2
        response.body = {
            "error":e
        }
    }

    return response
}

function getServerErrorMsg(code) {
    if (code in serverError) {
        return serverError[code]
    }
    return "不明なエラー"
}