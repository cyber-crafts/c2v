"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    boolean: function () { return function (value) { return typeof value === 'boolean'; }; },
    isTrue: function () { return function (value) { return value === true; }; },
};
