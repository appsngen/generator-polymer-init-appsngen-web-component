'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
    prompting: function () {

        var prompts = [{
            type: 'input',
            name: 'elementName',
            message: 'What would you like your root element to be called?',
            default: 'my-element'
        }];

        return this.prompt(prompts).then(function (props) {
            // To access props later use this.props.someAnswer;
            this.props = props;
        }.bind(this));
    },

    writing: function () {
        const elementName = this.props.elementName;

        var files = [
            'gemini/gemini.test.js',
            'perfomance-test/perfomance-test.html',
            '.gitignore',
            '.bowerrc',
            '.gemini.yml',
            '.gemini-local.yml',
            'browserstack.json',
            'default-browserstack-browsers.json',
            'Gruntfile.js',
            'wct.conf.js',
            'README.md'
        ];

        var templates = [
            'gemini/index.html',
            'perfomance-test/perfomance-test.html',
            'test/unit-test.html',
            'bower.json',
            'index.html',
            'package.json'
        ];

        var i;

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
