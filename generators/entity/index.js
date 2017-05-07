'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const prompts = require('./prompts');
const writing = require('./writing');

module.exports = Generator.extend({
    initializing: {
        greeting: function () {
            this.log(yosay(
                'Welcome to the ' + chalk.green('generator-genapi') + ':' + chalk.red('entity') + ' generator!'
            ));
        },
        init: function () {
            this.entities = [];
        }
    },

    prompting: {
        entities: prompts.askForEntity
    },

    configuring: function () {

    },

    default: function () {

    },

    writing: {
        entities: writing.entities
    },

    conflicts: function () {

    },


    install: function () {

    },

    end: function () {
        this.log(
            'Thank you for using the ' + chalk.green('generator-genapi') + ':' + chalk.red('entity') + ' generator!'
        );
    }
});
