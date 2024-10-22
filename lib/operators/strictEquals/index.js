'use strict';

function strictEquals(rule, data, evaluate) {
    const operandLHS = evaluate(rule[1], data);
    const operandRHS = rule[2];
    return operandLHS === operandRHS;
}

module.exports = strictEquals;
