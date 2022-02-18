console.log("background script working of algm");
let obj = {};
var t = null;
var minute;
var sec;
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "tickbtnclicked") {
            obj = request.object;
            // console.log(obj);
            if (t != null) {
                clearTimeout(t);
                t = null;
            }
            if (obj.type == "time") {
                timefunction();
            } else if (obj.type == "number") {

                if (obj.select == "members") {
                    try {
                        membersfunction();
                    } catch {
                        console.log("ERROR JOIN MEET");
                    }
                } else if (obj.select == "minutes") {
                    minute = obj.value;
                    sec = 01;
                    minutesfunction();
                }

            }

        }

        if (request.message == "stopbtnclicked") {
            console.log("stop btn clicked");
            clearTimeout(t);
            t = null;
        }
    }
);

function endCall() {
    console.log("STOP THE MEET");
    try {
		var end_button = document.querySelector(".VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.tWDL4c.jh0Tpd.Gt6sbf.QQrMi.NKaD6");
		// console.log(end_button);
		end_button.click();
    } catch {
        console.log("ERROR");
    }
}

function timefunction() {
    // console.log("time fxn",obj.value);
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    let time = hours + ":" + minutes;
    // console.log(time);
    if (time == obj.value) {
	endCall();
    } else {
        t = setTimeout(timefunction, 60000);
    }
}
function membersfunction() {
    console.log("member fxn", obj.value);
    console.log("checking members");
	console.log(document.querySelector(".uGOf1d").innerText);
	var member_number = document.querySelector(".uGOf1d").innerText;
	var members_int = parseInt(member_number);
    if (members_int < obj.value) {
	endCall();
    }
    else {
        t = setTimeout(membersfunction, 5000);
    }
}
function minutesfunction() {
    console.log("minutes fxn", obj.value);
    console.log(minute, sec);
    sec--;
    if (sec == 00) {
        minute--;
        sec = 60;
    }
    if (minute >= 0) {
        t = setTimeout(minutesfunction, 1000);
    }
    else {
	endCall();
    }

}