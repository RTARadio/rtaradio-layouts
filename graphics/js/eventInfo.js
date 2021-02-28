'use strict';

// 現在のファイル名
const CURRENT_FILE = 'eventInfo';
const EVENT_NEW = 'eventNew';
const EVENT_PICKUP = 'eventPickup';
const EVENT_FUTURE = 'eventFuture';

// アニメーション定義
const ANIMATION = {
    EASING_NORMAL: 'easeOutBack',
    EASING_REVERSE: 'easeInBack',
    TRANSLATE_NORMAL: 1400,
    TRANSLATE_REVERSE: -1400,
    DURATION_TIME: 500,
    DELAY_TIME: 1000
}

// 使用する変数
let eventNewData;
let eventPickupData;
let eventFutureData;

let eventPickupShowFirst = false;

window.onload = function () {
    // Replicantの設定
    nodecg.Replicant(`${EVENT_NEW}Data`).on("change", newValue => {
        if (newValue == undefined) {
            return;
        }
        eventNewData = newValue;
    });

    nodecg.Replicant(`${EVENT_PICKUP}Data`).on("change", newValue => {
        if (newValue == undefined) {
            return;
        }
        eventPickupData = newValue;
    });
    
    nodecg.Replicant(`${EVENT_FUTURE}Data`).on("change", newValue => {
        if (newValue == undefined) {
            return;
        }
        eventFutureData = newValue;
    });
}

function showTitle() {
    anime({
        targets: '#eventInfoTitle',
        translateX: ANIMATION.TRANSLATE_NORMAL,
        easing: ANIMATION.EASING_NORMAL,
        duration: ANIMATION.DURATION_TIME,
    });
}

function showNew(page) {
    let close_targets = '#eventInfoNew .el'
    if (page == 1) {
        close_targets = '#eventInfoTitle'
    }
    anime({
        targets: close_targets,
        translateX: ANIMATION.TRANSLATE_REVERSE,
        easing: ANIMATION.EASING_REVERSE,
        duration: ANIMATION.DURATION_TIME,
        delay: anime.stagger(100),
        complete: () => {
            eventInfoNew.innerHTML = `
            <div class="eventTopicsTitle skyblueBoxProperty el">
                <span>新着のイベント </span>
                <span class="font48">${page}/${Math.floor(eventNewData.length / 4) + 1}</span>
            </div>`;
            let calcPage = (page - 1) * 4;
            for(let i in eventNewData) {
                if (calcPage <= i && i <= calcPage + 3) {
                    eventInfoNew.innerHTML += `
                    <div class="eventTopicsBox blueBoxProperty el">
                        <span class="left">${eventNewData[i].date}</span>
                        <br>
                        <span class="center">${eventNewData[i].title}</span>
                    </div>`;
                }
            }
            anime({
                targets: '#eventInfoNew .el',
                translateX: ANIMATION.TRANSLATE_NORMAL,
                easing: ANIMATION.EASING_NORMAL,
                duration: ANIMATION.DURATION_TIME,
                delay: anime.stagger(100)
            });
        }
    });
}

function showPickup(page) {
    let close_targets = '#eventInfoDetail';
    if (!eventPickupShowFirst) {
        close_targets = '#eventInfoNew .el';
        eventPickupShowFirst = true;
    }
    anime({
        targets: close_targets,
        translateX: ANIMATION.TRANSLATE_REVERSE,
        easing: ANIMATION.EASING_REVERSE,
        duration: ANIMATION.DURATION_TIME,
        delay: anime.stagger(100),
        complete: () => {
            eventInfoPickup.innerHTML = `
            <div class="eventTopicsTitle skyblueBoxProperty el">
                <span>直近開催のイベント </span>
                <span class="font48">${page}/${Math.floor(eventPickupData.length / 4) + 1}</span>
            </div>`;
            let calcPage = (page - 1) * 4;
            for(let i in eventPickupData) {
                if (calcPage <= i && i <= calcPage + 3) {
                    eventInfoPickup.innerHTML += `
                    <div id="eventPickupText${i}" class="eventTopicsBox blueBoxProperty el">
                        <span class="left">${eventPickupData[i].date}</span>
                        <br>
                        <span class="center">${eventPickupData[i].title}</span>
                    </div>`;
                }
            }
            anime({
                targets: '#eventInfoPickup .el',
                translateX: ANIMATION.TRANSLATE_NORMAL,
                easing: ANIMATION.EASING_NORMAL,
                duration: ANIMATION.DURATION_TIME,
                delay: anime.stagger(100)
            });
        }
    });
}

