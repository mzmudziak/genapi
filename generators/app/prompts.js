'use strict';
module.exports = {
    askForDefault
}

function askForDefault() {
    var done = this.async();
    var prompts = [{
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to continue?',
        default: true
    }];

    this.prompt(prompts).then(function (answer) {
        this.answer = answer;
        done();
    }.bind(this));
}   