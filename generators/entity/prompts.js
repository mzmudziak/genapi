'use strict';
const chalk = require('chalk');
const _ = require('lodash');

module.exports = {
    askForEntityName,
    askForEntityFields
};

function askForEntityName() {
    var done = this.async();
    var prompts = [
        {
            when: () => this.fields.length === 0,
            type: 'input',
            name: 'entityName',
            message: 'What name would you like for your entity?',
            validate: (input) => input !== null && input !== ''
        }];
    this.prompt(prompts).then(function (answers) {
        this.log(answers);
        this.entityName = _.upperFirst(answers.entityName);
        this.log(this.entityName);
        done();
    }.bind(this));
}

function askForEntityFields() {
    var done = this.async();
    var prompts = [
        {
            type: 'confirm',
            name: 'addField',
            message: 'Would you like to add a field to your entity?',
            default: true
        },
        {
            when: (answers) => answers.addField === true,
            type: 'input',
            name: 'name',
            message: 'What name would you like for your field?',
            validate: (input) => input !== null && input !== ''
        },
        {
            when: (answers) => answers.addField === true,
            type: 'list',
            name: 'type',
            message: 'What type would you like for your field?',
            choices: [
                {
                    name: 'String',
                    value: 'string'
                },
                {
                    name: 'Integer',
                    value: 'integer'
                },
                {
                    name: 'Double',
                    value: 'double'
                },
                {
                    name: 'Float',
                    value: 'float'
                },
                {
                    name: 'Boolean',
                    value: 'boolean'
                }]
        }];
    this.prompt(prompts).then(function (answers) {
        var field = {};
        if (answers.addField) {
            field.name = answers.name;
            field.type = answers.type;
            this.fields.push(field);
            logFields.call(this);
            askForEntityFields.call(this, done);
        } else {
            done();
        }
    }.bind(this));
}

function logFields() {
    if (this.fields.length > 0) {
        this.log('Currently added fields:');
        this.fields.forEach((field) => {
            this.log(chalk.grey(field.name));
        });
    }
}
