'use strict';

const qExpression = require('../../index');

describe('dateExceedsTwoYearsFromNow', () => {
    it('should return true if dateExceedsTwoYearsFromNow', () => {
        const expression = ['dateExceedsTwoYearsFromNow', '$.answers.section1.q1'];
        const data = {
            answers: {
                section1: {
                    q1: '2017-02-01T00:00Z'
                }
            }
        };
        const result = qExpression.evaluate(expression, data);

        expect(result).toEqual(true);
    });

    it('should return false if not dateExceedsTwoYearsFromNow', () => {
        const expression = ['dateExceedsTwoYearsFromNow', '$.answers.section1.q1'];
        const data = {
            answers: {
                section1: {
                    q1: '2099-12-01T00:00Z'
                }
            }
        };
        const result = qExpression.evaluate(expression, data);

        expect(result).toEqual(false);
    });
});
