'use strict';
const _ = require('lodash');

module.exports = {
    entities
}

function entities() {
    _.forEach(this.entities, (entity) => {
        this.entity = entity;
        this.fs.copyTpl(
            this.templatePath('_EntityController.java'),
            this.destinationPath('./' + this.lowercaseAppName + '/src/main/java/' + this.packagePath + '/controller/' + entity.name + 'Controller.java'),
            this
        );
        this.fs.copyTpl(
            this.templatePath('_Entity.java'),
            this.destinationPath('./' + this.lowercaseAppName + '/src/main/java/' + this.packagePath + '/domain/' + entity.name + 'Entity.java'),
            this
        );
        this.fs.copyTpl(
            this.templatePath('_EntityRepository.java'),
            this.destinationPath('./' + this.lowercaseAppName + '/src/main/java/' + this.packagePath + '/repository/' + entity.name + 'Repository.java'),
            this
        );
    });
}
