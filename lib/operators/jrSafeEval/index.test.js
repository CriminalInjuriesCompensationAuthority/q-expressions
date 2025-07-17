'use strict';

const safeEval = require('.');

describe('safeEval', () => {
    let evaluate;

    beforeEach(() => {
        evaluate = jest.fn(() => 'evaluated'); // mock return
    });

    describe('Flat rule resolution', () => {
        it('should resolve pointers and call evaluate with resolved values', () => {
            const rule = ['==', '$.page1.q1', '$.page2.q2'];
            const data = {
                page1: {q1: 1},
                page2: {q2: 1}
            };

            const result = safeEval(rule, data, evaluate);

            expect(result).toEqual('evaluated');
            expect(evaluate).toHaveBeenCalledWith(['==', 1, 1], data);
        });

        it('should return undefined if a pointer cannot be resolved', () => {
            const rule = ['==', '$.page1.q1', '$.page2.q2'];
            const data = {
                page1: {q1: 1}
            };

            const result = safeEval(rule, data, evaluate);

            expect(result).toBeUndefined();
            expect(evaluate).not.toHaveBeenCalled();
        });
    });

    describe('Nested rule resolution', () => {
        it('should resolve nested rules and call evaluate with nested result', () => {
            const rule = ['AND', ['==', '$.page1.q1', true], false];
            const data = {
                page1: {q1: true}
            };

            evaluate.mockImplementationOnce(() => true).mockImplementationOnce(() => 'evaluated');

            const result = safeEval(rule, data, evaluate);

            expect(result).toEqual('evaluated');
            expect(evaluate).toHaveBeenNthCalledWith(1, ['==', true, true], data);
            expect(evaluate).toHaveBeenNthCalledWith(2, ['AND', true, false], data);
        });

        it('should return undefined if any nested rule fails due to unresolved pointer', () => {
            const rule = ['AND', ['==', '$.page1.q1', true], ['==', '$.page2.q2', false]];
            const data = {
                page1: {q1: true}
            };

            const result = safeEval(rule, data, evaluate);

            expect(result).toBeUndefined();
            expect(evaluate).toHaveBeenCalledTimes(1);
        });

        it('should return undefined if the first nested rule returns undefined', () => {
            const rule = ['AND', ['==', '$.page1.q1', true], 'value'];
            const data = {
                // page1.q1 is missing
                page2: {q2: 'value'}
            };

            const result = safeEval(rule, data, evaluate);

            expect(result).toBeUndefined();
            expect(evaluate).not.toHaveBeenCalled();
        });
    });

    describe('Literal and mixed values', () => {
        it('should include literal values as-is', () => {
            const rule = ['==', '$.page1.q1', 10];
            const data = {
                page1: {q1: 10}
            };

            const result = safeEval(rule, data, evaluate);

            expect(result).toEqual('evaluated');
            expect(evaluate).toHaveBeenCalledWith(['==', 10, 10], data);
        });

        it('should support multiple non-pointer arguments', () => {
            const rule = ['+', '$.page1.q1', 2, 3];
            const data = {
                page1: {q1: 5}
            };

            const result = safeEval(rule, data, evaluate);

            expect(result).toEqual('evaluated');
            expect(evaluate).toHaveBeenCalledWith(['+', 5, 2, 3], data);
        });
    });
});
