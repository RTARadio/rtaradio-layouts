'use strict';

let recordTitle;
let recordTopTopics;
let recordTopDetail;
let recordPbTopics;
let recordPbDetail;

// アニメーション初期化
let recordTitleAnimation;
let recordTitleAnimationRev;
let recordTopicsTopAnimation;
let recordTopicsTopAnimationRev;
let recordDetailTopAnimation;
let recordDetailTopAnimationRev;
let recordTopicsPbAnimation;
let recordTopicsPbAnimationRev;
let recordDetailPbAnimation;
let recordDetailPbAnimationRev;
let recordEndAnimation;
let recordAnimationEasing = 'easeOutBack';
let recordAnimationEasingRev = 'easeOutBack';

// 使用する変数
let topRecordData;
let pbRecordData;

window.onload = function () {
    recordTitle = document.getElementById("recordTitle");
    recordTopTopics = document.getElementById("recordTopTopics");
    recordTopDetail = document.getElementById("recordTopDetail");
    recordPbTopics = document.getElementById("recordPbTopics");
    recordPbDetail = document.getElementById("recordPbDetail");

    // Replicantの設定
    nodecg.Replicant("data_top_record").on("change", newValue => {
        if (newValue == undefined) {
            return;
        }
        topRecordData = newValue;

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

        recordTopicsTopAnimation = anime({
            targets: '#recordTopTopics .el',
            translateX: 1300,
            easing: recordAnimationEasing,
            duration: 1000,
            delay: anime.stagger(100, {start: 1500})
        });
        
        recordTopicsTopAnimationRev = anime({
            targets: '#recordTopTopics .el',
            translateX: 1300,
            easing: recordAnimationEasingRev,
            duration: 1000,
            delay: anime.stagger(100),
            direction: 'reverse',
            endDelay: 1000
        });
        
        recordDetailTopAnimation = anime({
            targets: '#recordTopDetail',
            translateX: 1300,
            easing: recordAnimationEasing,
            duration: 1000,
            delay: 2500
        });
    
        recordDetailTopAnimationRev = anime({
            targets: '#recordTopDetail',
            translateX: 1300,
            easing: recordAnimationEasingRev,
            direction: 'reverse',
            duration: 1000
        });
    });
    nodecg.Replicant("data_pb_record").on("change", newValue => {
        if (newValue == undefined) {
            return;
        }
        pbRecordData = newValue;

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

        recordTopicsPbAnimation = anime({
            targets: '#recordPbTopics .el',
            translateX: 1300,
            easing: recordAnimationEasing,
            duration: 1000,
            delay: anime.stagger(100, {start: 1500})
        });
        
        recordTopicsPbAnimationRev = anime({
            targets: '#recordPbTopics .el',
            translateX: 1300,
            easing: recordAnimationEasingRev,
            duration: 1000,
            delay: anime.stagger(100),
            direction: 'reverse',
            endDelay: 1000
        });
        
        recordDetailPbAnimation = anime({
            targets: '#recordPbDetail',
            translateX: 1300,
            easing: recordAnimationEasing,
            duration: 1000,
            delay: 2500
        });
    
        recordDetailPbAnimationRev = anime({
            targets: '#recordPbDetail',
            translateX: 1300,
            easing: recordAnimationEasingRev,
            direction: 'reverse',
            duration: 1000
        });
    });

    // タイトル書き換え
    recordTitle.innerHTML = '<span class="titleHeader"></span><br>'
    + '<span class="titleBody">今週の記録更新</span><br>'
    + '<span class="titleFooter"></span>';

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
}

function showTitle() {
    recordTitle.style.visibility = "visible";
    recordTitleAnimation.restart();
}

function showTopicsTop() {
    for(let i in topRecordData) {
        document.getElementById('topRecordText' + i).style.backgroundColor = "black";
    }
    recordTitleAnimationRev.restart();
    recordTopTopics.style.visibility = "visible";
    recordTopicsTopAnimation.restart();

}

function showDetailTop() {
    for(let i in topRecordData) {
        if (topRecordData[i].date != "") {
            document.getElementById('topRecordText' + i).style.backgroundColor = "blue";
        }
    }
    recordTopicsTopAnimationRev.restart();
    recordTopDetail.style.visibility = "visible";
    recordDetailTopAnimation.restart();
}

function showTopicsPb() {
    for(let i in pbRecordData) {
        document.getElementById('pbRecordText' + i).style.backgroundColor = "black";
    }
    recordDetailTopAnimationRev.restart();
    recordPbTopics.style.visibility = "visible";
    recordTopicsPbAnimation.restart();
}

function showDetailPb() {
    for(let i in pbRecordData) {
        if (pbRecordData[i].date != "") {
            document.getElementById('pbRecordText' + i).style.backgroundColor = "blue";
        }
    }
    recordTopicsPbAnimationRev.restart();
    recordPbDetail.style.visibility = "visible";
    recordDetailPbAnimation.restart();
}

function showEnd() {
    recordDetailPbAnimationRev.restart();
    recordTitleAnimation.restart();
}

nodecg.listenFor('title_record_news', showTitle);
nodecg.listenFor('topics_top_record_news', showTopicsTop);
nodecg.listenFor('detail_top_record_news', showDetailTop);
nodecg.listenFor('topics_pb_record_news', showTopicsPb);
nodecg.listenFor('detail_pb_record_news', showDetailPb);
nodecg.listenFor('end_record_news', showEnd);