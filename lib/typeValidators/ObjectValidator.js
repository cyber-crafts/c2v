"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseTypeValidator_1 = require("../BaseTypeValidator");
var json_pointer_1 = require("json-pointer");
var Context_1 = require("../Context");
var utils_1 = require("../utils");
var lodash_1 = require("lodash");
var getPath = function (name) { return (name.charAt(0) === '/') ? name : '/' + name; };
var ObjectValidator = /** @class */ (function (_super) {
    __extends(ObjectValidator, _super);
    function ObjectValidator() {
        var _this = _super.call(this) || this;
        _this.requiredProps = [];
        _this.typeValidators = {};
        _this.addValidator('object', function (value, obj, path, context) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof value !== 'object')
                    context.addError('object.object', path);
                return [2 /*return*/];
            });
        }); });
        return _this;
    }
    Object.defineProperty(ObjectValidator.prototype, "type", {
        get: function () {
            return 'object';
        },
        enumerable: true,
        configurable: true
    });
    ObjectValidator.prototype.requires = function () {
        var properties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            properties[_i] = arguments[_i];
        }
        this.requiredProps = this.requiredProps.concat(properties);
        return this;
    };
    ObjectValidator.prototype.requiresIfAny = function (conditionalProps, validationRules) {
        var _this = this;
        var conditionalProperties = (Array.isArray(conditionalProps)) ? conditionalProps : [conditionalProps];
        var validationWrappers = (Array.isArray(validationRules)) ? validationRules : [validationRules];
        conditionalProperties.forEach(function (conditionalProperty) {
            _this.addValidator('requiresIfAny', function (value, obj, path, context) { return __awaiter(_this, void 0, void 0, function () {
                var i, wrapper, conditionalObject, isDataValidation, _context, errorParams;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < validationWrappers.length)) return [3 /*break*/, 4];
                            wrapper = validationWrappers[i];
                            conditionalObject = undefined;
                            isDataValidation = false;
                            if (wrapper.path.substr(0, 1) === '$') {
                                conditionalObject = context.getData();
                                isDataValidation = true;
                            }
                            else {
                                conditionalObject = obj;
                            }
                            if (!json_pointer_1.has(conditionalObject, utils_1.sanitizePath(wrapper.path))) return [3 /*break*/, 3];
                            _context = new Context_1.default().setData(context.getData());
                            return [4 /*yield*/, Promise.all(wrapper.validator.validate(conditionalObject, _context, utils_1.sanitizePath(wrapper.path)))
                                // if context is clean then the `conditionalProperty` should exist
                            ];
                        case 2:
                            _a.sent();
                            // if context is clean then the `conditionalProperty` should exist
                            if (_context.isValid)
                                if (!json_pointer_1.has(value, "/" + conditionalProperty)) {
                                    errorParams = {
                                        conditionalProperty: conditionalProperty,
                                        assertionProperties: wrapper.path,
                                    };
                                    if (isDataValidation) {
                                        errorParams.data = context.getData();
                                    }
                                    context.addError('object.requiresIfAny', path, errorParams);
                                }
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
        });
        return this;
    };
    ObjectValidator.prototype.requiresWithAny = function (conditionalProps, assertionPaths) {
        var _this = this;
        var conditionalProperties = (Array.isArray(conditionalProps)) ? conditionalProps : [conditionalProps];
        var assertionProperties = (Array.isArray(assertionPaths)) ? assertionPaths : [assertionPaths];
        conditionalProperties.forEach(function (conditionalProperty) {
            _this.addValidator('requiresWithAny', function (value, obj, path, context) { return __awaiter(_this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    for (i = 0; i < assertionProperties.length; i++)
                        if (json_pointer_1.has(obj, assertionProperties[i]))
                            if (!value.hasOwnProperty(conditionalProperty))
                                context.addError('object.requiresWithAny', path, { conditionalProperty: conditionalProperty, assertionProperties: assertionProperties });
                    return [2 /*return*/];
                });
            }); });
        });
        return this;
    };
    ObjectValidator.prototype.requiresWithAll = function (conditionalProps, assertionProps) {
        var _this = this;
        var conditionalProperties = (Array.isArray(conditionalProps)) ? conditionalProps : [conditionalProps];
        var assertionProperties = (Array.isArray(assertionProps)) ? assertionProps : [assertionProps];
        conditionalProperties.forEach(function (conditionalProperty) {
            _this.addValidator('requiresWithAll', function (value, obj, path, context) { return __awaiter(_this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    for (i = 0; i < assertionProperties.length; i++) {
                        if (!json_pointer_1.has(obj, assertionProperties[i]))
                            return [2 /*return*/];
                    }
                    if (!value.hasOwnProperty(conditionalProperty))
                        context.addError('object.requiresWithAll', path, { conditionalProperty: conditionalProperty, assertionProperties: assertionProperties });
                    return [2 /*return*/];
                });
            }); });
        });
        return this;
    };
    ObjectValidator.prototype.addEntryValidator = function (name, validator) {
        var pointer = getPath(name);
        if (json_pointer_1.has(this.typeValidators, pointer))
            return json_pointer_1.get(this.typeValidators, pointer);
        json_pointer_1.set(this.typeValidators, pointer, validator);
        return validator;
    };
    ObjectValidator.prototype.keys = function (validators) {
        var _this = this;
        Object.keys(validators).forEach(function (key) { return _this.addEntryValidator(key, validators[key]); });
        return this;
    };
    // add validation rule requires
    ObjectValidator.prototype.validate = function (obj, context, path) {
        var _this = this;
        if (path === void 0) { path = ''; }
        obj = lodash_1.cloneDeep(obj);
        var results = [];
        // checking required properties
        this.requiredProps.forEach(function (property) {
            if (!json_pointer_1.has(obj, path + "/" + property) || json_pointer_1.get(obj, path + "/" + property) === null) {
                context.addError('object.requires', path, { property: property });
            }
        });
        var superResult = _super.prototype.validate.call(this, obj, context, path);
        var propertiesResults = [];
        Object.keys(this.typeValidators).forEach(function (propertyName) {
            var typeValidator = _this.typeValidators[propertyName];
            var propertyPath = [path, propertyName].join('/');
            if (json_pointer_1.has(obj, propertyPath) && json_pointer_1.get(obj, propertyPath) !== null) {
                propertiesResults = propertiesResults.concat(typeValidator.validate(obj, context, propertyPath));
            }
        });
        return propertiesResults.concat(superResult.concat(results));
    };
    return ObjectValidator;
}(BaseTypeValidator_1.BaseTypeValidator));
exports.default = ObjectValidator;
