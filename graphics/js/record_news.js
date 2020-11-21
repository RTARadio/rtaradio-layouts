'use strict';

// 使用する変数
let topRecordData;
let pbRecordData;

// Replicantの設定
nodecg.Replicant("data_top_record").on("change", newValue => {
    if (newValue == undefined) {
        return;
    }
    topRecordData = newValue;
});
nodecg.Replicant("data_pb_record").on("change", newValue => {
    if (newValue == undefined) {
        return;
    }
    pbRecordData = newValue;
});

// アニメーション初期化
let recordTitleAnimation;
let recordTitleAnimationRev;
let recordTopics0Animation;
let recordTopics0AnimationRev;
let recordDetail0Animation;
let recordDetail0AnimationRev;
let recordTopics1Animation;
let recordTopics1AnimationRev;
let recordDetail1Animation;
let recordDetail1AnimationRev;
let recordEndAnimation;
let recordAnimationEasing = 'easeOutBack';
let recordAnimationEasingRev = 'easeOutBack';

function init() {
    // 背景変更
    document.body.style.backgroundImage = "url(" + "record_news.png" + ")";

    // 他コーナーの非表示
    gamersTitle.style.visibility = "hidden";

    // 初期化
    recordTitle.style.visibility = "hidden";
    recordTopTopics.style.visibility = "hidden";
    recordTopDetail.style.visibility = "hidden";
    recordPbTopics.style.visibility = "hidden";
    recordPbDetail.style.visibility = "hidden";

    // タイトル書き換え
    recordTitle.innerHTML = '<span></span><br>'
    + '<span class="titleBody">今週の記録更新</span><br>'
    + '<span></span>';

    // 日本/世界記録更新書き換え
    recordTopTopics.innerHTML = '<div class="recordTopicsTitle el">日本/世界記録更新</div>';
    for(let i in topRecordData) {
        recordTopTopics.innerHTML += '<div id="topRecordText' + i + '" class="recordTopicsBox el">'
        + '<span class="left">' + topRecordData[i].game_title + '</span><span class="right">' + topRecordData[i].runner_name + '</span><br>'
        + '<span class="left">' + topRecordData[i].category + '</span><span class="right">' + topRecordData[i].time + '</span>'
        + '</div>';
    }

    // 日本/世界記録更新ピックアップ書き換え
    for(let i in topRecordData) {
        if (topRecordData[i].date != "") {
            recordTopDetail.innerHTML = '<div class="recordTitleBox">'
            + '<span class="left">' + topRecordData[i].game_title + '</span><span class="right">' + topRecordData[i].category + '</span>'
            + '</div>'
            + '<div class="recordDetailBox">'
            + '<span class="left">' + topRecordData[i].date + '</span><span class="right">' + topRecordData[i].time + '</span><br>'
            + '<span class="left">' + topRecordData[i].runner_name + ' さん</span><br><br>'
            + '<span id="topDescriptionText"></span>'
            + '</div>';
            document.getElementById('topDescriptionText').innerText = topRecordData[i].description;
        }
    }

    // 自己記録更新書き換え
    recordPbTopics.innerHTML = '<div class="recordTopicsTitle el">自己記録更新</div>';
    for(let i in pbRecordData) {
        recordPbTopics.innerHTML += '<div id="pbRecordText' + i + '" class="recordTopicsBox el">'
        + '<span class="left">' + pbRecordData[i].game_title + '</span><span class="right">' + pbRecordData[i].runner_name + '</span><br>'
        + '<span class="left">' + pbRecordData[i].category + '</span><span class="right">' + pbRecordData[i].time + '</span>'
        + '</div>';
    }

    // 自己記録更新ピックアップ書き換え
    for(let i in pbRecordData) {
        if (pbRecordData[i].date != "") {
            recordPbDetail.innerHTML = '<div class="recordTitleBox">'
            + '<span class="left">' + pbRecordData[i].game_title + '</span><span class="right">' + pbRecordData[i].category + '</span>'
            + '</div>'
            + '<div class="recordDetailBox">'
            + '<span class="left">' + pbRecordData[i].date + '</span><span class="right">' + pbRecordData[i].time + '</span><br>'
            + '<span class="left">' + pbRecordData[i].runner_name + ' さん</span><br><br>'
            + '<span id="pbDescriptionText"></span>'
            + '</div>';
            document.getElementById('pbDescriptionText').innerText = pbRecordData[i].description;
        }
    }

    // アニメーションの指定
    recordTitleAnimation = anime({
        targets: '#recordTitle',
        translateX: 1100,
        easing: recordAnimationEasing,
        duration: 1000,
        delay: 1500
    });
    
    recordTitleAnimationRev = anime({
        targets: '#recordTitle',
        translateX: 1100,
        easing: recordAnimationEasingRev,
        direction: 'reverse',
        duration: 1000
    });

    recordTopics0Animation = anime({
        targets: '#recordTopTopics .el',
        translateX: 1300,
        easing: recordAnimationEasing,
        duration: 1000,
        delay: anime.stagger(100, {start: 1500})
    });
    
    recordTopics0AnimationRev = anime({
        targets: '#recordTopTopics .el',
        translateX: 1300,
        easing: recordAnimationEasingRev,
        duration: 1000,
        delay: anime.stagger(100),
        direction: 'reverse',
        endDelay: 1000
    });
    
    recordDetail0Animation = anime({
        targets: '#recordTopDetail',
        translateX: 1300,
        easing: recordAnimationEasing,
        duration: 1000,
        delay: 2500
    });

    recordDetail0AnimationRev = anime({
        targets: '#recordTopDetail',
        translateX: 1300,
        easing: recordAnimationEasingRev,
        direction: 'reverse',
        duration: 1000
    });

    recordTopics1Animation = anime({
        targets: '#recordPbTopics .el',
        translateX: 1300,
        easing: recordAnimationEasing,
        duration: 1000,
        delay: anime.stagger(100, {start: 1500})
    });
    
    recordTopics1AnimationRev = anime({
        targets: '#recordPbTopics .el',
        translateX: 1300,
        easing: recordAnimationEasingRev,
        duration: 1000,
        delay: anime.stagger(100),
        direction: 'reverse',
        endDelay: 1000
    });
    
    recordDetail1Animation = anime({
        targets: '#recordPbDetail',
        translateX: 1300,
        easing: recordAnimationEasing,
        duration: 1000,
        delay: 2500
    });

    recordDetail1AnimationRev = anime({
        targets: '#recordPbDetail',
        translateX: 1300,
        easing: recordAnimationEasingRev,
        direction: 'reverse',
        duration: 1000
    });
}

