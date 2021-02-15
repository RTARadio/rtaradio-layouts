const nodecgApiContext = require('./util/nodecg-api-context');

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
    require('./initialization/00_parameter');
    require('./initialization/02_rtaShocking');
    require('./initialization/03_rtaGamers');
    require('./initialization/04_recordNewsPb');
    require('./initialization/04_recordNewsTop');
    require('./initialization/05_eventInfoFuture');
    require('./initialization/05_eventInfoPickup');
    require('./initialization/07_letter');
    require('./initialization/08_twitter');
}