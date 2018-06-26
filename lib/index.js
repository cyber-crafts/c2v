"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var validators = require("./validators");
var intefaces_1 = require("./intefaces");
exports.default = __assign({}, validators, { str: function () { return new validators.StringValidator(); }, int: function () { return new validators.NumberValidator(true); }, num: function () { return new validators.NumberValidator(); }, date: function (format) {
        if (format === void 0) { format = intefaces_1.DF.ISO8601; }
        return new validators.DateValidator(format);
    }, bool: function () { return new validators.BooleanValidator(); }, arr: function () { return new validators.ArrayValidator(); }, obj: function () { return new validators.ObjectValidator(); } });
