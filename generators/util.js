'use strict';
const _ = require('lodash');
const chalk = require('chalk');

module.exports = {
    convertToPath,
    findTypeByItsName,
    logFields
};

function convertToPath(data) {
    var path = _.replace(data, '.', '/');

    return path;
}

function findTypeByItsName(name) {
    var index = -1;
    for (var i = 0, len = this.fields.length; i < len; i += 1) {
        if (this.fields[i].name === name) {
            index = i;
            break;
        }
    }

    return this.fields[index].type;
}

function logFields() {
    if (this.fields.length > 0) {
        this.log('Currently added fields:');
        this.fields.forEach((field) => {
            this.log(chalk.grey(field.name));
        });
    }
}
