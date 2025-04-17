'use strict';

function doesNotInclude(rule, data, evaluate) {
    const disallowedValues = rule[2];
    const objectValue = evaluate(rule[1], data);
    if (!objectValue) {
        return true;
    }
    return objectValue.every(answer => disallowedValues.includes(answer) === false);
}

module.exports = doesNotInclude;
