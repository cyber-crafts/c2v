"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
exports.default = {
    before: (limit) => (value) => value.isBefore(limit),
    after: (limit) => (value) => value.isAfter(limit),
    closerThanFromNow: (amount, unit) => (amount < 0) ?
        // checking the past check if given date is after the limit
        (value) => value.isAfter(moment().subtract(Math.abs(amount), unit)) :
        // checking the past check if given date is before the limit
        (value) => value.isSameOrBefore(moment().add(amount, unit)),
    furtherThanFromNow: (amount, unit) => (amount < 0) ?
        // checking the past check if given date is before the limit
        (value) => value.isBefore(moment().subtract(Math.abs(amount), unit)) :
        // checking the past check if given date is after the limit
        (value) => value.isSameOrAfter(moment().add(amount, unit))
};
