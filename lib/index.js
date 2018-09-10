"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeValidators = require("./typeValidators");
var contracts = require("./contracts");
exports.contracts = contracts;
var Context_1 = require("./Context");
exports.Context = Context_1.default;
exports.validators = typeValidators;
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    Object.defineProperty(default_1, "str", {
        get: function () {
            return new exports.validators.StringValidator();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(default_1, "int", {
        get: function () {
            return new exports.validators.NumberValidator(true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(default_1, "num", {
        get: function () {
            return new exports.validators.NumberValidator();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(default_1, "date", {
        get: function () {
            return new exports.validators.DateValidator();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(default_1, "bool", {
        get: function () {
            return new exports.validators.BooleanValidator();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(default_1, "arr", {
        get: function () {
            return new exports.validators.ArrayValidator();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(default_1, "obj", {
        get: function () {
            return new exports.validators.ObjectValidator();
        },
        enumerable: true,
        configurable: true
    });
    return default_1;
}());
exports.default = default_1;
