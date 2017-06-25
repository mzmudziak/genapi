'use strict';

const RESERVED = require('./constants').reservedKeywords;

function isReserved(name, type) {
    return name !== null && type !== null && RESERVED[type.toUpperCase()] !== null && RESERVED[type.toUpperCase()].indexOf(name.toUpperCase()) !== -1;
}

module.exports = {
    isReserved: isReserved
}