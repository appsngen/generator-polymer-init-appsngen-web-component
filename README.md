# generator-polymer-init-appsngen-web-component [![Build Status](https://secure.travis-ci.org/appsngen/generator-polymer-init-appsngen-web-component.png?branch=master)](https://travis-ci.org/appsngen/generator-polymer-init-appsngen-web-component)

> AppsNgen web-component generator


## Getting Started

### Prerequisites

Before generator installation you need to install all the dependencies:
* (Skip this step for windows) Install python(https://www.python.org/downloads/) only 2.x.x version. After install you should add path to installed Python in system variable PATH;
* Install build tools:
  * For Windows: windows-build-tools (npm install -g windows-build-tools)
  * For Linux: GCC@4.6 or higher;
* Install Gemini(npm install -g gemini);
* Install gemini-browserstack(npm install -g gemini-browserstack);
* Install browserstack-runner(npm install -g browserstack-runner);
* Install PhantomJS(npm install -g phantomjs);
* Install The Artifactory Bower Resolver (npm install -g bower-art-resolver)

Run this command with admin rights
```
$ npm install -g windows-build-tools gemini gemini-browserstack browserstack-runner phantomjs bower-art-resolver
```

### AppsNgen-Web-Component Generator

To install generator, run:

```
$ npm install -g generator-polymer-init-appsngen-web-component
```

This generator extends [Polymer CLI](https://www.polymer-project.org/1.0/docs/tools/polymer-cli#overview). After you run

```
$ polymer init
```

You'll see suggested templates

```
? Which starter template would you like to use?
  element - A blank element template
  application - A blank application template
  shop - The "Shop" Progressive Web App demo
  starter-kit - A starter application template, with navigation and "PRPL pattern" loading
> appsngen-web-component - AppsNgen web-component generator
```

Here additional `appsngen-web-component - AppsNgen web-component generator` line appears.

Select this line to run the process of generation of the *AppsNgen Web Component*. You will be guided through this process. Attribuetes to be entered are:
* Name (required). Name of the component. We  suggest to start with `ngn-` prefix. Where `ngn` is shorten for the AppNgen.
* BROWSERSTACK_USER_NAME (optional). Generated component will include some tests (both unit and UI) what can be run using [BrowserStack](https://www.browserstack.com) automation. Here is name of user to be used to connect to BrowserStack cloud.
* BROWSERSTACK_API_KEY (optional). Here is API Key used to run your tests in BrowserStack cloud.
* Use private Artifactory Bower registry. (Default value is *No*). Generated code assumes posibility of storing resulting *Web Component* in private Bower registry
  * JFROG_REPOSITORY_PATH. Path toh the Artifactory repo
  * JFROG_REGISTRY_URL.
  * JFROG_API_KEY.



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
