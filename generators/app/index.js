'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const prompts = require('./prompts');
const util = require('../util');
const writing = require('./writing');

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
    packageName: prompts.askForPackageName,
    dependencies: prompts.askForDependencies,
    database: prompts.askForDatabase,
    defaultImpl: prompts.askForDefaultImplementation
  },

  configuring: function () {
    if (this.continue === false) {
      process.exit(1);
    }

    this.lowercaseAppName = _.toLower(this.appName);
    this.appName = _.upperFirst(this.appName);
    this.packagePath = util.convertToPath(this.package);
  },

  default: function () {

  },

  writing: {
    gitIgnore: writing.gitIgnore,
    pom: writing.pom,
    java: writing.java,
    defaultImpl: writing.defaultImpl,
    appProperties: writing.applicationProperties
  },

  conflicts: function () {

  },


  install: function () {

  },

  end: function () {
    this.log(
      'Thank you for using the ' + chalk.red('generator-genapi') + ' generator!'
    );
  }
});
