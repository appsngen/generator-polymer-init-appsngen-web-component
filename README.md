# generator-polymer-init-appsngen-web-component [![Build Status](https://secure.travis-ci.org/appsngen/generator-polymer-init-appsngen-web-component.png?branch=master)](https://travis-ci.org/appsngen/generator-polymer-init-appsngen-web-component)

> [Yeoman](http://yeoman.io) generator


## Getting Started

### AppsNgen-Web-Component Generator

Before install generator you need install all dependency:
* Install python(https://www.python.org/downloads/) only 2.x.x version. After install you should add path to installed Python in system variable PATH;
* Install Microsoft Visual Studio(Visual Studio Community 2015) https://www.visualstudio.com/downloads/. After installation, create a C++ project to download and initialize the required packages;
* Install Gemini(npm install -g gemini);
* Install gemini-browserstack(npm install -g gemini-browserstack);
* Install gemini-express(npm install -g gemini-express);
* Install PhantomJS(npm install -g phantomjs);

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

For Browserstack you need set USER_NAME and/or API_KEY in files:
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
* deploy - deploy component to JFROG.

## License

MIT
