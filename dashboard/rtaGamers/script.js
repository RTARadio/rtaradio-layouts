'use strict';

let currentFile = 'rta_gamers';

window.onload = function () {
    const reloadButton = document.getElementById('reloadButton');
    const titleButton = document.getElementById('titleButton');
    const topics0Button = document.getElementById('topics0Button');
    const detail0Button = document.getElementById('detail0Button');
    const endButton = document.getElementById('endButton');
    init();
}

function init() {
    const dataRep = nodecg.Replicant('data_' + currentFile);
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

    const imageAssets = nodecg.Replicant('assets:rtaGamers');
    imageAssets.on('change', newValue => {
        if (newValue == undefined) {
            return;
        }
        let proxy = new Proxy(newValue[0], {});
        document.getElementById('gamersDetailImage').src = proxy.url;
    });
}

function reload() {
    nodecg.sendMessage('reload_' + currentFile);
}

function showTitle() {
    titleButton.disabled = true;
    topics0Button.disabled = false;
    nodecg.sendMessage('title_' + currentFile);
}

function showTopics0() {
    topics0Button.disabled = true;
    detail0Button.disabled = false;
    nodecg.sendMessage('topics0_' + currentFile);
}

function showDetail0() {
    detail0Button.disabled = true;
    endButton.disabled = false;
    nodecg.sendMessage('detail0_' + currentFile);
}

function showEnd() {
    endButton.disabled = true;
    titleButton.disabled = false;
    nodecg.sendMessage('end_' + currentFile);
}