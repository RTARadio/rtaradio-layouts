'use strict';

const nodecgApiContext = require("../util/nodecg-api-context");
const nodecg = nodecgApiContext.get();
const Twit = require('twit');

const client = new Twit({
    consumer_key: nodecg.bundleConfig.twitter.consumerKey,
    consumer_secret: nodecg.bundleConfig.twitter.consumerSecret,
    access_token: nodecg.bundleConfig.twitter.accessTokenKey,
    access_token_secret: nodecg.bundleConfig.twitter.accessTokenSecret
});

const MAX_TWEETS = 100;
const tweetsRep = nodecg.Replicant('tweets');
const postTweetRep = nodecg.Replicant('postTweet');
const pickupTweetRep = nodecg.Replicant('pickupTweet');

function addTweet(newTweet) {
    if (tweetsRep.value) {
        tweetsRep.value = [
            newTweet,
            ...tweetsRep.value.slice(0, MAX_TWEETS - 1),
        ];
    } else {
        tweetsRep.value = [newTweet];
    }
}

function addPostTweet(newTweet) {
    if (postTweetRep.value) {
        postTweetRep.value = [
            newTweet,
            ...postTweetRep.value.slice(0, MAX_TWEETS - 1),
        ];
    } else {
        postTweetRep.value = [newTweet];
    }
}

function addPickupTweet(newTweet) {
    if (pickupTweetRep.value) {
        pickupTweetRep.value = [
            newTweet,
            ...pickupTweetRep.value.slice(0, MAX_TWEETS - 1),
        ];
    } else {
        pickupTweetRep.value = [newTweet];
    }
}

function main() {
    const stream = client.stream('statuses/filter', { track: nodecg.bundleConfig.twitter.targetWords, });
    stream.on('tweet', data => {
        if (data.retweeted_status || data.quoted_status || data.in_reply_to_user_id) {
            return;
        }
        try {
            let newTweet = {
                id: data.id_str,
                user: {
                    profileImageUrl: data.user.profile_image_url_https,
                    name: data.user.name,
                    screenName: data.user.screen_name,
                },
                text: data.text
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>'),
                createdAt: new Date(data.created_at).toISOString(),
            };
            addTweet(newTweet);

        } catch (error) {
            nodecg.log.error(error);
        }
    });
};

main();

nodecg.listenFor('addPostTweet', (newValue) => { addPostTweet(newValue) });
nodecg.listenFor('addPickupTweet', (newValue) => { addPickupTweet(newValue) });