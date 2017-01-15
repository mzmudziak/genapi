'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var prompts = require('./prompts');
var util = require('../util');
var writing = require('./writing');

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

    this.lowercaseAppName = _.toLower(this.appName);
    this.packagePath = util.convertToPath(this.package);
  },

  default: function () {

  },

  writing: {
      gitIgnore: writing.gitIgnore,
      pom: writing.pom,
      java: writing.java
  },

  conflicts: function () {

  },


  install: function () {

  },

  end: function () {

  }
});
