'use strict';

let currentFile = 'event_info';
const eventPickup = 'event_pickup';
const eventFuture = 'event_future';
const detailButton = {};
const closeButton = {};

window.onload = function () {
    nodecg.Replicant(`${eventPickup}Data`).on('change', newValue => {
        if (newValue == undefined) {
            return;
        }
        for (let i in newValue) {
            document.getElementById(`eventPickupTitleText${i}`).innerText = newValue[i].title;
            document.getElementById(`eventPickupDateText${i}`).innerText = newValue[i].date;
            document.getElementById(`eventPickupDetailText${i}`).innerText = newValue[i].detail;
        }
    });

    nodecg.Replicant(`${eventFuture}Data`).on('change', newValue => {
        if (newValue == undefined) {
            return;
        }
        for (let i in newValue) {
            document.getElementById(`eventFutureTitleText${i}`).innerText = newValue[i].title;
            document.getElementById(`eventFutureDateText${i}`).innerText = newValue[i].date;
        }
    });
}

function reload() {
    nodecg.sendMessage(`${eventPickup}Reload`);
    nodecg.sendMessage(`${eventFuture}Reload`);
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
    document.getElementById(`detail${num}Button`).disabled = true;
    document.getElementById(`close${num}Button`).disabled = false;
    nodecg.sendMessage('detail_' + currentFile, num);
}

function closeDetail(num) {
    document.getElementById(`close${num}Button`).disabled = true;
    if (num + 1 < 4) {
        document.getElementById(`detail${num + 1}Button`).disabled = false;   
    } else {
        endButton.disabled = false;
    }
    nodecg.sendMessage('close_' + currentFile, num);
}

function showEnd() {
    endButton.disabled = true;
    titleButton.disabled = false;
    nodecg.sendMessage('end_' + currentFile);
}