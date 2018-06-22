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
var rules_1 = require("../rules");
var StringValidator = /** @class */ (function (_super) {
    __extends(StringValidator, _super);
    function StringValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * checks if
     * @param limit {number}
     * @return StringValidator
     * */
    StringValidator.prototype.length = function (limit) {
        this.addValidator('length', rules_1.string.length(limit), { limit: limit });
        return this;
    };
    StringValidator.prototype.minLength = function (limit) {
        this.addValidator('minLength', rules_1.string.minLength(limit), { limit: limit });
        return this;
    };
    StringValidator.prototype.maxLength = function (limit) {
        this.addValidator('maxLength', rules_1.string.maxLength(limit), { limit: limit });
        return this;
    };
    StringValidator.prototype.matches = function (pattern) {
        this.addValidator('matches', rules_1.string.matches(pattern), { pattern: pattern.toString() });
        return this;
    };
    StringValidator.prototype.url = function () {
        this.addValidator('url', rules_1.string.url(), {});
        return this;
    };
    StringValidator.prototype.email = function () {
        this.addValidator('email', rules_1.string.email(), {});
        return this;
    };
    StringValidator.prototype.confirmed = function () {
        this.addValidator('confirmed', rules_1.string.confirmed(), {});
        return this;
    };
    Object.defineProperty(StringValidator.prototype, "type", {
        get: function () {
            return "string";
        },
        enumerable: true,
        configurable: true
    });
    return StringValidator;
}(ValidatorBase_1.ValidatorBase));
exports.default = StringValidator;
