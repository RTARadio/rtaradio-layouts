'use strict';

// 現在のファイル名
let currentFile = 'rta_gamers';

// 使用する変数
let rtaGamersData;
let rtaGamersAssets;

// Replicantの設定
nodecg.Replicant("data_" + currentFile).on("change", newValue => {
    if (newValue == undefined) {
        return;
    }
    rtaGamersData = newValue;
});
nodecg.Replicant('assets:' + currentFile).on("change", newValue => {
    if (newValue == undefined) {
        return;
    }
    rtaGamersAssets = new Proxy(newValue[0], {});
});

// アニメーション初期化
let gamersTitleAnimation;
let gamersTopicsAnimation;
let gamersDetailAnimation;
let gamersTitleAnimationRev;
let gamersTopicsAnimationRev;
let gamersDetailAnimationRev;
let gamersAnimationEasing = 'easeOutBack';
let gamersAnimationEasingRev = 'easeOutBack';

function init() {
    // 背景変更
    document.body.style.backgroundImage = "url(" + "rta_gamers.png" + ")";

    // 他コーナーの非表示
    recordTitle.style.visibility = "hidden";

    // 初期化
    gamersTitle.style.visibility = "hidden";
    gamersTopics.style.visibility = "hidden";
    gamersDetail.style.visibility = "hidden";

    // タイトル書き換え
    gamersTitle.innerHTML = '<span class="gamersTitleHeader">RTA情報ブログ</span><br>'
    + '<span class="gamersTitleBody">RTAGamers</span><br>'
    + '<span class="gamersTitleFooter">出張版</span>';

    // トピックス書き換え
    gamersTopics.innerHTML = '';
    for(let i in rtaGamersData) {
        gamersTopics.innerHTML += '<div id="topicText' + i + '" class="gamersTopicsBox el">' + rtaGamersData[i].title + '</div>';
    }

    // ピックアップ書き換え
    for(let i in rtaGamersData) {
        if (rtaGamersData[i].writter != "") {
            gamersDetail.innerHTML = '<div class="gamersTitleBox">' + rtaGamersData[i].title + '</div>'
            + '<div class="gamersDetailBox">'
            + '<img id="gamersDetailImage"><br>'
            + '<span>書き手: </span><span id="writterText">' + rtaGamersData[i].writter + '</span><span> さん</span>'
            + '</div>';
        }
    }
    document.getElementById('gamersDetailImage').src = rtaGamersAssets.url;

    // アニメーションの指定
    gamersTitleAnimation = anime({
        targets: '#gamersTitle',
        translateX: 1100,
        easing: gamersAnimationEasing,
        duration: 1000,
        delay: 1500
    });
    
    gamersTitleAnimationRev = anime({
        targets: '#gamersTitle',
        translateX: 1100,
        easing: gamersAnimationEasingRev,
        direction: 'reverse',
        duration: 1000
    });

    gamersTopicsAnimation = anime({
        targets: '#gamersTopics .el',
        translateX: 1300,
        easing: gamersAnimationEasing,
        duration: 1000,
        delay: anime.stagger(100, {start: 1500})
    });
    
    gamersTopicsAnimationRev = anime({
        targets: '#gamersTopics .el',
        translateX: 1300,
        easing: gamersAnimationEasingRev,
        duration: 1000,
        delay: anime.stagger(100),
        direction: 'reverse',
        endDelay: 1000
    });
    
    gamersDetailAnimation = anime({
        targets: '#gamersDetail',
        translateX: 1300,
        easing: gamersAnimationEasing,
        duration: 1000,
        delay: 2500
    });

    gamersDetailAnimationRev = anime({
        targets: '#gamersDetail',
        translateX: 1300,
        easing: gamersAnimationEasingRev,
        direction: 'reverse',
        duration: 1000
    });
}

function showTitle() {
    gamersTitle.style.visibility = "visible";
    gamersTitleAnimation.restart();
}

function showTopics0() {
    for(let i in rtaGamersData) {
        document.getElementById("topicText" + i).style.backgroundColor = "#ffd000";
    }
    gamersTitleAnimationRev.restart();
    gamersTopics.style.visibility = "visible";
    gamersTopicsAnimation.restart();
}

function showDetail0() {
    for(let i in rtaGamersData) {
        if (rtaGamersData[i].writter != "") {
            document.getElementById("topicText" + i).style.backgroundColor = "red";
        }
    }
    gamersTopicsAnimationRev.restart();
    gamersDetail.style.visibility = "visible";
    gamersDetailAnimation.restart();
}

function showEnd() {
    gamersDetailAnimationRev.restart();
    gamersTitleAnimation.restart();
}

nodecg.listenFor('init_' + currentFile, init);
nodecg.listenFor('title_' + currentFile, showTitle);
nodecg.listenFor('topics0_' + currentFile, showTopics0);
nodecg.listenFor('detail0_' + currentFile, showDetail0);
nodecg.listenFor('end_' + currentFile, showEnd);