/*jshint esversion: 6 */
'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
    prompting: function () {

        let prompts = [
            {
                type: 'input',
                name: 'elementName',
                message: 'What would you like your root element to be called?',
                default: 'ngn-element',
                validate: function (input) {
                    var hyphenPosition = input.indexOf('-');

                    if (hyphenPosition === -1) {
                        return 'Invalid element name. Elements must include a hyphen in their name. Please try again.';
                    }

                    return true;
                }
            },
            {
                type: 'input',
                name: 'browserstackUserName',
                message: 'Please enter your Browserstack user name.',
                default: 'BROWSERSTACK_USER_NAME'
            },
            {
                type: 'input',
                name: 'browserstackAPIKey',
                message: 'Please enter your Browserstack API key.',
                default: 'BROWSERSTACK_API_KEY'
            },
            {
                type: 'input',
                name: 'jFrogURL',
                message: 'Please enter your JFROG artifactory URL.',
                default: 'JFROG_ARTIFACTORY_URL'
            },
            {
                type: 'input',
                name: 'jFrogAPIKey',
                message: 'Please enter your JFROG API key.',
                default: 'JFROG_API_KEY'
            }
        ];

        return this.prompt(prompts).then(function (props) {
            // To access props later use this.props.someAnswer;
            this.props = props;
        }.bind(this));
    },

    writing: function () {
        const elementName = this.props.elementName;

        let files = [
            '.gemini-local.yml',
            'wct-browserstack-browsers.json',
            'Gruntfile.js',
            'wct.conf.js',
            'README.md',
            '.hooks/js/.jscsrc',
            '.hooks/js/config.json',
            '.hooks/js/ignore.txt',
            '.hooks/js/shouldignore.js',
            '.hooks/pre-commit'
        ];

        let templates = [
            'demo/index.html',
            'gemini/gemini.test.js',
            '.gemini.yml',
            'browserstack.json',
            'performance-test/performance-test.html',
            'test/unit-test.html',
            'bower.json',
            'index.html',
            'package.json',
            '.bowerrc',
            'config.json'
        ];

        let i;

        for (i = 0; i < files.length; i++) {
            this.fs.copy(
                this.templatePath(files[i]),
                this.destinationPath(files[i])
            );
        }

        for (i = 0; i < templates.length; i++) {
            this.fs.copyTpl(
                this.templatePath(templates[i]),
                this.destinationPath(templates[i]),
                this.props
            );
        }

        this.fs.copy(
            this.templatePath('_gitignore'),
            this.destinationPath('.gitignore'),
            this.props
        );

        this.fs.copyTpl(
            this.templatePath('src/_element.html'),
            this.destinationPath(elementName + '.html'),
            this.props
        );
    },

    install: function () {
        this.installDependencies();
    }
});
