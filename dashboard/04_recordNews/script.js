'use strict';

const CURRENT_FILE = 'recordNews';
const TOP_RECORD = 'top_record';
const PB_RECORD = 'pb_record';

window.onload = function () {
    nodecg.Replicant(`${TOP_RECORD}Data`).on('change', newValue => {
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

    nodecg.Replicant(`${PB_RECORD}Data`).on('change', newValue => {
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
    nodecg.sendMessage(`${TOP_RECORD}Reload`);
    nodecg.sendMessage(`${PB_RECORD}Reload`);
}

function showTitle() {
    titleButton.disabled = true;
    topicsTopButton.disabled = false;
    nodecg.sendMessage(`${CURRENT_FILE}Title`);
}

function showTopicsTop() {
    topicsTopButton.disabled = true;
    detailTopButton.disabled = false;
    nodecg.sendMessage(`${CURRENT_FILE}TopicsTop`);
}

function showDetailTop() {
    detailTopButton.disabled = true;
    topicsPbButton.disabled = false;
    nodecg.sendMessage(`${CURRENT_FILE}DetailTop`);
}

function showTopicsPb() {
    topicsPbButton.disabled = true;
    detailPbButton.disabled = false;
    nodecg.sendMessage(`${CURRENT_FILE}TopicsPb`);
}

function showDetailPb() {
    detailPbButton.disabled = true;
    endButton.disabled = false;
    nodecg.sendMessage(`${CURRENT_FILE}DetailPb`);
}

function showEnd() {
    endButton.disabled = true;
    titleButton.disabled = false;
    nodecg.sendMessage(`${CURRENT_FILE}End`);
}