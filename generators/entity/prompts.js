'use strict';
const _ = require('lodash');
const chalk = require('chalk');

module.exports = {
    askForEntity
}

function askForEntity() {
    var done = this.async();
    var prompts = [{
        type: 'confirm',
        name: 'generateAnotherEntity',
        message: 'Would you like to generate another entity?',
        default: true
    }, {
        when: (answer) => answer.generateAnotherEntity === true,
        type: 'input',
        name: 'entityName',
        message: 'What name would you like for your entity?',
        validate: function(input){
            return input !== null && input !== '';
        }
    }];

    this.prompt(prompts).then(function (answers) {
        var entity = {};
        entity.name = answers.entityName
        this.entities.push(entity);
        logEntities.call(this);
        if (answers.generateAnotherEntity) {
            askForEntity.call(this, done);
        } else {
            done();
        }
    }.bind(this));
}

function logEntities() {
    this.log('Currently added entities:');
    this.entities.forEach((element) => {
        this.log(chalk.grey(element.name));
    });
}
