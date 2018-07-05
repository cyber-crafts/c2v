"use strict";
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var json_pointer_1 = require("json-pointer");
var lodash_1 = require("lodash");
var BaseTypeValidator = /** @class */ (function () {
    function BaseTypeValidator(parent) {
        if (parent === void 0) { parent = null; }
        this.validationRules = [];
        this.parent = parent;
    }
    /**
     * adds a new validator to the existing validators array
     * @param validator {IValidationRule} the rule name
     * */
    BaseTypeValidator.prototype.attach = function (validator) {
        this.addValidator(validator);
        return this;
    };
    /**
     * adds a new validator to the existing validators array
     * @param validator {IValidationRule} the rule name
     * */
    BaseTypeValidator.prototype.addValidator = function (validator) {
        this.validationRules.push(validator);
    };
    BaseTypeValidator.prototype.in = function () {
        var _this = this;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        this.addValidator(function (value, obj, path, context) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!items.find(function (item) { return lodash_1.isEqual(value, item); })) {
                    context.addError(this.type + '.in', path, { items: items });
                }
                return [2 /*return*/];
            });
        }); });
        return this;
    };
    BaseTypeValidator.prototype.on = function (path) {
        var _this = this;
        this.addValidator(function (value, obj, dataPath, context) { return __awaiter(_this, void 0, void 0, function () {
            var container;
            return __generator(this, function (_a) {
                if (json_pointer_1.has(obj, path)) {
                    container = json_pointer_1.get(obj, path);
                    if (!Array.isArray(container) || !container.find(function (conValue) { return lodash_1.isEqual(value, conValue); })) {
                        context.addError(this.type + '.on', dataPath, { path: path });
                    }
                }
                else {
                    context.addError(this.type + '.on', dataPath, { path: path });
                }
                return [2 /*return*/];
            });
        }); });
        return this;
    };
    /**
     * validates the target property and run it through all its validators if it exists
     * @param obj {object} the whole object under validation
     * @param path {string = ""} the path to the property under validation
     * @param context
     * @returns IValidationResult
     * */
    BaseTypeValidator.prototype.validate = function (obj, context, path) {
        if (path === void 0) { path = ""; }
        var validatorPromises = [];
        // if the object under validation does not exist return default result
        if (!json_pointer_1.has(obj, path))
            return validatorPromises;
        var targetValue = json_pointer_1.get(obj, path);
        // loops over validators and build the validation result
        this.validationRules.forEach(function (validationRule) {
            validatorPromises.push(validationRule(targetValue, obj, path, context));
        });
        return validatorPromises;
    };
    Object.defineProperty(BaseTypeValidator.prototype, "_", {
        // returns parent object
        get: function () {
            return this.parent;
        },
        enumerable: true,
        configurable: true
    });
    return BaseTypeValidator;
}());
exports.BaseTypeValidator = BaseTypeValidator;
