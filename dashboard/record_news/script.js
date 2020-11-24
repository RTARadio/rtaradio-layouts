'use strict';

let currentFile = 'record_news';

window.onload = function () {
    const reloadButton = document.getElementById('reloadButton');
    const initButton = document.getElementById('initButton');
    const titleButton = document.getElementById('titleButton');
    const topicsTopButton = document.getElementById('topicsTopButton');
    const detailTopButton = document.getElementById('detailTopButton');
    const topicsPbButton = document.getElementById('topicsPbButton');
    const detailPbButton = document.getElementById('detailPbButton');
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
    nodecg.sendMessage('reload_pb_record');
    nodecg.sendMessage('reload_top_record');
}

function showInit() {
    initButton.disabled = true;
    titleButton.disabled = false;
    nodecg.sendMessage('change_' + currentFile);
}

function showTitle() {
    titleButton.disabled = true;
    topicsTopButton.disabled = false;
    nodecg.sendMessage('title_' + currentFile);
}

function showTopicsTop() {
    topicsTopButton.disabled = true;
    detailTopButton.disabled = false;
    nodecg.sendMessage('topics_top_' + currentFile);
}

function showDetailTop() {
    detailTopButton.disabled = true;
    topicsPbButton.disabled = false;
    nodecg.sendMessage('detail_top_' + currentFile);
}

function showTopicsPb() {
    topicsPbButton.disabled = true;
    detailPbButton.disabled = false;
    nodecg.sendMessage('topics_pb_' + currentFile);
}

function showDetailPb() {
    detailPbButton.disabled = true;
    endButton.disabled = false;
    nodecg.sendMessage('detail_pb_' + currentFile);
}

function showEnd() {
    endButton.disabled = true;
    initButton.disabled = false;
    nodecg.sendMessage('end_' + currentFile);
}