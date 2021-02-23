'use strict';

// 現在のファイル名
const CURRENT_FILE = 'rtaGamers';

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
let rtaGamersData;

window.onload = function() {
    // Replicantの設定
    nodecg.Replicant(`${CURRENT_FILE}Data`).on('change', newValue => {
        if (newValue == undefined) {
            return;
        }
        rtaGamersData = newValue;

        // トピックス書き換え
        if (gamersTopics.innerHTML == '') {
            let htmlList = '';
            for(let i in rtaGamersData) {
                htmlList += `<div id='topicText${i}' class='gamersTopicsBox el'>${rtaGamersData[i].title}</div>`;
            }
            gamersTopics.innerHTML = htmlList;
        } else {
            for(let i in rtaGamersData) {
                document.getElementById(`topicText${i}`).innerText = rtaGamersData[i].title;
            }
        }
    
        // ピックアップ書き換え
        if (gamersDetail.innerHTML == '') {
            for(let i in rtaGamersData) {
                if (rtaGamersData[i].writter != '') {
                    gamersDetail.innerHTML = `<div id='gamersDetailTitle' class='gamersTitleBox'>${rtaGamersData[i].title}</div>
                    <div class='gamersDetailBox'>
                    <img id='gamersDetailImage'><br>
                    <span>書き手: </span><span id='writterText'>${rtaGamersData[i].writter}</span><span> さん</span>
                    </div>`;
                }
            }
        } else {
            for(let i in rtaGamersData) {
                if (rtaGamersData[i].writter != '') {
                    document.getElementById('gamersDetailTitle').innerText = rtaGamersData[i].title;
                    document.getElementById('writterText').innerText = rtaGamersData[i].writter;
                }
            }
        }
    });

    nodecg.Replicant(`assets:${CURRENT_FILE}`).on('change', newValue => {
        if (newValue == undefined) {
            return;
        }
        let rtaGamersAssets = new Proxy(newValue[0], {});
        let imageElement = document.getElementById('gamersDetailImage');
        imageElement.src = rtaGamersAssets.url;
        imageElement.onload = function() {
            let widthScale = 1200 / imageElement.naturalWidth;
            let heightScale = 760 / imageElement.naturalHeight;
            let useScale = Math.min(widthScale, heightScale);
            imageElement.width = imageElement.naturalWidth * useScale;
            imageElement.height = imageElement.naturalHeight * useScale;
        }
    });

    // タイトル書き換え
    gamersTitle.innerHTML = `<span class='gamersTitleHeader'>RTA情報ブログ</span><br>
    <span class='gamersTitleBody'>RTAGamers</span><br>
    <span class='gamersTitleFooter'>出張版</span>`;
}

function showTitle() {
    anime({
        targets: '#gamersTitle',
        translateX: ANIMATION.TRANSLATE_NORMAL,
        easing: ANIMATION.EASING_NORMAL,
        duration: ANIMATION.DURATION_TIME
    });
}

function showTopics() {
    for(let i in rtaGamersData) {
        document.getElementById(`topicText${i}`).style.backgroundColor = '#ffd000';
    }
    anime({
        targets: '#gamersTitle',
        translateX: ANIMATION.TRANSLATE_REVERSE,
        easing: ANIMATION.EASING_REVERSE,
        duration: ANIMATION.DURATION_TIME,
        complete: () => {
            anime({
                targets: '#gamersTopics .el',
                translateX: ANIMATION.TRANSLATE_NORMAL,
                easing: ANIMATION.EASING_NORMAL,
                duration: ANIMATION.DURATION_TIME,
                delay: anime.stagger(100)
            });
        }
    });
}

function showDetail() {
    for(let i in rtaGamersData) {
        if (rtaGamersData[i].writter != '') {
            document.getElementById(`topicText${i}`).style.backgroundColor = 'red';
        }
    }
    anime({
        targets: '#gamersTopics .el',
        translateX: ANIMATION.TRANSLATE_REVERSE,
        easing: ANIMATION.EASING_REVERSE,
        duration: ANIMATION.DURATION_TIME,
        delay: anime.stagger(100, {start: ANIMATION.DELAY_TIME}),
        complete: () => {
            anime({
                targets: '#gamersDetail',
                translateX: ANIMATION.TRANSLATE_NORMAL,
                easing: ANIMATION.EASING_NORMAL,
                duration: ANIMATION.DURATION_TIME
            });
        }
    });
}

function showEnd() {
    anime({
        targets: '#gamersDetail',
        translateX: ANIMATION.TRANSLATE_REVERSE,
        easing: ANIMATION.EASING_REVERSE,
        duration: ANIMATION.DURATION_TIME,
        complete: () => {
            anime({
                targets: '#gamersTitle',
                translateX: ANIMATION.TRANSLATE_NORMAL,
                easing: ANIMATION.EASING_NORMAL,
                duration: ANIMATION.DURATION_TIME
            });
        }
    });
}

nodecg.listenFor(`${CURRENT_FILE}Title`, showTitle);
nodecg.listenFor(`${CURRENT_FILE}Topics`, showTopics);
nodecg.listenFor(`${CURRENT_FILE}Detail`, showDetail);
nodecg.listenFor(`${CURRENT_FILE}End`, showEnd);