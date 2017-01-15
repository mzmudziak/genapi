'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var prompts = require('./prompts');
var util = require('../util');

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

  writing: function () {
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('./' + this.lowercaseAppName + '/.gitignore')
    );
    this.fs.copyTpl(
      this.templatePath('_pom.xml'),
      this.destinationPath('./' + this.lowercaseAppName + '/pom.xml'),
      this
    );
    this.fs.copyTpl(
      this.templatePath('_Application.java'),
      this.destinationPath('./' + this.lowercaseAppName + '/src/main/java/' + this.packagePath + '/' + this.appName + 'Application.java'),
      this
    );
    this.fs.copyTpl(
      this.templatePath('_ExampleController.java'),
      this.destinationPath('./' + this.lowercaseAppName + '/src/main/java/' + this.packagePath + '/controller/ExampleController.java'),
      this
    );
    this.fs.copyTpl(
      this.templatePath('_ExampleEntity.java'),
      this.destinationPath('./' + this.lowercaseAppName + '/src/main/java/' + this.packagePath + '/domain/ExampleEntity.java'),
      this
    );
    this.fs.copyTpl(
      this.templatePath('_ExampleRepository.java'),
      this.destinationPath('./' + this.lowercaseAppName + '/src/main/java/' + this.packagePath + '/repository/ExampleRepository.java'),
      this
    );
  },

  conflicts: function () {

  },


  install: function () {

  },

  end: function () {

  }
});
