'use strict';

module.exports = {
    gitIgnore,
    pom,
    java
}
function gitIgnore() {
    this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('./' + this.lowercaseAppName + '/.gitignore')
    );
}

function pom() {
    this.fs.copyTpl(
        this.templatePath('_pom.xml'),
        this.destinationPath('./' + this.lowercaseAppName + '/pom.xml'),
        this
    );
}

function java() {
    this.fs.copyTpl(
        this.templatePath('_Application.java'),
        this.destinationPath('./' + this.lowercaseAppName + '/src/main/java/' + this.packagePath + '/' + this.appName + 'Application.java'),
        this
    );
    this.fs.copyTpl(
        this.templatePath('_ExampleController.java'),
        this.destinationPath('./' + this.lowercaseAppName + '/src/main/java/' + this.packagePath + '/controller/ExampleController.java'),
        this
    );
    this.fs.copyTpl(
        this.templatePath('_ExampleEntity.java'),
        this.destinationPath('./' + this.lowercaseAppName + '/src/main/java/' + this.packagePath + '/domain/ExampleEntity.java'),
        this
    );
    this.fs.copyTpl(
        this.templatePath('_ExampleRepository.java'),
        this.destinationPath('./' + this.lowercaseAppName + '/src/main/java/' + this.packagePath + '/repository/ExampleRepository.java'),
        this
    );
}