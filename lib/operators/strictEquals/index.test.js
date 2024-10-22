'use strict';

const qExpression = require('../../index');

describe('strictEquals', () => {
    it('should return true if the operands strictly equal each other', () => {
        const expression = [
            'strictEquals',
            '$.answers.p-applicant-can-handle-affairs.q-applicant-capable',
            false
        ];
        const data = {
            answers: {
                'p-applicant-can-handle-affairs': {
                    'q-applicant-capable': false
                }
            }
        };
        const result = qExpression.evaluate(expression, data);

        expect(result).toEqual(true);
    });

    it('should return false if the operands strictly not equal each other', () => {
        const expression = [
            'strictEquals',
            '$.answers.p-applicant-can-handle-affairs.q-applicant-capable',
            false
        ];
        const data = {
            answers: {
                'p-applicant-can-handle-affairs': {
                    'q-applicant-capable': 14
                }
            }
        };
        const result = qExpression.evaluate(expression, data);

        expect(result).toEqual(false);
    });

    it('should return false if the data is not present for comparison', () => {
        const expression = [
            'strictEquals',
            '$.answers.p-applicant-can-handle-affairs.q-applicant-capable',
            false
        ];
        const data = {
            answers: {
                p1: {
                    q1: 'foo'
                }
            }
        };
        const result = qExpression.evaluate(expression, data);

        expect(result).toEqual(false);
    });
});
