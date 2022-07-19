'use strict';

const qExpression = require('../../index');

describe('dateLessThanEighteenYearsAgo', () => {
    it('should return true if dateLessThanEighteenYearsAgo and date entered is less than 18 years ago', () => {
        const expression = ['dateLessThanEighteenYearsAgo', '$.answers.section1.q1'];
        const data = {
            answers: {
                section1: {
                    q1: '2015-02-01T00:00Z'
                }
            }
        };
        const result = qExpression.evaluate(expression, data);

        expect(result).toEqual(true);
    });

    it('should return false if dateLessThanEighteenYearsAgo and date entered is more than 18 years ago', () => {
        const expression = ['dateLessThanEighteenYearsAgo', '$.answers.section1.q1'];
        const data = {
            answers: {
                section1: {
                    q1: '1985-02-01T00:00Z'
                }
            }
        };
        const result = qExpression.evaluate(expression, data);

        expect(result).toEqual(false);
    });
});
