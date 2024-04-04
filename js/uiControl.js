const page = {
    "dashboard":"dashboard.html"
}

const uiClass = {
    "modal": {
        "show": "modal_show",
        "hide": "modal_hide",
    },
    "anim": {
        "fadeoutNone": "anim_fadeout_none",
        "fadein": "anim_fadein",
        "rise": "anim_rise",
        "riseDelay":"anim_rise_delay",
    }
}

const uiID = {
    "modal": {
        "error": {
            "wrapper": "error-modal",
            "text":"error-text",
        },
        "loading": {
            "wrapper": "loading-modal",
            "header":"loading-header",
            "sub": {
                "checkin":"checkin-id-text"
            }
        },
        "checkin": {
            "wrapper": "checkin-modal",
            "sub": {
                "place": "place-text",
                "group": "group-text"
            }
        }
    }
}
function fireEvent(event) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded",event)
    } else {
        event()
    }
}

function showError(errMsg) {
    fireEvent(() => {
        let errorTextHolder = document.getElementById(uiID.modal.error.text)
        errorTextHolder.innerHTML = errMsg
        fadeinModal(uiID.modal.error)
    })
}

function fadeinModal(id) {
    fireEvent(() => {
        let target = document.getElementById(id.wrapper)
        console.log(id.wrapper)
        target.classList.remove(uiClass.modal.hide)
        target.classList.add(uiClass.anim.fadein)
    })
}

function changeInnerHtml(id, text) {
    fireEvent(() => {
        let targetID = id
        console.log(targetID)
        let target = document.getElementById(targetID);
        console.log(target)
        target.innerHTML = text;
    })
}

function movePage(dist) {
    fireEvent(() => {
        setTimeout(() => {
            location.href = dist
        },2000)
    })
}