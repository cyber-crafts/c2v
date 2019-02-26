"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    number: function () { return function (value) { return !isNaN(value); }; },
    integer: function () { return function (value) { return Number.isInteger(value); }; },
    min: function (min, exclusive) {
        if (exclusive === void 0) { exclusive = false; }
        return function (value) { return (exclusive) ? value > min : value >= min; };
    },
    max: function (max, exclusive) {
        if (exclusive === void 0) { exclusive = false; }
        return function (value) { return (exclusive) ? value < max : value <= max; };
    },
    multipleOf: function (modulus) { return function (value) { return value % modulus === 0; }; },
};
