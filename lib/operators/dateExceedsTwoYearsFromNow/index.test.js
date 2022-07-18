'use strict';

const jr = require('json-rules')();

const operatorDateExceedsTwoYearsFromNow = require('./index');

jr.addOperator('dateExceedsTwoYearsFromNow', operatorDateExceedsTwoYearsFromNow);

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
        const result = jr.evaluate(expression, data);

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
        const result = jr.evaluate(expression, data);

        expect(result).toEqual(false);
    });
});
