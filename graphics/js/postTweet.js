'use strict';

// 使用する変数
let showTweetData;

// Replicantの設定
nodecg.Replicant('post_tweet').on("change", newValue => {
    if (newValue == undefined) {
        return;
    }
    showTweetData = newValue;
});

// アニメーション初期化
let postTitleAnimation;
let postTitleAnimationRev;
let postHeaderAnimation;
let postHeaderAnimationRev;
let postFooterAnimation;
let postFooterAnimationRev;
// let post_TopicsPbAnimation;
// let post_TopicsPbAnimationRev;
// let post_DetailPbAnimation;
// let post_DetailPbAnimationRev;
let postEndAnimation;
let postAnimationEasing = 'easeOutBack';
let postAnimationEasingRev = 'easeOutBack';

function postTweetChange() {
    // 背景変更
    document.body.style.backgroundImage = "url(" + "mainBackGround.jpg" + ")";

    // 他コーナーの非表示
    gamersTitle.style.visibility = "hidden";
    recordTitle.style.visibility = "hidden";
    eventTitle.style.visibility = "hidden";

    // タイトル書き換え
    postTweetTitle.innerHTML = '<span class="titleHeader">Twitter</span><br>'
    + '<span class="titleBody">おたよりコーナー</span><br>'
    + '<span class="titleFooter"></span>';

    // ヘッダー書き換え
    postTweetHeader.innerHTML = '<div class="postTweetHeader el">今回のお題</div>';

    // フッター書き換え
    postTweetFooter.innerHTML = '<div class="postTweetFooter el">ハッシュタグ <br>#あるらじ #RTARadio</div>';

    // アニメーションの指定
    postTitleAnimation = anime({
        targets: '#recordTitle',
        translateX: 1100,
        easing: postAnimationEasing,
        duration: 1000,
        delay: 1500
    });

    postTitleAnimationRev = anime({
        targets: '#recordTitle',
        translateX: 1100,
        easing: postAnimationEasingRev,
        direction: 'reverse',
        duration: 1000
    });

    // recordTopicsTopAnimation = anime({
    //     targets: '#recordTopTopics .el',
    //     translateX: 1300,
    //     easing: postAnimationEasing,
    //     duration: 1000,
    //     delay: anime.stagger(100, {start: 1500})
    // });

    // recordTopicsTopAnimationRev = anime({
    //     targets: '#recordTopTopics .el',
    //     translateX: 1300,
    //     easing: postAnimationEasingRev,
    //     duration: 1000,
    //     delay: anime.stagger(100),
    //     direction: 'reverse',
    //     endDelay: 1000
    // });

    // recordDetailTopAnimation = anime({
    //     targets: '#recordTopDetail',
    //     translateX: 1300,
    //     easing: postAnimationEasing,
    //     duration: 1000,
    //     delay: 2500
    // });

    // recordDetailTopAnimationRev = anime({
    //     targets: '#recordTopDetail',
    //     translateX: 1300,
    //     easing: postAnimationEasingRev,
    //     direction: 'reverse',
    //     duration: 1000
    // });

    // recordTopicsPbAnimation = anime({
    //     targets: '#recordPbTopics .el',
    //     translateX: 1300,
    //     easing: postAnimationEasing,
    //     duration: 1000,
    //     delay: anime.stagger(100, {start: 1500})
    // });

    // recordTopicsPbAnimationRev = anime({
    //     targets: '#recordPbTopics .el',
    //     translateX: 1300,
    //     easing: postAnimationEasingRev,
    //     duration: 1000,
    //     delay: anime.stagger(100),
    //     direction: 'reverse',
    //     endDelay: 1000
    // });

    // recordDetailPbAnimation = anime({
    //     targets: '#recordPbDetail',
    //     translateX: 1300,
    //     easing: postAnimationEasing,
    //     duration: 1000,
    //     delay: 2500
    // });

    // recordDetailPbAnimationRev = anime({
    //     targets: '#recordPbDetail',
    //     translateX: 1300,
    //     easing: postAnimationEasingRev,
    //     direction: 'reverse',
    //     duration: 1000
    // });
}

function postTweetShowTitle() {
    postTitle.style.visibility = "visible";
    postTitleAnimation.restart();
}

function postTweetDetail() {
    postTopicsTopAnimationRev.restart();
    postTopDetail.style.visibility = "visible";
    postDetailTopAnimation.restart();
}

function postTweetBody(number) {
    postDetailTopAnimationRev.restart();
    postPbTopics.style.visibility = "visible";
    postTopicsPbAnimation.restart();
}

function postTweetBodyClose(number) {
    postTopicsPbAnimationRev.restart();
    postPbDetail.style.visibility = "visible";
    postDetailPbAnimation.restart();
}

function postTweetend() {
    postDetailPbAnimationRev.restart();
    postTitleAnimation.restart();
}

nodecg.listenFor('postTweetChange', postTweetChange);
nodecg.listenFor('postTweetTitle', postTweetShowTitle);
nodecg.listenFor('postTweetDetail', postTweetDetail);
nodecg.listenFor('postTweetBody', (newValue) => { postTweetBody(newValue) });
nodecg.listenFor('postTweetBodyClose', (newValue) => { postTweetBodyClose(newValue) });
nodecg.listenFor('postTweetend', showEnd);