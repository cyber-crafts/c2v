"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeValidators = require("./typeValidators");
const interfaces = require("./intefaces");
exports.interfaces = interfaces;
var Context_1 = require("./Context");
exports.Context = Context_1.default;
exports.validators = typeValidators;
class default_1 {
    static get str() {
        return new exports.validators.StringValidator();
    }
    static get int() {
        return new exports.validators.NumberValidator(true);
    }
    static get num() {
        return new exports.validators.NumberValidator();
    }
    static get date() {
        return new exports.validators.DateValidator();
    }
    static get bool() {
        return new exports.validators.BooleanValidator();
    }
    static get arr() {
        return new exports.validators.ArrayValidator();
    }
    static get obj() {
        return new exports.validators.ObjectValidator();
    }
}
exports.default = default_1;
