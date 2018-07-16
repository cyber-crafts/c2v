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
var BaseTypeValidator_1 = require("../BaseTypeValidator");
var json_pointer_1 = require("json-pointer");
var intefaces_1 = require("../intefaces");
var moment = require("moment");
var rules_1 = require("../rules");
var DateValidator = /** @class */ (function (_super) {
    __extends(DateValidator, _super);
    function DateValidator(format, parent) {
        if (format === void 0) { format = intefaces_1.DF.ISO8601; }
        if (parent === void 0) { parent = null; }
        var _this = _super.call(this, parent) || this;
        _this.type = "date";
        _this._format = format;
        return _this;
    }
    DateValidator.prototype.parse = function (date) {
        if (typeof date === "number" && this._format === intefaces_1.DF.Unix)
            return moment.unix(date);
        return moment(date, this._format);
    };
    DateValidator.prototype.format = function (format) {
        this._format = format;
        return this;
    };
    DateValidator.prototype.before = function (limit) {
        var _this = this;
        this.addValidator(function (value, obj, path, context) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!rules_1.date.before(this.parse(limit))(value))
                    context.addError('date.before', path, { limit: limit });
                return [2 /*return*/];
            });
        }); });
        return this;
    };
    DateValidator.prototype.after = function (limit) {
        var _this = this;
        this.addValidator(function (value, obj, path, context) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!rules_1.date.after(this.parse(limit))(value))
                    context.addError('date.after', path, { limit: limit });
                return [2 /*return*/];
            });
        }); });
        return this;
    };
    DateValidator.prototype.closerThanFromNow = function (amount, unit) {
        var _this = this;
        this.addValidator(function (value, obj, path, context) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!rules_1.date.closerThanFromNow(amount, unit)(value))
                    context.addError('date.closerThanFromNow', path, { amount: amount, unit: unit });
                return [2 /*return*/];
            });
        }); });
        return this;
    };
    DateValidator.prototype.furtherThanFromNow = function (amount, unit) {
        var _this = this;
        this.addValidator(function (value, obj, path, context) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!rules_1.date.furtherThanFromNow(amount, unit)(value))
                    context.addError('date.furtherThanFromNow', path, { amount: amount, unit: unit });
                return [2 /*return*/];
            });
        }); });
        return this;
    };
    DateValidator.prototype.validate = function (obj, context, path) {
        if (path === void 0) { path = ""; }
        if (path !== "") {
            json_pointer_1.set(obj, path, this.parse(json_pointer_1.get(obj, path)));
            return _super.prototype.validate.call(this, obj, context, path);
        }
        else {
            return _super.prototype.validate.call(this, this.parse(obj), context, path);
        }
    };
    return DateValidator;
}(BaseTypeValidator_1.BaseTypeValidator));
exports.default = DateValidator;
