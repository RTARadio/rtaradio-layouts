'use strict';

let currentFile = 'postTweet';

window.onload = function () {
    const postTweet = document.getElementById("postTweet");
    const pickupTweet = document.getElementById("pickupTweet");
}

let postTweetData;
let pickupTweetData;

const postTweetRep = nodecg.Replicant('postTweet');
postTweetRep.on("change", newValue => {
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
            <button onclick="addPickupTweet(${index});">放送に表示</button>
            <button onclick="deletePostTweet(${index});">おたより一覧から削除</button>
            <hr class="border">
            </div>`;
        }
    });
    postTweet.innerHTML = tweetsList;
});

const pickupTweetRep = nodecg.Replicant('pickupTweet');
pickupTweetRep.on("change", newValue => {
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
            <hr class="border">
            </div>`;
        }
    });
    pickupTweet.innerHTML = tweetsList;
});

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

function showInit() {
    initButton.disabled = true;
    titleButton.disabled = false;
    nodecg.sendMessage(currentFile + 'Change');
}

function showTitle() {
    titleButton.disabled = true;
    topicsTopButton.disabled = false;
    nodecg.sendMessage(currentFile + 'Title');
}