'use strict';

function showTweet() {
    nodecg.readReplicant('showTweet', value => {
        document.getElementById("tweet").innerHTML = '<div class="tweetBox">'
        + '<img id="userImage"><span id="tweetName"></span>'
        + '<hr class="border">'
        + '<span id="tweetText"></span>'
        + '</div>';
        document.getElementById("userImage").src = value.user.profileImageUrl;
        document.getElementById("tweetName").innerText = value.user.name;
        document.getElementById("tweetText").innerText = value.text;
        tweet.style.visibility = "visible";
        anime({
            targets: '#tweet',
            translateX: -600,
            easing: 'easeOutQuart',
            direction: 'alternate',
            endDelay: 3000,
        });
    });
}

nodecg.listenFor('showTweet', showTweet);