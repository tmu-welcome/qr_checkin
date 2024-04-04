(async () => {
    const checkinMsg = [
        { "header": "Checked in!", "msg": "ご協力ありがとうございます！"},
        { "header": "Let's check in!", "msg": "ブース情報は下のボタンから見ることができます" },
        { "header": "Let's check in!", "msg":"ブース情報は下のボタンから見ることができます"},
    ]

    const uid = getUID()
    const savedCount = getCount()
    let userInfo;
    try {
        userInfo = await doServerAction("getUserInfo", { "uid": uid });
    } catch (e) {
        showError("通信エラー")
        return;
    }

    changeInnerHtml("checkin-place", userInfo.body.lastCheckin.place)
    changeInnerHtml("checkin-group", userInfo.body.lastCheckin.group)

    changeInnerHtml("checkin-header", checkinMsg[userInfo.body.status].header)
    changeInnerHtml("checkin-msg", checkinMsg[userInfo.body.status].msg)

    if (userInfo.body.status != 0) {
        removeElem("checkin-place-wrapper")
        removeElem("checkin-group-wrapper")
    }
    if (savedCount<userInfo.body.checkinCount) {
        changeInnerHtml("counter-num", userInfo.body.checkinCount - 1)
        addClass("counter-num", uiClass.anim.green)
        setInterval(() => {
            changeInnerHtml("counter-num", userInfo.body.checkinCount)
        }, 1000);
    } else {
        changeInnerHtml("counter-num", userInfo.body.checkinCount)
    }
    saveCount(userInfo.body.checkinCount)
    
    fadeoutModal(uiID.modal.loading);
    riseElement("info-lastCheckin");

    if (userInfo.body.status == 0 && userInfo.body.surveyAnswered == 0) {   
        setInterval(() => {
            risePanel("info-survey")
        }, 2000)
    }
    if (userInfo.body.checkinCount > 9) {
        changeInnerHtml("info-sub-heading", "Amazing!");
        changeInnerHtml("info-sub-p", "沢山のご来場ありがとうございます！<br>運営者冥利に尽きます")
        setInterval(() => {
            risePanel("info-sub")
        }, 3000)
    }
})()