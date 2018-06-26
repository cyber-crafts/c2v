"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_pointer_1 = require("json-pointer");
var intefaces_1 = require("../../intefaces");
var StringValidator_1 = require("../StringValidator");
var NumberValidator_1 = require("../NumberValidator");
var utils_1 = require("../../utils");
var BooleanValidator_1 = require("../BooleanValidator");
var index_1 = require("../index");
var AllItemsValidator = /** @class */ (function () {
    function AllItemsValidator(parent) {
        this.parent = parent;
    }
    AllItemsValidator.prototype.setTypeValidator = function (validator) {
        this.typeValidator = validator;
        return validator;
    };
    AllItemsValidator.prototype.string = function () {
        return this.setTypeValidator(new StringValidator_1.default(this.parent));
    };
    AllItemsValidator.prototype.number = function (integer) {
        if (integer === void 0) { integer = false; }
        return this.setTypeValidator(new NumberValidator_1.default(integer, this.parent));
    };
    AllItemsValidator.prototype.boolean = function () {
        return this.setTypeValidator(new BooleanValidator_1.default(this.parent));
    };
    AllItemsValidator.prototype.date = function (format) {
        if (format === void 0) { format = intefaces_1.DF.ISO8601; }
        return this.setTypeValidator(new index_1.DateValidator(format, this.parent));
    };
    AllItemsValidator.prototype.validate = function (value, path) {
        var _this = this;
        var result = { success: true, messages: [], errors: [] };
        if (!json_pointer_1.has(value, path))
            return result;
        var array = json_pointer_1.get(value, path);
        if (this.typeValidator) {
            array.forEach(function (item, index) {
                var itemResult = _this.typeValidator.validate(value, path + "/" + index);
                result = utils_1.combineValidationResults(result, itemResult);
            });
        }
        return result;
    };
    return AllItemsValidator;
}());
exports.default = AllItemsValidator;
