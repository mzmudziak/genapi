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
            when: this.fields.length === 0,
            type: 'input',
            name: 'entityName',
            message: 'What name would you like for your entity?',
            validate: (input) => input !== null && input !== ''
        }];
    this.prompt(prompts).then((answers) => {
        this.entityName = _.upperFirst(answers.entityName);
        done();
    });
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
                    value: 'String'
                },
                {
                    name: 'Integer',
                    value: 'Integer'
                },
                {
                    name: 'Double',
                    value: 'Double'
                },
                {
                    name: 'Float',
                    value: 'Float'
                },
                {
                    name: 'Boolean',
                    value: 'Boolean'
                }]
        }];
    this.prompt(prompts).then((answers) => {
        var field = {};
        if (answers.addField) {
            field.name = _.camelCase(answers.name);
            field.type = answers.type;
            this.fields.push(field);
            logFields.call(this);
            askForEntityFields.call(this, done);
        } else {
            done();
        }
    });
}

function logFields() {
    if (this.fields.length > 0) {
        this.log('Currently added fields:');
        this.fields.forEach((field) => {
            this.log(chalk.grey(field.name));
        });
    }
}
