'use strict';

const jr = require('json-rules')();

const operatorDateDifferenceGreaterThanTwoDays = require('./index');

jr.addOperator('dateDifferenceGreaterThanTwoDays', operatorDateDifferenceGreaterThanTwoDays, true);

describe('dateDifferenceGreaterThanTwoDays', () => {
    it('should return true if dateDifferenceGreaterThanTwoDays', () => {
        const expression = [
            'dateDifferenceGreaterThanTwoDays',
            '$.answers.section1.q1',
            '$.answers.section2.q2'
        ];
        const data = {
            answers: {
                section1: {
                    q1: '2015-02-01T00:00Z'
                },
                section2: {
                    q2: '2015-02-05T00:00Z'
                }
            }
        };
        const result = jr.evaluate(expression, data);

        expect(result).toEqual(true);
    });

    it('should return false if not dateDifferenceGreaterThanTwoDays', () => {
        const expression = [
            'dateDifferenceGreaterThanTwoDays',
            '$.answers.section1.q1',
            '$.answers.section2.q1'
        ];
        const data = {
            answers: {
                section1: {
                    q1: '2015-02-01T00:00Z'
                },
                section2: {
                    q1: '2015-02-02T00:00Z'
                }
            }
        };

        const result = jr.evaluate(expression, data);

        expect(result).toEqual(false);
    });
});
