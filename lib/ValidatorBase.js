"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_pointer_1 = require("json-pointer");
var lodash_1 = require("lodash");
var ValidatorBase = /** @class */ (function () {
    function ValidatorBase(parent) {
        if (parent === void 0) { parent = null; }
        this.validators = [];
        this.parent = parent;
    }
    /**
     * adds a new validator to the existing validators array
     * @param validator {IValidationRuleData} the rule name
     * */
    ValidatorBase.prototype.attach = function (validator) {
        this.addValidator(validator.name, validator.validate, validator.params);
        return this;
    };
    /**
     * adds a new validator to the existing validators array
     * @param ruleName {string} the rule name
     * @param validator {IValidationRule} the rule name
     * @param params {object} the params used to customize this validator
     * @param allowsMultiple {boolean} specifies if this rule can be attached multiple times to the same validator
     * */
    ValidatorBase.prototype.addValidator = function (ruleName, validator, params, allowsMultiple) {
        if (allowsMultiple === void 0) { allowsMultiple = false; }
        if (!allowsMultiple) {
            if (this.validators.findIndex(function (existingValidator) { return existingValidator.name === ruleName; }) >= 0)
                throw new Error("validator with the same name " + ruleName + " already exists");
        }
        this.validators.push({
            name: ruleName,
            validate: validator,
            params: params
        });
    };
    /**
     * validates the target property and run it through all its validators if it exists
     * @param obj {object} the whole object under validation
     * @param path {string = ""} the path to the property under validation
     * @returns IValidationResult
     * */
    ValidatorBase.prototype.validate = function (obj, path) {
        var _this = this;
        if (path === void 0) { path = ""; }
        var result = { success: true, messages: [], errors: [] };
        // if the object under validation does not exist return default result
        if (!json_pointer_1.has(obj, path))
            return result;
        var targetValue = json_pointer_1.get(obj, path);
        // loops over validators and build the validation result
        this.validators.forEach(function (validator) {
            var r = validator.validate(targetValue, obj, path);
            if (!r) {
                result.success = false;
                result.errors.push({ rule: _this.type + "." + validator.name, dataPath: path, params: validator.params });
            }
        });
        return result;
    };
    ValidatorBase.prototype.in = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        this.addValidator('in', function (value, obj, path) {
            return !!items.find(function (item) { return lodash_1.isEqual(value, item); });
        }, { items: items });
        return this;
    };
    ValidatorBase.prototype.on = function (path) {
        this.addValidator('on', function (value, obj, path) {
            if (!json_pointer_1.has(obj, path))
                return false;
            var container = json_pointer_1.get(obj, path);
            if (Array.isArray(container))
                return !!container.find(function (conValue, index) { return lodash_1.isEqual(value, conValue); });
            return false;
        }, { path: path });
        return this;
    };
    Object.defineProperty(ValidatorBase.prototype, "_", {
        // returns parent object
        get: function () {
            return this.parent;
        },
        enumerable: true,
        configurable: true
    });
    return ValidatorBase;
}());
exports.ValidatorBase = ValidatorBase;
