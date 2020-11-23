'use strict';

// 使用する変数
let eventPickupData;
let eventFutureData;

// Replicantの設定
nodecg.Replicant("data_event_pickup").on("change", newValue => {
    if (newValue == undefined) {
        return;
    }
    eventPickupData = newValue;
});
nodecg.Replicant("data_event_future").on("change", newValue => {
    if (newValue == undefined) {
        return;
    }
    eventFutureData = newValue;
});

// アニメーション初期化
let eventTitleAnimation;
let eventTitleAnimationRev;
let eventListAnimation;
let eventListAnimationRev;
let eventTopicsAnimation;
let eventTopicsAnimationRev;
const eventDetailAnimation = {};
const eventDetailAnimationRev = {};
let eventEndAnimation;
let eventAnimationEasing = 'easeOutBack';
let eventAnimationEasingRev = 'easeOutBack';

function init() {
    // 背景変更
    document.body.style.backgroundImage = "url(" + "event_info.png" + ")";

    // 他コーナーの非表示
    gamersTitle.style.visibility = "hidden";

    // タイトル書き換え
    eventTitle.innerHTML = '<span class="titleHeader">RTA</span><br>'
    + '<span class="titleBody">イベント</span><br>'
    + '<span class="titleFooter">インフォメーション</span>';

    // 告知されたイベント一覧書き換え
    eventList.innerHTML = '<div class="eventTopicsTitle el">告知されたイベント</div>';
    for(let i in eventFutureData) {
        eventList.innerHTML += '<div id="eventListText' + i + '" class="eventTopicsBox el">'
        + '<span class="left">' + eventFutureData[i].date + '</span><br>'
        + '<span class="center">' + eventFutureData[i].title + '</span>'
        + '</div>';
    }

    // ピックアップイベント一覧書き換え
    eventTopics.innerHTML = '<div class="eventTopicsTitle el">開催予定のイベント</div>';
    for(let i in eventPickupData) {
        eventTopics.innerHTML += '<div id="eventPickupText' + i + '" class="eventTopicsBox el">'
        + '<span class="left">' + eventPickupData[i].date + '</span><br>'
        + '<span class="center">' + eventPickupData[i].title + '</span>'
        + '</div>';
    }

    // 各ピックアップ書き換え
    for(let i in eventPickupData) {
        eventDetail[i].innerHTML = '<div class="eventTitleBox">'
        + '<span class="left">' + eventPickupData[i].title + '</span><br>'
        + '<span class="right">' + eventPickupData[i].date + '</span>'
        + '</div>'
        + '<div class="eventDetailBox">'
        + '<span id="eventDescriptionText' + i + '"></span>'
        + '</div>';
        document.getElementById('eventDescriptionText' + i).innerText = eventPickupData[i].detail;
        eventDetailAnimation[i] = anime({
            targets: '#eventDetail' + i,
            translateX: 1300,
            easing: eventAnimationEasing,
            duration: 1000,
            delay: 2500
        });
        eventDetailAnimationRev[i] = anime({
            targets: '#eventDetail' + i,
            translateX: 1300,
            easing: eventAnimationEasingRev,
            direction: 'reverse',
            duration: 1000
        });
    }

    // アニメーションの指定
    eventTitleAnimation = anime({
        targets: '#eventTitle',
        translateX: 1100,
        easing: eventAnimationEasing,
        duration: 1000,
        delay: 2500
    });
    
    eventTitleAnimationRev = anime({
        targets: '#eventTitle',
        translateX: 1100,
        easing: eventAnimationEasingRev,
        direction: 'reverse',
        duration: 1000
    });

    eventListAnimation = anime({
        targets: '#eventList .el',
        translateX: 1300,
        easing: eventAnimationEasing,
        duration: 1000,
        delay: anime.stagger(100, {start: 1500})
    });
    
    eventListAnimationRev = anime({
        targets: '#eventList .el',
        translateX: 1300,
        easing: eventAnimationEasingRev,
        duration: 1000,
        delay: anime.stagger(100),
        direction: 'reverse'
    });

    eventTopicsAnimation = anime({
        targets: '#eventTopics .el',
        translateX: 1300,
        easing: eventAnimationEasing,
        duration: 1000,
        delay: anime.stagger(100, {start: 1500})
    });
    
    eventTopicsAnimationRev = anime({
        targets: '#eventTopics .el',
        translateX: 1300,
        easing: eventAnimationEasingRev,
        duration: 1000,
        delay: anime.stagger(100),
        direction: 'reverse',
        endDelay: 1000
    });
}

function showTitle() {
    eventTitle.style.visibility = "visible";
    eventTitleAnimation.restart();
}

function showList() {
    eventTitleAnimationRev.restart();
    eventList.style.visibility = "visible";
    eventListAnimation.restart();

}

function showTopics() {
    for(let i in eventPickupData) {
        document.getElementById('eventPickupText' + i).style.backgroundColor = "blue";
    }
    eventListAnimationRev.restart();
    eventTopics.style.visibility = "visible";
    eventTopicsAnimation.restart();
}

function showDetail(num) {
    document.getElementById('eventPickupText' + num).style.backgroundColor = "steelblue";
    eventTopicsAnimationRev.restart();
    eventDetail[num].style.visibility = "visible";
    eventDetailAnimation[num].restart();
}

function closeDetail(num) {
    document.getElementById('eventPickupText' + num).style.backgroundColor = "blue";
    eventDetailAnimationRev[num].restart();
    eventDetail[num].style.visibility = "visible";
    eventTopicsAnimation.restart();
}

function showEnd() {
    eventTopicsAnimationRev.restart();
    eventTitleAnimation.restart();
}

nodecg.listenFor('change_event_info', init);
nodecg.listenFor('title_event_info', showTitle);
nodecg.listenFor('list_event_info', showList);
nodecg.listenFor('topics_event_info', showTopics);
nodecg.listenFor('detail_event_info', (newValue) => { showDetail(newValue) });
nodecg.listenFor('close_event_info', (newValue) => { closeDetail(newValue) });
nodecg.listenFor('end_event_info', showEnd);