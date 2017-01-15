'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var prompts = require('./prompts');

module.exports = Generator.extend({
  initializing: {
    greeting: function () {
      this.log(yosay(
        'Welcome to the ' + chalk.red('generator-genapi') + ' generator!'
      ));

    },
    allocating: function () {
      this.databases = [];
    }
  },

  prompting: {
    app: prompts.askForAppName,
    default: prompts.askForPackageName,
    dependencies: prompts.askForDependencies,
    database: prompts.askForDatabase
  },

  configuring: function () {
    if (this.continue === false) {
      process.exit(1);
    }
  },

  default: function () {

  },

  writing: function () {
    this.fs.copy(
      this.templatePath('test.txt'),
      this.destinationPath('test.txt')
    );
    this.fs.copyTpl(
      this.templatePath('_pom.xml'),
      this.destinationPath('./pom.xml'), this
    )
  },

  conflicts: function () {

  },


  install: function () {

  },

  end: function () {

  }
});
