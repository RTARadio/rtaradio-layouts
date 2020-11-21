'use strict';

let currentFile = 'record_news';

window.onload = function () {
    const reloadButton = document.getElementById('reloadButton');
    const initButton = document.getElementById('initButton');
    const titleButton = document.getElementById('titleButton');
    const topics0Button = document.getElementById('topics0Button');
    const detail0Button = document.getElementById('detail0Button');
    const topics1Button = document.getElementById('topics1Button');
    const detail1Button = document.getElementById('detail1Button');
    const endButton = document.getElementById('endButton');
    init();
}

function init() {
    nodecg.Replicant('data_top_record').on('change', newValue => {
        if (newValue == undefined) {
            return;
        }
        for (let i in newValue) {
            document.getElementById('topRunnerText' + i).innerText = newValue[i].runner_name;
            document.getElementById('topGameTitleText' + i).innerText = newValue[i].game_title;
            document.getElementById('topCategoryText' + i).innerText = newValue[i].category;
            document.getElementById('topRecordTimeText' + i).innerText = newValue[i].time;
            if (newValue[i].date != '') {
                document.getElementById('topRecordDateText').innerText = newValue[i].date;
                document.getElementById('topDescriptionText').innerText = newValue[i].description;
            }
        }
    });

    nodecg.Replicant('data_pb_record').on('change', newValue => {
        if (newValue == undefined) {
            return;
        }
        for (let i in newValue) {
            document.getElementById('pbRunnerText' + i).innerText = newValue[i].runner_name;
            document.getElementById('pbGameTitleText' + i).innerText = newValue[i].game_title;
            document.getElementById('pbCategoryText' + i).innerText = newValue[i].category;
            document.getElementById('pbRecordTimeText' + i).innerText = newValue[i].time;
            if (newValue[i].date != '') {
                document.getElementById('pbRecordDateText').innerText = newValue[i].date;
                document.getElementById('pbDescriptionText').innerText = newValue[i].description;
            }
        }
    });
}

function reload() {
    nodecg.sendMessage('reload_' + currentFile);
}

function showInit() {
    initButton.disabled = true;
    titleButton.disabled = false;
    nodecg.sendMessage('change_' + currentFile);
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
    topics1Button.disabled = false;
    nodecg.sendMessage('detail0_' + currentFile);
}

function showTopics1() {
    topics1Button.disabled = true;
    detail1Button.disabled = false;
    nodecg.sendMessage('topics1_' + currentFile);
}

function showDetail1() {
    detail1Button.disabled = true;
    endButton.disabled = false;
    nodecg.sendMessage('detail1_' + currentFile);
}

function showEnd() {
    endButton.disabled = true;
    initButton.disabled = false;
    nodecg.sendMessage('end_' + currentFile);
}