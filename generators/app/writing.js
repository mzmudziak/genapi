'use strict';

module.exports = {
    gitIgnore,
    pom,
    java,
    applicationProperties
};

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
        this.destinationPath('./' + this.lowercaseAppName + '/src/main/java/' + this.packagePath + '/' + this.appName + '.java'),
        this
    );
}

function applicationProperties() {
    this.fs.copyTpl(
        this.templatePath('_application-dev.properties'),
        this.destinationPath('./' + this.lowercaseAppName + '/src/main/resources/application-dev.properties'),
        this
    );
    this.fs.copyTpl(
        this.templatePath('_application-prod.properties'),
        this.destinationPath('./' + this.lowercaseAppName + '/src/main/resources/application-prod.properties'),
        this
    );
}