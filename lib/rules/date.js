"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
exports.default = {
    before: function (limit) { return function (value) { return value.isBefore(limit); }; },
    after: function (limit) { return function (value) { return value.isAfter(limit); }; },
    closerThanFromNow: function (amount, unit) {
        return (amount < 0) ?
            // checking the past check if given date is after the limit
            function (value) { return value.isAfter(moment().subtract(Math.abs(amount), unit)); } :
            // checking the past check if given date is before the limit
            function (value) { return value.isSameOrBefore(moment().add(amount, unit)); };
    },
    furtherThanFromNow: function (amount, unit) {
        return (amount < 0) ?
            // checking the past check if given date is before the limit
            function (value) { return value.isBefore(moment().subtract(Math.abs(amount), unit)); } :
            // checking the past check if given date is after the limit
            function (value) { return value.isSameOrAfter(moment().add(amount, unit)); };
    }
};
