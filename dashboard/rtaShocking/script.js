'use strict';

let currentFile = 'rtaShocking';

let rtaShockingData;

const dataRep = nodecg.Replicant(currentFile + 'Data');
dataRep.on("change", newValue => {
    if (newValue == undefined) {
        return;
    }
    rtaShockingData = newValue;
    let htmlList = '';
    for(let i in newValue) {
        let nameValue = "";
        if (rtaShockingData[i].name != "") {
            nameValue = `${rtaShockingData[i].name} さん`
        }
        htmlList += `<div>
        <div>
        <span class="userid">${nameValue}</span><br>
        <span>${rtaShockingData[i].description}</span>
        <button id="pickup${i}" onclick="shockingPickup(${i});">放送に表示</button>
        <hr class="border">
        </div>`;
    }
    rtaShocking.innerHTML = htmlList;
});

function reload() {
    nodecg.sendMessage('rtaShockingReload');
}

function shockingGuest() {
    shockingGuestButton.disabled = true;
    shockingProfileButton.disabled = false;
    nodecg.sendMessage('shockingGuest');
}

function shockingProfile() {
    shockingProfileButton.disabled = true;
    shockingLetterButton.disabled = false;
    nodecg.sendMessage('shockingProfile');
}

function shockingLetter() {
    shockingLetterButton.disabled = true;
    shockingTitleButton.disabled = false;
    nodecg.sendMessage('shockingLetter');
}

function shockingTitle() {
    shockingTitleButton.disabled = true;
    shockingNextButton.disabled = false;
    nodecg.sendMessage('shockingTitle');
}

function shockingNext() {
    shockingNextButton.disabled = true;
    shockingNextGuestButton.disabled = false;
    nodecg.sendMessage('shockingNext');
}

function shockingNextGuest() {
    shockingNextGuestButton.disabled = true;
    shockingGuestButton.disabled = false;
    nodecg.sendMessage('shockingNextGuest');
}

function shockingPickup(index) {
    for(let i in rtaShockingData) {
        if (i !=  index) {
            document.getElementById('pickup' + i).disabled = false;
        } else {
            document.getElementById('pickup' + i).disabled = true;
        }
    }
    nodecg.sendMessage("shockingPickup", rtaShockingData[index]);
}