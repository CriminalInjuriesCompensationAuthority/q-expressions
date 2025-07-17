'use strict';

// Handle this here (or make it a util in this repo) to control data integrity and avoid conflating it with logical operations.
function getAnswer(dotPointer, answers) {
    if (!dotPointer) {
        return undefined;
    }

    const questionId = dotPointer.split('.')[2];

    return Object.entries(answers).find(([, questions]) => questionId in questions)?.[1][
        questionId
    ];
}

function safeEval(rule, data, evaluate) {
    if (!Array.isArray(rule) || rule.length < 2) {
        return undefined;
    }

    const [operator, ...operands] = rule;

    const resolvedOperands = operands.map(operand => {
        if (Array.isArray(operand)) {
            return safeEval(operand, data, evaluate);
        }
        if (typeof operand === 'string' && operand.startsWith('$')) {
            return getAnswer(operand, data);
        }
        return operand;
    });

    if (resolvedOperands.some(val => val === undefined)) {
        return undefined;
    }

    // Simple evaluation, no JSON pointers to resolve
    // Probably dont need to pass 'data' into this now.
    return evaluate([operator, ...resolvedOperands], data);
}

module.exports = safeEval;
