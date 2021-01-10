'use strict';

let postTweetData;
let pickupTweetData;

window.onload = function () {
    nodecg.Replicant('postTweet').on("change", newValue => {
        if (newValue[0] == undefined) {
            postTweet.innerHTML = '';
            return;
        }
        postTweetData = newValue;
        let tweetsList = '';
        postTweetData.forEach(function(value, index) {
            if (postTweetData.length != index) {
                tweetsList += `<div>
                <div>
                <img class="image" src="${value.user.profileImageUrl}">
                <span>${value.user.name}</span><br>
                <span class="userid">@${value.user.screenName}</span>
                </div>
                <div>${value.text}</div>
                <button onclick="addPickupTweet(${index});">採用</button>
                <button onclick="deletePostTweet(${index});">おたより一覧から削除</button>
                <hr class="border">
                </div>`;
            }
        });
        postTweet.innerHTML = tweetsList;
    });

    nodecg.Replicant('pickupTweet').on("change", newValue => {
        if (newValue[0] == undefined) {
            pickupTweet.innerHTML = '';
            return;
        }
        pickupTweetData = newValue;
        let tweetsList = '';
        pickupTweetData.forEach(function(value, index) {
            if (pickupTweetData.length != index) {
                tweetsList += `<div>
                <div>
                <img class="image" src="${value.user.profileImageUrl}">
                <span>${value.user.name}</span><br>
                <span class="userid">@${value.user.screenName}</span>
                </div>
                <div>${value.text}</div>
                <button onclick="movePickupTweet(${index});">おたより一覧に戻す</button>
                <button id="pickup${index}" onclick="showPickupTweet(${index});">放送に表示</button>
                <hr class="border">
                </div>`;
            }
        });
        pickupTweet.innerHTML = tweetsList;
    });
}

function reload() {
    nodecg.sendMessage('parameterReload');
}

function addPickupTweet(index) {
    nodecg.sendMessage("addPickupTweet", postTweetData[index]);
    deletePostTweet(index);
}

function movePickupTweet(index) {
    nodecg.sendMessage("addPostTweet", pickupTweetData[index]);
    pickupTweetData.splice(index, 1);
    pickupTweetRep.value = pickupTweetData;
}

function showPickupTweet(index) {
    for(let i in pickupTweetData) {
        if (i !=  index) {
            document.getElementById('pickup' + i).disabled = false;
        } else {
            document.getElementById('pickup' + i).disabled = true;
        }
    }
    nodecg.sendMessage("postTweetPickup", pickupTweetData[index]);
}

function deletePostTweet(index) {
    postTweetData.splice(index, 1);
    postTweetRep.value = postTweetData;
}

function openingPre() {
    openingPreButton.disabled = true;
    openingJustButton.disabled = false;
    nodecg.sendMessage('openingPre');
}

function openingJust() {
    openingJustButton.disabled = true;
    openingStartButton.disabled = false;
    nodecg.sendMessage('openingJust');
}

function openingStart() {
    openingStartButton.disabled = true;
    openingDescriptionButton.disabled = false;
    nodecg.sendMessage('openingStart');
}

function openingDescription() {
    openingDescriptionButton.disabled = true;
    openingAnnouncementButton.disabled = false;
    nodecg.sendMessage('openingDescription');
}

function openingAnnouncement() {
    openingAnnouncementButton.disabled = true;
    openingRecruitButton.disabled = false;
    nodecg.sendMessage('openingAnnouncement');
}

function openingRecruit() {
    openingRecruitButton.disabled = true;
    postTweetTitleButton.disabled = false;
    nodecg.sendMessage('openingRecruit');
}

function postTweetTitle() {
    postTweetTitleButton.disabled = true;
    postTweetThemeButton.disabled = false;
    nodecg.sendMessage('openingRecruitDisable');
    nodecg.sendMessage('postTweetTitle');
}

function postTweetTheme() {
    postTweetThemeButton.disabled = true;
    postTweetBodyButton.disabled = false;
    nodecg.sendMessage('postTweetTheme');
}

function postTweetBody() {
    postTweetBodyButton.disabled = true;
    postTweetRecruitButton.disabled = false;
    nodecg.sendMessage('postTweetBody');
}

function postTweetRecruit() {
    postTweetRecruitButton.disabled = true;
    openingTitleButton.disabled = false;
    nodecg.sendMessage('postTweetRecruit');
}

function openingTitle() {
    openingTitleButton.disabled = true;
    openingPreButton.disabled = false;
    nodecg.sendMessage('postTweetRecruitDisable');
    nodecg.sendMessage('openingTitle')
}