'use strict';
const validator = require('../validator');
const _ = require('lodash');
const util = require('../util');

module.exports = {
    askForEntityName,
    askForEntityFields,
    askForRelationship,
    askForQueryMethods
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
            type: 'list',
            name: 'type',
            message: 'What type would you like for your field?',
            choices: [
                {
                    value: 'String',
                    name: 'String'
                },
                {
                    value: 'Integer',
                    name: 'Integer'
                },
                {
                    value: 'Long',
                    name: 'Long'
                },
                {
                    value: 'Float',
                    name: 'Float'
                },
                {
                    value: 'Double',
                    name: 'Double'
                },
                {
                    value: 'Boolean',
                    name: 'Boolean'
                },
                {
                    value: 'Custom',
                    name: 'Custom'
                }
            ]
        },
        {
            when: function (response) {
                return response.type === 'Custom';
            },
            type: 'input',
            name: 'fieldTypeName',
            message: 'Name of custom type?',
            validate: function (response) {
                if (response === '') {
                    return 'Field Type name can not be empty';
                }
                if (response.charAt(0) !== response.charAt(0).toUpperCase()) {
                    return 'Field Type name must start with upper case';
                }
                if (validator.isReserved(response, 'JAVA')) {
                    return 'Your field type name cannot contain a Java reserved keyword';
                }

                return true;
            }
        },
        {
            when: (answers) => answers.addField === true,
            type: 'input',
            name: 'name',
            message: 'What name would you like for your field?',
            validate: (response) => {
                if (response === '') {
                    return 'Field name cannot not be empty';
                }
                if (response.charAt(0) === response.charAt(0).toUpperCase()) {
                    return 'Field name must start with lower case';
                }
                if (validator.isReserved(response, 'JAVA')) {
                    return 'Your field name cannot contain a Java reserved keyword';
                }
                if (this.fieldNamesSnakeCase.indexOf(_.snakeCase(response)) !== -1) {
                    return 'Field name already used.';
                }

                return true;
            },
            default: (response) => _.camelCase(response.fieldTypeName)
        }
    ];
    this.prompt(prompts).then((answers) => {
        var field = {};
        if (answers.type === 'Custom') {
            answers.type = answers.fieldTypeName;
        }
        if (answers.addField) {
            field.name = _.camelCase(answers.name);
            field.type = answers.type;
            this.fieldNamesSnakeCase.push(_.snakeCase(field.name));
            this.fields.push(field);
            util.logFields.call(this);
            askForEntityFields.call(this, done);
        } else {
            done();
        }
    });
}

function askForRelationship() {
    var done = this.async();
    var prompts = [
        {
            type: 'confirm',
            message: 'Would you like to add a relationship?',
            name: 'addRelationship',
            default: false
        },
        {
            when: (response) => response.addRelationship === true,
            type: 'input',
            name: 'name',
            message: 'What is the name of your relationship?',
            validate: (response) => {
                if (response === '') {
                    return 'Relationship name can not be empty';
                }
                if (response.charAt(0) !== response.charAt(0).toUpperCase()) {
                    return 'Relationship name must start with upper case';
                }
                if (validator.isReserved(response, 'JAVA')) {
                    return 'Your relationship name cannot contain a Java reserved keyword';
                }

                return true;
            }
        },
        {
            when: (response) => response.addRelationship === true,
            type: 'input',
            name: 'field',
            message: 'What is the name of your relationship field?',
            default: (response) => _.camelCase(response.name),
            validate: (response) => {
                if (response === '') {
                    return 'Field name cannot not be empty';
                }
                if (response.charAt(0) === response.charAt(0).toUpperCase()) {
                    return 'Field name must start with lower case';
                }
                if (this.fieldNamesSnakeCase.indexOf(_.snakeCase(response)) !== -1) {
                    return 'Field name already used.';
                }
                if (validator.isReserved(response, 'JAVA')) {
                    return 'Your relationship field name cannot contain a Java reserved keyword';
                }

                return true;
            }
        },
        {
            when: (response) => response.addRelationship === true,
            name: 'type',
            type: 'list',
            message: 'What is the type of your relationship?',
            choices: [
                {
                    value: 'one_to_one',
                    name: 'one_to_one'
                },
                {
                    value: 'one_to_many',
                    name: 'one_to_many'
                },
                {
                    value: 'many_to_one',
                    name: 'many_to_one'
                },
                {
                    value: 'many_to_many',
                    name: 'many_to_many'
                }
            ]
        }
    ];
    this.prompt(prompts).then((answers) => {
        var relationship = {};
        if (answers.addRelationship === true) {
            relationship.name = answers.name;
            relationship.field = answers.field;
            relationship.type = answers.type;
            if (relationship.type === 'one_to_one') {
                this.hasOneToOneRelationship = true;
            }
            if (relationship.type === 'one_to_many') {
                this.hasOneToManyRelationship = true;
            }
            if (relationship.type === 'many_to_one') {
                this.hasManyToOneRelationship = true;
            }
            if (relationship.type === 'many_to_many') {
                this.hasManyToManyRelationship = true;
            }
            this.fieldNamesSnakeCase.push(_.snakeCase(relationship.field));
            this.relationships.push(relationship);
            askForRelationship.call(this, done);
        } else {
            done();
        }
    });
}

function askForQueryMethods() {
    var done = this.async();
    var prompts = [
        {
            type: 'confirm',
            name: 'generateQueryMethods',
            message: 'Do you want to include query methods for your entity?',
            default: false
        },
        {
            when: (response) => response.generateQueryMethods === true,
            type: 'checkbox',
            name: 'queryMethods',
            message: 'For which fields do you want query methods?',
            choices: () => this.fields.slice()
        }
    ];
    this.prompt(prompts).then((answers) => {
        if (answers.generateQueryMethods === true) {
            _.forOwn(answers.queries, (index) => {
                var queryMethod = {
                    snake: _.toUpper(_.snakeCase(index)),
                    upperCamel: _.upperFirst(_.camelCase(index)),
                    camel: _.camelCase(index),
                    type: util.findTypeByItsName.call(this, index)
                };
                this.queryMethods.push(queryMethod);
            }
            );
        }
        done();
    });
}
