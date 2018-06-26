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
var ValidatorBase_1 = require("../ValidatorBase");
var _1 = require("./");
var intefaces_1 = require("../intefaces");
var json_pointer_1 = require("json-pointer");
var utils_1 = require("../utils");
var getPath = function (name) { return (name.charAt(0) === "/") ? name : "/" + name; };
var ObjectValidator = /** @class */ (function (_super) {
    __extends(ObjectValidator, _super);
    function ObjectValidator(path, parent) {
        if (path === void 0) { path = ""; }
        if (parent === void 0) { parent = null; }
        var _this = _super.call(this, parent) || this;
        _this.requiredProps = [];
        _this.typeValidators = {};
        _this.path = path;
        _this.addValidator('object', function (value) { return typeof value === "object"; }, {});
        return _this;
    }
    Object.defineProperty(ObjectValidator.prototype, "type", {
        get: function () {
            return "object";
        },
        enumerable: true,
        configurable: true
    });
    ObjectValidator.prototype.requires = function () {
        var properties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            properties[_i] = arguments[_i];
        }
        this.requiredProps = properties;
        return this;
    };
    ObjectValidator.prototype.requiresWithAny = function (conditionalProps, assertionPaths) {
        var _this = this;
        var conditionalProperties = (Array.isArray(conditionalProps)) ? conditionalProps : [conditionalProps];
        var assertionProperties = (Array.isArray(assertionPaths)) ? assertionPaths : [assertionPaths];
        conditionalProperties.forEach(function (conditionalProp) {
            _this.addValidator('requiresWithAny', function (value, obj) {
                for (var i = 0; i < assertionProperties.length; i++)
                    if (json_pointer_1.has(obj, assertionProperties[i]))
                        return value.hasOwnProperty(conditionalProp);
                return true;
            }, { conditionalProperty: conditionalProp, assertionProperties: assertionProperties }, true);
        });
        return this;
    };
    ObjectValidator.prototype.requiresWithAll = function (conditionalProps, assertionProps) {
        var _this = this;
        var conditionalProperties = (Array.isArray(conditionalProps)) ? conditionalProps : [conditionalProps];
        var assertionProperties = (Array.isArray(assertionProps)) ? assertionProps : [assertionProps];
        conditionalProperties.forEach(function (conditionalProp) {
            _this.addValidator('requiresWithAll', function (value, obj) {
                for (var i = 0; i < assertionProperties.length; i++)
                    if (!json_pointer_1.has(obj, assertionProperties[i]))
                        return true;
                return value.hasOwnProperty(conditionalProp);
            }, { conditionalProperty: conditionalProp, assertionProperties: assertionProperties });
        });
        return this;
    };
    ObjectValidator.prototype.addEntryValidator = function (name, validator) {
        var pointer = "/" + name;
        if (json_pointer_1.has(this.typeValidators, pointer))
            return json_pointer_1.get(this.typeValidators, pointer);
        json_pointer_1.set(this.typeValidators, pointer, validator);
        return validator;
    };
    ObjectValidator.prototype.keys = function (validators) {
        var _this = this;
        Object.keys(validators).forEach(function (key) { return json_pointer_1.set(_this.typeValidators, "/" + key, validators[key]); });
        return this;
    };
    ObjectValidator.prototype.array = function (name) {
        return this.addEntryValidator(name, new _1.ArrayValidator(getPath(name), this));
    };
    ObjectValidator.prototype.object = function (name) {
        return this.addEntryValidator(name, new ObjectValidator(getPath(name), this));
    };
    ObjectValidator.prototype.string = function (name) {
        return this.addEntryValidator(name, new _1.StringValidator(this));
    };
    ObjectValidator.prototype.date = function (name, format) {
        if (format === void 0) { format = intefaces_1.DF.ISO8601; }
        return this.addEntryValidator(name, new _1.DateValidator(format, this));
    };
    ObjectValidator.prototype.number = function (name, integer) {
        if (integer === void 0) { integer = false; }
        return this.addEntryValidator(name, new _1.NumberValidator(integer, this));
    };
    ObjectValidator.prototype.boolean = function (name) {
        return this.addEntryValidator(name, new _1.BooleanValidator(this));
    };
    // add validation rule requires
    ObjectValidator.prototype.validate = function (value, path) {
        var _this = this;
        if (path === void 0) { path = ""; }
        var result = { success: true, messages: [], errors: [] };
        // checking required properties
        this.requiredProps.forEach(function (property) {
            if (!json_pointer_1.has(value, path + "/" + property)) {
                result.success = false;
                result.errors.push({ params: { property: property }, dataPath: path, rule: "object.requires" });
            }
        });
        var superResult = _super.prototype.validate.call(this, value, path);
        var propertiesResults = { success: true, messages: [], errors: [] };
        Object.keys(this.typeValidators).forEach(function (propertyName) {
            var path = [_this.path, propertyName].join("/");
            if (json_pointer_1.has(value, path)) {
                var propertyResult = _this.typeValidators[propertyName].validate(value, path);
                propertiesResults = utils_1.combineValidationResults(propertiesResults, propertyResult);
            }
        });
        return utils_1.combineValidationResults(propertiesResults, superResult, result);
    };
    return ObjectValidator;
}(ValidatorBase_1.ValidatorBase));
exports.default = ObjectValidator;
