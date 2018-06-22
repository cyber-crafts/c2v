"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidatorBase_1 = require("../../ValidatorBase");
var AllItemsValidator_1 = require("./AllItemsValidator");
var json_pointer_1 = require("json-pointer");
var utils_1 = require("../../utils");
var SingleItemValidator_1 = require("./SingleItemValidator");
var ArrayValidator = /** @class */ (function (_super) {
    __extends(ArrayValidator, _super);
    function ArrayValidator(path, parent) {
        if (path === void 0) { path = ""; }
        if (parent === void 0) { parent = null; }
        var _this = _super.call(this, parent) || this;
        _this.singleItemValidators = [];
        _this.allItemsValidator = new AllItemsValidator_1.default(_this);
        return _this;
    }
    ArrayValidator.prototype.minItems = function (limit) {
        this.addValidator('minItems', function (value, obj) {
            return value.length >= limit;
        }, { limit: limit });
        return this;
    };
    ArrayValidator.prototype.maxItems = function (limit) {
        this.addValidator('maxItems', function (value, obj) {
            return value.length <= limit;
        }, { limit: limit });
        return this;
    };
    ArrayValidator.prototype.allItems = function () {
        return this.allItemsValidator;
    };
    ArrayValidator.prototype.nth = function (index) {
        var siv = new SingleItemValidator_1.default(index, this);
        this.singleItemValidators.push(siv);
        return siv;
    };
    Object.defineProperty(ArrayValidator.prototype, "type", {
        get: function () {
            return "array";
        },
        enumerable: true,
        configurable: true
    });
    ArrayValidator.prototype.validate = function (value, path) {
        if (path === void 0) { path = ""; }
        var selfResult = _super.prototype.validate.call(this, value, path);
        var allItemsResult = { success: true, messages: [], errors: [] };
        if (json_pointer_1.has(value, path)) {
            // validating each entry
            allItemsResult = utils_1.combineValidationResults(this.allItemsValidator.validate(value, path), allItemsResult);
        }
        var result = utils_1.combineValidationResults(selfResult, allItemsResult);
        this.singleItemValidators.forEach(function (validator) {
            result = utils_1.combineValidationResults(result, validator.validate(value, path));
        });
        return result;
    };
    return ArrayValidator;
}(ValidatorBase_1.ValidatorBase));
exports.default = ArrayValidator;
