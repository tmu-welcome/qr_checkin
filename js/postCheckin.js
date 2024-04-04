(async () => {
    const param = new URLSearchParams(location.search);
    let state = checkAIDParam(param)
    if(state != 0) {
        showError(getAIDErrMsg(state))
        return;
    }
    const aid = getAID(param)
    changeInnerHtml(uiID.modal.loading.sub.checkin,"ID:"+aid)
    const uid = getUID()

    let res = await doServerAction("postCheckin", { "aid": aid, "uid": uid })

    if (res.status != 0) {
        showError("サーバエラー:" + getServerErrorMsg(res.body.error));
        return;
    }

    changeInnerHtml(uiID.modal.checkin.sub.place, "場所："+res.body[serverResponse.postCheckin.place])
    changeInnerHtml(uiID.modal.checkin.sub.group, "団体："+res.body[serverResponse.postCheckin.group])

    fadeinModal(uiID.modal.checkin);
    saveUID(res.body[serverResponse.postCheckin.uid]);
    movePage(page.dashboard);

})()