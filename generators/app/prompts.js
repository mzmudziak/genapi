'use strict';
var _ = require('lodash');

module.exports = {
    askForAppName,
    askForPackageName,
    askForDependencies
}

function askForAppName() {
    var done = this.async();
    var prompts = [{
        type: 'input',
        name: 'appName',
        message: 'What name would you like for your application?'
    }];
    this.prompt(prompts).then(function (answers) {
        this.appName = answers.appName
        done();
    }.bind(this));
}

function askForPackageName() {
    var done = this.async();
    var prompts = [{
        type: 'input',
        name: 'package',
        message: 'What package name would you like to use for your project?',
        default: function () {
            return 'com.' + _.toLower(this.appName);
        }.bind(this),
        filter: function(answer){
            return _.toLower(answer);
        }
    }];

    this.prompt(prompts).then(function (answers) {
        this.package = answers.package;
        done();
    }.bind(this));
}

function askForDependencies() {
    var done = this.async();
    var prompts = [{
        type: 'checkbox',
        name: 'dependencies',
        message: 'Would you like to continue?',
        choices: [
            'Security', 'Liquibase'
        ]
    }];

    this.prompt(prompts).then(function (answer) {
        this.dependencies = answer;
        done();
    }.bind(this));
}   