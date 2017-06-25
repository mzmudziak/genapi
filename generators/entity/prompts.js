'use strict';
const chalk = require('chalk');
const validator = require('../validator');
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
            validate: function (response) {
                if (!(/^([a-zA-Z0-9_]*)$/).test(response)) {
                    return 'Entity name cannot contain special characters';
                }
                if (_.startsWith(_.toLower(response), 'entity')) {
                    return 'Entity name cannot start with "Entity"';
                }
                if (validator.isReserved(response, 'JAVA')) {
                    return 'Your entity name cannot contain a Java reserved keyword';
                }
                if (response === '') {
                    return 'The entity name cannot be empty';
                }

                return true;
            }
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
                }
            ]
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
