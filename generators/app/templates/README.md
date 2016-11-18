## Web Component

### Features 

Before use features you need set some values.

For Browserstack you can set USER_NAME and/or API_KEY in files:
* .gemini.yml
* browserstack.json
* Gruntfile.js
* wct.conf.js

And for JFROG you need set API_KEY in Gruntfile.js and REGISTRY_URL in .bowerrc.

All features you can use via Grunt task:
* wct-test-local - run unit test via Web Component Tester(WCT) local;
* wct-test-remote - run unit test via Web Component Tester(WCT) remote on Browserstack Cloud service;
* gemini-local-update - updated reference screenshots via Gemini(WCT) local(Use PhantomJS);
* gemini-local-test - run UI test via Gemini(WCT) local(Use PhantomJS);
* gemini-remote-update - updated reference screenshots via Gemini(WCT) remote on Browserstack Cloud service;
* gemini-remote-test - run UI test via Gemini(WCT) remote on Browserstack Cloud service;
* browserstack-performance-test - run performance test via Browserstack-runner remote on Browserstack Cloud service;
* update-keys - update keys using parameters from config.json;
* deploy - deploy component to JFROG.