function showDetail(pickup) {
    document.getElementById(`eventPickupText${pickup}`).style.background = "linear-gradient(to right, #FFFFFF00 0%,  #4683b4 10%, #4683b4 90%, #FFFFFF00 100%)";
    anime({
        targets: '#eventInfoPickup .el',
        translateX: ANIMATION.TRANSLATE_REVERSE,
        easing: ANIMATION.EASING_REVERSE,
        duration: ANIMATION.DURATION_TIME,
        delay: anime.stagger(100, {start: ANIMATION.DELAY_TIME}),
        complete: () => {
            for(let i in eventPickupData) {
                if (i == pickup) {
                    eventInfoDetail.innerHTML = `
                    <div class="eventTitleBox blueBoxProperty">
                        <span class="left">${eventPickupData[i].title}</span>
                        <br>
                        <span class="right">${eventPickupData[i].date}</span>
                    </div>
                    <div class="eventDetailBox blueBoxProperty">
                        <span id="eventDescriptionText"></span>
                    </div>`;
                    document.getElementById('eventDescriptionText').innerText = eventPickupData[i].detail;
                }
            }
            anime({
                targets: `#eventInfoDetail`,
                translateX: ANIMATION.TRANSLATE_NORMAL,
                easing: ANIMATION.EASING_NORMAL,
                duration: ANIMATION.DURATION_TIME
            });
        }
    });
}

function showFuture(page) {
    let close_targets = '#eventInfoFuture .el'
    if (page == 1) {
        close_targets = '#eventInfoDetail'
    }
    anime({
        targets: close_targets,
        translateX: ANIMATION.TRANSLATE_REVERSE,
        easing: ANIMATION.EASING_REVERSE,
        duration: ANIMATION.DURATION_TIME,
        delay: anime.stagger(100),
        complete: () => {
            eventInfoFuture.innerHTML = `
            <div class="eventTopicsTitle skyblueBoxProperty el">
                <span>今後のイベント </span>
                <span class="font48">${page}/${Math.floor(eventFutureData.length / 4) + 1}</span>
            </div>`;
            let calcPage = (page - 1) * 4;
            for(let i in eventFutureData) {
                if (calcPage <= i && i <= calcPage + 3) {
                    eventInfoFuture.innerHTML += `
                    <div class="eventTopicsBox blueBoxProperty el">
                        <span class="left">${eventFutureData[i].date}</span>
                        <br>
                        <span class="center">${eventFutureData[i].title}</span>
                    </div>`;
                }
            }
            anime({
                targets: '#eventInfoFuture .el',
                translateX: ANIMATION.TRANSLATE_NORMAL,
                easing: ANIMATION.EASING_NORMAL,
                duration: ANIMATION.DURATION_TIME,
                delay: anime.stagger(100)
            });
        }
    });
}

function showEnd() {
    anime({
        targets: '#eventInfoFuture .el',
        translateX: ANIMATION.TRANSLATE_REVERSE,
        easing: ANIMATION.EASING_REVERSE,
        duration: ANIMATION.DURATION_TIME,
        delay: anime.stagger(100),
        complete: () => {
            anime({
                targets: '#eventInfoTitle',
                translateX: ANIMATION.TRANSLATE_NORMAL,
                easing: ANIMATION.EASING_NORMAL,
                duration: ANIMATION.DURATION_TIME
            });
        }
    });
}

nodecg.listenFor(`${CURRENT_FILE}Title`, showTitle);
nodecg.listenFor(`${CURRENT_FILE}New`, (newValue) => { showNew(newValue) });
nodecg.listenFor(`${CURRENT_FILE}Pickup`, (newValue) => { showPickup(newValue) });
nodecg.listenFor(`${CURRENT_FILE}Detail`, (newValue) => { showDetail(newValue) });
nodecg.listenFor(`${CURRENT_FILE}Future`, (newValue) => { showFuture(newValue) });
nodecg.listenFor(`${CURRENT_FILE}End`, showEnd);