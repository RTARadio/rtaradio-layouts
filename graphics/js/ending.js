'use strict';

// 使用する変数
let parameterData;
let letterData;

window.onload = function () {
    // Replicantの設定
    nodecg.Replicant('parameterData').on("change", newValue => {
        if (newValue == undefined) {
            return;
        }
        parameterData = newValue;
        endingTitleNumber.innerHTML = `
        <span>#${parameterData[0].number}</span>
        `;

        endingTitleDate.innerText = parameterData[0].date;

        endingPostTweetTheme.innerHTML = `
        <img class="icon" src="material/postTweetIcon.png" width="200px">
        <div>
        今月のお題<br>
        <span class="postTweetTheme">${parameterData[0].next_theme}</span>
        </div>
        `;

        endingNextDescription.innerHTML = `
        <span class="textBold">次回放送：${parameterData[0].date} 21:00～</span>
        `;

        endingNextPersonality.innerHTML = `
        <span>
        メインパーソナリティ：とよまな<br>
        サブパーソナリティ　：ミクロン　セリア　紺空<br>
        ゲスト　　　　　　　：${parameterData[0].next_guest}
        `;
    });

    nodecg.Replicant('letterData').on("change", newValue => {
        if (newValue == undefined) {
            return;
        }
        letterData = newValue;
    });

    endingTitleLogo.innerHTML = `<img src="material/logo.png" width="1209px" height="674px">`;
    
    endingLetterLogo.innerHTML = `<img src="material/logo.png" width="1209px" height="674px">`;

    endingCliphourBG.innerHTML =`<img src="material/endingClipHour.png" width="1920px" height="1080px">`;
    
    endingCliphourLogo.innerHTML = `<img src="material/logo_clipHour.png" width="960px" height="540px">`;
    
    endingCliphourDescription.innerHTML = `<div>
    <span class="clipHourTitle">珍プレー・好プレーなクリップの投稿をお待ちしております</span><br>
    <span class="cliphourDescription">
    ※プレイヤー名・配信URLが必要です<br>
    ※採用するものは配信者に許可をもらえたものに限ります
    </span>
    `;

    endingRtaRacingHeader.innerHTML = `
    <span class="infoTitle">協賛のご案内</span><br>
    <span class="rtaRacingDescription">RTAのレース(並走)を専門とするTwitchチャンネル</span>
    `;

    endingRtaRacingBG.innerHTML = `<img src="material/endingRtaRacing.png" width="1920px" height="1080px">`;

    endingRtaRacingLogo.innerHTML = `<img src="material/logo_rtaRacing.png" width="1080px" height="285px">`;

    endingRtaRacingFooter.innerHTML = `
    <span class="rtaRacingDescription">
    並走の情報等をこの番組、Twitterからも共有していきますので、<br>
    よろしくお願いします！<br>
    <br>
    Twitter : @racing_rta<br>
    Twitch  : rtaracing
    `;

    endingAnnouncement.innerHTML = `<div>
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

    endingRecruit.innerHTML = `<div>
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

    endingPostTweetLogo.innerHTML = `<img src="material/logo_postTweet.png">`;

    endingPostTweetFooter.innerHTML = `<div>
    <span class="postTweetId">@RTARadioaru</span><br>
    <span class="postTweetHashTag">ハッシュタグ：<br>
    #あるらじ　#RTARadio
    `;

    endingNextLogo.innerHTML = `<img src="material/logo.png" width="604.5px" height="337px">`;

    endingNextHeader.innerHTML = `
    <span>ゲームにフォーカスする傾向が強いなかで<br>
    <span class="textBold">走者に対してもフォーカスする</span>ことで、<br>
    <span class="textRed">各ゲームのRTA界隈をより活性化させる。</span>
    </span>`;

    endingNextFooter.innerHTML = `
    <span>
    放送場所：ニコ生(Real Time Attack Harbor)<br>
    　　　　　Twitch(toyomana)の同時配信</span>
    `;

    endingThankyou.innerHTML = `
    <span>ご視聴ありがとうございました</span>
    `;
}

function endingLetterShow() {
    endingTitle.style.visibility = "hidden";
    endingLetter.style.visibility = "visible";
}

function endingCliphourShow() {
    endingLetter.style.visibility = "hidden";
    endingLetterDescription.style.visibility = "hidden";
    endingCliphour.style.visibility = "visible";
}

function endingRtaRacingShow() {
    endingCliphour.style.visibility = "hidden";
    endingRtaRacing.style.visibility = "visible";
}

function endingAnnouncementShow() {
    endingRtaRacing.style.visibility = "hidden";
    endingAnnouncement.style.visibility = "visible";
}

function endingRecruitShow() {
    endingAnnouncement.style.visibility = "hidden";
    endingRecruit.style.visibility = "visible";
}

function endingPostTweetShow() {
    endingRecruit.style.visibility = "hidden";
    endingPostTweet.style.visibility = "visible";
}

function endingNextShow() {
    endingPostTweet.style.visibility = "hidden";
    endingNext.style.visibility = "visible";
}

function endingDateShow() {
    endingNext.style.visibility = "hidden";
    endingTitle.style.visibility = "visible";
    endingDate.style.visibility = "visible";
}

function endingTitleShow() {
    endingDate.style.visibility = "hidden";
    endingThankyou.style.visibility = "visible";
}

function endingPickupShow(pickupData) {
    endingLetterDescription.style.visibility = "visible";
    if (pickupData.name != "") {
        endingLetterDescription.innerHTML = `
        <span class="letterDescriptionName">${pickupData.name}さんからのおたより</span><br>
        <span class="letterDescriptionDouble">Q.${pickupData.description}</span>
        `;
    } else {
        endingLetterDescription.innerHTML = `
        <span class="letterDescriptionSingle">Q.${pickupData.description}</span>
        `;
    }
}

nodecg.listenFor('endingLetter', endingLetterShow);
nodecg.listenFor('endingCliphour', endingCliphourShow);
nodecg.listenFor('endingRtaRacing', endingRtaRacingShow);
nodecg.listenFor('endingAnnouncement', endingAnnouncementShow);
nodecg.listenFor('endingRecruit', endingRecruitShow);
nodecg.listenFor('endingPostTweet', endingPostTweetShow);
nodecg.listenFor('endingNext', endingNextShow);
nodecg.listenFor('endingDate', endingDateShow);
nodecg.listenFor('endingTitle', endingTitleShow);
nodecg.listenFor('endingPickup', (newValue) => { endingPickupShow(newValue) });