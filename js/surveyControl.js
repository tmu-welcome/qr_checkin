(() => {
    const affiliation = [
        {
            "faculty": "人文社会学部",
            "value":1,
            "department": [{"value":1,"name":"人間社会学科"},{"value":2,"name":"人文学科"}]
        },
        {
            "faculty": "法学部",
            "value":2,
            "department": [{"value":1,"name":"法学科"}]
        },
        {
            "faculty": "経済経営学部",
            "value":3,
            "department": [{"value":1,"name":"経済経営学科"}]
        },
        {
            "faculty": "理学部",
            "value":4,
            "department": [
                { "value": 1, "name": "数理科学科" },
                { "value": 2, "name": "物理学科" },
                { "value": 3, "name": "化学科" },
                { "value": 4, "name": "生命科学科" },
            ]
        },
        {
            "faculty": "都市環境学部",
            "value":5,
            "department": [
                { "value": 1, "name": "地理環境学科" },
                { "value": 2, "name": "都市基盤環境学科" },
                { "value": 3, "name": "建築学科" },
                { "value": 4, "name": "環境応用化学科" },
                { "value": 5, "name": "観光科学科" },
                { "value": 6, "name": "都市政策科学科" },
            ]
        },
        {
            "faculty": "システムデザイン学部",
            "value":6,
            "department": [
                { "value": 1, "name": "情報科学科" },
                { "value": 2, "name": "電気電子工学科" },
                { "value": 3, "name": "機械システム工学科" },
                { "value": 4, "name": "航空宇宙システム工学科" },
                { "value": 5, "name": "インダストリアルアート学科" },
            ]
        },
        {
            "faculty": "健康福祉学部",
            "value":7,
            "department": [
                { "value": 1, "name": "看護学科" },
                { "value": 2, "name": "理学療法学科" },
                { "value": 3, "name": "作業療法学科" },
                { "value": 4, "name": "放射線学科" },
            ]
        },
    ]
    const uid = getUID()
    if (uid == "") {
        showError("先にチェックインをお願いします")
        setInterval(() => {
            movePage(page.dashboard)
        },1500)
        return
    }

    fireEvent(()=>{
        let selAffiliation = document.getElementById("form-select-affiliation");
        let formSendButton = document.getElementById("btn-post")
        for (i in affiliation) {
            const item = affiliation[i]
            let optGroup = document.createElement("optgroup")
            optGroup.setAttribute("label", item.faculty);
            for (j in item.department) {
                let option = document.createElement("option")
                let value = item.value.toString().concat(item.department[j].value.toString())
                option.setAttribute("value", value)
                option.innerText = item.department[j].name;
                optGroup.append(option)
            }
            selAffiliation.append(optGroup)
        }
        selAffiliation.addEventListener("change", () => {
            formSendButton.classList.add("form_button_unavailable")
            if (selAffiliation.value == 0) {
                return
            }
            formSendButton.classList.remove("form_button_unavailable")
        })
        formSendButton.addEventListener("click", async () => {
            fadeinModal(uiID.modal.loading);
            let value = selAffiliation.value
            if (value == 0) {
                return
            }
            let res = await doServerAction("postSurvey", { "uid": uid, "value": value })
            if (res.status != 0) {
                showError("サーバエラー:" + getServerErrorMsg(res.body.error));
                // movePage(page.index);
                return;
            }
            if (res.body.status != 0) {
                showError("すでに回答済みです")
            }
            fadeinModal(uiID.modal.done);
            movePage(page.dashboard);
        })
    })
})()