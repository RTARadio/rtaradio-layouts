'use strict';

const CURRENT_FILE = 'rtaGamers';

window.onload = function () {
    const dataRep = nodecg.Replicant(`${CURRENT_FILE}Data`);
    dataRep.on('change', newValue => {
        if (newValue == undefined) {
            return;
        }
        document.getElementById('topicText1').innerText = newValue[0].title;
        document.getElementById('topicText2').innerText = newValue[1].title;
        document.getElementById('topicText3').innerText = newValue[2].title;
        document.getElementById('topicText4').innerText = newValue[3].title;
        for(let i in newValue) {
            if (newValue[i].writter != '') {
                document.getElementById('titleText').innerText = newValue[i].title;
                document.getElementById('writterText').innerText = newValue[i].writter;
            }
        }
    });

    nodecg.Replicant(`assets:${CURRENT_FILE}`).on('change', newValue => {
        if (newValue[0] == undefined) {
            return;
        }
        let proxy = new Proxy(newValue[0], {});
        document.getElementById('gamersDetailImage').src = proxy.url;
    });
}

function reload() {
    nodecg.sendMessage(`${CURRENT_FILE}Reload`);
}

function showTitle() {
    titleButton.disabled = true;
    topicsButton.disabled = false;
    nodecg.sendMessage(`${CURRENT_FILE}Title`);
}

function showTopics() {
    topicsButton.disabled = true;
    detailButton.disabled = false;
    nodecg.sendMessage(`${CURRENT_FILE}Topics`);
}

function showDetail() {
    detailButton.disabled = true;
    endButton.disabled = false;
    nodecg.sendMessage(`${CURRENT_FILE}Detail`);
}

function showEnd() {
    endButton.disabled = true;
    titleButton.disabled = false;
    nodecg.sendMessage(`${CURRENT_FILE}End`);
}