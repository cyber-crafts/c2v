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
        _this.format = format;
        return _this;
    }
    DateValidator.prototype.parse = function (date) {
        if (typeof date === "number" && this.format === intefaces_1.DF.Unix)
            return moment.unix(date);
        return moment(date, this.format);
    };
    DateValidator.prototype.before = function (limit) {
        this.addValidator('before', rules_1.date.before(this.parse(limit)), { date: limit });
        return this;
    };
    DateValidator.prototype.after = function (limit) {
        this.addValidator('after', rules_1.date.after(this.parse(limit)), { limit: limit });
        return this;
    };
    DateValidator.prototype.closerThanFromNow = function (amount, unit) {
        this.addValidator('closerThanFromNow', rules_1.date.closerThanFromNow(amount, unit), { amount: amount, unit: unit });
        return this;
    };
    DateValidator.prototype.furtherThanFromNow = function (amount, unit) {
        this.addValidator('furtherThanFromNow', rules_1.date.furtherThanFromNow(amount, unit), { amount: amount, unit: unit });
        return this;
    };
    DateValidator.prototype.validate = function (value, path) {
        if (path === void 0) { path = ""; }
        return _super.prototype.validate.call(this, this.parse(value), path);
    };
    return DateValidator;
}(ValidatorBase_1.ValidatorBase));
exports.default = DateValidator;
