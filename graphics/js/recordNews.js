'use strict';

// 現在のファイル名
const CURRENT_FILE = "recordNews"

// アニメーション定義
const ANIMATION = {
    EASING_NORMAL: 'easeOutBack',
    EASING_REVERSE: 'easeInBack',
    TRANSLATE_NORMAL: 1300,
    TRANSLATE_REVERSE: -1300,
    DURATION_TIME: 1000,
    DELAY_TIME: 1500
}

// 使用する変数
let topRecordData;
let pbRecordData;

window.onload = function () {
    // Replicantの設定
    nodecg.Replicant("top_recordData").on("change", newValue => {
        if (newValue == undefined) {
            return;
        }
        topRecordData = newValue;

        // 日本/世界記録更新書き換え
        recordTopTopics.innerHTML = '<img class="recordTopicsTitle el" src="material/recordNews_title_top.png">';
        for(let i in topRecordData) {
            recordTopTopics.innerHTML += `<div id="topRecordText${i}" class="recordTopicsBox el">
            <span class="left">${topRecordData[i].game_title}</span><span class="right">${topRecordData[i].runner_name}</span><br>
            <span class="left">${topRecordData[i].category}</span><span class="right">${topRecordData[i].time}</span>
            </div>`;
        }
    
        // 日本/世界記録更新ピックアップ書き換え
        for(let i in topRecordData) {
            if (topRecordData[i].date != "") {
                recordTopDetail.innerHTML = `<div class="recordTitleBox">
                <span class="left">${topRecordData[i].game_title}</span><span class="right">${topRecordData[i].category}</span>
                </div>
                <div class="recordDetailBox">
                <span class="left">${topRecordData[i].date}</span><span class="right">${topRecordData[i].time}</span><br>
                <span class="left">${topRecordData[i].runner_name}さん</span><br><br>
                <span id="topDescriptionText"></span>
                </div>`;
                document.getElementById('topDescriptionText').innerText = topRecordData[i].description;
            }
        }
    });
    nodecg.Replicant("pb_recordData").on("change", newValue => {
        if (newValue == undefined) {
            return;
        }
        pbRecordData = newValue;

        // 自己記録更新書き換え
        recordPbTopics.innerHTML = '<img class="recordTopicsTitle el" src="material/recordNews_title_pb.png">';
        for(let i in pbRecordData) {
            recordPbTopics.innerHTML += `<div id="pbRecordText${i}" class="recordTopicsBox el">
            <span class="left">${pbRecordData[i].game_title}</span><span class="right">${pbRecordData[i].runner_name}</span><br>
            <span class="left">${pbRecordData[i].category}</span><span class="right">${pbRecordData[i].time}</span>
            </div>`;
        }
    
        // 自己記録更新ピックアップ書き換え
        for(let i in pbRecordData) {
            if (pbRecordData[i].date != "") {
                recordPbDetail.innerHTML = `<div class="recordTitleBox">
                <span class="left">${pbRecordData[i].game_title}</span><span class="right">${pbRecordData[i].category}</span>
                </div>
                <div class="recordDetailBox">
                <span class="left">${pbRecordData[i].date}</span><span class="right">${pbRecordData[i].time}</span><br>
                <span class="left">${pbRecordData[i].runner_name}さん</span><br><br>
                <span id="pbDescriptionText"></span>
                </div>`;
                document.getElementById('pbDescriptionText').innerText = pbRecordData[i].description;
            }
        }
    });
}

function showTitle() {
    anime({
        targets: '#recordTitle',
        translateX: ANIMATION.TRANSLATE_NORMAL,
        easing: ANIMATION.EASING_NORMAL,
        duration: ANIMATION.DURATION_TIME
    });
}

