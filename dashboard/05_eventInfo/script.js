'use strict';

const CURRENT_FILE = 'eventInfo';
const EVENT_NEW = 'eventNew';
const EVENT_PICKUP = 'eventPickup';
const EVENT_FUTURE = 'eventFuture';

let eventInfoNewData;
let eventInfoPickupData;
let eventInfoFutureData;

let currentPageNew = 1;
let currentPagePickup = 1;
let currentPageFuture = 1;

let currentPickup = 0;

window.onload = function () {
    nodecg.Replicant(`${EVENT_NEW}Data`).on('change', newValue => {
        if (newValue == undefined) {
            return;
        }
        eventInfoNewData = newValue;
        eventInfoNew.innerHTML = ''
        for(let i in eventInfoNewData) {
            eventInfoNew.innerHTML += `
            <div>
            <hr class="border">
            <span>タイトル: ${eventInfoNewData[i].title}</span><br>
            <span>日付: ${eventInfoNewData[i].date}</span><br>
            </div>`;
        }
    });

    nodecg.Replicant(`${EVENT_PICKUP}Data`).on('change', newValue => {
        if (newValue == undefined) {
            return;
        }
        eventInfoPickupData = newValue;
        eventInfoPickup.innerHTML = ''
        for(let i in eventInfoPickupData) {
            eventInfoPickup.innerHTML += `
            <div>
            <hr class="border">
            <span>タイトル: ${eventInfoPickupData[i].title}</span><br>
            <span>日付: ${eventInfoPickupData[i].date}</span><br>
            <span>詳細: </span><span id="detailText${i}"></span><br>
            </div>`;
            document.getElementById(`detailText${i}`).innerText = eventInfoPickupData[i].detail;
        }
    });

    nodecg.Replicant(`${EVENT_FUTURE}Data`).on('change', newValue => {
        if (newValue == undefined) {
            return;
        }
        eventInfoFutureData = newValue;
        eventInfoFuture.innerHTML = ''
        for(let i in eventInfoFutureData) {
            eventInfoFuture.innerHTML += `
            <div>
            <hr class="border">
            <span>タイトル: ${eventInfoFutureData[i].title}</span><br>
            <span>日付: ${eventInfoFutureData[i].date}</span><br>
            </div>`;
        }
    });
}

function reload() {
    nodecg.sendMessage(`${EVENT_NEW}Reload`);
    nodecg.sendMessage(`${EVENT_PICKUP}Reload`);
    nodecg.sendMessage(`${EVENT_FUTURE}Reload`);
}

function showTitle() {
    titleButton.disabled = true;
    newButton.disabled = false;
    nodecg.sendMessage(`${CURRENT_FILE}Title`);
}

function showNew() {
    let maxPage = Math.floor(eventInfoNewData.length / 4) + 1
    nodecg.sendMessage(`${CURRENT_FILE}New`, currentPageNew);
    if (currentPageNew == maxPage) {
        newButton.disabled = true;
        pickupButton.disabled = false;
    } else {
        currentPageNew += 1;
    }
}

function showPickup() {
    nodecg.sendMessage(`${CURRENT_FILE}Pickup`, currentPagePickup);
    pickupButton.disabled = true;
    detailButton.disabled = false;
}

function showDetail() {
    let maxPickup = eventInfoPickupData.length - 1;
    nodecg.sendMessage(`${CURRENT_FILE}Detail`, currentPickup);
    if (currentPickup == maxPickup) {
        detailButton.disabled = true;
        futureButton.disabled = false;
    } else {
        detailButton.disabled = true;
        pickupButton.disabled = false;
        currentPickup += 1;
        if (currentPickup % 4 == 0) {
            currentPagePickup += 1;
        }
    }
}

function showFuture() {
    let maxPage = Math.floor(eventInfoFutureData.length / 4) + 1
    nodecg.sendMessage(`${CURRENT_FILE}Future`, currentPageFuture);
    if (currentPageFuture == maxPage) {
        futureButton.disabled = true;
        endButton.disabled = false;
    } else {
        currentPageFuture += 1;
    }
}

function showEnd() {
    endButton.disabled = true;
    titleButton.disabled = false;
    nodecg.sendMessage(`${CURRENT_FILE}End`);
}