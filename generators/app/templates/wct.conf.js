var path = require('path');
var fs = require('fs');

var configFile = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var ret = {
    'suites': ['test'],
    'webserver': {
        'pathMappings': []
    }
};
var mapping = {};
var rootPath = (__dirname).split(path.sep).slice(-1)[0];

mapping['/components/' + rootPath  +
'/bower_components'] = 'bower_components';

ret.webserver.pathMappings.push(mapping);

/**
 * Adds BrowserStack config
 */
function configBrowserStack(config) {
    var user = configFile.browserstackUserName;
    var key = configFile.browserstackAPIKey;
    if (!user || !key) {
        throw new Error('Missing BrowserStack credentials. Did you forget to set BROWSERSTACK_USER and/or BROWSERSTACK_KEY?');
    }

    var url = process.env.BROWSERSTACK_URL || 'http://' + user + ':' + key + '@hub.browserstack.com/wd/hub';

    var ALL_BROWSERS = require(__dirname + '/wct-browserstack-browsers.json');
    var browsers = ALL_BROWSERS.map(function(b) {
        b['browserstack.local'] = 'true';
        b['browserstack.debug'] = 'true';
        b['url'] = url;
        return b;
    });

    config.activeBrowsers = config.activeBrowsers || [];
    config.activeBrowsers = config.activeBrowsers.concat(browsers);
}

configBrowserStack(ret);

module.exports = ret;
