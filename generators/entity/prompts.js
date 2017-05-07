'use strict';
const chalk = require('chalk');

module.exports = {
    askForEntity
};

function askForEntity() {
    var done = this.async();
    var prompts = [
        {
            when: () => this.entities.length === 0,
            type: 'confirm',
            name: 'generateFirstEntity',
            message: 'Would you like to generate an entity?',
            default: true
        },
        {
            when: () => this.entities.length > 0,
            type: 'confirm',
            name: 'generateAnotherEntity',
            message: 'Would you like to generate another entity?',
            default: true
        },
        {
            when: (answer) => answer.generateFirstEntity === true || answer.generateAnotherEntity === true,
            type: 'input',
            name: 'entityName',
            message: 'What name would you like for your entity?',
            validate: (input) => input !== null && input !== ''
            
        }];

    this.prompt(prompts).then(function (answers) {
        var entity = {};
        entity.name = answers.entityName
        if (answers.generateFirstEntity || answers.generateAnotherEntity) {
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
