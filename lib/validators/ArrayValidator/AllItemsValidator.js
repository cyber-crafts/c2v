"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_pointer_1 = require("json-pointer");
var StringValidator_1 = require("../StringValidator");
var NumberValidator_1 = require("../NumberValidator");
var utils_1 = require("../../utils");
var AllItemsValidator = /** @class */ (function () {
    function AllItemsValidator(parent) {
        this.parent = parent;
    }
    Object.defineProperty(AllItemsValidator.prototype, "string", {
        get: function () {
            var tv = new StringValidator_1.default(this.parent);
            this.typeValidator = tv;
            return tv;
        },
        enumerable: true,
        configurable: true
    });
    AllItemsValidator.prototype.number = function (integer) {
        if (integer === void 0) { integer = false; }
        var nv = new NumberValidator_1.default(this.parent, integer);
        this.typeValidator = nv;
        return nv;
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
