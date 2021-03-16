'use strict';

// 使用する変数
let parameterData;
let rtaShockingData;

window.onload = function () {
    shockingTitle.innerHTML = `
    <img class="logoImage" src="material/logo_rtaShocking.png">
    `;

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
        <span>${parameterData[0].guest_name}</span><span class="fontsize72">さん</span>
        `;

        shockingProfileName.innerHTML = `
        <span>${parameterData[0].guest_name}さん</span>
        `;

        let htmlList = "";

        if (parameterData[0].twitter_link != "") {
            htmlList += `
            <img class="iconImage" src="material/icon_twitter.png"><span>${parameterData[0].twitter_link}</span>
            `;
        }

        if (parameterData[0].twitch_link != "") {
            htmlList += `
            <img class="iconImage" src="material/icon_twitch.png"><span>${parameterData[0].twitch_link}</span>
            `;
        }

        htmlList += `
        <br>
        `;

        if (parameterData[0].youtube_link != "") {
            htmlList += `
            <img class="iconImage" src="material/icon_youtube.png"><span>${parameterData[0].youtube_link}</span>
            `;
        }

        if (parameterData[0].niconico_link != "") {
            htmlList += `
            <img class="iconImage" src="material/icon_niconico.png"><span>${parameterData[0].niconico_link}</span>
            `;
        }

        shockingProfileLink.innerHTML = htmlList;

        shockingProfileDescription.innerHTML = `
        <span id="profileDescription"></span>
        `;
        document.getElementById('profileDescription').innerText = parameterData[0].description;

        shockingProfileGame.innerHTML = `
        <span>■主なRTAをしているゲーム</span><br>
        <span id="profileGame"></span>
        `;
        document.getElementById('profileGame').innerText = parameterData[0].game_title;

        shockingLetterGuestName.innerHTML = `
        <span class="letterGuestName">${parameterData[0].guest_name}</span>
        `;

        shockingNextHeader.innerHTML = `
        <span>次回のゲスト</span><br>
        <span class="fontsize64">次回(${parameterData[0].next_date})あるらじ！#${Number(parameterData[0].number) + 1}のゲストは</span>
        `;

        shockingNextGuestName.innerHTML = `
        <span>${parameterData[0].next_guest}</span><span class="fontsize72">さん</span>
        `;

        shockingNextComeon.innerHTML = `
        <span>に来ていただきます。</span>
        `;
    });

    // Replicantの設定
    nodecg.Replicant('rtaShockingData').on("change", newValue => {
        if (newValue == undefined) {
            return;
        }
        rtaShockingData = newValue;
    });

    nodecg.Replicant('assets:guestImage').on('change', newValue => {
        if (newValue[0] == undefined) {
            return;
        }
        let proxy = new Proxy(newValue[0], {});
        document.getElementById('shockingLetterGuestImage').src = proxy.url;
        document.getElementById('shockingProfileGuestImage').src = proxy.url;
        document.getElementById('shockingLetterToyomanaImage').src = "material/toyomana.png";
    });

    nodecg.Replicant('assets:nextGuestImage').on('change', newValue => {
        if (newValue[0] == undefined) {
            return;
        }
        let proxy = new Proxy(newValue[0], {});
        document.getElementById('shockingNextGuestImage').src = proxy.url;
    });
}

function shockingPickupShow(pickupData) {
    shockingLetterDescription.style.visibility = "visible";
    if (pickupData.name != "") {
        shockingLetterDescription.innerHTML = `
        <span class="letterDescriptionName">${pickupData.name}さんからのおたより</span><br>
        <span class="letterDescriptionDouble">Q.${pickupData.description}</span>
        `;
    } else {
        shockingLetterDescription.innerHTML = `
        <span class="letterDescriptionSingle">Q.${pickupData.description}</span>
        `;
    }
}

function shockingGuestShow() {
    shockingTitle.style.visibility = "hidden";
    shockingGuest.style.visibility = "visible";
}

function shockingProfileShow() {
    shockingGuest.style.visibility = "hidden";
    shockingProfile.style.visibility = "visible";
}

function shockingLetterShow() {
    shockingProfile.style.visibility = "hidden";
    shockingLetter.style.visibility = "visible";
}

function shockingTitleShow() {
    shockingLetter.style.visibility = "hidden";
    shockingLetterDescription.style.visibility = "hidden";
    shockingTitle.style.visibility = "visible";
}

function shockingNextShow() {
    shockingTitle.style.visibility = "hidden";
    shockingNext.style.visibility = "visible";
}

function shockingNextGuestShow() {
    shockingNextGuest.style.visibility = "visible";
}

nodecg.listenFor('shockingGuest', shockingGuestShow);
nodecg.listenFor('shockingProfile', shockingProfileShow);
nodecg.listenFor('shockingLetter', shockingLetterShow);
nodecg.listenFor('shockingTitle', shockingTitleShow);
nodecg.listenFor('shockingNext', shockingNextShow);
nodecg.listenFor('shockingNextGuest', shockingNextGuestShow);
nodecg.listenFor('shockingPickup', (newValue) => { shockingPickupShow(newValue) });
