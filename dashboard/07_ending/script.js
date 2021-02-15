'use strict';

let currentFile = 'ending';

let letterData;

const letterRep = nodecg.Replicant('letterData');
letterRep.on("change", newValue => {
    if (newValue == undefined) {
        return;
    }
    letterData = newValue;
    let htmlList = '';
    for(let i in newValue) {
        let nameValue = "";
        if (letterData[i].name != "") {
            nameValue = `${letterData[i].name} さん`
        }
        htmlList += `<div>
        <div>
        <span class="userid">${nameValue}</span><br>
        <span>${letterData[i].description}</span>
        <button id="pickup${i}" onclick="endingPickupShow(${i});">放送に表示</button>
        <hr class="border">
        </div>`;
    }
    endingLetterList.innerHTML = htmlList;
});

function reload() {
    nodecg.sendMessage('letterReload');
    nodecg.sendMessage('parameterReload');
}

function endingLetterShow() {
    endingLetterButton.disabled = true;
    endingCliphourButton.disabled = false;
    nodecg.sendMessage('endingLetter');
}

function endingCliphourShow() {
    endingCliphourButton.disabled = true;
    endingRtaRacingButton.disabled = false;
    nodecg.sendMessage('endingCliphour');
}

function endingRtaRacingShow() {
    endingRtaRacingButton.disabled = true;
    endingAnnouncementButton.disabled = false;
    nodecg.sendMessage('endingRtaRacing');
}

function endingAnnouncementShow() {
    endingAnnouncementButton.disabled = true;
    endingRecruitButton.disabled = false;
    nodecg.sendMessage('endingAnnouncement');
}

function endingRecruitShow() {
    endingRecruitButton.disabled = true;
    endingPostTweetButton.disabled = false;
    nodecg.sendMessage('endingRecruit');
}

function endingPostTweetShow() {
    endingPostTweetButton.disabled = true;
    endingNextButton.disabled = false;
    nodecg.sendMessage('endingPostTweet');
}

function endingNextShow() {
    endingNextButton.disabled = true;
    endingDateButton.disabled = false;
    nodecg.sendMessage('endingNext');
}

function endingDateShow() {
    endingDateButton.disabled = true;
    endingTitleButton.disabled = false;
    nodecg.sendMessage('endingDate');
}

function endingTitleShow() {
    endingTitleButton.disabled = true;
    endingLetterButton.disabled = false;
    nodecg.sendMessage('endingTitle');
}

function endingPickupShow(index) {
    for(let i in letterData) {
        if (i !=  index) {
            document.getElementById('pickup' + i).disabled = false;
        } else {
            document.getElementById('pickup' + i).disabled = true;
        }
    }
    nodecg.sendMessage("endingPickup", letterData[index]);
}