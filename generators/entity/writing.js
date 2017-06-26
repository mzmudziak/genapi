'use strict';

module.exports = {
    java
};

function java() {
this.fs.copyTpl(
    this.templatePath('_EntityController.java'),
    this.destinationPath('./' + this.lowercaseAppName + '/src/main/java/' +
        this.packagePath + '/controller/' + this.entityName + 'Controller.java'),
    this
);
this.fs.copyTpl(
    this.templatePath('_Entity.java'),
    this.destinationPath('./' + this.lowercaseAppName + '/src/main/java/' +
        this.packagePath + '/domain/' + this.entityName + '.java'),
    this
);
this.fs.copyTpl(
    this.templatePath('_EntityRepository.java'),
    this.destinationPath(
        './' + this.lowercaseAppName + '/src/main/java/' +
        this.packagePath + '/repository/' + this.entityName + 'Repository.java'),
    this
);
}
