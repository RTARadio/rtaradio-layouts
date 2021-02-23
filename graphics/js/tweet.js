'use strict';

// アニメーション定義
const TWEET_ANIMATION = {
    EASING_NORMAL: 'easeOutQuart',
    EASING_REVERSE: 'easeInQuart',
    TRANSLATE_NORMAL: -600,
    TRANSLATE_REVERSE: 600,
    DURATION_TIME: 1000,
    DELAY_TIME: 5000
}

nodecg.Replicant('showTweet').on("change", newValue => {
    if (newValue == "") {
        return;
    }
    document.getElementById("tweet").innerHTML = '<div class="tweetBox">'
    + '<img id="userImage"><span id="tweetName"></span>'
    + '<hr class="border">'
    + '<span id="tweetText"></span>'
    + '</div>';
    document.getElementById("userImage").src = newValue.user.profileImageUrl;
    document.getElementById("tweetName").innerText = newValue.user.name;
    document.getElementById("tweetText").innerText = newValue.text;
});

function showTweet() {
    tweet.style.visibility = "visible";
    anime({
        targets: '#commonLogo',
        translateX: TWEET_ANIMATION.TRANSLATE_REVERSE,
        easing: TWEET_ANIMATION.EASING_REVERSE,
        duration: TWEET_ANIMATION.DURATION_TIME,
        complete: () => {
            anime({
                targets: '#tweet',
                translateX: TWEET_ANIMATION.TRANSLATE_NORMAL,
                easing: TWEET_ANIMATION.EASING_NORMAL,
                duration: TWEET_ANIMATION.DURATION_TIME,
                endDelay: TWEET_ANIMATION.DELAY_TIME,
                complete: () => {
                    anime({
                        targets: '#tweet',
                        translateX: TWEET_ANIMATION.TRANSLATE_REVERSE,
                        easing: TWEET_ANIMATION.EASING_REVERSE,
                        duration: TWEET_ANIMATION.DURATION_TIME,
                        complete: () => {
                            anime({
                                targets: '#commonLogo',
                                translateX: 0,
                                easing: TWEET_ANIMATION.EASING_NORMAL,
                                duration: TWEET_ANIMATION.DURATION_TIME
                            });
                        }
                    });
                }
            });
        }
    });
}

nodecg.listenFor('showTweet', showTweet);