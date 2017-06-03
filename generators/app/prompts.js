'use strict';
var _ = require('lodash'),
    chalk = require('chalk');

module.exports = {
    askForAppName,
    askForPackageName,
    askForDependencies,
    askForDatabase
};

function askForAppName() {
    var done = this.async();
    var prompts = [{
        type: 'input',
        name: 'appName',
        message: 'What name would you like for your application?',
        default: 'MyApp'
    }];

    this.prompt(prompts).then(function (answers) {
        this.appName = answers.appName;
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
            }
        ]
    }];

    this.prompt(prompts).then(function (answers) {
        this.includeSpringSecurity = _.includes(answers.dependencies, 'includeSecurity');
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
        when: (answers) => answers.prodDatabase === 'oracle' || answers.devDatabase === 'oracle',
        type: 'confirm',
        name: 'confirmOracle',
        message: 'Are you sure?\n' +
        chalk.red('!') + ' You have chosen oracle as your database.\n' +
        chalk.red('!') + ' You will have to manually include Oracle Database driver to your environment.',
        default: true
    },
    {
        when: (answer) => answer.confirmOracle === false,
        type: 'list',
        name: 'substituteDatabase',
        message: 'Which database would you like to use instead?',
        choices: [
            {
                name: 'MySQL',
                value: 'mysql'
            }
        ]
    }];
    this.prompt(prompts).then(function (answers) {
        this.databases.push(answers.devDatabase);
        this.databases.push(answers.prodDatabase);
        if (answers.confirmOracle === false) {
            _.remove(this.databases, (db) => db === 'oracle');
        }
        this.includeH2 = _.includes(this.databases, 'h2');
        this.includeMySQL = _.includes(this.databases, 'mysql') || answers.substituteDatabase === 'mysql';
        this.includeOracleDB = _.includes(this.databases, 'oracle');
        done();
    }.bind(this));
}
