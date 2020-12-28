'use strict';

// 使用する変数
let parameterData;
let shockingData;

let shockingTitle;
let shockingGuest;
let shockingProfile;
let shockingLetter;
let shockingLetterName;
let shockingLetterDescription;
let shockingNext;
let shockingNextHeader;
let shockingNextGuest;

window.onload = function () {
    shockingTitle = document.getElementById("shockingTitle");
    shockingGuest = document.getElementById("shockingGuest");
    shockingGuestHeader = document.getElementById("shockingGuestHeader");
    shockingGuestName = document.getElementById("shockingGuestName");
    shockingProfile = document.getElementById("shockingProfile");
    shockingLetter = document.getElementById("shockingLetter");
    shockingLetterName = document.getElementById("shockingLetterName");
    shockingLetterDescription = document.getElementById("shockingLetterDescription");
    shockingNext = document.getElementById("shockingNext");
    shockingNextHeader = document.getElementById("shockingNextHeader");
    shockingNextGuest = document.getElementById("shockingNextGuest");

    // shockingLogo.innerHTML = `<img src="material/logo.png" width="1209px" height="674px">`

    // Replicantの設定
    nodecg.Replicant('parameterData').on("change", newValue => {
        if (newValue == undefined) {
            return;
        }
        parameterData = newValue;
        shockingGuestHeader.innerHTML = `
        <span>本日のゲスト</span>
        `;

        shockingGuestName.innerHTML = `
        <span>${parameterData[0].guest_name}</span><span>さん</span>
        `;

        shockingNextHeader.innerHTML = `
        <span>次回のゲスト</span><br>
        <span>次回(${parameterData[0].next_date})あるらじ！#${Number(parameterData[0].number) + 1}のゲストは</span>
        `;

        postTweetTheme.innerHTML = `
        <div class="postTweetHeader el">
        今回のお題<br>
        ${parameterData[0].tweet_theme}
        </div>
        `;

        postTweetHeader.innerHTML = `
        <div class="postTweetHeader el">
        今回のお題<br>
        ${parameterData[0].tweet_theme}
        </div>
        `;
    });

    openingDescription.innerHTML = `<div>
    <span class="textBold">・このラジオは、</span><br>
    　RTA界に<span class="textRed">新しい風を吹き込む企画</span>である。<br>
    <br>
    ・ゲームにフォーカスする傾向が強い中で<br>
    　<span class="textBold">走者に対してもフォーカスする</span>ことで、<br>
    　<span class="textRed">各ゲームのRTA界隈をより活性化させる。</span><br>
    <br>
    ・ブログとしての発信媒体である<br>
    　<span class="textRed">RTAブログ RTAGamers とも適宜連携</span>していく。
    </div>`;

    openingAnnouncement.innerHTML = `<div>
    <span class="infoTitle">お知らせ</span><br>
    あるらじホームページ、Twitterでは、<br>
    スタッフの紹介やバックナンバーへのリンク、<br>
    あるらじの裏側など様々な情報を<br>
    発信しています。<br>
    <br>
    おたより等はホームページの<br>
    視聴者投稿フォームから！！<br>
    RTAイベントカレンダーもあるよ！<br>
    <br>
    Twitterアカウント：@RTARadioaru<br>
    ハッシュタグ：#あるらじ #RTARadio
    </div>`;

    openingRecruit.innerHTML = `<div>
    <span class="infoTitle">お知らせ</span><br>
    あるらじ内でRTA企画のCM募集します。<br>
    大規模な企画でも、お手軽な並走企画でも大歓迎！<br>
    走者募集や視聴者への宣伝にご活用ください！<br>
    <br>
    細かい詳細はホームページからご確認ください。<br>
    <br>
    コーナーの合間や<br>
    公式Twitterで流します<br>
    <br>
    CM採用後、該当企画であるらじに<br>
    関する宣伝をしていただきます<br>
    （CMを流す等）
    </div>`;
    
    postTweetTitle = document.getElementById("postTweetTitle");
    postTweetTheme = document.getElementById("postTweetTheme");
    postTweetHeader = document.getElementById("postTweetHeader");
    postTweetFooter = document.getElementById("postTweetFooter");
    postTweetBody[0] = document.getElementById("postTweetBody0");
    postTweetBody[1] = document.getElementById("postTweetBody1");
    postTweetBody[2] = document.getElementById("postTweetBody2");
    postTweetBody[3] = document.getElementById("postTweetBody3");
    postTweetRecruit = document.getElementById("postTweetRecruit");

    // Replicantの設定
    nodecg.Replicant('pickupTweet').on("change", newValue => {
        if (newValue == undefined) {
            return;
        }
        showTweetData = newValue;
        console.log(showTweetData.length);
        for (let index = 0; index < showTweetData.length; index++) {
            postTweetInnerChange(index);
        }
    });

    // タイトル書き換え
    postTweetTitle.innerHTML = `
    <span class="titleHeader">Twitter</span><br>
    <span class="titleBody">おたよりコーナー</span><br>
    <span class="titleFooter"></span>
    `;

    // フッター書き換え
    postTweetFooter.innerHTML = `
    <div class="postTweetFooter el">
    ハッシュタグ <br>
    #あるらじ #RTARadio
    </div>
    `;

    postTweetRecruit.innerHTML = `
    <div>
    あるらじ！ではTwitterでもおたよりを募集しています！<br>
    投稿はハッシュタグ #あるらじ #RTARadio をつけて<br>
    ツイートするだけ！（どちらか片方でOK）<br>
    採用された投稿は放送上で取り上げます。<br>
    <br>
    投稿のお題は番組終わりに発表！<br>
    </div>
    `;
}

