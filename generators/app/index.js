'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var prompts = require('./prompts');

module.exports = Generator.extend({
  initializing: function () {
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-genapi') + ' generator!'
    ));
  },

  prompting: {
    askForPackage:  prompts.askForDefault
  },

  configuring: function () {
      if (this.continue === false){
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
  },

  conflicts: function () {

  },


  install: function () {

  },

  end: function () {

  }
});