function showTopicsTop() {
    for(let i in topRecordData) {
        document.getElementById('topRecordText' + i).style.backgroundColor = "black";
    }
    anime({
        targets: '#recordTitle',
        translateX: ANIMATION.TRANSLATE_REVERSE,
        easing: ANIMATION.EASING_REVERSE,
        duration: ANIMATION.DURATION_TIME,
        complete: () => {
            anime({
                targets: '#recordTopTopics .el',
                translateX: ANIMATION.TRANSLATE_NORMAL,
                easing: ANIMATION.EASING_NORMAL,
                duration: ANIMATION.DURATION_TIME,
                delay: anime.stagger(100)
            });
        }
    });
}

function showDetailTop() {
    for(let i in topRecordData) {
        if (topRecordData[i].date != "") {
            document.getElementById('topRecordText' + i).style.backgroundColor = "blue";
        }
    }
    console.log("showDetailTop1");
    anime({
        targets: '#recordTopTopics .el',
        translateX: ANIMATION.TRANSLATE_REVERSE,
        easing: ANIMATION.EASING_REVERSE,
        duration: ANIMATION.DURATION_TIME,
        delay: anime.stagger(100, {start: ANIMATION.DELAY_TIME}),
        complete: () => {
            console.log("showDetailTop2");
            anime({
                targets: '#recordTopDetail',
                translateX: ANIMATION.TRANSLATE_NORMAL,
                easing: ANIMATION.EASING_NORMAL,
                duration: ANIMATION.DURATION_TIME
            });
        }
    });
}

function showTopicsPb() {
    for(let i in pbRecordData) {
        document.getElementById('pbRecordText' + i).style.backgroundColor = "black";
    }
    anime({
        targets: '#recordTopDetail',
        translateX: ANIMATION.TRANSLATE_REVERSE,
        easing: ANIMATION.EASING_REVERSE,
        duration: ANIMATION.DURATION_TIME,
        complete: () => {
            anime({
                targets: '#recordPbTopics .el',
                translateX: ANIMATION.TRANSLATE_NORMAL,
                easing: ANIMATION.EASING_NORMAL,
                duration: ANIMATION.DURATION_TIME,
                delay: anime.stagger(100)
            });
        }
    });
}

function showDetailPb() {
    for(let i in pbRecordData) {
        if (pbRecordData[i].date != "") {
            document.getElementById('pbRecordText' + i).style.backgroundColor = "blue";
        }
    }
    anime({
        targets: '#recordPbTopics .el',
        translateX: ANIMATION.TRANSLATE_REVERSE,
        easing: ANIMATION.EASING_REVERSE,
        duration: ANIMATION.DURATION_TIME,
        delay: anime.stagger(100, {start: ANIMATION.DELAY_TIME}),
        complete: () => {
            anime({
                targets: '#recordPbDetail',
                translateX: ANIMATION.TRANSLATE_NORMAL,
                easing: ANIMATION.EASING_NORMAL,
                duration: ANIMATION.DURATION_TIME
            });
        }
    });
}

function showEnd() {
    anime({
        targets: '#recordPbDetail',
        translateX: ANIMATION.TRANSLATE_REVERSE,
        easing: ANIMATION.EASING_REVERSE,
        duration: ANIMATION.DURATION_TIME,
        complete: () => {
            anime({
                targets: '#recordTitle',
                translateX: ANIMATION.TRANSLATE_NORMAL,
                easing: ANIMATION.EASING_NORMAL,
                duration: ANIMATION.DURATION_TIME
            });
        }
    });
}

nodecg.listenFor(`${CURRENT_FILE}Title`, showTitle);
nodecg.listenFor(`${CURRENT_FILE}TopicsTop`, showTopicsTop);
nodecg.listenFor(`${CURRENT_FILE}DetailTop`, showDetailTop);
nodecg.listenFor(`${CURRENT_FILE}TopicsPb`, showTopicsPb);
nodecg.listenFor(`${CURRENT_FILE}DetailPb`, showDetailPb);
nodecg.listenFor(`${CURRENT_FILE}End`, showEnd);