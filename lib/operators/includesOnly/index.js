'use strict';

function includesOnly(rule, data, evaluate) {
    const permittedValues = rule[2];
    const objectValue = evaluate(rule[1], data);
    if (!objectValue) {
        return true;
    }
    return objectValue.every(answer => permittedValues.includes(answer));
}

module.exports = includesOnly;
