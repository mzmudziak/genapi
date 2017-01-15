'use strict';
var _ = require('lodash');

module.exports = {
    convertToPath
}

function convertToPath(data) {
    var path = _.replace(data, '.', '/');
    
    return path;
}