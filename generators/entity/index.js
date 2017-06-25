'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const prompts = require('./prompts');
const writing = require('./writing');
const _ = require('lodash');
const util = require('../util');

module.exports = Generator.extend({
    initializing: {
        greeting: function () {
            this.log(yosay(
                'Welcome to the ' + chalk.green('generator-genapi') + ':' + chalk.red('entity') + ' generator!'
            ));
        },
        init: function () {
            this.fields = [];
            this.fieldNamesSnakeCase = [];
            this.relationships = [];
            this.queryMethods = [];
            this.hasOneToOneRelationship = false;
            this.hasOneToManyRelationship = false;
            this.hasManyToOneRelationship = false;
            this.hasManyToManyRelationship = false;
        }
    },

    prompting: {
        name: prompts.askForEntityName,
        fields: prompts.askForEntityFields,
        relationships: prompts.askForRelationship,
        queries: prompts.askForQueryMethods
    },

    configuring: function () {
        this.lowercaseAppName = this.config.get('lowercaseAppName');
        this.package = this.config.get('package');
        this.packagePath = this.config.get('packagePath');
        this.camelCaseName = _.camelCase(this.entityName);
        this.mapping = _.toLower(this.entityName) + 's';
    },

    default: function () {
        util.logFields.call(this);
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
