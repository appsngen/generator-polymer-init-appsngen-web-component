'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the first-rate ' + chalk.red('generator-polymer-init-appsngen-generator') + ' generator!'
    ));

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

    this.fs.copy(
      this.templatePath('Gruntfile.js'),
      this.destinationPath('Gruntfile.js')
    );

    this.fs.copyTpl(
      `${this.templatePath()}/**/!(_|Gruntfile.js)*`,
      this.destinationPath(),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('src/_element.html'),
      this.destinationPath(`src/${elementName}.html`),
      this.props
    );
  },

  install: function () {
    this.installDependencies();
  }
});
