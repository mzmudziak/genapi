'use strict';
var _ = require('lodash'),
    chalk = require('chalk');

module.exports = {
    askForAppName,
    askForPackageName,
    askForDependencies,
    askForDatabase,
    askForDefaultImplementation
}

function askForAppName() {
    var done = this.async();
    var prompts = [{
        type: 'input',
        name: 'appName',
        message: 'What name would you like for your application?',
        default: 'MyApp'
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
        filter: function (answer) {
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
        message: 'Which dependencies would you like to include?',
        choices: [
            {
                name: 'Spring Security',
                value: 'includeSecurity'
            },
            {
                name: 'Liquibase',
                value: 'includeLiquibase'
            }
        ]
    }];

    this.prompt(prompts).then(function (answers) {
        this.includeSpringSecurity = _.includes(answers.dependencies, 'includeSecurity');
        this.includeLiquibase = _.includes(answers.dependencies, 'includeLiquibase');
        done();
    }.bind(this));
}

function askForDatabase() {
    var done = this.async();
    var prompts = [{
        type: 'list',
        name: 'devDatabase',
        message: 'Which development database engine would you like to use?',
        choices: [
            {
                name: 'H2',
                value: 'h2'
            },
            {
                name: 'MySQL',
                value: 'mysql'
            },
            {
                name: 'Oracle',
                value: 'oracle'
            }
        ]
    },
    {
        type: 'list',
        name: 'prodDatabase',
        message: 'Which production database would you like to use',
        choices: [
            {
                name: 'Oracle',
                value: 'oracle'
            },
            {
                name: 'MySQL',
                value: 'mysql'
            }
        ]
    }];
    this.prompt(prompts).then(function (answers) {
        this.devDatabase = answers.devDatabase;
        this.prodDatabase = answers.prodDatabase;
        this.databases.push(this.devDatabase);
        this.databases.push(this.prodDatabase);
        this.includeH2 = _.includes(this.databases, 'h2');
        this.includeMySQL = _.includes(this.databases, 'mysql');
        this.includeOracleDB = _.includes(this.databases, 'oracle');
        done();
    }.bind(this));
}

function askForDefaultImplementation() {
    var done = this.async();
    var prompts = [{
        type: 'confirm',
        name: 'defaultImplementation',
        message: 'Would you like to include default implementation for entities? \n' + chalk.green('+') + ' You can generate them later using entity subgenerator',
        default: false
    }];
    this.prompt(prompts).then(function (answers) {
        this.includeDefaultImpl = answers.defaultImplementation;
        done();
    }.bind(this));
}