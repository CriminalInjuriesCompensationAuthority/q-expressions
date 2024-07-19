'use strict';

const jr = require('json-rules')();

const isJsonExpression = require('./utils/isJsonExpression');
const operatorCond = require('./operators/cond');
const operatorL10nt = require('./operators/l10nt');
const operatorRole = require('./operators/role');
const operatorDateCompare = require('./operators/dateCompare');
const operatorDateDifferenceGreaterThanTwoDays = require('./operators/dateDifferenceGreaterThanTwoDays');
const operatorDateExceedsTwoYearsFromNow = require('./operators/dateExceedsTwoYearsFromNow');
const operatorDateLessThanEighteenYearsAgo = require('./operators/dateLessThanEighteenYearsAgo');

jr.addOperator('|cond', operatorCond, true);
jr.addOperator('|l10nt', operatorL10nt, true);
jr.addOperator('|role.any', operatorRole.any, true);
jr.addOperator('|role.all', operatorRole.all, true);
jr.addOperator('|role.none', operatorRole.none, true);
jr.addOperator('dateCompare', operatorDateCompare, true);
jr.addOperator('dateDifferenceGreaterThanTwoDays', operatorDateDifferenceGreaterThanTwoDays, true);
jr.addOperator('dateExceedsTwoYearsFromNow', operatorDateExceedsTwoYearsFromNow);
jr.addOperator('dateLessThanEighteenYearsAgo', operatorDateLessThanEighteenYearsAgo);

module.exports = Object.freeze({
    evaluate: jr.evaluate,
    isJsonExpression
});
