'use strict';

window.onload = function () {
    const tweet = document.getElementById("tweet");
}

let tweets;

const tweetsRep = nodecg.Replicant('tweets');
tweetsRep.on("change", newValue => {
    if (newValue[0] == undefined) {
        tweet.innerHTML = '';
        return;
    }
    tweets = newValue;
    let tweetsList = '';
    tweets.forEach(function(value, index) {
        if (tweets.length - 1 != index) {
            tweetsList += '<div>'
            + '<div><img class="image" src="' + value.user.profileImageUrl + '"><span>'+ value.user.name + '</span><span>:@' + value.user.screenName + '</span></div>'
            + '<div>'+ value.text + '</div>'
            + '<button onclick="showTweet(' + index + ');">ツイート表示</button>'
            + '<button onclick="deleteTweet(' + index +');">ツイート削除</button>'
            + '<button onclick="addTweet(' + index +');">おたよりに追加</button>'
            + '<hr class="border">'
            + '</div>';
        }
    });
    tweet.innerHTML = tweetsList;
});

function showTweet(index) {
    nodecg.Replicant('showTweet').value = tweets[index];
    nodecg.sendMessage("showTweet");
    deleteTweet(index);
}

function deleteTweet(index) {
    tweets.splice(index, 1);
    tweetsRep.value = tweets;
}

function addTweet(index) {
    nodecg.sendMessage("addPostTweet", tweets[index]);
    deleteTweet(index);
}