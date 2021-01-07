'use strict';

let currentFile = 'postTweet';
const bodyButton = {};

window.onload = function () {
    bodyButton[0] = document.getElementById("postTweetBody0Button");
    bodyButton[1] = document.getElementById("postTweetBody1Button");
    bodyButton[2] = document.getElementById("postTweetBody2Button");
    bodyButton[3] = document.getElementById("postTweetBody3Button");
}

let postTweetData;
let pickupTweetData;

const postTweetRep = nodecg.Replicant('postTweet');
postTweetRep.on("change", newValue => {
    if (newValue[0] == undefined) {
        postTweet.innerHTML = '';
        return;
    }
    postTweetData = newValue;
    let tweetsList = '';
    postTweetData.forEach(function(value, index) {
        if (postTweetData.length != index) {
            tweetsList += '<div>'
            + '<div>'
            + '<img class="image" src="' + value.user.profileImageUrl + '">'
            + '<span>' + value.user.name + '</span><br>'
            + '<span class="userid">@' + value.user.screenName + '</span>'
            + '</div>'
            + '<div>' + value.text + '</div>'
            + '<button onclick="addPickupTweet(' + index + ');">放送に表示</button>'
            + '<button onclick="deletePostTweet(' + index + ');">おたより一覧から削除</button>'
            + '<hr class="border">'
            + '</div>';
        }
    });
    postTweet.innerHTML = tweetsList;
});

const pickupTweetRep = nodecg.Replicant('pickupTweet');
pickupTweetRep.on("change", newValue => {
    if (newValue[0] == undefined) {
        pickupTweet.innerHTML = '';
        return;
    }
    pickupTweetData = newValue;
    let tweetsList = '';
    pickupTweetData.forEach(function(value, index) {
        if (pickupTweetData.length != index) {
            tweetsList += '<div>'
            + '<div>'
            + '<img class="image" src="' + value.user.profileImageUrl + '">'
            + '<span>' + value.user.name + '</span><br>'
            + '<span class="userid">@' + value.user.screenName + '</span>'
            + '</div>'
            + '<div>' + value.text + '</div>'
            + '<button onclick="movePickupTweet(' + index + ');">おたより一覧に戻す</button>'
            + '<hr class="border">'
            + '</div>';
        }
    });
    pickupTweet.innerHTML = tweetsList;
});

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
    bodyButton[0].disabled = false;
    nodecg.sendMessage('postTweetTheme');
}

function postTweetBody(num) {
    bodyButton[num].disabled = true;
    if (num + 1 < 4) {
        bodyButton[num + 1].disabled = false;
    } else {
        postTweetRecruitButton.disabled = false;
    }
    nodecg.sendMessage('postTweetBody', num);
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