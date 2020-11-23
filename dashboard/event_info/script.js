'use strict';

let currentFile = 'event_info';
const detailButton = {};
const closeButton = {};

window.onload = function () {
    const reloadButton = document.getElementById('reloadButton');
    const initButton = document.getElementById('initButton');
    const titleButton = document.getElementById('titleButton');
    const topicsButton = document.getElementById('topicsButton');
    detailButton[0] = document.getElementById('detail0Button');
    detailButton[1] = document.getElementById('detail1Button');
    detailButton[2] = document.getElementById('detail2Button');
    detailButton[3] = document.getElementById('detail3Button');
    closeButton[0] = document.getElementById('close0Button');
    closeButton[1] = document.getElementById('close1Button');
    closeButton[2] = document.getElementById('close2Button');
    closeButton[3] = document.getElementById('close3Button');
    const listButton = document.getElementById('listButton');
    const endButton = document.getElementById('endButton');
    init();
}

function init() {
    nodecg.Replicant('data_event_pickup').on('change', newValue => {
        if (newValue == undefined) {
            return;
        }
        for (let i in newValue) {
            document.getElementById('eventPickupTitleText' + i).innerText = newValue[i].title;
            document.getElementById('eventPickupDateText' + i).innerText = newValue[i].date;
            document.getElementById('eventPickupDetailText' + i).innerText = newValue[i].detail;
        }
    });

    nodecg.Replicant('data_event_future').on('change', newValue => {
        if (newValue == undefined) {
            return;
        }
        for (let i in newValue) {
            document.getElementById('eventFutureTitleText' + i).innerText = newValue[i].title;
            document.getElementById('eventFutureDateText' + i).innerText = newValue[i].date;
        }
    });
}

function reload() {
    nodecg.sendMessage('reload_event_future');
    nodecg.sendMessage('reload_event_pickup');
}

function showInit() {
    initButton.disabled = true;
    titleButton.disabled = false;
    nodecg.sendMessage('change_' + currentFile);
}

function showTitle() {
    titleButton.disabled = true;
    listButton.disabled = false;
    nodecg.sendMessage('title_' + currentFile);
}

function showList() {
    listButton.disabled = true;
    topicsButton.disabled = false;
    nodecg.sendMessage('list_' + currentFile);
}

function showTopics() {
    topicsButton.disabled = true;
    detail0Button.disabled = false;
    nodecg.sendMessage('topics_' + currentFile);
}

function showDetail(num) {
    detailButton[num].disabled = true;
    closeButton[num].disabled = false;
    nodecg.sendMessage('detail_' + currentFile, num);
}

function closeDetail(num) {
    closeButton[num].disabled = true;
    if (num + 1 < 4) {
        detailButton[num + 1].disabled = false;   
    } else {
        endButton.disabled = false;
    }
    nodecg.sendMessage('close_' + currentFile, num);
}

function showEnd() {
    endButton.disabled = true;
    initButton.disabled = false;
    nodecg.sendMessage('end_' + currentFile);
}