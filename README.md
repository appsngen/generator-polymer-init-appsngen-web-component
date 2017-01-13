# generator-polymer-init-appsngen-web-component [![Build Status](https://secure.travis-ci.org/appsngen/generator-polymer-init-appsngen-web-component.png?branch=master)](https://travis-ci.org/appsngen/generator-polymer-init-appsngen-web-component)

> AppsNgen web-component generator


## Getting Started

### AppsNgen-Web-Component Generator

Before install generator you need install all dependency:
* Install python(https://www.python.org/downloads/) only 2.x.x version. After install you should add path to installed Python in system variable PATH;
* Install Microsoft Visual Studio(Visual Studio Community 2015) https://www.visualstudio.com/downloads/. After installation, create a C++ project to download and initialize the required packages;
* Install Gemini(npm install -g gemini);
* Install gemini-browserstack(npm install -g gemini-browserstack);
* Install browserstack-runner(npm install -g browserstack-runner);
* Install PhantomJS(npm install -g phantomjs);
* Install The Artifactory Bower Resolver (npm install -g bower-art-resolver)

```
$ npm install -g gemini gemini-browserstack browserstack-runner phantomjs bower-art-resolver
```

To install generator-polymer-init-appsngen-web-component from npm, run:

```
$ npm install -g generator-polymer-init-appsngen-web-component
```

Finally, initiate the generator:

```
$ polymer init
```

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
* private-deploy - deploy component to JFROG;
* lint - JSHint code check;
* jscs-check - JSCS code check.

## License

MIT
