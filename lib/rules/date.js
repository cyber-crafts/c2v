"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
exports.default = {
    before: function (limit) { return function (value) { return value.isBefore(limit); }; },
    after: function (limit) { return function (value) { return value.isAfter(limit); }; },
    closerThanFromNow: function (amount, unit) {
        return (amount < 0) ?
            // checking the past check if given date is after the limit
            function (value) { return value.isAfter((0, moment_1.default)().subtract(Math.abs(amount), unit)); } :
            // checking the past check if given date is before the limit
            function (value) { return value.isSameOrBefore((0, moment_1.default)().add(amount, unit)); };
    },
    furtherThanFromNow: function (amount, unit) {
        return (amount < 0) ?
            // checking the past check if given date is before the limit
            function (value) { return value.isBefore((0, moment_1.default)().subtract(Math.abs(amount), unit)); } :
            // checking the past check if given date is after the limit
            function (value) { return value.isSameOrAfter((0, moment_1.default)().add(amount, unit)); };
    },
};