function postTweetInnerChange(index) {
    postTweetBody[index].innerHTML = `<div>
    <div>
    <img class="postTweetImage" src="${showTweetData[index].user.profileImageUrl}">
    <span>${showTweetData[index].user.name}</span><br>
    <span class="postTweetUserid">@${showTweetData[index].user.screenName}</span>
    </div>
    <div>${showTweetData[index].text}</div>
    </div>`;
}

function openingPreShow() {
    openingTitleFooter.innerText = "21:00 START";
}

function openingJustShow() {
    openingTitleFooter.innerText = "まもなく開始します";
}

function openingStartShow() {
    openingTitleFooter.innerText = parameterData[0].date;
}

function openingDescriptionShow() {
    openingTitle.style.visibility = "hidden";
    openingDescription.style.visibility = "visible";
}

function openingAnnouncementShow() {
    openingDescription.style.visibility = "hidden";
    openingAnnouncement.style.visibility = "visible";
}

function openingRecruitShow() {
    openingAnnouncement.style.visibility = "hidden";
    openingRecruit.style.visibility = "visible";
}

function openingRecruitDisable() {
    openingRecruit.style.visibility = "hidden";
}

function openingTitleShow() {
    openingTitle.style.visibility = "visible";
}

function postTweetTitleShow() {
    postTweetTitle.style.visibility = "visible";
}

function postTweetThemeShow() {
    postTweetTitle.style.visibility = "hidden";
    postTweetTheme.style.visibility = "visible";
}

function postTweetBodyShow(number) {
    postTweetHeader.style.visibility = "visible";
    postTweetFooter.style.visibility = "visible";
    if (number == 0) {
        postTweetTheme.style.visibility = "hidden";
    } else {
        postTweetBody[number - 1].style.visibility = "hidden";
    }
    postTweetBody[number].style.visibility = "visible";
}

function postTweetRecruitShow() {
    postTweetBody[3].style.visibility = "hidden";
    postTweetRecruit.style.visibility = "visible";
}

function postTweetRecruitDisable() {
    postTweetHeader.style.visibility = "hidden";
    postTweetFooter.style.visibility = "hidden";
    postTweetRecruit.style.visibility = "hidden";
}

nodecg.listenFor('postTweetTitle', postTweetTitleShow);
nodecg.listenFor('postTweetTheme', postTweetThemeShow);
nodecg.listenFor('postTweetBody', (newValue) => { postTweetBodyShow(newValue) });
nodecg.listenFor('postTweetRecruit', postTweetRecruitShow);
nodecg.listenFor('postTweetRecruitDisable', postTweetRecruitDisable);

nodecg.listenFor('openingPre', openingPreShow);
nodecg.listenFor('openingJust', openingJustShow);
nodecg.listenFor('openingStart', openingStartShow);
nodecg.listenFor('openingDescription', openingDescriptionShow);
nodecg.listenFor('openingAnnouncement', openingAnnouncementShow);
nodecg.listenFor('openingRecruit', openingRecruitShow);
nodecg.listenFor('openingRecruitDisable', openingRecruitDisable);
nodecg.listenFor('openingTitle', openingTitleShow);