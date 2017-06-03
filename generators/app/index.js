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
    database: prompts.askForDatabase
  },

  configuring: function () {
    this.includeH2 = _.includes(this.databases, 'h2');
    this.includeMySQL = _.includes(this.databases, 'mysql');
    this.includeOracleDB = _.includes(this.databases, 'oracle');
    this.includePostgreSQL = _.includes(this.databases, 'postgresql');
    this.lowercaseAppName = _.toLower(this.appName);
    this.appName = _.upperFirst(this.appName);
    this.packagePath = util.convertToPath(this.package);
    this.config.set('packagePath', this.packagePath);
    this.config.set('package', this.package);
    this.config.set('lowercaseAppName', this.lowercaseAppName);
  },

  default: function () {

  },

  writing: {
    gitIgnore: writing.gitIgnore,
    pom: writing.pom,
    java: writing.java,
    appProperties: writing.applicationProperties
  },

  conflicts: function () {

  },


  install: function () {

  },

  end: function () {
    this.log(
      '\nThank you for using the ' + chalk.red('generator-genapi') + ' generator!' +
      chalk.green('\n\nDid you know?') + '\nYou can generate entities using ' + chalk.cyan('genapi:entity') + ' generator!'
    );
  }
});
