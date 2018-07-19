"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    number: () => (value) => !isNaN(value),
    integer: () => (value) => Number.isInteger(value),
    min: (min, exclusive = false) => (value) => (exclusive) ? value > min : value >= min,
    max: (max, exclusive = false) => (value) => (exclusive) ? value < max : value <= max,
    multipleOf: (modulus) => (value) => value % modulus === 0
};
