const nodecgApiContext = require("./util/nodecg-api-context");

module.exports = nodecg => {
    // Store a reference to this nodecg API context in a place where other libs can easily access it.
    // This must be done before any other files are `require`d.
    nodecgApiContext.set(nodecg);
    // Initialize Extentions
    init().then(() => {
        nodecg.log.info('Initialization successful.');
    }).catch(error => {
        nodecg.log.error('Failed to initialize:', error);
    });
};

async function init() {
    require('./parameter');
    require('./twitter');
    require('./rta_gamers');
    require('./pb_record');
    require('./top_record');
    require('./event_future');
    require('./event_pickup');
}