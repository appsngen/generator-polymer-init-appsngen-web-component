## Web Component

### Features 

Before use features you need set some values.

For Browserstack you need set USER_NAME and API_KEY in config.json file and run Grunt task update-keys or set USER_NAME and API_KEY in files:
* .gemini.yml
* browserstack.json

And for JFROG you need set API_KEY in Gruntfile.js and REGISTRY_URL in .bowerrc.

All features you can use via Grunt task:
* wct-test-local - run unit test via Web Component Tester(WCT) local;
* wct-test-remote - run unit test via Web Component Tester(WCT) remote on Browserstack Cloud service;
* gemini-local-update - updated reference screenshots via Gemini local(Use PhantomJS);
* gemini-local-test - run UI test via Gemini local(Use PhantomJS);
* gemini-remote-update - updated reference screenshots via Gemini remote on Browserstack Cloud service;
* gemini-remote-test - run UI test via Gemini remote on Browserstack Cloud service;
* performance-test - run performance test remote on Browserstack Cloud service;
* update-keys - update Browserstack credential from config.json file;
* private-deploy - deploy component to JFROG.
