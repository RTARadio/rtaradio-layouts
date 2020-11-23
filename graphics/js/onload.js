'use strict';

let gamersTitle;
let gamersTopics;
let gamersDetail;

let recordTitle;
let recordTopTopics;
let recordTopDetail;
let recordPbTopics;
let recordPbDetail;

let eventTitle;
let eventList;
let eventTopics;
const eventDetail = {};

window.onload = function () {
    // RTAGamers出張版
    gamersTitle = document.getElementById("gamersTitle");
    gamersTopics = document.getElementById("gamersTopics");
    gamersDetail = document.getElementById("gamersDetail");

    // 今週の記録更新
    recordTitle = document.getElementById("recordTitle");
    recordTopTopics = document.getElementById("recordTopTopics");
    recordTopDetail = document.getElementById("recordTopDetail");
    recordPbTopics = document.getElementById("recordPbTopics");
    recordPbDetail = document.getElementById("recordPbDetail");

    // RTAイベントインフォメーション
    eventTitle = document.getElementById("eventTitle");
    eventList = document.getElementById("eventList");
    eventTopics = document.getElementById("eventTopics");
    eventDetail[0] = document.getElementById("eventDetail0");
    eventDetail[1] = document.getElementById("eventDetail1");
    eventDetail[2] = document.getElementById("eventDetail2");
    eventDetail[3] = document.getElementById("eventDetail3");
}