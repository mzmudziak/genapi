'use strict';
module.exports = {
    askForDefault
}

function askForDefault() {
    var done = this.async();
    var prompts = [{
        type: 'confirm',
        name: 'continue',
        message: 'Would you like to continue?',
        default: true
    }];

    this.prompt(prompts).then(function (answer) {
        this.continue = answer;
        done();
    }.bind(this));
}   