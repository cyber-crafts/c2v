"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseTypeValidator_1 = require("../../BaseTypeValidator");
var AllItemsValidator_1 = __importDefault(require("./AllItemsValidator"));
var json_pointer_1 = require("json-pointer");
var SingleItemValidator_1 = __importDefault(require("./SingleItemValidator"));
var lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
var ArrayValidator = /** @class */ (function (_super) {
    __extends(ArrayValidator, _super);
    function ArrayValidator(path) {
        if (path === void 0) { path = ''; }
        var _this = _super.call(this) || this;
        _this.singleItemValidators = [];
        _this.allItemsValidator = new AllItemsValidator_1.default();
        return _this;
    }
    ArrayValidator.prototype.minItems = function (limit) {
        var _this = this;
        this.addRule({
            name: 'minItems',
            func: function (value, obj, path, context) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (value.length < limit)
                        context.addError('array.minItems', path, { limit: limit });
                    return [2 /*return*/];
                });
            }); },
        });
        return this;
    };
    ArrayValidator.prototype.maxItems = function (limit) {
        var _this = this;
        this.addRule({
            name: 'maxItems',
            func: function (value, obj, path, context) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (value.length > limit)
                        context.addError('array.maxItems', path, { limit: limit });
                    return [2 /*return*/];
                });
            }); },
        });
        return this;
    };
    ArrayValidator.prototype.allItems = function (validator) {
        if (validator === void 0) { validator = null; }
        if (validator)
            this.allItemsValidator.setTypeValidator(validator);
        return this;
    };
    ArrayValidator.prototype.items = function (validators) {
        var _this = this;
        Object.keys(validators).forEach(function (key) {
            if (!isNaN(Number(key))) {
                var siv = new SingleItemValidator_1.default(Number(key));
                _this.singleItemValidators.push(siv);
                siv.setValidator(validators[key]);
            }
            else if (key === '*') {
                _this.allItemsValidator.setTypeValidator(validators[key]);
            }
        });
        return this;
    };
    Object.defineProperty(ArrayValidator.prototype, "type", {
        get: function () {
            return 'array';
        },
        enumerable: false,
        configurable: true
    });
    ArrayValidator.prototype.validate = function (value, context, path) {
        if (path === void 0) { path = ''; }
        value = (0, lodash_clonedeep_1.default)(value);
        var results = _super.prototype.validate.call(this, value, context, path);
        if ((0, json_pointer_1.has)(value, path)) {
            // validating each entry
            results = results.concat(this.allItemsValidator.validate(value, context, path));
        }
        this.singleItemValidators.forEach(function (validator) {
            results = results.concat(validator.validate(value, path, context));
        });
        return results;
    };
    return ArrayValidator;
}(BaseTypeValidator_1.BaseTypeValidator));
exports.default = ArrayValidator;
