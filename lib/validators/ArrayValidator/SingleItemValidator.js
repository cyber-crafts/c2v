"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_pointer_1 = require("json-pointer");
var StringValidator_1 = require("../StringValidator");
var NumberValidator_1 = require("../NumberValidator");
var utils_1 = require("../../utils");
var SingleItemValidator = /** @class */ (function () {
    function SingleItemValidator(index, parent) {
        this.index = index;
        this.parent = parent;
    }
    SingleItemValidator.prototype.setValidator = function (validator) {
        this.typeValidator = validator;
    };
    SingleItemValidator.prototype.string = function () {
        var tv = new StringValidator_1.default(this.parent);
        this.typeValidator = tv;
        return tv;
    };
    SingleItemValidator.prototype.number = function (integer) {
        if (integer === void 0) { integer = false; }
        var nv = new NumberValidator_1.default(integer, this.parent);
        this.typeValidator = nv;
        return nv;
    };
    SingleItemValidator.prototype.validate = function (value, path) {
        var result = { success: true, messages: [], errors: [] };
        var dataPath = path + "/" + this.index;
        if (!json_pointer_1.has(value, path) || !json_pointer_1.has(value, dataPath))
            return result;
        var itemResult = this.typeValidator.validate(value, dataPath);
        result = utils_1.combineValidationResults(result, itemResult);
        return result;
    };
    return SingleItemValidator;
}());
exports.default = SingleItemValidator;
