const aid_key = "aid"

function checkAIDFormat(AID) {
    const regex = /^[a-zA-Z0-9]{5}$/
    if (!AID.match(regex)) {
        return true;
    }
    return false;
}

function checkAIDParam(param) {
    if (!param.has(aid_key)) {
       return 1 
    }

    if (checkAIDFormat(param.get(aid_key))) {
        return 2
    }
    return 0
}

function getAID(param) {
    if (!checkAIDParam(param)) {
        return param.get(aid_key);
    }
    return ""
}

function getAIDErrMsg(state) {
    switch (state) {
        case 1:
            return "AIDがパラメータに存在しません"
        case 2:
            return "AIDのフォーマットが不正です"
    }
    return ""
}