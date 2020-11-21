'use strict';

const nodecgApiContext = require('./util/nodecg-api-context');
const nodecg = nodecgApiContext.get();
const fetch = require('node-fetch');

let currentFile = 'rta_gamers';
let reqUrl = 'https://script.google.com/macros/s/' + nodecg.bundleConfig.google.webAppURL + '/exec?id=' + nodecg.bundleConfig.google.spreadsheetId + '&sheet=' + currentFile;
const dataRep = nodecg.Replicant('data_' + currentFile);

requestReload();

function requestReload() {
    fetch(reqUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(responseData) {
            dataRep.value = responseData;
        });
}

nodecg.listenFor('reload_' + currentFile, requestReload);