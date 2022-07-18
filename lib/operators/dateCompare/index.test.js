'use strict';

const jr = require('json-rules')();

const operatorDateCompare = require('./index');

jr.addOperator('dateCompare', operatorDateCompare, true);

describe('dateCompare', () => {
    it('should return true if far enough in the past (in years)', () => {
        const expression = [
            'dateCompare',
            '$.answers.section1.q1', // this date ...
            '>', // is more than ...
            '-12', // 12 ...
            'years' // years (before, due to the negative (-12) ...
            // today's date (no second date given. defaults to today's date).
        ];
        const data = {
            answers: {
                section1: {
                    q1: '2005-02-01T00:00:00.000Z'
                }
            }
        };
        const result = jr.evaluate(expression, data);

        expect(result).toEqual(true);
    });

    it('should return false if not far enough in the past (in years)', () => {
        const expression = [
            'dateCompare',
            '$.answers.section1.q1', // this date ...
            '>', // is more than ...
            '-12', // 12 ...
            'years' // years (before, due to the negative (-12) ...
            // today's date (no second date given. defaults to today's date).
        ];
        const data = {
            answers: {
                section1: {
                    q1: `${new Date().getFullYear() - 5}-02-01T00:00:00.000Z`
                }
            }
        };
        const result = jr.evaluate(expression, data);

        expect(result).toEqual(false);
    });

    it('should return true if far enough in the past (in days)', () => {
        const expression = [
            'dateCompare',
            '$.answers.section1.q1', // this date ...
            '<', // is less than...
            '-2', // 2 ...
            'days', // days (before, due to the negative (-2) ...
            '$.answers.section1.q2' // this date.
        ];

        const data = {
            answers: {
                section1: {
                    q1: '2009-06-09T00:00:00.000Z',
                    q2: '2009-06-10T00:00:00.000Z'
                }
            }
        };
        const result = jr.evaluate(expression, data);

        expect(result).toEqual(true);
    });

    it('should return false if far enough in the past (in days)', () => {
        const expression = [
            'dateCompare',
            '$.answers.section1.q1', // this date ...
            '<', // is less than...
            '-2', // 2 ...
            'days', // days (before, due to the negative (-2) ...
            '$.answers.section1.q2' // this date.
        ];
        const data = {
            answers: {
                section1: {
                    q1: '2009-06-06T00:00:00.000Z',
                    q2: '2009-06-10T00:00:00.000Z'
                }
            }
        };
        const result = jr.evaluate(expression, data);

        expect(result).toEqual(false);
    });

    it('should return true if is exactly equal (in days)', () => {
        const expression = [
            'dateCompare',
            '$.answers.section1.q1', // this date ...
            '==', // is equal to ...
            '-14', // 14 ...
            'days', // days (before, due to the negative (-14) ...
            '$.answers.section1.q2' // this date.
        ];
        const data = {
            answers: {
                section1: {
                    q1: '2009-06-03T00:00:00.000Z',
                    q2: '2009-06-17T00:00:00.000Z'
                }
            }
        };
        const result = jr.evaluate(expression, data);

        expect(result).toEqual(true);
    });

    it('should return false if not exactly equal (in days)', () => {
        const expression = [
            'dateCompare',
            '$.answers.section1.q1', // this date ...
            '==', // is equal to ...
            '10', // 10 ...
            'days', // days (after, due to the positve (10) ...
            '$.answers.section1.q2' // this date.
        ];
        const data = {
            answers: {
                section1: {
                    q1: '2009-06-22T00:00:00.000Z',
                    q2: '2009-06-03T00:00:00.000Z'
                }
            }
        };
        const result = jr.evaluate(expression, data);

        expect(result).toEqual(false);
    });

    it('should return true if dates are the same and comparing them with no difference', () => {
        const expression = [
            'dateCompare',
            '$.answers.section1.q1', // this date ...
            '==', // is equal to ...
            '0', // 0 ...
            'days', // days (after, due to the positive (0) ...
            '$.answers.section1.q2' // this date.
        ];
        const data = {
            answers: {
                section1: {
                    q1: '2009-06-17T00:00:00.000Z',
                    q2: '2009-06-17T00:00:00.000Z'
                }
            }
        };
        const result = jr.evaluate(expression, data);

        expect(result).toEqual(true);
    });

    it('should return false if `diff` is a positive non-zero and `amount` rule[3] is `0`', () => {
        const expression = [
            'dateCompare',
            '$.answers.section1.q1', // this date ...
            '==', // is equal to ...
            '0', // 0 ...
            'days', // days (after, due to the positive (0) ...
            '$.answers.section1.q2' // this date.
        ];
        const data = {
            answers: {
                section1: {
                    q1: '2009-06-17T00:00:00.000Z',
                    q2: '2009-06-15T00:00:00.000Z'
                }
            }
        };
        const result = jr.evaluate(expression, data);

        expect(result).toEqual(false);
    });

    it('should return false if `diff` is a negative non-zero and `amount` rule[3] is `0`', () => {
        const expression = [
            'dateCompare',
            '$.answers.section1.q1', // this date ...
            '==', // is equal to ...
            '0', // 0 ...
            'days', // days (after, due to the positive (0) ...
            '$.answers.section1.q2' // this date.
        ];
        const data = {
            answers: {
                section1: {
                    q1: '2009-06-15T00:00:00.000Z',
                    q2: '2009-06-17T00:00:00.000Z'
                }
            }
        };
        const result = jr.evaluate(expression, data);

        expect(result).toEqual(false);
    });

    it('should return false if `diff` `0` and `amount` rule[3] is a positive non-zero', () => {
        const expression = [
            'dateCompare',
            '$.answers.section1.q1', // this date ...
            '==', // is equal to ...
            '2', // 0 ...
            'days', // days (after, due to the positive (0) ...
            '$.answers.section1.q2' // this date.
        ];
        const data = {
            answers: {
                section1: {
                    q1: '2009-06-17T00:00:00.000Z',
                    q2: '2009-06-17T00:00:00.000Z'
                }
            }
        };
        const result = jr.evaluate(expression, data);

        expect(result).toEqual(false);
    });

    it('should return false if `diff` `0` and `amount` rule[3] is a negative non-zero', () => {
        const expression = [
            'dateCompare',
            '$.answers.section1.q1', // this date ...
            '==', // is equal to ...
            '-2', // 0 ...
            'days', // days (after, due to the positive (0) ...
            '$.answers.section1.q2' // this date.
        ];
        const data = {
            answers: {
                section1: {
                    q1: '2009-06-17T00:00:00.000Z',
                    q2: '2009-06-17T00:00:00.000Z'
                }
            }
        };
        const result = jr.evaluate(expression, data);

        expect(result).toEqual(false);
    });

    it('should return true if is more than or equal (in days) - equal to', () => {
        const expression = [
            'dateCompare',
            '$.answers.section1.q1', // this date ...
            '>=', // is more than or equal to ...
            '2', // 2 ...
            'days', // days (after, due to the positive (2) ...
            '$.answers.section1.q2' // this date.
        ];
        const data = {
            answers: {
                section1: {
                    q1: '2009-02-16T00:00:00.000Z',
                    q2: '2009-02-14T00:00:00.000Z'
                }
            }
        };
        const result = jr.evaluate(expression, data);

        expect(result).toEqual(true);
    });

    it('should return true if is more than or equal (in days) - more than', () => {
        const expression = [
            'dateCompare',
            '$.answers.section1.q1', // this date ...
            '>=', // is more than or equal to ...
            '2', // 2 ...
            'days', // days (after, due to the positive (2) ...
            '$.answers.section1.q2' // this date.
        ];
        const data = {
            answers: {
                section1: {
                    q1: '2009-02-23T00:00:00.000Z',
                    q2: '2009-02-14T00:00:00.000Z'
                }
            }
        };
        const result = jr.evaluate(expression, data);

        expect(result).toEqual(true);
    });

    it('should return true if is less than or equal (in days) - equal to', () => {
        const expression = [
            'dateCompare',
            '$.answers.section1.q1', // this date ...
            '<=', // is less than or equal to ...
            '4', // 4 ...
            'days', // days (after, due to the positive (4) ...
            '$.answers.section1.q2' // this date.
        ];
        const data = {
            answers: {
                section1: {
                    q1: '2009-02-20T00:00:00.000Z',
                    q2: '2009-02-16T00:00:00.000Z'
                }
            }
        };
        const result = jr.evaluate(expression, data);

        expect(result).toEqual(true);
    });

    it('should return true if is less than or equal (in days) - less than', () => {
        const expression = [
            'dateCompare',
            '$.answers.section1.q1', // this date ...
            '<=', // is less than or equal to ...
            '4', // 4 ...
            'days', // days (after, due to the positive (4) ...
            '$.answers.section1.q2' // this date.
        ];
        const data = {
            answers: {
                section1: {
                    q1: '2009-02-17T00:00:00.000Z',
                    q2: '2009-02-16T00:00:00.000Z'
                }
            }
        };
        const result = jr.evaluate(expression, data);

        expect(result).toEqual(true);
    });

    it('should return false if comparison direction does not match actual diff direction', () => {
        const expression = [
            'dateCompare',
            '$.answers.section1.q1', // this date ...
            '<', // is less than...
            '8', // 8 ...
            'days', // days (after, due to the positive (8) ...
            '$.answers.section1.q2' // this date.
        ];
        const data = {
            answers: {
                section1: {
                    q1: '2009-06-06T00:00:00.000Z',
                    q2: '2009-06-10T00:00:00.000Z'
                }
            }
        };
        const result = jr.evaluate(expression, data);

        expect(result).toEqual(false);
    });

    it('should default to more than (`>`) operand if an unsupported operand is supplied', () => {
        const expression = [
            'dateCompare',
            '$.answers.section1.q1', // this date ...
            '<>', // unsupported. non-js syntax for "not equal to"...
            '2', // 2 ...
            'days', // days (after, due to the positive (2) ...
            '$.answers.section1.q2' // this date.
        ];
        const data = {
            answers: {
                section1: {
                    q1: '2009-06-15T00:00:00.000Z',
                    q2: '2009-06-10T00:00:00.000Z'
                }
            }
        };
        const result = jr.evaluate(expression, data);

        expect(result).toEqual(true);
    });

    it('should default to "years" units if an unsupported unit is supplied', () => {
        const expression = [
            'dateCompare',
            '$.answers.section1.q1', // this date ...
            '>', // more than ...
            '2', // 2 ...
            'decades', // decades (after, due to the positive (2) ...
            '$.answers.section1.q2' // this date.
        ];
        const data = {
            answers: {
                section1: {
                    q1: '2014-06-15T00:00:00.000Z',
                    q2: '2009-06-10T00:00:00.000Z'
                }
            }
        };
        const result = jr.evaluate(expression, data);

        expect(result).toEqual(true);
    });
});
