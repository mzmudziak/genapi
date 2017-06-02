'use strict';
const chalk = require('chalk');
const _ = require('lodash');

module.exports = {
    askForEntity
};

function askForEntity() {
    var done = this.async();
    var prompts = [
        {
            when: () => this.entities.length > 0,
            type: 'confirm',
            name: 'generateAnotherEntity',
            message: 'Would you like to generate another entity?',
            default: true
        },
        {
            when: (answer) => this.entities.length === 0 || answer.generateAnotherEntity === true,
            type: 'input',
            name: 'entityName',
            message: 'What name would you like for your entity?',
            validate: (input) => input !== null && input !== ''
        }];

    this.prompt(prompts).then(function (answers) {
        var entity = {};
        entity.name = _.upperFirst(answers.entityName);
        entity.camelCaseName = _.camelCase(entity.name);
        entity.mapping = _.toLower(entity.name) + 's';
        if (this.entities.length === 0 || answers.generateAnotherEntity) {
            this.entities.push(entity);
            logEntities.call(this);
            askForEntity.call(this, done);
        } else {
            done();
        }
    }.bind(this));
}

function logEntities() {
    if (this.entities.length > 0) {
        this.log('Currently added entities:');
        this.entities.forEach((element) => {
            this.log(chalk.grey(element.name));
        });
    }
}
