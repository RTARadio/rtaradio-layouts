'use strict';

const nodecgApiContext = require('../util/nodecg-api-context');
const nodecg = nodecgApiContext.get();
const fetch = require('node-fetch');

const CURRENT_FILE = 'rtaShocking';
const REQUEST_URL = `https://script.google.com/macros/s/${nodecg.bundleConfig.google.webAppURL}/exec?id=${nodecg.bundleConfig.google.spreadsheetId}&sheet=${CURRENT_FILE}`;

requestReload();

function requestReload() {
    fetch(REQUEST_URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(responseData) {
            nodecg.Replicant(`${CURRENT_FILE}Data`).value = responseData;
        });
}

nodecg.listenFor(`${CURRENT_FILE}Reload`, requestReload);