function showTitle() {
    recordTitle.style.visibility = "visible";
    recordTitleAnimation.restart();
}

function showTopics0() {
    for(let i in topRecordData) {
        document.getElementById('topRecordText' + i).style.backgroundColor = "black";
    }
    recordTitleAnimationRev.restart();
    recordTopTopics.style.visibility = "visible";
    recordTopics0Animation.restart();

}


function showDetail0() {
    for(let i in topRecordData) {
        if (topRecordData[i].date != "") {
            document.getElementById('topRecordText' + i).style.backgroundColor = "blue";
        }
    }
    recordTopics0AnimationRev.restart();
    recordTopDetail.style.visibility = "visible";
    recordDetail0Animation.restart();
}

function showTopics1() {
    for(let i in pbRecordData) {
        document.getElementById('pbRecordText' + i).style.backgroundColor = "black";
    }
    recordDetail0AnimationRev.restart();
    recordPbTopics.style.visibility = "visible";
    recordTopics1Animation.restart();
}

function showDetail1() {
    for(let i in pbRecordData) {
        if (pbRecordData[i].date != "") {
            document.getElementById('pbRecordText' + i).style.backgroundColor = "blue";
        }
    }
    recordTopics1AnimationRev.restart();
    recordPbDetail.style.visibility = "visible";
    recordDetail1Animation.restart();
}

function showEnd() {
    recordDetail1AnimationRev.restart();
    recordTitleAnimation.restart();
}

nodecg.listenFor('change_record_news', init);
nodecg.listenFor('title_record_news', showTitle);
nodecg.listenFor('topics0_record_news', showTopics0);
nodecg.listenFor('detail0_record_news', showDetail0);
nodecg.listenFor('topics1_record_news', showTopics1);
nodecg.listenFor('detail1_record_news', showDetail1);
nodecg.listenFor('end_record_news', showEnd);