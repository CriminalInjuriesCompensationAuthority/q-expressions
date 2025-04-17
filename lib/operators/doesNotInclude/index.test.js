'use strict';

const qExpression = require('../../index');

describe('doesNotInclude', () => {
    describe('Given a series of disallowed values', () => {
        it('should return true if the answered question in the data has no values from the provided series', () => {
            // prettier-ignore
            const expression = ['doesNotInclude', "$.answers.p-foo.q-foo", ["bar", "baz"]];
            const data = {
                answers: {
                    'p-foo': {
                        'q-foo': ['biz']
                    }
                }
            };
            const result = qExpression.evaluate(expression, data);

            expect(result).toEqual(true);
        });

        it('should return false if the answered question in the data contains any values from the provided series', () => {
            // prettier-ignore
            const expression = ['doesNotInclude', "$.answers.p-foo.q-foo", ["bar", "baz"]];
            const data = {
                answers: {
                    'p-foo': {
                        'q-foo': ['bar', 'biz']
                    }
                }
            };
            const result = qExpression.evaluate(expression, data);

            expect(result).toEqual(false);
        });

        it('should return true if the question specified in the condition is unanswered', () => {
            // prettier-ignore
            const expression = ['doesNotInclude', "$.answers.p-foo.q-foo", ["bar", "baz"]];
            const data = {
                answers: {
                    'p-foo': {
                        'q-bar': ['biz']
                    }
                }
            };
            const result = qExpression.evaluate(expression, data);

            expect(result).toEqual(true);
        });
    });
});
